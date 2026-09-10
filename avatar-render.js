// Shared avatar rendering engine for Case Cracker Club
// Builds a layered SVG character from a config object.

const SKIN_TONES = [
  { id: "s1", label: "Fair", hex: "#F4C9A8" },
  { id: "s2", label: "Light Tan", hex: "#E0AC7E" },
  { id: "s3", label: "Tan", hex: "#C68642" },
  { id: "s4", label: "Deep", hex: "#8D5524" },
  { id: "s5", label: "Deepest", hex: "#5C3A21" }
];

const HAIR_COLORS = [
  { id: "h1", label: "Black", hex: "#2B1B12" },
  { id: "h2", label: "Brown", hex: "#6B4226" },
  { id: "h3", label: "Blonde", hex: "#C89B3C" },
  { id: "h4", label: "Auburn", hex: "#A63D40" },
  { id: "h5", label: "Silver", hex: "#8A8A8A" }
];

const OUTFIT_COLORS = [
  { id: "o1", label: "Teal", hex: "#2F5D50" },
  { id: "o2", label: "Red", hex: "#A63D40" },
  { id: "o3", label: "Brass", hex: "#C89B3C" },
  { id: "o4", label: "Navy", hex: "#16233D" },
  { id: "o5", label: "Brown", hex: "#6B4226" }
];

const HAIR_STYLE_IDS = [
  { id: "bald", label: "Bald" },
  { id: "short", label: "Short" },
  { id: "curly", label: "Curly" },
  { id: "spiky", label: "Spiky" },
  { id: "ponytail", label: "Ponytail" },
  { id: "long", label: "Long" }
];

const EYE_STYLE_IDS = [
  { id: "round", label: "Round" },
  { id: "sleepy", label: "Sleepy" },
  { id: "wink", label: "Wink" },
  { id: "glasses", label: "Glasses" },
  { id: "star", label: "Star" }
];

const NOSE_STYLE_IDS = [
  { id: "dot", label: "Dot" },
  { id: "button", label: "Button" },
  { id: "triangle", label: "Triangle" },
  { id: "none", label: "None" }
];

const EAR_STYLE_IDS = [
  { id: "round", label: "Round" },
  { id: "small", label: "Small" },
  { id: "hidden", label: "Hidden" }
];

const OUTFIT_STYLE_IDS = [
  { id: "plain", label: "Plain Shirt" },
  { id: "hoodie", label: "Hoodie" },
  { id: "dungarees", label: "Dungarees" },
  { id: "coat", label: "Detective Coat" },
  { id: "cape", label: "Cape" }
];

const DEFAULT_AVATAR_CONFIG = {
  body: "s2",
  hairStyle: "short",
  hairColor: "h1",
  eyes: "round",
  nose: "dot",
  ears: "round",
  outfit: "plain",
  outfitColor: "o1"
};

const HAIR_RENDER = {
  bald: () => "",
  short: (c) => `<path d="M28,32 Q50,8 72,32 Q68,18 50,16 Q32,18 28,32 Z" fill="${c}"/>`,
  curly: (c) => `
    <circle cx="31" cy="30" r="6" fill="${c}"/>
    <circle cx="41" cy="17" r="7" fill="${c}"/>
    <circle cx="54" cy="16" r="7" fill="${c}"/>
    <circle cx="66" cy="22" r="6.5" fill="${c}"/>
    <circle cx="71" cy="32" r="5" fill="${c}"/>
  `,
  spiky: (c) => `<path d="M27,33 L33,14 L38,30 L44,10 L50,28 L56,10 L62,30 L67,14 L73,33 Q50,20 27,33 Z" fill="${c}"/>`,
  ponytail: (c) => `
    <path d="M28,32 Q50,8 72,32 Q68,18 50,16 Q32,18 28,32 Z" fill="${c}"/>
    <path d="M71,28 Q86,34 80,52 Q76,44 70,38 Z" fill="${c}"/>
  `,
  long: (c) => `
    <path d="M27,34 Q50,8 73,34 L76,64 Q70,58 68,64 L66,36 Q50,20 34,36 L32,64 Q30,58 24,64 Z" fill="${c}"/>
  `
};

const EYE_RENDER = {
  round: () => `<circle cx="42" cy="38" r="2.6" fill="#16233D"/><circle cx="58" cy="38" r="2.6" fill="#16233D"/>`,
  sleepy: () => `<path d="M38,38 Q42,41 46,38" stroke="#16233D" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M54,38 Q58,41 62,38" stroke="#16233D" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  wink: () => `<circle cx="42" cy="38" r="2.6" fill="#16233D"/><path d="M54,38 Q58,41 62,38" stroke="#16233D" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  glasses: () => `
    <circle cx="42" cy="38" r="6" fill="none" stroke="#16233D" stroke-width="2"/>
    <circle cx="58" cy="38" r="6" fill="none" stroke="#16233D" stroke-width="2"/>
    <line x1="48" y1="38" x2="52" y2="38" stroke="#16233D" stroke-width="2"/>
    <circle cx="42" cy="38" r="1.6" fill="#16233D"/>
    <circle cx="58" cy="38" r="1.6" fill="#16233D"/>
  `,
  star: () => `
    <path d="M42,34 L43.5,37.5 L47,38 L43.5,38.5 L42,42 L40.5,38.5 L37,38 L40.5,37.5 Z" fill="#C89B3C"/>
    <path d="M58,34 L59.5,37.5 L63,38 L59.5,38.5 L58,42 L56.5,38.5 L53,38 L56.5,37.5 Z" fill="#C89B3C"/>
  `
};

