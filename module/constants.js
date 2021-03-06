export const ASSETS_PATH = 'systems/lostlands/assets';
export const ATTRIBUTE_TYPES = ["String", "Number", "Boolean", "Formula", "Resource"];
export const SECONDS_IN_DAY = 86400;
export const SECONDS_IN_HOUR = 3600;
export const DEFAULT_BASE_AC = 10;
export const DEFAULT_BASE_MV = 12;
export const DEFAULT_HUMANOID_MV = 9;
export const DEFAULT_MONSTER_MV = 15;
export const DEFAULT_BASE_SV = 17;
export const MIN_SAVE_TARGET = 2;
export const SPELL_TYPES = {
  SPELL_CLERIC: "spell_cleric",
  SPELL_MAGIC: "spell_magic",
  SPELL_WITCH: "spell_witch"
};
export const MAX_SPELL_LEVELS = {
  [SPELL_TYPES.SPELL_CLERIC]: 5,
  [SPELL_TYPES.SPELL_MAGIC]: 9,
  [SPELL_TYPES.SPELL_WITCH]: 6
};
export const ATTITUDES = {
  HOSTILE: "hostile",
  DISMISSIVE: "dismissive",
  UNCERTAIN: "uncertain",
  ACCEPTING: "accepting",
  HELPFUL: "helpful"
};
export const ATTITUDE_SELL_ADJ = {
  [ATTITUDES.HOSTILE]: 1.5,
  [ATTITUDES.DISMISSIVE]: 1.15,
  [ATTITUDES.UNCERTAIN]: 1,
  [ATTITUDES.ACCEPTING]: 0.95,
  [ATTITUDES.HELPFUL]: 0.85
};
export const ATTITUDE_BUY_ADJ = {
  [ATTITUDES.HOSTILE]: 0.5,
  [ATTITUDES.DISMISSIVE]: 0.85,
  [ATTITUDES.UNCERTAIN]: 1,
  [ATTITUDES.ACCEPTING]: 1.05,
  [ATTITUDES.HELPFUL]: 1.15
};
export const DMG_TYPES = [
  "blunt",        // B
  "piercing",     // P
  "slashing",     // S
  "rending",      // R
];
export const MAGIC_DMG_TYPES = [
  "fire",         // F
  "cold",         // C
  "electricity",  // E
  "acid",         // A
  "magic",        // M
];
export const SHIELD_TYPES = {
  round: {
    L: {
      high:"skull,eye,nose,jaw,neck,shoulder,armpit,upper arm,elbow,forearm,hand,chest,gut", // TODO make shield high guards actually cover head, but -4 atk for being blind
      mid:"jaw,neck,shoulder,armpit,upper arm,elbow,forearm,hand,chest,gut,groin,hip", // also add a kite shield
      low:"elbow,forearm,hand,gut,groin,hip,thigh,knee,shin",
    },
    M: {
      high:"skull,eye,nose,jaw,neck,shoulder,forearm,hand,chest",
      mid:"armpit,upper arm,elbow,forearm,hand,chest,gut",
      low:"elbow,forearm,hand,gut,groin,hip",
    },
  },
};
export const MATERIAL_PROPS = {
  wood: {
    weight:40,
    clo:0,
    value:120,
  },
  burlap: {
    weight:8,
    clo:5,
    value:6,
  },
  linen: {
    weight:4,
    clo:8,
    value:60,
  },
  wool: {
    weight:8,
    clo:16,
    value:144,
  },
  silk: {
    weight:2,
    clo:11,
    value:1080,
  },
  fur: {
    weight:16,
    clo:32,
    value:600,
  },
  leather: {
    weight:20,
    clo:10,
    value:300,
    metal:false,
    bulky:false,
  },
  padded: {
    weight:16,
    clo:18,
    value:240,
    metal:false,
    bulky:false,
  },
  "cuir bouilli": {
    weight:24,
    clo:9,
    value:360,
    metal:false,
    bulky:true,
  },
  brigandine: {
    weight:80,
    clo:16,
    value:1200,
    metal:true,
    bulky:true,
  },
  scale: {
    weight:88,
    clo:13,
    value:960,
    metal:true,
    bulky:false,
  },
  chain: {
    weight:48,
    clo:2,
    value:1800,
    metal:true,
    bulky:false,
  },
  "elven chain": {
    weight:24,
    clo:1,
    value: 18000,
    metal:true,
    bulky:false,
  },
  "banded mail": {
    weight:60,
    clo:4,
    value:2400,
    metal:true,
    bulky:false,
  },
  lamellar: {
    weight:88,
    clo:11,
    value:1440,
    metal:true,
    bulky:true,
  },
  splint: {
    weight:72,
    clo:14,
    value:1920,
    metal:true,
    bulky:true,
  },
  "iron plate": {
    weight:80,
    clo:10,
    value:2880,
    metal:true,
    bulky:true,
  },
  "steel plate": {
    weight:72,
    clo:8,
    value:7200,
    metal:true,
    bulky:true,
  },
};
export const ARMOR_VS_DMG_TYPE = {
  none: {
    base_AC: 0,
    blunt: {
      ac:1,
      dr:0,
    },
    piercing: {
      ac:0,
      dr:0,
    },
    slashing: {
      ac:-1,
      dr:0,
    },
    rending: {
      ac:0,
      dr:0,
    },
  },
  fur: {
    base_AC: 1,
    blunt: {
      ac:0,
      dr:1,
    },
    piercing: {
      ac:0,
      dr:1,
    },
    slashing: {
      ac:0,
      dr:0,
    },
    rending: {
      ac:-1,
      dr:1,
    },
  },
  leather: {
    base_AC: 2,
    blunt: {
      ac:0,
      dr:0,
    },
    piercing: {
      ac:0,
      dr:1,
    },
    slashing: {
      ac:-1,
      dr:1,
    },
    rending: {
      ac:-2,
      dr:2,
    },
  },
  padded: {
    base_AC: 2,
    blunt: {
      ac:0,
      dr:1,
    },
    piercing: {
      ac:-1,
      dr:1,
    },
    slashing: {
      ac:-1,
      dr:0,
    },
    rending: {
      ac:-2,
      dr:1,
    },
  },
  "cuir bouilli": {
    base_AC: 2,
    blunt: {
      ac:1,
      dr:1,
    },
    piercing: {
      ac:1,
      dr:0,
    },
    slashing: {
      ac:0,
      dr:0,
    },
    rending: {
      ac:-2,
      dr:2,
    },
  },
  wood: {
    base_AC: 2,
    blunt: {
      ac:1,
      dr:1,
    },
    piercing: {
      ac:1,
      dr:0,
    },
    slashing: {
      ac:0,
      dr:0,
    },
    rending: {
      ac:-2,
      dr:2,
    },
  },
  scale: {
    base_AC: 2,
    blunt: {
      ac:2,
      dr:0,
    },
    piercing: {
      ac:1,
      dr:0,
    },
    slashing: {
      ac:3,
      dr:0,
    },
    rending: {
      ac:-2,
      dr:2,
    },
  },
  brigandine: {
    base_AC: 3,
    blunt: {
      ac:1,
      dr:1,
    },
    piercing: {
      ac:0,
      dr:1,
    },
    slashing: {
      ac:1,
      dr:0,
    },
    rending: {
      ac:-3,
      dr:2,
    },
  },
  chain: {
    base_AC: 3,
    blunt: {
      ac:0,
      dr:0,
    },
    piercing: {
      ac:-1,
      dr:1,
    },
    slashing: {
      ac:2,
      dr:1,
    },
    rending: {
      ac:-3,
      dr:3,
    },
  },
  "elven chain": {
    base_AC: 3,
    blunt: {
      ac:0,
      dr:0,
    },
    piercing: {
      ac:-1,
      dr:1,
    },
    slashing: {
      ac:2,
      dr:1,
    },
    rending: {
      ac:-3,
      dr:3,
    },
  },
  lamellar: {
    base_AC: 3,
    blunt: {
      ac:0,
      dr:1,
    },
    piercing: {
      ac:2,
      dr:1,
    },
    slashing: {
      ac:1,
      dr:1,
    },
    rending: {
      ac:-3,
      dr:3,
    },
  },
  "banded mail": {
    base_AC: 4,
    blunt: {
      ac:0,
      dr:0,
    },
    piercing: {
      ac:2,
      dr:0,
    },
    slashing: {
      ac:1,
      dr:1,
    },
    rending: {
      ac:-4,
      dr:3,
    },
  },
  splint: {
    base_AC: 4,
    blunt: {
      ac:-1,
      dr:1,
    },
    piercing: {
      ac:1,
      dr:0,
    },
    slashing: {
      ac:1,
      dr:1,
    },
    rending: {
      ac:-4,
      dr:2,
    },
  },
  "iron plate": {
    base_AC: 5,
    blunt: {
      ac: -1,
      dr: 1,
    },
    piercing: {
      ac: 2,
      dr: 0,
    },
    slashing: {
      ac: 1,
      dr: 2,
    },
    rending: {
      ac:-5,
      dr:2,
    },
  },
  "steel plate": {
    base_AC: 6,
    blunt: {
      ac: -1,
      dr: 2,
    },
    piercing: {
      ac: 3,
      dr: 0,
    },
    slashing: {
      ac: 1,
      dr: 2,
    },
    rending: {
      ac:-6,
      dr:2,
    },
  },
}
export const MIN_BLEED_DMG = 6;
export const BASE_IMPALE_CHANCE = 30;
export const ATK_MODES = {
  "swing(b)": {
    ATK_ATTR: "str",
    DMG_ATTR: "str",
    HIT_SOUND: "bludgeon_hit",
    MISS_SOUND: "bludgeon_miss",
    DMG_TYPE: "blunt",
    ATK_TYPE: "melee",
    ATK_FORM: "swing",
  },
  "swing(s)": {
    ATK_ATTR: "str",
    DMG_ATTR: "str",
    HIT_SOUND: "cut_hit",
    MISS_SOUND: "cut_miss",
    DMG_TYPE: "slashing",
    ATK_TYPE: "melee",
    ATK_FORM: "swing",
  },
  "swing(p)": {
    ATK_ATTR: "str",
    DMG_ATTR: "str",
    HIT_SOUND: "hew_hit",
    MISS_SOUND: "hew_miss",
    DMG_TYPE: "piercing",
    ATK_TYPE: "melee",
    ATK_FORM: "swing",
  },
  "thrust(b)": {
    ATK_ATTR: "dex",
    DMG_ATTR: "str",
    HIT_SOUND: "bludgeon_hit",
    MISS_SOUND: "bludgeon_miss",
    DMG_TYPE: "blunt",
    ATK_TYPE: "melee",
    ATK_FORM: "thrust",
  },
  "thrust(s)": {
    ATK_ATTR: "dex",
    DMG_ATTR: "str",
    HIT_SOUND: "hew_hit",
    MISS_SOUND: "hew_miss",
    DMG_TYPE: "slashing",
    ATK_TYPE: "melee",
    ATK_FORM: "thrust",
  },
  "thrust(p)": {
    ATK_ATTR: "dex",
    DMG_ATTR: "str",
    HIT_SOUND: "thrust_hit",
    MISS_SOUND: "thrust_miss",
    DMG_TYPE: "piercing",
    ATK_TYPE: "melee",
    ATK_FORM: "thrust",
  },
  "shoot(b)": {
    ATK_ATTR: "dex",
    DMG_ATTR: null,
    HIT_SOUND: "slingstone_hit",
    MISS_SOUND: "slingstone_miss",
    DMG_TYPE: "blunt",
    ATK_TYPE: "missile",
    ATK_FORM: "shoot",
  },
  "shoot(s)": {
    ATK_ATTR: "dex",
    DMG_ATTR: null,
    HIT_SOUND: "arrow_hit",
    MISS_SOUND: "arrow_miss",
    DMG_TYPE: "slashing",
    ATK_TYPE: "missile",
    ATK_FORM: "shoot",
  },
  "shoot(p)": {
    ATK_ATTR: "dex",
    DMG_ATTR: null,
    HIT_SOUND: "bolt_hit",
    MISS_SOUND: "bolt_miss",
    DMG_TYPE: "piercing",
    ATK_TYPE: "missile",
    ATK_FORM: "shoot",
  },
  "throw(b)": {
    ATK_ATTR: "dex",
    DMG_ATTR: "str",
    HIT_SOUND: "throw_hit",
    MISS_SOUND: "throw_miss",
    DMG_TYPE: "blunt",
    ATK_TYPE: "missile",
    ATK_FORM: "throw",
  },
  "throw(s)": {
    ATK_ATTR: "dex",
    DMG_ATTR: "str",
    HIT_SOUND: "throw_hit",
    MISS_SOUND: "throw_miss",
    DMG_TYPE: "slashing",
    ATK_TYPE: "missile",
    ATK_FORM: "throw",
  },
  "throw(p)": {
    ATK_ATTR: "dex",
    DMG_ATTR: "str",
    HIT_SOUND: "throw_hit",
    MISS_SOUND: "throw_miss",
    DMG_TYPE: "piercing",
    ATK_TYPE: "missile",
    ATK_FORM: "throw",
  },
};
export const VOICE_MOODS = {
  "amused": {
    title: "amused",
    icon: "https://img.icons8.com/external-wanicon-lineal-wanicon/50/000000/external-laughing-emoji-wanicon-lineal-wanicon.png",
  },
  "angry": {
    title: "amused",
    icon: "https://img.icons8.com/ios/50/000000/battle.png",
  },
  "bored": {
    title: "bored",
    icon: "https://img.icons8.com/ios/50/000000/bored.png",
  },
  "death": {
    title: "death",
    icon: "https://img.icons8.com/ios/50/000000/dying.png",
  },
  "dying": {
    title: "wounded",
    icon: "https://img.icons8.com/ios/50/000000/wound.png",
  },
  "hurt": {
    title: "hurt",
    icon: "https://img.icons8.com/ios/50/000000/action.png",
  },
  "kill": {
    title: "kill",
    icon: "https://img.icons8.com/ios/50/000000/murder.png",
  },
  "lead": {
    title: "lead",
    icon: "https://img.icons8.com/ios/50/000000/leadership.png",
  },
  "ok": {
    title: "ok",
    icon: "https://img.icons8.com/ios/50/000000/easy.png",
  },
  "party_death": {
    title: "rip",
    icon: "https://img.icons8.com/external-prettycons-lineal-prettycons/50/000000/external-rip-holidays-prettycons-lineal-prettycons.png",
  },
  "party_fail": {
    title: "facepalm",
    icon: "https://img.icons8.com/ios/50/000000/facepalm.png",
  },
  "retreat": {
    title: "retreat",
    icon: "https://img.icons8.com/ios/50/000000/running-rabbit.png",
  },
  "sleepy": {
    title: "sleepy",
    icon: "https://img.icons8.com/external-tulpahn-detailed-outline-tulpahn/50/000000/external-sleepy-heart-feeling-tulpahn-detailed-outline-tulpahn.png",
  },
  "toot": {
    title: "toot",
    icon: "https://img.icons8.com/ios-glyphs/50/000000/air-element--v1.png",
  },
  "what": {
    title: "what",
    icon: "https://img.icons8.com/ios/50/000000/question-mark--v1.png"
  },
};
export const VOICE_SOUNDS = {};
// populate voice sounds on startup
(async function() {
  const getFileArr = async partialPath => {
    const response = await fetch(`${ASSETS_PATH}/sounds/voice${partialPath}/DirContents.txt/`);
    const fileList = await response.text();
    return fileList.replace(/DirContents.txt[\s\S]?/,'').split(/\n/).filter(i => i).map(i => i.trim());
  }
  const voiceTypeList = await getFileArr('');
  for (const voiceType of voiceTypeList) {
    VOICE_SOUNDS[voiceType] = {};
    const voiceProfiles = await getFileArr(`/${voiceType}`);
    for (const voiceProfile of voiceProfiles) {
      VOICE_SOUNDS[voiceType][voiceProfile] = {};
      const partialPath = `/${voiceType}/${voiceProfile}`;
      const voiceFiles = await getFileArr(partialPath);
      Object.keys(VOICE_MOODS).forEach(mood => {
        const pathArr = voiceFiles.filter(f => new RegExp(`\^${mood}_\\d+.ogg`).test(f)).map(f => `${ASSETS_PATH}/sounds/voice${partialPath}/${f}`);
        VOICE_SOUNDS[voiceType][voiceProfile][mood] = pathArr;
      });
    }
  }
  console.log('Completed loading voice sound file paths', VOICE_SOUNDS);
})();
export const PRECIOUS_MATERIALS_VALUE_PER_POUND = {
  "copper": 40,
  "silver": 240, // weight 0.5 for Silver Mark ingot worth 120
  "electrum": 1600, // weight 0.075 for ep ("Stater") coin worth 120
  "gold": 2400, // weight 0.5 for Gold Mark ingot worth 1200
  "platinum": 12000, // weight 0.1 for pp ("Medallion") coin worth 1200
};
export const TRADE_GOODS_VALUE_PER_POUND = {
  // TODO add clothing types to material dict below as well
};
export const UNITS_OF_ACCOUNT = {
  "cp": {
    weight: 0.025,
    value: 1,
    name: "Pfennig",
    abbr: "pf",
  },
  "sp": {
    weight: 0.05,
    value: 12,
    name: "Groschen",
    abbr: "gr",
  },
  "gp": {
    weight: 0.1,
    value: 240,
    name: "Florin",
    abbr: "fl",
  },
};
export const LIMB_GROUPS = {
  "lower leg": ["foot","shin"],
  "leg": ["foot","shin","knee","thigh"],
  "forearm": ["hand","forearm"],
  "arm": ["hand","forearm","elbow","upper arm"],
};
export const minorBleedDesc = ` and the wound bleeds heavily`;
export const majorBleedDesc = ` and blood spurts from the wound!`;
export const internalBleedDesc = area => ` and the ${area} bleeds internally`;
export const compoundFractureDesc = ' and the broken bones poke through the skin';
export const weaponStuckDesc = ' and the weapon is stuck';
export const knockdownDesc = ' and knocks them down';
export const knockoutDesc = ' and knocks them out';
export const knockbackDesc = ' and knocks them flying!';
export const staggerDesc = ' and staggers them';
export const knockWindDesc = ' and knocks the wind from them';
export const bloodWellDesc = ' and blood wells around the weapon...';
const gruesBluntHeadDesc = ' and shatters the skull spattering chunks of gore!';
const gruesSlashHeadDesc = ' and cleaves the head in two spattering blood in an arc!';
export const bleedDescs = [minorBleedDesc,majorBleedDesc,internalBleedDesc];
export const knockDescs = [knockdownDesc,knockoutDesc,knockbackDesc,staggerDesc,knockWindDesc];
const ranChoice = (choices) => {
  const ranInd = Math.floor(Math.random() * choices.length);
  return choices[ranInd];
}


