import * as Constant from "./constants.js";
import { TimeQ } from './time-queue.js';

export async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export function stringMatch(str1, str2) {
  if (typeof str1 !== 'string' || typeof str2 !== 'string') {
    return false;
  }
  return str1.toLowerCase().replace(/\s/g,'').normalize() === str2.toLowerCase().replace(/\s/g,'').normalize();
}

export function expandPrice(priceInCps) {
  if (!priceInCps) return;
  const gp = Math.floor(priceInCps / 50);
  priceInCps -= gp * 50;
  const sp = Math.floor(priceInCps / 5);
  const cp = priceInCps - sp * 5;
  return {gp, sp, cp};
}

export function getPriceString(priceInCps) {
  if (!priceInCps) return;
  const priceObj = expandPrice(priceInCps);
  return `${priceObj.gp ? `${priceObj.gp} gp, ` : ''}${priceObj.sp ? `${priceObj.sp} sp, ` : ''}${priceObj.cp ? `${priceObj.cp} cp, ` : ''}`.replace(/,\s*$/, '');
}

export const playVoiceSound = (() => {
  const speakingActorIds = new Map();

  return async function(mood, actor, token, {push = true, bubble = true, chance = 1}={}) {
    
    const actorId = actor.isToken ? actor.token.id : actor.id;
    if (speakingActorIds.has(actorId)) return;
    const isSleeping = game.cub.hasCondition("Asleep", actor);
    if (isSleeping) return;
    const voice = actor.data.data.voice;
    const soundsArr = Constant.VOICE_SOUNDS.get(`${voice}`)?.get(`${mood}`);
    if (!soundsArr) return;
    const numTracks = soundsArr.length;
    const trackNum = Math.floor(Math.random() * numTracks);
    if (Math.random() > chance) return;
    token = token || getTokenFromActor(actor);

    try {
      speakingActorIds.set(actorId);
      const sound = await playSound(soundsArr[trackNum], token, {push, bubble});
      return await wait(sound.duration * 1000);
    } catch (error) {
      throw new Error(error);
    } finally {
      speakingActorIds.delete(actorId);
    }
  }
})();

export function playSound(sound, token, {push = true, bubble = true}={}) {
  if (!sound) return;
  const soundPath = /^systems\/lostlands\/sounds\//.test(sound) ? sound : `systems/lostlands/sounds/${sound}.mp3`;
  if (token && bubble) {
    chatBubble(token, '<i class="fas fa-volume-up"></i>');
  }

  return AudioHelper.play({src: soundPath, volume: 1, loop: false}, push);
}

export function chatBubble(token, text, emote=true) {
  token = token || canvas.tokens.controlled.length === 1 ? canvas.tokens.controlled[0] :
          game.user.character ? getTokenFromActor(game.user.character) : null;
  if ( !token || !text ) return
  return canvas.hud.bubbles.say(token, text, {emote});
}

export function getTokenFromActor(actor) {
  const token = actor.isToken ? actor.token.data :
    canvas.tokens.objects.children.find(t => t.actor.id === actor.id);
  return token;
}

export function selectedCharacter() {
  let actor = null, token = canvas.tokens.controlled.length === 1 ? canvas.tokens.controlled[0] : null;
  if (token) {
    actor = token.actor;
  } else {
    actor = game.user.character;
    token = actor ? getTokenFromActor(actor) : null;
  }
  if (!actor) {
    ui.notifications.error("Select a character");
    throw new Error("Select a character");
  } 
  return {token, actor};
}

export async function rollDice(formula) {
  return new Roll(formula).evaluate().total;
}

export function getItemFromActor(itemIdOrName, actor, itemType='Item') {
  const item = actor.data.items.get(itemIdOrName) || 
    actor.data.items.find(i => i.name.toLowerCase().replace(/\s/g,'') === itemIdOrName?.toLowerCase().replace(/\s/g,''));
  if (!item) throw new Error(`${itemType} ${itemIdOrName} not found on ${actor.name}`);
  return item;
}

export async function reduceItemQty(item, actor) {
  const itemQty = +item.data.data.quantity;
  if (!itemQty) throw new Error(`${item.name} must have quantity greater than zero`);
  return actor.updateEmbeddedDocuments("Item", [{
    '_id': item._id, 
    'data.quantity': itemQty - 1
  }]);
}

export async function macroChatMessage(token, data, chatBubble=true) {
  if (!data.content) return;
  const type = data.type || CONST.CHAT_MESSAGE_TYPES.EMOTE;
  const flavor = data.flavor;
  const sound = data.sound ? `systems/lostlands/sounds/${data.sound}.mp3` : null;
  const speaker = ChatMessage.getSpeaker(token);
  let content = data.content.trim();
  // if content includes inline rolls, increase line height
  if (/[[.*\d.*]]/.test(data.content)) {
    content = `<div style="line-height:1.6em;">${content}</div>`;
  }
  return ChatMessage.create({speaker, content, type, flavor, sound}, {chatBubble: chatBubble});
}