const NOSE_RENDER = {
  dot: () => `<circle cx="50" cy="44" r="1.8" fill="#16233D"/>`,
  button: () => `<ellipse cx="50" cy="44" rx="2.2" ry="1.6" fill="#16233D"/>`,
  triangle: () => `<path d="M48,42 L52,42 L50,46 Z" fill="#16233D"/>`,
  none: () => ""
};

const EAR_RENDER = {
  round: (skin) => `<ellipse cx="27" cy="40" rx="5" ry="8" fill="${skin}"/><ellipse cx="73" cy="40" rx="5" ry="8" fill="${skin}"/>`,
  small: (skin) => `<ellipse cx="29" cy="40" rx="3" ry="5" fill="${skin}"/><ellipse cx="71" cy="40" rx="3" ry="5" fill="${skin}"/>`,
  hidden: () => ""
};

const OUTFIT_RENDER = {
  plain: (c) => `<path d="M20,80 Q50,63 80,80 L80,100 L20,100 Z" fill="${c}"/>`,
  hoodie: (c) => `
    <path d="M18,82 Q50,58 82,82 L82,100 L18,100 Z" fill="${c}"/>
    <path d="M50,66 Q57,73 50,80" stroke="${c}" stroke-width="4" fill="none"/>
    <circle cx="42" cy="83" r="1.6" fill="#16233D"/>
    <circle cx="58" cy="83" r="1.6" fill="#16233D"/>
  `,
  dungarees: (c) => `
    <path d="M20,80 Q50,66 80,80 L80,100 L20,100 Z" fill="#8D8577"/>
    <rect x="36" y="70" width="6" height="16" fill="${c}"/>
    <rect x="58" y="70" width="6" height="16" fill="${c}"/>
    <rect x="40" y="82" width="20" height="14" fill="${c}"/>
  `,
  coat: (c) => `
    <path d="M18,82 Q50,60 82,82 L82,100 L18,100 Z" fill="${c}"/>
    <path d="M50,66 L44,100 M50,66 L56,100" stroke="#16233D" stroke-width="1.5" fill="none"/>
  `,
  cape: (c) => `
    <path d="M24,78 Q10,96 24,100 L30,80 Z" fill="${c}"/>
    <path d="M76,78 Q90,96 76,100 L70,80 Z" fill="${c}"/>
    <path d="M20,80 Q50,63 80,80 L80,100 L20,100 Z" fill="#16233D"/>
  `
};

function getHex(list, id, fallback) {
  const found = list.find(item => item.id === id);
  return found ? found.hex : fallback;
}

function buildAvatarSVG(rawConfig, size) {
  const config = Object.assign({}, DEFAULT_AVATAR_CONFIG, rawConfig || {});
  const skin = getHex(SKIN_TONES, config.body, SKIN_TONES[0].hex);
  const hairColor = getHex(HAIR_COLORS, config.hairColor, HAIR_COLORS[0].hex);
  const outfitColor = getHex(OUTFIT_COLORS, config.outfitColor, OUTFIT_COLORS[0].hex);

  const outfitFn = OUTFIT_RENDER[config.outfit] || OUTFIT_RENDER.plain;
  const earFn = EAR_RENDER[config.ears] || EAR_RENDER.round;
  const hairFn = HAIR_RENDER[config.hairStyle] || HAIR_RENDER.short;
  const eyeFn = EYE_RENDER[config.eyes] || EYE_RENDER.round;
  const noseFn = NOSE_RENDER[config.nose] || NOSE_RENDER.dot;

  return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    ${outfitFn(outfitColor)}
    ${earFn(skin)}
    <circle cx="50" cy="40" r="23" fill="${skin}"/>
    ${hairFn(hairColor)}
    ${eyeFn()}
    ${noseFn()}
  </svg>`;
}

function parseAvatarConfig(raw) {
  if (!raw) return null;
  if (typeof raw === "object") return raw;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

// Renders a child's avatar: uses the detailed config if present, otherwise falls back to the legacy emoji.
function renderChildAvatar(child, size) {
  const config = parseAvatarConfig(child.avatar_config);
  if (config) {
    return buildAvatarSVG(config, size);
  }
  const fontSize = Math.round(size * 0.55);
  return `<div style="font-size:${fontSize}px; line-height:1; display:flex; align-items:center; justify-content:center; width:${size}px; height:${size}px;">${child.avatar_emoji || "🕵️"}</div>`;
}