export const ranAnnoyedMerchant = () => ranChoice([
  'The merchant purses their lips.',
  'The merchant rubs the bridge of their nose.',
  'The merchant closes their eyes and sighs.',
  'The merchant clucks their tongue.',
  'The merchant looks upward.']);
const ranToe = () => ranChoice(['big','long','middle','ring','little']);
const ranOrifice = () => ranChoice(['nose','mouth','ears']);
const ranFinger = () => ranChoice(['thumb','index finger','middle finger','ring finger','pinky finger']);
const ranShinBone = () => ranChoice(['fibula','tibia']);
const ranForearmBone = () => ranChoice(['ulnar bone','radial bone']);
const ranArmMuscle = () => ranChoice(['triceps','biceps']);
const ranThighMuscle = () => ranChoice(['quadriceps','quadriceps','hamstrings']);
const ranChestBone = () => ranChoice(['a rib','the sternum']);
const ranOrgan = () => ranChoice(['the liver','the spleen','a kidney','the bowels','the spine']);
const ranChestOrgan = () => ranChoice(['a lung','the heart']);
const ranGutBone = () => ranChoice(['a rib','the back']);
const lowBrainBleed = (organ=null) => (Math.random() < 0.25) ? ` and blood streams from the ${organ || ranOrifice()}` : '';
const highBrainBleed = (organ=null) => (Math.random() < 0.75) ? ` and blood streams from the ${organ || ranOrifice()}` : '';
const highMinBleed = () => (Math.random() < 0.75) ? minorBleedDesc : '';
const lowMinBleed = () => (Math.random() < 0.25) ? minorBleedDesc : '';
const highWeapStuck = () => (Math.random() < 0.75) ? weaponStuckDesc : '';
const lowWeapStuck = () => (Math.random() < 0.25) ? weaponStuckDesc : '';
const highMajBleed = () => (Math.random() < 0.75) ? majorBleedDesc : '';
const lowMajBleed = () => (Math.random() < 0.25) ? majorBleedDesc : '';
const highIntBleed = area => (Math.random() < 0.75) ? internalBleedDesc(area) : '';
const lowIntBleed = area => (Math.random() < 0.25) ? internalBleedDesc(area) : '';
const compFract = (chance, intBleed=false, area=null) => {
  if (Math.random() < (1 - chance)) return '';
  intBleed = intBleed && Math.random() < 0.5;
  return compoundFractureDesc + (intBleed ? lowIntBleed(area) : lowMinBleed());
};
const highCompFract = (intBleed=false, area=null) => compFract(0.75, intBleed, area);
const lowCompFract = (intBleed=false, area=null) => compFract(0.25, intBleed, area);
export const HIT_LOC_WEIGHT_INDEXES = {
  SWING: 0,
  THRUST: 1,
  SWING_HIGH: 2,
  THRUST_HIGH: 3,
  SWING_LOW: 4,
  THRUST_LOW: 5,
  WEIGHT_WORN: 6,
  WEIGHT_UNWORN: 7,
};
export const HIT_LOCATIONS = {
  foot: {
    weights: [2,2,0,0,6,6,10,4],
    bilateral: true,
    crit_chance_multi: 1,
    max_impale: 1,
    injury: {
      blunt: {
        light: {
          text: ` and crushes the ${ranToe()} toe`,
        },
        serious: {
          text: ' and breaks the ankle',
          dmgEffect: lowCompFract(),
        },
        critical: {
          text: ' and mangles the ankle tearing the ligaments',
          // dmgEffect: lowCompFract(),
        },
        gruesome: {
          text: ' and crushes the foot into red pulp',
          dmgEffect: highMinBleed(),
          removal: true,
        },
      },
      piercing: {
        light: {
          text: ' and cuts a nerve',
          dmgEffect: lowMinBleed(),
        },
        serious: {
          text: ' and tears the tendon behind the ankle',
          dmgEffect: lowMinBleed(),
        },
        critical: {
          text: ' and severs a bone',
          dmgEffect: lowWeapStuck() + lowMinBleed(),
        },
        gruesome: {
          text: ' and impales the ankle tearing a ligament',
          dmgEffect: highWeapStuck() + highMinBleed(),
        },
      },
      slashing: {
        light: {
          text: ' and severs the tendons on top of the foot',
          dmgEffect: highMinBleed(),
        },
        serious: {
          text: ' and severs the tendon behind the ankle',
          dmgEffect: highMinBleed(),
        },
        critical: {
          text: ' and cleaves through the bones of the foot',
          dmgEffect: highMinBleed(),
          removal: true,
        },
        gruesome: {
          text: ' and severs the foot at the ankle!',
          dmgEffect: highMinBleed() + lowMinBleed(),
          removal: true,
        },
      }
    },
  },
  shin: {
    weights: [6,4,0,0,12,8,20,10],
    crit_chance_multi: 2,
    bilateral: true,
    max_impale: 2,
    injury: {
      blunt: {
        light: {
          text: ` and cracks the ${ranShinBone()}`,
        },
        serious: {
          text: ` and snaps the ${ranShinBone()}`,
          dmgEffect: lowCompFract(),
        },
        critical: {
          text: ` and snaps the ${ranShinBone()}`,
          dmgEffect: highCompFract(),
        },
        gruesome: {
          text: ' and shatters the lower leg',
          dmgEffect: highCompFract(true, 'shin'),
        },
      },
      piercing: {
        light: {
          text: ' and tears the calf muscle',
          dmgEffect: lowMinBleed(),
        },
        serious: {
          text: ' and tears the tendon below the calf',
          dmgEffect: lowMinBleed(),
        },
        critical: {
          text: ' and cuts a nerve in the calf',
          dmgEffect: lowWeapStuck() + highMinBleed(),
        },
        gruesome: {
          text: ` and shatters the ${ranShinBone()}`,
          dmgEffect: highWeapStuck() + lowIntBleed('shin'),
        },
      },
      slashing: {
        light: {
          text: ' and gashes the calf muscle',
          dmgEffect: highMinBleed(),
        },
        serious: {
          text: ' and cuts a nerve in the calf',
          dmgEffect: highMinBleed(),
        },
        critical: {
          text: ` and severs the ${ranShinBone()}`,
          dmgEffect: highMinBleed(),
        },
        gruesome: {
          text: ' and severs the leg below the knee!',
          dmgEffect: lowMajBleed() || highMinBleed(),
          removal: true,
        },
      }
    },
  },
  knee: {
    weights: [8,4,0,0,14,8,8,4],
    bilateral: true,
    crit_chance_multi: 1,
    max_impale: 1,
    injury: {
      blunt: {
        light: {
          text: ' and cracks the kneecap',
        },
        serious: {
          text: ' and dislocates the knee',
        },
        critical: {
          text: ' and shatters the kneecap',
          dmgEffect: lowCompFract(true,'knee'),
        },
        gruesome: {
          text: ' and mangles the knee tearing the ligaments',
          // dmgEffect: highCompFract(true,'knee'),
        },
      },
      piercing: {
        light: {
          text: ' and chips the kneecap',
        },
        serious: {
          text: ' and tears the tendon below the knee',
          dmgEffect: lowMinBleed(),
        },
        critical: {
          text: ' and impales the knee tearing a ligament',
          dmgEffect: lowWeapStuck() + lowMajBleed(),
        },
        gruesome: {
          text: ' and shatters the kneecap',
          dmgEffect: highWeapStuck() + lowIntBleed('knee'),
        },
      },
      slashing: {
        light: {
          text: ' and gashes the knee',
          dmgEffect: lowMinBleed(),
        },
        serious: {
          text: ` and severs the tendon below the knee`,
          dmgEffect: lowMinBleed(),
        },
        critical: {
          text: ' and splits the knee tearing a ligament',
          dmgEffect: highMinBleed(),
        },
        gruesome: {
          text: ` and severs the leg at the knee!`,
          removal: true,
          dmgEffect: highMajBleed() || minorBleedDesc,
        },
      },
    },
  },
  thigh: {
    weights: [10,10,4,4,14,18,12,10],
    bilateral: true,
    crit_chance_multi: 1,
    max_impale: 3,
    injury: {
      blunt: {
        light: {
          text: ' and bruises the femur',
        },
        serious: {
          text: ' and cracks the femur',
        },
        critical: {
          text: ' and snaps the femur',
          // TODO injuries affect leg STR and max MV, arms DEX, torso CON, head/eyes INT, nose/neck CHA
          dmgEffect: lowCompFract(true,'thigh'), // Light Injury -3 (heals at max max HP), Serious -6 (heals at max max HP)
          // Critical/Gruesome -6 (-3 heals at max max HP, but -3 permanent), healing a removed part requires prosthesis
        },
        gruesome: {
          text: ' and shatters the femur',
          dmgEffect: highCompFract(true,'thigh'),
        },
      },
      piercing: {
        light: {
          text: ` and tears the ${ranThighMuscle()}`,
          dmgEffect: lowMinBleed(),
        },
        serious: {
          text: ' and tears the tendon below the hip',
          dmgEffect: lowMinBleed(),
        },
        critical: {
          text: ` and cuts a nerve in the ${ranThighMuscle()}`,
          dmgEffect: lowWeapStuck() + highMajBleed(),
        },
        gruesome: {
          text: ' and pierces the femur',
          dmgEffect: highWeapStuck() + lowIntBleed('thigh'),
        },
      },
      slashing: {
        light: {
          text: ` and gashes the ${ranThighMuscle()}`,
          dmgEffect: highMinBleed(),
        },
        serious: {
          text: ` and cuts a nerve in the ${ranThighMuscle()}`,
          dmgEffect: highMinBleed(),
        },
        critical: {
          text: ' and severs the hamstring tendons',
          dmgEffect: highMinBleed(),
        },
        gruesome: {
          text: ' and cleaves the thigh to the bone',
          dmgEffect: lowMajBleed() || highMinBleed(),
        },
      }
    },
  },
  hip: {
    weights: [6,4,2,0,10,6,4,8],
    bilateral: true,
    crit_chance_multi: 1,
    crit_dmg_multi: 2,
    max_impale: 2,
    injury: {
      blunt: {
        light: {
          text: ' and cracks the femur',
        },
        serious: {
          text: ' and dislocates the hip',
        },
        critical: {
          text: ' and breaks the hip',
          dmgEffect: lowCompFract(true,'hip'),
        },
        gruesome: {
          text: ' and shatters the hip',
          dmgEffect: highCompFract(true,'hip'),
        },
      },
      piercing: {
        light: {
          text: ' and pierces the buttock',
          dmgEffect: lowMinBleed(),
        },
        serious: {
          text: ' and cuts a nerve in the buttock',
          dmgEffect: lowMinBleed(),
        },
        critical: {
          text: ' and penetrates the pelvis and tears a ligament',
          dmgEffect: lowWeapStuck() + highMajBleed(),
        },
        gruesome: {
          text: ' and pierces the hip bone',
          dmgEffect: highWeapStuck() + lowIntBleed('hip'),
        },
      },
      slashing: {
        light: {
          text: ' and gashes the buttock',
          dmgEffect: highMinBleed(),
        },
        serious: {
          text: ' and severs the tendon below the hip',
          dmgEffect: highMinBleed(),
        },
        critical: {
          text: ' and cleaves into the pelvis and severs a ligament',
          dmgEffect: lowMajBleed() || highMinBleed(),
        },
        gruesome: {
          text: ' and severs the leg at the hip!',
          removal: true,
          dmgEffect: highMajBleed(),
        },
      },
    },
  },
  groin: {
    weights: [2,8,0,3,3,12,3,4],
    crit_chance_multi: 3,
    crit_dmg_multi: 2,
    max_impale: 2,
    injury: {
      blunt: {
        light: {
          text: ' and bruises the genitals',
        },
        serious: {
          text: ' and crushes the genitals',
        },
        critical: {
          text: ' and fractures the pubic bone',
          dmgEffect: lowCompFract(true,'groin'),
        },
        gruesome: {
          text: ' and shatters the pelvis',
          dmgEffect: highCompFract(true,'groin'),
        },
      },
      piercing: {
        light: {
          text: ' and gouges the genitals',
          dmgEffect: lowMinBleed(),
        },
        serious: {
          text: ' and tears a tendon in the inner thigh',
          dmgEffect: lowMinBleed(),
        },
        critical: {
          text: ' and penetrates the pelvis and tears a ligament',
          dmgEffect: lowWeapStuck() + highMajBleed(),
        },
        gruesome: {
          text: ' and pierces the pubic bone',
          dmgEffect: highWeapStuck() + lowIntBleed('groin'),
        },
      },
      slashing: {
        light: {
          text: ' and gashes the genitals',
          dmgEffect: highMinBleed(),
        },
        serious: {
          text: ' and splits the inner thigh severing a tendon',
          dmgEffect: lowMajBleed() || highMinBleed(),
        },
        critical: {
          text: ' and severs the genitals!',
          dmgEffect: highMinBleed(),
          removal: true,
        },
        gruesome: {
          text: ' and cleaves through the genitals and into the inner thigh',
          dmgEffect: lowMajBleed() || highMinBleed(),
          removal: true,
        },
      },
    },
  },
  gut: {
    weights: [8,16,4,9,12,16,8,12],
    crit_chance_multi: 2,
    crit_dmg_multi: 2,
    max_impale: 3,
    injury: {
      blunt: {
        light: {
          text: ` and bruises ${ranOrgan()}`,
          dmgEffect: lowIntBleed('gut'),
        },
        serious: {
          text: ` and breaks ${ranGutBone()}`,
          dmgEffect: lowIntBleed('gut'),
        },
        critical: {
          text: ` and crushes the ribs into ${ranOrgan()}`,
          dmgEffect: highIntBleed('gut'),
        },
        gruesome: {
          text: ' and breaks the back severing the spine!',// TODO paralysis desc
        },
      },
      piercing: {
        light: {
          text: ' and gouges the abdomen',
          dmgEffect: lowMinBleed(),
        },
        serious: {
          text: ` and penetrates the abdomen and gouges the bowels`,
          dmgEffect: lowMinBleed() || lowIntBleed('gut'),
        },
        critical: {
          text: ` and penetrates the abdomen and pierces ${ranOrgan()}`,
          dmgEffect: lowWeapStuck() + highIntBleed('gut'),
        },
        gruesome: {
          text: ` and impales them through the abdomen and through ${ranOrgan()} and through the back`,
          fatal: true,
          dmgEffect: highWeapStuck() + highIntBleed('gut'),
        },
      },
      slashing: {
        light: {
          text: ' and gashes the abdominal muscle',
          dmgEffect: highMinBleed(),
        },
        serious: {
          text: ' and tears through the abdominal muscle gashing the bowels',
          dmgEffect: highMinBleed() || lowIntBleed('gut'),
        },
        critical: {
          text: ` and cleaves into the abdomen and eviscerates ${ranOrgan()}`,
          fatal: true,
          dmgEffect: lowIntBleed('gut') || highMinBleed(),
        },
        gruesome: {
          text: ' and cleaves the body in two at the waist!',
          fatal: true,
          removal: true,
          dmgEffect: highMajBleed(),
        },
      },
    },
  },
  chest: {
    weights: [4,12,6,16,2,5,5,8],
    crit_chance_multi: 1,
    crit_dmg_multi: 3,
    max_impale: 3,
    injury: {
      blunt: {
        light: {
          text: ` and cracks ${ranChestBone()}`,
        },
        serious: {
          text: ` and breaks ${ranChestBone()}`,
          dmgEffect: lowIntBleed('chest'),
        },
        critical: {
          text: ' and snaps the collarbone',
          dmgEffect: lowCompFract(true,'chest'),
        },
        gruesome: {
          text: ` and caves the sternum into the heart!`,
          fatal: true,
          dmgEffect: highIntBleed('chest'),
        },
      },
      piercing: {
        light: {
          text: ` and chips ${ranChestBone()}`,
        },
        serious: {
          text: ' and punctures a lung',
          dmgEffect: highIntBleed('chest'),
        },
        critical: {
          text: ' and pierces the heart',
          dmgEffect: highIntBleed('chest'),
          fatal: true,
        },
        gruesome: {
          text: ` and impales them through the chest and through ${ranChestOrgan()} and through the back!`,
          fatal: true,
          dmgEffect: highWeapStuck() + highIntBleed('chest'),
        },
      },
      slashing: {
        light: {
          text: ' and gashes the chest muscle',
          dmgEffect: highMinBleed(),
        },
        serious: {
          text: ' and severs the collarbone',
          dmgEffect: lowMajBleed(),
        },
        critical: {
          text: ' and cleaves through the ribs and gashes a lung',
          dmgEffect: lowMajBleed(),
        },
        gruesome: {
          text: ' and cleaves through the torso from chest to navel!',
          fatal: true,
          dmgEffect: highMajBleed(),
        },
      },
    },
  },
  hand: {
    weights: [6,4,6,4,4,2,6,4],
    bilateral: true,
    crit_chance_multi: 1,
    max_impale: 1,
    injury: {
      blunt: {
        light: {
          text: ` and crushes the ${ranFinger()}`,
        },
        serious: {
          text: ' and breaks the wrist',
          dmgEffect: lowCompFract(),
        },
        critical: {
          text: ' and shatters the wrist',
          dmgEffect: lowCompFract(true,'wrist'),
        },
        gruesome: {
          text: ' and crushes the hand into red pulp!',
          dmgEffect: highMinBleed(),
        },
      },
      piercing: {
        light: {
          text: ' and cuts a nerve',
          dmgEffect: lowMinBleed(),
        },
        serious: {
          text: ' and tears a tendon in the wrist',
          dmgEffect: lowMinBleed(),
        },
        critical: {
          text: ' and severs a bone',
          dmgEffect: lowMinBleed(),
        },
        gruesome: {
          text: ' and impales the wrist tearing a ligament',
          dmgEffect: lowWeapStuck() + highMinBleed(),
        },
      },
      slashing: {
        light: {
          text: ' and severs the tendons on the back of the hand',
          dmgEffect: highMinBleed(),
        },
        serious: {
          text: ' and splits the wrist tearing a ligament',
          dmgEffect: highMinBleed(),
        },
        critical: {
          text: ` and severs the ${ranFinger()}`,
          dmgEffect: highMinBleed(),
        },
        gruesome: {
          text: ' and severs the hand at the wrist!',
          dmgEffect: highMinBleed(),
          removal: true,
        },
      }
    },
  },
  forearm: {
    weights: [8,4,8,4,6,2,6,4],
    bilateral: true,
    max_impale: 1,
    injury: {
      blunt: {
        light: {
          text: ` and snaps the ${ranForearmBone()}`,
        },
        serious: {
          text: ` and snaps the ${ranForearmBone()}`,
          dmgEffect: lowCompFract(),
        },
        critical: {
          text: ` and snaps the ${ranForearmBone()}`,
          dmgEffect: highCompFract(),
        },
        gruesome: {
          text: ' and shatters the forearm',
          dmgEffect: highCompFract(true,'forearm'),
        },
      },
      piercing: {
        light: {
          text: ' and tears the forearm muscle',
          dmgEffect: lowMinBleed(),
        },
        serious: {
          text: ' and cuts a nerve in the forearm muscle',
          dmgEffect: lowMinBleed(),
        },
        critical: {
          text: ' and tears a tendon below the elbow',
          dmgEffect: lowWeapStuck() + highMinBleed(),
        },
        gruesome: {
          text: ` and shatters the ${ranForearmBone()}`,
          dmgEffect: highWeapStuck() + lowIntBleed('forearm'),
        },
      },
      slashing: {
        light: {
          text: ' and gashes the forearm muscle',
          dmgEffect: highMinBleed(),
        },
        serious: {
          text: ' and cuts a nerve in the forearm muscle',
          dmgEffect: highMinBleed(),
        },
        critical: {
          text: ` and severs the ${ranForearmBone()}`,
          dmgEffect: highMinBleed(),
        },
        gruesome: {
          text: ' and severs the arm below the elbow!',
          dmgEffect: highMajBleed(),
          removal: true,
        },
      }
    },
  },
  elbow: {
    weights: [8,4,10,6,2,2,4,2],
    crit_chance_multi: 2,
    max_impale: 1,
    bilateral: true,
    injury: {
      blunt: {
        light: {
          text: ' and dislocates the elbow',
        },
        serious: {
          text: ' and breaks the elbow',
          dmgEffect: lowCompFract(),
        },
        critical: {
          text: ' and shatters the elbow',
          dmgEffect: lowCompFract(true,'elbow'),
        },
        gruesome: {
          text: ' and mangles the elbow tearing the ligaments!',
          // dmgEffect: highCompFract(true,'elbow'),
        },
      },
      piercing: {
        light: {
          text: ` and chips the ulnar bone`,
        },
        serious: {
          text: ' and tears the biceps tendon',
          dmgEffect: lowMinBleed(),
        },
        critical: {
          text: ' and impales the elbow tearing a ligament',
          dmgEffect: lowWeapStuck() + lowMajBleed(),
        },
        gruesome: {
          text: ' and pierces the humerus',
          dmgEffect: highWeapStuck() + lowIntBleed('elbow'),
        },
      },
      slashing: {
        light: {
          text: ' and gashes the elbow',
          dmgEffect: lowMinBleed(),
        },
        serious: {
          text: ` and severs the biceps tendon`,
          dmgEffect: lowMinBleed(),
        },
        critical: {
          text: ' and splits the elbow tearing a ligament',
          dmgEffect: highMinBleed(),
        },
        gruesome: {
          text: ` and severs the arm at the elbow!`,
          removal: true,
          dmgEffect: highMajBleed(),
        },
      },
    },
  },
  "upper arm": {
    weights: [6,4,10,8,2,2,6,6],
    crit_chance_multi: 1,
    max_impale: 1,
    bilateral: true,
    injury: {
      blunt: {
        light: {
          text: ' and cracks the humerus',
        },
        serious: {
          text: ' and snaps the humerus',
          dmgEffect: lowCompFract(),
        },
        critical: {
          text: ' and snaps the humerus',
          dmgEffect: lowCompFract(true,'upper arm'),
        },
        gruesome: {
          text: ' and shatters the humerus!',
          dmgEffect: highCompFract(true,'upper arm'),
        },
      },
      piercing: {
        light: {
          text: ` and pierces the ${ranArmMuscle()}`,
          dmgEffect: lowMinBleed(),
        },
        serious: {
          text: ` and cuts a nerve in the ${ranArmMuscle()}`,
          dmgEffect: lowMinBleed(),
        },
        critical: {
          text: ' and tears a tendon below the shoulder',
          dmgEffect: lowWeapStuck() + highMajBleed(),
        },
        gruesome: {
          text: ' and shatters the humerus!',
          dmgEffect: lowWeapStuck() + lowIntBleed('upper arm'),
        },
      },
      slashing: {
        light: {
          text: ` and gashes the ${ranArmMuscle()}`,
          dmgEffect: highMinBleed(),
        },
        serious: {
          text: ` and cuts a nerve in the ${ranArmMuscle()}`,
          dmgEffect: highMinBleed(),
        },
        critical: {
          text: ` and severs the ${ranArmMuscle()}`,
          dmgEffect: lowMajBleed() || highMinBleed(),
        },
        gruesome: {
          text: ' and severs the arm below the shoulder!',
          dmgEffect: highMajBleed(),
          removal: true,
        },
      }
    },
  },
  armpit: {
    weights: [2,6,4,12,2,4,4,4],
    crit_chance_multi: 2,
    crit_dmg_multi: 2,
    max_impale: 2,
    bilateral: true,
    injury: {
      blunt: {
        light: {
          text: ' and dislocates the shoulder',
        },
        serious: {
          text: ' and separates the shoulder',
        },
        critical: {
          text: ' and snaps the humerus',
          dmgEffect: lowCompFract(true,'armpit'),
        },
        gruesome: {
          text: ' and shatters the shoulder',
          dmgEffect: highCompFract(true,'armpit'),
        },
      },
      piercing: {
        light: {
          text: ' and tears the upper back muscle',
          dmgEffect: lowMinBleed(),
        },
        serious: {
          text: ' and tears a tendon below the shoulder',
          dmgEffect: highMinBleed(),
        },
        critical: {
          text: ' and cuts a nerve near the chest',
          dmgEffect: lowWeapStuck() + highMajBleed(),
        },
        gruesome: {
          text: ' and severs a rib',
          dmgEffect: highWeapStuck() + lowIntBleed('armpit'),
        },
      },
      slashing: {
        light: {
          text: ' and gashes the upper back muscle',
          dmgEffect: highMinBleed(),
        },
        serious: {
          text: ' and cuts a nerve near the chest',
          dmgEffect: highMinBleed(),
        },
        critical: {
          text: ' and severs a tendon below the shoulder',
          dmgEffect: lowMajBleed() || highMinBleed(),
        },
        gruesome: {
          text: ' and severs the arm at the shoulder!',
          dmgEffect: highMajBleed(),
          removal: true,
        },
      }
    },
  },
  shoulder: {
    weights: [8,6,12,12,2,2,6,6],
    crit_chance_multi: 1,
    crit_dmg_multi: 2,
    max_impale: 2,
    bilateral: true,
    injury: {
      blunt: {
        light: {
          text: ' and dislocates the shoulder',
        },
        serious: {
          text: ' and separates the shoulder',
        },
        critical: {
          text: ' and snaps the collarbone',
          dmgEffect: lowCompFract(true,'shoulder'),
        },
        gruesome: {
          text: ' and mangles the shoulder tearing the ligaments',
          // dmgEffect: highCompFract(true,'shoulder'),
        },
      },
      piercing: {
        light: {
          text: ' and tears the deltoid',
          dmgEffect: lowMinBleed(),
        },
        serious: {
          text: ' and tears the rotator cuff',
          dmgEffect: lowMinBleed(),
        },
        critical: {
          text: ' and impales the shoulder tearing a ligament',
          dmgEffect: lowWeapStuck() + highMajBleed(),
        },
        gruesome: {
          text: ' and impales them through the shoulder and through the upper back',
          dmgEffect: highWeapStuck() + lowIntBleed('shoulder'),
        },
      },
      slashing: {
        light: {
          text: ' and gashes the deltoid',
          dmgEffect: highMinBleed(),
        },
        serious: {
          text: ' and cuts a nerve in the deltoid',
          dmgEffect: highMinBleed(),
        },
        critical: {
          text: ' and severs the collarbone',
          dmgEffect: lowMajBleed() || highMinBleed(),
        },
        gruesome: {
          text: ' and severs the arm at the shoulder!',
          dmgEffect: highMajBleed(),
          removal: true,
        },
      },
    },
  },
  neck: {
    weights: [3,2,6,4,2,1,3,3],
    crit_chance_multi: 3,
    crit_dmg_multi: 2,
    max_impale: 1,
    injury: {
      blunt: {
        light: {
          text: ' and crushes the larynx',
        },
        serious: {
          text: ' and fractures a vertebra',
        },
        critical: {
          text: ' and snaps the neck severing the spine',
          dmgEffect: lowCompFract(true,'neck'),
        },
        gruesome: {
          text: ' and mangles the neck tearing the ligaments',
          // dmgEffect: highCompFract(true,'neck'),
          fatal: true,
        }
      },
      piercing: {
        light: {
          text: ' and pierces the larynx',
          dmgEffect: lowMinBleed(),
        },
        serious: {
          text: ' and cuts a nerve in the neck muscle',
          dmgEffect: lowMinBleed(),
        },
        critical: {
          text: ' and tears a ligament',
          dmgEffect: lowWeapStuck() || highMajBleed(),
        },
        gruesome: {
          text: ' and severs the spine',
          dmgEffect: highWeapStuck() + lowMajBleed(),
          fatal: true,
        }
      },
      slashing: {
        light: {
          text: ' and gashes the neck muscle',
          dmgEffect: highMinBleed(),
        },
        serious: {
          text: ' and cuts a nerve in a neck muscle',
          dmgEffect: lowMajBleed() || highMinBleed(),
        },
        critical: {
          text: ' and severs the neck muscle',
          dmgEffect: highMajBleed() || highMinBleed(),
        },
        gruesome: {
          text: ' and severs the head!',
          dmgEffect: highMajBleed(),
          fatal: true,
          removal: true,
        }
      },
    },
  },
  jaw: {
    weights: [3,2,6,3,2,1,2,2],
    crit_chance_multi: 2,
    max_impale: 1,
    injury: {
      blunt: {
        light: {
          text: ' and knocks out a tooth',
          dmgEffect: lowMinBleed(),
        },
        serious: {
          text: ' and breaks the jaw',
          dmgEffect: lowCompFract(),
        },
        critical: {
          text: ' and smashes the jaw into the brain',
          dmgEffect: lowCompFract(),
          fatal: true,
        },
        gruesome: {
          text: gruesBluntHeadDesc,
          fatal: true,
          removal: true,
        },
      },
      piercing: {
        light: {
          text: ' and gouges the cheek',
          dmgEffect: highMinBleed(),
        },
        serious: {
          text: ' and breaks the teeth',
          dmgEffect: lowMinBleed(),
        },
        critical: {
          text: ' and impales below the chin and pierces the brainstem',
          dmgEffect: lowWeapStuck() + highBrainBleed(),
          fatal: true,
        },
        gruesome: {
          text: ' and impales them below the chin and through the brainstem and through the back of the skull',
          fatal: true,
          dmgEffect: highWeapStuck() + lowBrainBleed(),
        },
      },
      slashing: {
        light: {
          text: ' and gashes the mouth',
          dmgEffect: highMinBleed(),
        },
        serious: {
          text: ' and splits the chin',
          dmgEffect: highMinBleed(),
        },
        critical: {
          text: ' and cleaves through the jaw and into the brain',
          dmgEffect: lowBrainBleed(),
          fatal: true,
        },
        gruesome: {
          text: gruesSlashHeadDesc,
          dmgEffect: lowMajBleed(),
          fatal: true,
          removal: true,
        },
      },
    },
  },
  nose: {
    weights: [1,2,2,3,1,0,2,1],
    crit_chance_multi: 3,
    crit_dmg_multi: 2,
    max_impale: 1,
    injury: {
      blunt: {
        light: {
          text: ' and breaks the nose',
          dmgEffect: lowMinBleed(),
        },
        serious: {
          text: ' and bruises the brain',
          dmgEffect: knockoutDesc,
        },
        critical: {
          text: ' and caves the nose into the brain',
          dmgEffect: lowCompFract(),
          fatal: true,
        },
        gruesome: {
          text: gruesBluntHeadDesc,
          fatal: true,
          removal: true,
        },
      },
      piercing: {
        light: {
          text: ' and gouges the nose',
          dmgEffect: lowMinBleed(),
        },
        serious: {
          text: ' and splits the nose',
          dmgEffect: lowMinBleed(),
        },
        critical: {
          text: ' and impales the nose and pierces the brain',
          dmgEffect: lowWeapStuck() + highBrainBleed('mouth'),
          fatal: true,
        },
        gruesome: {
          text: ' and impales them through the nose and through the brain and through the back of the skull',
          dmgEffect: highWeapStuck() + lowBrainBleed('mouth'),
          fatal: true,
        },
      },
      slashing: {
        light: {
          text: ' and gashes the nose',
          dmgEffect: highMinBleed(),
        },
        serious: {
          text: ' and severs the nose',
          dmgEffect: highMinBleed(),
        },
        critical: {
          text: ' and cleaves through the nose and into the brain',
          dmgEffect: lowBrainBleed('mouth'),
          fatal: true,
        },
        gruesome: {
          text: gruesSlashHeadDesc,
          dmgEffect: lowMajBleed(),
          fatal: true,
          removal: true,
        },
      },
    },
  },
  eye: {
    weights: [2,2,4,4,0,2,2,2],
    crit_chance_multi: 5,
    crit_dmg_multi: 2,
    max_impale: 1,
    bilateral: true,
    injury: {
      blunt: {
        light: {
          text: ' and cracks the eye socket',
          dmgEffect: knockoutDesc,
        },
        serious: {
          text: ' and shatters the eye socket',
          dmgEffect: knockoutDesc,
        },
        critical: {
          text: ' and smashes the brow into the brain',
          dmgEffect: lowCompFract(),
          fatal: true,
        },
        gruesome: {
          text: gruesBluntHeadDesc,
          fatal: true,
          removal: true,
        },
      },
      piercing: {
        light: {
          text: ' and gouges the brow',
          dmgEffect: highMinBleed(),
        },
        serious: {
          text: ' and gouges the eye from the socket',
          dmgEffect: lowMinBleed(),
        },
        critical: {
          text: ' and impales the eye and pierces the brain',
          dmgEffect: lowWeapStuck() + highBrainBleed(),
          fatal: true,
        },
        gruesome: {
          text: ' and impales them through the eye and through the brain and through the back of the skull',
          fatal: true,
          dmgEffect: highWeapStuck() + lowBrainBleed(),
        },
      },
      slashing: {
        light: {
          text: ' and gashes the brow',
          dmgEffect: highMinBleed(),
        },
        serious: {
          text: ' and eviscerates the eye',
          dmgEffect: highMinBleed(),
        },
        critical: {
          text: ' and cleaves through the brow and into the brain',
          dmgEffect: lowBrainBleed(),
          fatal: true,
        },
        gruesome: {
          text: gruesSlashHeadDesc,
          dmgEffect: lowMinBleed(),
          fatal: true,
          removal: true,
        },
      },
    },
  },
  skull: {
    weights: [7,4,16,8,4,3,9,6],
    crit_chance_multi: 2,
    crit_dmg_multi: 3,
    max_impale: 2,
    injury: {
      blunt: {
        light: {
          text: ' and bruises the brain',
          dmgEffect: knockoutDesc,
        },
        serious: {
          text: ' and cracks the skull',
          dmgEffect: knockoutDesc,
        },
        critical: {
          text: ' and smashes the skull into the brain',
          fatal: true,
        },
        gruesome: {
          text: gruesBluntHeadDesc,
          fatal: true,
          removal: true,
        },
      },
      piercing: {
        light: {
          text: ' and gouges the scalp',
          dmgEffect: highMinBleed(),
        },
        serious: {
          text: ' and cracks the skull',
          dmgEffect: lowMinBleed(),
        },
        critical: {
          text: ' and cracks the skull and pierces the brain',
          dmgEffect: lowWeapStuck() + highBrainBleed(),
          fatal: true,
        },
        gruesome: {
          text: ' and impales them through the ear and through the brain and through the back of the skull',
          fatal: true,
          dmgEffect: highWeapStuck() + lowBrainBleed('nose'),
        },
      },
      slashing: {
        light: {
          text: ' and gashes the scalp',
          dmgEffect: highMinBleed(),
        },
        serious: {
          text: ' and severs an ear',
          dmgEffect: highMinBleed(),
        },
        critical: {
          text: ' and cleaves through the skull and into the brain',
          dmgEffect: lowBrainBleed(),
          fatal: true,
        },
        gruesome: {
          text: gruesSlashHeadDesc,
          dmgEffect: lowMinBleed(),
          fatal: true,
          removal: true,
        },
      },
    },
  },
};
export const STANCE_MODS = { // TODO move this to combat file
  power: {
    ac_mod: -3,
    atk_mod: -2,
    dmg_mod: weap => Math.floor(weap.data.data.attributes.impact?.value / 2) || 0,
    str_dmg_mod: char => Math.floor(Math.max(0, char.data.data.str_mod) / 2) || 0,
    impact_mod: weap =>  Math.floor(weap.data.data.attributes.impact?.value / 2) || 0,
    speed_mod: weap => 0 - Math.ceil(weap.data.data.attributes.speed?.value / 2) || 0,
  },
  fluid: {
    atk_mod: 3,
    dmg_mod: weap => 0 - Math.ceil(weap.data.data.attributes.impact?.value / 2) || 0,
    str_dmg_mod: char => 0 - Math.ceil(Math.max(0, char.data.data.str_mod) / 2) || 0,
    impact_mod: weap => 0 - Math.ceil(weap.data.data.attributes.impact?.value / 2) || 0,
    speed_mod: weap => Math.floor(weap.data.data.attributes.speed?.value / 2) || 0,
    shield_dr_mod: 1,
    shield_ac_mod: 1,
    shield_atk_mod: -2,
  },
  counter: {
    ac_mod: -2,
  },
};
export const PREP_MODS = {
  feint: {
    atk_mod: weap => 0 - Math.ceil(weap.data.data.attributes.impact?.value / 2) || 0,
    speed_mod: weap => 0 - Math.ceil(weap.data.data.attributes.speed?.value / 2) || 0,
  },
};
export const WEAP_BREAK_CHANCE = 5;
export const SQUARE_SIZE = 5;
export const WEAPONS = { // TODO weapons?
  fist: {
    name: 'Fist',
    data:{
      data: {
        held_offhand: true,
        held_mainhand: true,
        atk_style: 'stable',
        atk_height: 'high',
        atk_init: 'immediate',
        atk_mode: 'swi(b)',
        attributes: {
          dmg: { value: '1d2/1d2' },
          atk_modes: { value: 'Swi (B)' },
          double_weapon: { value: true },
          reach: { value: '0'},
          size: { value: 'T'},
          speed: { value: 5},
          parry: { value: 0},
          impact: { value: 1},
          weap_prof: { value: 'hand-to-hand' },
        },
        quantity: 2
      }
    }
  }
}
export const ATK_HEIGHTS =['high','mid','low'];
export const AMMO_TYPES = [
  "bodkin arrow",
  "broadhead arrow",
  "bolt",
  "quarrel",
];
export const AIM_AREAS = {
  head: ['skull','left eye','right eye','nose','jaw','neck'],
  shoulders: ['left shoulder','left armpit','right shoulder','right armpit',],
  arms: ['left upper arm','left elbow','left forearm','left hand','right upper arm','right elbow','right forearm','right hand'],
  torso: ['chest','gut'],
  pelvis: ['left hip','groin','right hip'],
  legs: ['left thigh','left knee','left shin','left foot','right thigh','right knee','right shin','right foot'],
};
export const AIM_AREAS_UNILATERAL = {
  head: ['skull','eye','nose','jaw','neck'],
  shoulders: ['shoulder','armpit'],
  arms: ['upper arm','elbow','forearm','hand',],
  torso: ['chest','gut'],
  pelvis: ['hip','groin'],
  legs: ['thigh','knee','shin','foot'],
};
export const SHIELD_WEIGHT_MULTI = {
  worn: 1.2,
  large: 1.33,
};
// populate hit location arrays on startup
export const HIT_LOC_ARRS = {
  SWING: [],
  THRUST: [],
};
(() => {
  const fillLocArr = function (loc, weight, bi) {
    const arr = [];
    for (let i = 0; i < weight; i++) {
      const entry = bi ? i < weight / 2 ? `left ${loc}`: `right ${loc}` : loc;
      arr.push(entry);
    }
    return arr;
  };

  // add more hit location tables for high/low
  Object.keys(HIT_LOC_ARRS).forEach(a => ["HIGH","LOW"].forEach(l => Object.assign(HIT_LOC_ARRS, {[`${a}_${l}`]: []})));
  for (const [k, v] of Object.entries(HIT_LOCATIONS)) {
    Object.keys(HIT_LOC_ARRS).forEach(arr => {
      const i = HIT_LOC_WEIGHT_INDEXES[arr];
      HIT_LOC_ARRS[arr].push(...fillLocArr(k, v.weights[i], v.bilateral));
    });
  }
  // add more hit location tables for the aim areas
  Object.keys(HIT_LOC_ARRS).forEach(a => Object.keys(AIM_AREAS).forEach(l => {
    const key = `${a}_${l.toUpperCase()}`;
    const values = AIM_AREAS[l].map(loc => HIT_LOC_ARRS[a].filter(hitLoc => hitLoc === loc)).flat();
    Object.assign(HIT_LOC_ARRS, {[key]: values});
  }));

  console.log('Completed loading hit locations', HIT_LOC_ARRS);
})();
export const AIM_AREA_PENALTIES = Object.fromEntries(Object.entries(HIT_LOC_ARRS).map( ([k,v]) => {
  const getPenalty = chance => 0 - Math.min(8, Math.round(Math.log(100 / chance) / Math.log(1.8)));
  return [k, getPenalty(v.length)];
}));
export const SIZE_VALUES = {
  T: 0, // tiny
  S: 1, // small
  M: 2, // medium
  L: 3, // large
  H: 4, // huge
  G: 5, // gargantuan
  C: 6, // colossal
  default: 2,
};
export const HEIGHT_AREAS = {
  low: ['foot','shin','knee','thigh','hip','groin'],
  mid: ['gut','chest','hand','forearm','elbow','upper arm'],
  high: ['armpit','shoulder','neck','jaw','nose','eye','skull'],
};
export const WEAPON_CATEGORIES = [
  "axes",
  "bludgeons",
  "bows",
  "crossbows",
  "curved swords",
  "daggers",
  "hammers",
  "hand-to-hand",
  "large swords",
  "piercing swords",
  "polearms",
  "slings",
  "spears",
  "spiked bludgeons",
  "staves",
  "straight swords",
  "whips",
];
export const MONSTER_TYPES = [
  "beast",
  "celestial",
  "construct",
  "demon",
  "devil",
  "dragon",
  "elemental",
  "fey",
  "humanoid",
  "magical beast",
  "ooze",
  "plant",
  "undead",
];
export const ALIGNMENTS = [
  "CE", // chaotic evil
  "LE", // lawful evil
  "N", // neutral
  "CG", // chaotic good
  "LG", // lawful good
];
export const MERCHANT_SUBTYPES = {
  "apothecary": ["potion"],
  "magic": ["charged_item","scroll"],
  "armorer": ["armor","helmet","shield"],
  "clothier": ["clothing"],
  "jeweller": ["jewelry","gem"],
  "innkeeper": ["drink","food"],
  "general": ["item","container"],
  "trader": ["trade_good"],
  "weaponsmith": ["melee_weapon","throw_weapon"],
  "bowyer": ["missile_weapon","bow","ammo"],
};
export const FEATURE_TYPES = [
  "feature",
  "skill",
  "natural_weapon",
  "grapple_maneuver",
];
export const HUMANOID_TYPES = [
  "character",
  "humanoid",
  "undead",
];
export const NONCOMBATANT_TYPES = [
  "container",
  "merchant",
];
export const STATUS_EFFECTS = [
{id: "dead", label: "EFFECT.StatusDead", icon: "icons/svg/skull.svg"},
{id: "unconscious", label: "EFFECT.StatusUnconscious", icon: "icons/svg/unconscious.svg"},
{id: "sleep", label: "EFFECT.StatusAsleep", icon: "icons/svg/sleep.svg"},
{
  id: "stun",
  label: "EFFECT.StatusStunned",
  icon: "icons/svg/daze.svg",
  duration: {
    rounds: null,
    seconds: 600,
    startRound: null,
    startTime: null,
    startTurn: null,
    turns: null,
  },
  changes: [{
      key: "data.hp.max",
      mode: 2,
      value: "-9",
  }],
  flags: {
    core: { statusId: "stun" }
  }
},
{id: "prone", label: "EFFECT.StatusProne", icon: "icons/svg/falling.svg"},
{id: "restrain", label: "EFFECT.StatusRestrained", icon: "icons/svg/net.svg"},
{id: "paralysis", label: "EFFECT.StatusParalysis", icon: "icons/svg/paralysis.svg"},
{id: "fly", label: "EFFECT.StatusFlying", icon: "icons/svg/wing.svg"},
{id: "blind", label: "EFFECT.StatusBlind", icon: "icons/svg/blind.svg"},
{id: "deaf", label: "EFFECT.StatusDeaf", icon: "icons/svg/deaf.svg"},
{id: "silence", label: "EFFECT.StatusSilenced", icon: "icons/svg/silenced.svg"},
{id: "fear", label: "EFFECT.StatusFear", icon: "icons/svg/terror.svg"},
{id: "burning", label: "EFFECT.StatusBurning", icon: "icons/svg/fire.svg"},
{id: "frozen", label: "EFFECT.StatusFrozen", icon: "icons/svg/frozen.svg"},
{id: "shock", label: "EFFECT.StatusShocked", icon: "icons/svg/lightning.svg"},
{id: "corrode", label: "EFFECT.StatusCorrode", icon: "icons/svg/acid.svg"},
{id: "bleeding", label: "EFFECT.StatusBleeding", icon: "icons/svg/blood.svg"},
{id: "disease", label: "EFFECT.StatusDisease", icon: "icons/svg/biohazard.svg"},
{id: "poison", label: "EFFECT.StatusPoison", icon: "icons/svg/poison.svg"},
{id: "radiation", label: "EFFECT.StatusRadiation", icon: "icons/svg/radiation.svg"},
{id: "regen", label: "EFFECT.StatusRegen", icon: "icons/svg/regen.svg"},
{id: "degen", label: "EFFECT.StatusDegen", icon: "icons/svg/degen.svg"},
{id: "upgrade", label: "EFFECT.StatusUpgrade", icon: "icons/svg/upgrade.svg"},
{id: "downgrade", label: "EFFECT.StatusDowngrade", icon: "icons/svg/downgrade.svg"},
{id: "target", label: "EFFECT.StatusTarget", icon: "icons/svg/target.svg"},
{id: "eye", label: "EFFECT.StatusMarked", icon: "icons/svg/eye.svg"},
{id: "curse", label: "EFFECT.StatusCursed", icon: "icons/svg/sun.svg"},
{id: "bless", label: "EFFECT.StatusBlessed", icon: "icons/svg/angel.svg"},
{id: "fireShield", label: "EFFECT.StatusFireShield", icon: "icons/svg/fire-shield.svg"},
{id: "coldShield", label: "EFFECT.StatusIceShield", icon: "icons/svg/ice-shield.svg"},
{id: "magicShield", label: "EFFECT.StatusMagicShield", icon: "icons/svg/mage-shield.svg"},
{id: "holyShield", label: "EFFECT.StatusHolyShield", icon: "icons/svg/holy-shield.svg"},
];
export const NON_PHYSICAL_ITEM_TYPES = [
  "feature",
  "skill",
  "natural_weapon",
  "grapple_maneuver",
];
 export const SPELL_SCHOOLS = [
  "abjuration",
  "alteration",
  "conjuration",
  "divination",
  "enchantment",
  "evocation",
  "illusion",
  "necromancy"
 ];
export const HIDDEN_GROUPS = ["admin","dmg_mods","immunities"];
export const MAGIC_GROUPS = ["magic_dmg","magic_mods"];
export const GEM_BASE_VALUE = {
  "ornamental": 60, // e.g. agate, lapis lazuli, obsidian, turquoise, malachite
  "semi-precious": 1200, // e.g. peridot, topaz, garnet, pearl, amethyst
  "precious": 12000 // e.g. diamond, ruby, sapphire, emerald, opal
};
 export const GEM_DEFAULT_WEIGHT = 0.1;
 export const GEM_QUALITY_ADJ = {
  "AAA": 4,
  "AA": 2.8,
  "A": 2,
  "B": 1.4,
  "C": 1
 };
 export const GEM_WEIGHT_ADJ = ratio => Math.pow(ratio, 2);