export function chatInlineRoll(content) {
  if (!content) return;
  return `<span style="font-style:normal;">[[${content}]]</span>`
}

export function reqClo() {
  // weather?
  const season = SimpleCalendar.api.getCurrentSeason()?.name.toLowerCase();
  const reqClo = Constant.REQ_CLO_BY_SEASON[season];
  return reqClo;
}

export function uniqueId() {
  function chr4() {
    return Math.random().toString(16).slice(-4);
  }
  return chr4() + chr4() + chr4() + chr4();
}

export async function getMacroByCommand(name, command) {
  if ( !name || !command ) return;
  let macro = game.macros.find(m => (m.data.command === command));
  if (!macro) {
    macro = await Macro.create({
      name,
      command,
      type: 'script',
      flags: { "lostlands.attrMacro": true }
    });
  }

  return macro;
}

export function charsOwnedByUser() {
  if (game.user.isGM) {
    return game.actors.filter(a => !a.hasPlayerOwner && a.isOwner && a.type === 'character');
  } else {
    return game.actors.filter(a => a.isOwner && a.type === 'character');
  }
}

export function isOwned(actor) {
  return !!charsOwnedByUser().find(a => a.id === actor.id);
}

export function pCTokens() {
  return canvas.tokens.objects.children.filter(t => t.actor.type === 'character' && t.actor.hasPlayerOwner);
}

export function upperCaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const now = () => game.time.worldTime;

export async function stopClock(actor, intervalFlag) {
  const id = actor.getFlag("lostlands", intervalFlag);
  id && await TimeQ.cancel(id);
}

export async function startClock(actor, intervalFlag, command, interval, startTime) {
  const actorId = actor.isToken ? actor.token.id : actor.id;
  const macro = await getMacroByCommand(command, `return game.lostlands.Macro.${command}(actorId, execTime, newTime, oldTime);`);
  const intervalId = await TimeQ.doEvery(interval, startTime, macro.id, {actorId});
  return actor.setFlag("lostlands", intervalFlag, intervalId);
}

async function restartClock(actor, intervalFlag, command, interval, startTime) {
  await stopClock(actor, intervalFlag);
  return startClock(actor, intervalFlag, command, interval, startTime);
}

export async function resetFatigueType(actor, type, startTime) {
  let {interval, lastFlag, command, intervalFlag, condition} = Constant.FATIGUE_CLOCKS[type];
  const lastTime = actor.getFlag("lostlands", lastFlag);
  lastTime != startTime && await actor.setFlag("lostlands", lastFlag, startTime);
  condition && await removeCondition(condition, actor, {warn: false});
  await restartClock(actor, intervalFlag, command, interval, startTime);
}

export async function resetHunger(actor, startTime=now()) {
  await resetFatigueType(actor, "hungry", startTime);
  await resetFatigueType(actor, "hunger", startTime);
}

export async function resetThirst(actor, startTime=now()) {
  await resetFatigueType(actor, "thirsty", startTime);
  await resetFatigueType(actor, "thirst", startTime);
}

export async function resetSleep(actor, startTime=now()) {
  await resetFatigueType(actor, "sleepy", startTime);
  await resetFatigueType(actor, "exhaustion", startTime);
}

export async function removeCondition(condition, actor, {warn=false}={}) {
  const slow = !!game.cub.getCondition(condition, undefined, {warn})?.activeEffect?.changes?.length;
  const hasCondition = game.cub.hasCondition(condition, actor);
  if (hasCondition) {
    await game.cub.removeCondition(condition, actor, {warn});
    slow && await wait(300);
  }
}

export async function addCondition(condition, actor, {warn=false}={}) {
  const slow = !!game.cub.getCondition(condition, undefined, {warn})?.activeEffect?.changes?.length;
  const hasCondition = game.cub.hasCondition(condition, actor);
  if (!hasCondition) {
    // wait until time has synced
    while (SimpleCalendar.api.timestamp() !== game.time.worldTime) {
      await wait(50);
      continue;
    }
    await game.cub.addCondition(condition, actor, {warn});
    // wait if condition includes active effects to ensure actor has updated
    slow && await wait(300);
  }
}

export function nextTime(interval, startTime, currentTime) {
  const intervalInSeconds = SimpleCalendar.api.timestampPlusInterval(0, interval);
  let nextTime = Math.floor((currentTime - startTime) / intervalInSeconds) * intervalInSeconds + startTime;
  if (nextTime <= currentTime) nextTime += intervalInSeconds;

  return nextTime;
}

export async function removeEffectsStartingAfter(time) {
  const actors = game.actors;

  return Promise.all(actors.map(async (actor) => {
    try {
      const effects = actor.effects.contents;
      for (const effect of effects) {
        const invalid = effect.data.duration?.startTime > time;
        invalid && await effect.delete();
      }
    } catch (error) {
      ui.notifications.error(`Problem removing conditions from ${actor.name}. Refresh!`);
    }
  }));
}