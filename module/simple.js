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

  // Register Rest Mode setting
  game.settings.register("lostlands", "restMode", {
    name: "Rest Mode",
    hint: "Tick to turn on Rest Mode",
    scope: "world",
    type: Boolean,
    default: false,
    config: true
  });

  // Register restDice setting
  game.settings.register("lostlands", "restDice", {
    name: "Rest Dice",
    hint: "Select dice to heal while resting",
    scope: "world",
    type: String,
    default: Constant.DEFAULT_REST_DICE,
    config: false
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

  Hooks.on(SimpleCalendar.Hooks.Ready, async () => {

    const startFatigueClocks = async (currentTime) => {
      // cancel clocks for all actors
      // for PCs, if last time is undefined or later than current time, do full reset
      //    otherwise, just start clock
      const allActors = game.actors;
      const pCs = Util.pCTokens().map(t => t.actor);
      const clocks = Constant.FATIGUE_CLOCKS;
      const intervalFlags = Object.values(clocks).map(c => c.intervalFlag);

      for (const actor of allActors) {
        for (const flag of intervalFlags) {
          Util.stopClock(actor, flag);
        }
      }    

      return Promise.all(
        pCs.map(async (pc) => {
          for (const [type, {interval, lastFlag, command, intervalFlag}] of Object.entries(clocks)) {
            const intervalInSeconds = SimpleCalendar.api.timestampPlusInterval(0, interval);
            const lastTime = pc.getFlag("lostlands", lastFlag);
            let startTime;
            
            if ( !lastTime || lastTime > currentTime ) {
              const lastMidnight = SimpleCalendar.api.dateToTimestamp({hour: 0, minute: 0, second: 0});
              startTime = Util.nextTime(interval, lastMidnight, currentTime) - intervalInSeconds;
              await Util.resetFatigueType(pc, type, startTime);
            } else {
              startTime = Util.nextTime(interval, lastTime, currentTime) - intervalInSeconds;
              await Util.startClock(pc, intervalFlag, command, interval, startTime);
            }
          }
        })
      );
    };

    if (SimpleCalendar.api.isPrimaryGM()) {
      TimeQ.init();
      const now = Util.now();
      await Util.removeEffectsStartingAfter(now);
      await startFatigueClocks(now);
    }
    
    console.log(`Simple Calendar | is ready!`);

    let locked = false;
    Hooks.on(SimpleCalendar.Hooks.DateTimeChange, async (data) => {

      if ( locked || !SimpleCalendar.api.isPrimaryGM() ) return;
      locked = true;

      const oldTime = game.time.worldTime;
      const newTime =  SimpleCalendar.api.dateToTimestamp(data.date);
      const timeDiff = data.diff;

      // if going back in time, remove conditions that started later than current time, and restart clocks
      if (timeDiff < 0) {
        await Util.removeEffectsStartingAfter(newTime);
        await startFatigueClocks(newTime);
      }

      // update reqClo setting on season change and weather change
      // do cold damage using first additive method here
      // compare worn clo to required clo, and add cold? condition
      // use clo diff and number of times certain thresholds have passed, e.g. minutes, hours to calculate how much damage to do
      // only apply cold damage if PC is alive
      // const season = data.season?.name.toLowerCase();
      // const reqClo = Constant.REQ_CLO_BY_SEASON[season];
      // const pCs = Util.pCTokens().map(t => t.actor);
      // console.log()
      // for (const pc of pCs) {
      //   const wornClo = pc.data.data.clo;
      //   if (wornClo < reqClo) {
      //     await Util.addCondition("Cold", pc);
      //   }
      // }

      for await (const event of TimeQ.eventsBefore(newTime)) {
        let macro = game.macros.find(m => m.id === event.macroId);
        // add oldTime and newTime to macro scope
        Object.assign(event.scope, {oldTime, newTime});
        macro && await macro.execute(event.scope);
      }

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
  Util.playVoiceSound(Constant.VOICE_MOODS.WHAT, actor, token, {push: false, bubble: false, chance: 0.5});
});

// Play 'ok' voice sound on token movement
Hooks.on("updateToken", (token, moved, data) => {
  if ( !moved.x && !moved.y ) return;
  Util.playVoiceSound(Constant.VOICE_MOODS.OK, token.actor, token.data, {push: true, bubble: false, chance: 0.7});
});

// Play 'hurt'/'death' voice sounds on HP decrease
Hooks.on("preUpdateActor", (actor, change) => {
  const hpUpdate = change.data?.hp?.value;
  const targetHp = actor.data.data.hp?.value;
  const halfMaxHp = actor.data.data.hp?.max / 2;
  const token = Util.getTokenFromActor(actor);

  // return if update does not decrease hp
  if ( hpUpdate < 0 && targetHp > 0 ) {
    Util.playVoiceSound(Constant.VOICE_MOODS.DEATH, actor, token, {push: true, bubble: true, chance: 1});
  } else if ( hpUpdate < halfMaxHp && targetHp >= halfMaxHp ) {
    Util.playVoiceSound(Constant.VOICE_MOODS.DYING, actor, token, {push: true, bubble: true, chance: 0.7});
  } else {
    Util.playVoiceSound(Constant.VOICE_MOODS.HURT, actor, token, {push: true, bubble: true, chance: 0.5});
  }

  if (hpUpdate < 0 && actor.type === 'character') {
    Util.macroChatMessage(token, {flavor: 'Death', content: `${actor.name} has fallen. May the Gods have mercy.`}, false);
  }
});

Hooks.on("preCreateActiveEffect", (activeEffect, data, options, userId) => {
  if (!game.user.isGM) return false;
  const actor = activeEffect.parent;

  if (activeEffect.data.label === 'Asleep') {
    Util.removeCondition("Sleepy", actor);
  }
});

Hooks.on("preDeleteActiveEffect", (activeEffect, data, options, userId) => {
  if (!game.user.isGM) return false;
  const actor = activeEffect.parent;

  // if deleting Asleep, reset last sleep time if started sleeping 3+ hours ago
  if (activeEffect.data.label === 'Asleep') {
    const now = Util.now();
    const startTime = activeEffect.data.duration.startTime;
    if (startTime <= now - Constant.SECONDS_IN_HOUR * 3) {
      Util.resetSleep(actor, now);
    }
  }
});
