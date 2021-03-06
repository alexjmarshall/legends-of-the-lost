import { SimpleActor } from "./actor.js";
import { SimpleItem } from "./item.js";
import { SimpleItemSheet } from "./item-sheet.js";
import { SpellItemSheet } from "./spell-item-sheet.js";
import { FeatureItemSheet } from "./feature-item-sheet.js";
import { SimpleActorSheet } from "./actor-sheet.js";
import { ContainerActorSheet } from "./container-actor-sheet.js";
import { MerchantActorSheet } from "./merchant-actor-sheet.js";
import { preloadHandlebarsTemplates } from "./templates.js";
import * as Macro from "./macro.js";
import * as Constant from "./constants.js";
import * as Util from "./utils.js";
import { TimeQ } from './time-queue.js';
import * as Fatigue from './fatigue.js';

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

/**
 * Init hook.
 */
Hooks.once("init", async function() {
  console.log(`Initializing Simple Lostlands System`);

  /**
   * Set an initiative formula for the system. This will be updated later.
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d6",
    decimals: 2
  };

  // Define custom Entity classes
  CONFIG.Actor.documentClass = SimpleActor;
  CONFIG.Item.documentClass = SimpleItem;

  // Define custom status effects
  CONFIG.statusEffects = Constant.STATUS_EFFECTS;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("lostlands", SimpleActorSheet, { makeDefault: true });
  Actors.registerSheet("lostlands", ContainerActorSheet, { makeDefault: false });
  Actors.registerSheet("lostlands", MerchantActorSheet, { makeDefault: false });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("lostlands", SimpleItemSheet, { makeDefault: true });
  Items.registerSheet("lostlands", SpellItemSheet, { makeDefault: false });
  Items.registerSheet("lostlands", FeatureItemSheet, { makeDefault: false });

  // Register system settings
  game.settings.register("lostlands", "macroShorthand", {
    name: "SETTINGS.SimpleMacroShorthandN",
    hint: "SETTINGS.SimpleMacroShorthandL",
    scope: "world",
    type: Boolean,
    default: true,
    config: true
  });

  // Register initiative setting
  game.settings.register("lostlands", "initFormula", {
    name: "SETTINGS.SimpleInitFormulaN",
    hint: "SETTINGS.SimpleInitFormulaL",
    scope: "world",
    type: String,
    default: "1d6",
    config: true,
    onChange: formula => _simpleUpdateInit(formula, true)
  });

  // required Clo setting
  game.settings.register("lostlands", "temp", {
    name: "World Temperature",
    hint: "Current ambient temperature in Celsius",
    scope: "world",
    type: Number,
    default: 1,
    config: true,
  });

  // Retrieve and assign the initiative formula setting
  const initFormula = game.settings.get("lostlands", "initFormula");
  _simpleUpdateInit(initFormula);

  /**
   * Update the initiative formula
   * @param {string} formula - Dice formula to evaluate.
   * @param {boolean} notify - Whether or not to post notifications.
   */
  function _simpleUpdateInit(formula, notify = false) {
    const isValid = Roll.validate(formula);
    if ( !isValid ) {
      if ( notify ) ui.notifications.error(`${game.i18n.localize("SIMPLE.NotifyInitFormulaInvalid")}: ${formula}`);
      return;
    }
    CONFIG.Combat.initiative.formula = formula;
  }

  // Register time queue setting
  game.settings.register("lostlands", "timeQ", {
    name: "Time Queue",
    hint: "Don't touch this",
    scope: "world",
    type: String,
    default: "[]",
    config: false
  });

  game.lostlands = {
    SimpleActor,
    Macro,
    Util,
    Constant,
    TimeQ
  };

  /**
   * Slugify a string
   */
  Handlebars.registerHelper('slugify', function(value) {
    return value.slugify({strict: true});
  });

  // Check if value equals arg
  Handlebars.registerHelper('ifeq', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  });

  // Check if value in array
  Handlebars.registerHelper('ifin', function(elem, list, options) {
    if(list.indexOf(elem) > -1) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  // Check if value not in array
  Handlebars.registerHelper('ifnotin', function(elem, list, options) {
    if(list.indexOf(elem) < 0) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  // Preload template partials
  await preloadHandlebarsTemplates();
});


Hooks.on("ready", () => {

  const removeInvalidEffects = async (time) => {
    const allActors = game.actors;

    return Promise.all(
      allActors.map(async (actor) => {
        try {
          const effects = actor.effects.contents;
          const effectIds = [];
          for (const effect of effects) {
            const duration = effect.data.duration || {};
            const invalid = duration.startTime > time || duration.startTime + (duration.seconds || 0) < time;
            if (invalid && effect._id) effectIds.push(effect._id);
          }
          return await actor.deleteEmbeddedDocuments("ActiveEffect", effectIds);
        } catch (error) {
          ui.notifications.error(`Problem removing effect from ${actor.name}. Refresh!`);
          throw error;
        }
      })
    );
  }

  Hooks.on(SimpleCalendar.Hooks.Ready, async () => {

    if (SimpleCalendar.api.isPrimaryGM()) {
      TimeQ.init();
      const now = Util.now();
      await Fatigue.syncFatigueClocks(now, true);
      await removeInvalidEffects(now);
    }
    
    console.log(`Simple Calendar | is ready!`);

    let locked = false;
    Hooks.on(SimpleCalendar.Hooks.DateTimeChange, async (data) => {

      if ( locked || !SimpleCalendar.api.isPrimaryGM() ) return;
      locked = true;

      const oldTime = game.time.worldTime;
      const timeDiff = data.diff;
      const newTime =  oldTime + timeDiff;

      // if going back in time, clear event queue,
      //  remove effects that started later than new time
      //  and set flag to ensure clock events are rescheduled
      let resetClocks = false;
      if (newTime < oldTime) {
        await TimeQ.clear();
        resetClocks = true;
      }

      await Fatigue.syncFatigueClocks(newTime, resetClocks);

      for await (const event of TimeQ.eventsBefore(newTime)) {
        let macro = game.macros.find(m => m._id === event.macroId);
        // add oldTime and newTime to macro scope
        Object.assign(event.scope, {oldTime, newTime});
        macro && await macro.execute(event.scope);
      }

      await removeInvalidEffects(newTime);

      locked = false;
    });
  });
});


/**
 * Macrobar hook
 */
Hooks.on("hotbarDrop", (bar, data, slot) => Macro.createLostlandsMacro(data, slot));

/**
 * Adds the actor template context menu
 */
Hooks.on("getActorDirectoryEntryContext", (html, options) => {
  // Define an actor as a template.
  options.push({
    name: game.i18n.localize("SIMPLE.DefineTemplate"),
    icon: '<i class="fas fa-stamp"></i>',
    condition: li => {
      const actor = game.actors.get(li.data("entityId"));
      return !actor.getFlag("lostlands", "isTemplate");
    },
    callback: li => {
      const actor = game.actors.get(li.data("entityId"));
      actor.setFlag("lostlands", "isTemplate", true);
    }
  });

  // Undefine an actor as a template
  options.push({
    name: game.i18n.localize("SIMPLE.UnsetTemplate"),
    icon: '<i class="fas fa-times"></i>',
    condition: li => {
      const actor = game.actors.get(li.data("entityId"));
      return actor.getFlag("lostlands", "isTemplate");
    },
    callback: li => {
      const actor = game.actors.get(li.data("entityId"));
      actor.setFlag("lostlands", "isTemplate", false);
    }
  });
});

/**
 * Adds the item template context menu
 */
Hooks.on("getItemDirectoryEntryContext", (html, options) => {
  // Define an item as a template
  options.push({
    name: game.i18n.localize("SIMPLE.DefineTemplate"),
    icon: '<i class="fas fa-stamp"></i>',
    condition: li => {
      const item = game.items.get(li.data("entityId"));
      return !item.getFlag("lostlands", "isTemplate");
    },
    callback: li => {
      const item = game.items.get(li.data("entityId"));
      item.setFlag("lostlands", "isTemplate", true);
    }
  });

  // Undefine an item as a template
  options.push({
    name: game.i18n.localize("SIMPLE.UnsetTemplate"),
    icon: '<i class="fas fa-times"></i>',
    condition: li => {
      const item = game.items.get(li.data("entityId"));
      return item.getFlag("lostlands", "isTemplate");
    },
    callback: li => {
      const item = game.items.get(li.data("entityId"));
      item.setFlag("lostlands", "isTemplate", false);
    }
  });
});

// Play 'what' voice sound on token selection
// Deselect merchants on token selection
Hooks.on("controlToken", (token, selected) => {
  if (!selected) return;
  if (!game.user.isGM && token.actor.type === 'merchant') return token.release();
  const actor = token.actor;
  const actorHp = actor.data.data.hp?.value;
  if ( +actorHp < 1 ) return;
  Util.playVoiceSound(Constant.VOICE_MOODS.what, actor, token, {push: false, bubble: false, chance: 0.5});
});

// Play 'ok' voice sound on token movement
Hooks.on("updateToken", (token, change) => {
  if (change.x && change.y ) {
    Util.playVoiceSound(Constant.VOICE_MOODS.ok, token.actor, token.data, {push: true, bubble: false, chance: 0.7});
  }
});

// Play 'hurt'/'death' voice sounds on HP decrease
Hooks.on("preUpdateActor", (actor, change) => {
  const hpUpdate = change.data?.hp?.value;
  const targetHp = actor.data.data.hp?.value;
  const maxHp = actor.data.data.hp?.max;
  const targetXp = actor.data.data.xp?.value;
  const xpUpdate = change.data?.xp?.value;
  const maxXp = actor.data.data.xp?.max;
  const token = Util.getTokenFromActor(actor);
  const maxNegHP = actor.type === "humanoid" || actor.type === "character" ?
    (0 - (actor.data.data.attributes.ability_scores?.con?.value ?? 10)) : 0;

  // level up sound
  if (targetXp < maxXp && xpUpdate >= maxXp) {
    Util.playSound('level_up', null, {push: false, bubble: false});
    // set is_level_up flag here if necessary
  }

  if (hpUpdate < maxNegHP  && targetHp >= maxNegHP) {
    Util.macroChatMessage(actor, {
      flavor: 'Death', 
      content: `${actor.name} dies.${actor.type === 'character' ? ' May the Gods have mercy.' : ''}`,
    }, false);
    return;
  }

  if ( hpUpdate <= 0 && targetHp > 0 ) {
    Util.macroChatMessage(actor, {
      flavor: 'Incapacitated', 
      content: `${actor.name} collapses in pain.`,
    }, false);
  }

  if (targetHp < 1) return;

  if (hpUpdate < 0) {
    Util.playVoiceSound(Constant.VOICE_MOODS.death, actor, token, {push: true, bubble: true, chance: 1});
  } else if ( hpUpdate < maxHp / 2 && targetHp >= maxHp / 2 ) {
    Util.playVoiceSound(Constant.VOICE_MOODS.dying, actor, token, {push: true, bubble: true, chance: 0.7});
  } else if (hpUpdate > 0 && hpUpdate < targetHp) {
    Util.playVoiceSound(Constant.VOICE_MOODS.hurt, actor, token, {push: true, bubble: true, chance: 0.5});
  }
});

Hooks.on("preUpdateItem", (item, change) => {
  let heldQtyLimit = 1;
  const charSize = Constant.SIZE_VALUES[item.actor?.data.data.attributes.size?.value] ?? 2;
  const itemSize = Constant.SIZE_VALUES[item.data.data.attributes.size?.value];
  if (item.name.toLowerCase().includes('javelin') && charSize > itemSize) heldQtyLimit = 3;
  else if (itemSize === 0 && charSize > itemSize) heldQtyLimit = 2;

  const invalidHold = (item.data.data.held_offhand || item.data.data.held_mainhand) &&
    (change.data?.quantity < 1 || change.data?.quantity > heldQtyLimit);
  if (invalidHold) {
    change.data.held_offhand = false;
    change.data.held_mainhand = false;
  }
  const wearQtyLimit = 1;
  const invalidWear = item.data.data.worn && (change.data?.quantity < 1 || change.data?.quantity > wearQtyLimit);
  if (invalidWear) {
    change.data.worn = false;
  }
  if (change.data?.held_offhand != null || change.data?.held_mainhand != null) {// || change.data?.data?.attributes?.atk_modes
    const atkModes = item.data?.data?.attributes?.atk_modes?.value?.split(',')
      .map(t => t.toLowerCase().replace(/\s/g, ""))
      .filter(t => Object.keys(Constant.ATK_MODES).includes(t)) || [];

    if (atkModes.length) {
      change.data.atk_mode = atkModes[0];
      change.data.atk_height = 'mid';
      change.data.atk_style = 'stable';
      change.data.atk_init = 'immediate';
    } else {
      change.data.atk_mode = null;
      change.data.atk_height = null;
      change.data.atk_style = null;
      change.data.atk_init = null;
    }
  }
  if (change.data?.worn != null && !!item.data?.data?.attributes?.shield_shape) {
    change.data.shield_height = 'mid';
    change.data.shield_style = 'stable';
  }
});

Hooks.on("preCreateActiveEffect", (activeEffect, data, options, userId) => {
  if (!game.user.isGM) return false;
});

Hooks.on("createActiveEffect", (activeEffect, data, options, userId) => {
  const actor = activeEffect.parent;
  const effect = activeEffect.data.label;

  switch (effect) {
    case 'Dead':
      return Fatigue.deleteAllDiseases(actor);
    case 'Rest':
      return Macro.selectRestDice(actor);
  }
});

Hooks.on("deleteActiveEffect", async (activeEffect, data, options, userId) => {
  if (!game.user.isGM) return;
  const actor = activeEffect.parent;
  const effect = activeEffect.data.label;

  const applyRest = async (restDice) => {
    const sleepStartTime = activeEffect.data.duration.startTime;
    const sleepEndTime = Util.now();
    return Macro.applyRestOnWake(actor, sleepStartTime, sleepEndTime, restDice);
  };

  switch (effect) {
    case 'Asleep':
      return applyRest();
    case 'Rest':
      const restDice = actor.getFlag("lostlands", "restDice");
      await actor.unsetFlag("lostlands", "restDice");
      await Fatigue.resetFatigueType(actor, 'hunger');
      await Fatigue.resetFatigueType(actor, 'thirst');
      return applyRest(restDice);
  }
});
