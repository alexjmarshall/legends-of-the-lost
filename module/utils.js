import { VOICE_SOUNDS } from "./constants.js";

export async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export const playVoiceSound = (() => {
  const speakingActorIds = new Map();

  return async function(mood, actor, token, options={push: true, chatBubble: true, chance: 1}) {
    const voice = actor.data.data.voice;
    if (!voice) return;
    const actorId = actor.isToken ? actor.token.id : actor.id;
    if (speakingActorIds.has(actorId)) return;
    speakingActorIds.set(actorId);
    const soundsArr = VOICE_SOUNDS?.get(`${voice}`)?.get(`${mood}`);
    const numTracks = soundsArr.length;
    const trackNum = Math.floor(Math.random() * numTracks);
    
    if ( Math.random() < options.chance ) {
      const sound = await AudioHelper.play({src: soundsArr[trackNum], volume: 1, loop: false}, options.push);
      if (options.chatBubble) {
        token = token || (actor.isToken ? actor.token.data :
          canvas.tokens.objects.children.find(t => t.actor.id === actor.id && t.actor.data.data.voice === actor.data.data.voice));
        canvas.hud.bubbles.say(token, `<i class="fas fa-volume-up"></i>`, {emote: true});
      }
      await wait(sound.duration * 1000);
    }
    speakingActorIds.delete(actorId);
  }
})();