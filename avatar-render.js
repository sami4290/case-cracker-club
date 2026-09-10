// Shared avatar rendering engine for Case Cracker Club.
// Uses DiceBear's "Adventurer" illustrated avatar style (CC BY 4.0, by Lisa Wischofsky).
// https://www.dicebear.com/styles/adventurer/

const DICEBEAR_BASE = "https://api.dicebear.com/10.x/adventurer/svg";

const SKIN_COLORS = [
  { id: "f2d3b1", label: "Fair" },
  { id: "edb98a", label: "Light" },
  { id: "d08b5b", label: "Tan" },
  { id: "ae5d29", label: "Deep" },
  { id: "8d5524", label: "Deeper" },
  { id: "5c3a21", label: "Deepest" }
];

const HAIR_COLORS = [
  { id: "2c1b18", label: "Black" },
  { id: "4a312c", label: "Dark Brown" },
  { id: "724133", label: "Brown" },
  { id: "a55728", label: "Auburn" },
  { id: "b58143", label: "Blonde" },
  { id: "d6b370", label: "Light Blonde" }
];

const HAIR_STYLES = [
  "short01", "short05", "short10", "short15", "short19",
  "long02", "long08", "long15", "long22"
].map(id => ({ id, label: id }));

const EYE_STYLES = [
  "variant01", "variant04", "variant08", "variant12",
  "variant16", "variant20", "variant24", "variant26"
].map(id => ({ id, label: id }));

const EYEBROW_STYLES = [
  "variant01", "variant04", "variant07", "variant10", "variant13", "variant15"
].map(id => ({ id, label: id }));

const MOUTH_STYLES = [
  "variant01", "variant05", "variant10", "variant15",
  "variant20", "variant25", "variant28", "variant30"
].map(id => ({ id, label: id }));

const GLASSES_STYLES = [
  { id: "", label: "None" },
  { id: "variant01", label: "1" },
  { id: "variant02", label: "2" },
  { id: "variant03", label: "3" },
  { id: "variant04", label: "4" },
  { id: "variant05", label: "5" }
];

const EARRING_STYLES = [
  { id: "", label: "None" },
  { id: "variant01", label: "1" },
  { id: "variant02", label: "2" },
  { id: "variant03", label: "3" },
  { id: "variant04", label: "4" },
  { id: "variant05", label: "5" },
  { id: "variant06", label: "6" }
];

const DETAIL_STYLES = [
  { id: "", label: "None" },
  { id: "blush", label: "Blush" },
  { id: "freckles", label: "Freckles" },
  { id: "birthmark", label: "Birthmark" },
  { id: "mustache", label: "Mustache" }
];

const DEFAULT_AVATAR_CONFIG = {
  skinColor: "edb98a",
  hair: "short01",
  hairColor: "2c1b18",
  eyes: "variant01",
  eyebrows: "variant01",
  mouth: "variant01",
  glasses: "",
  earrings: "",
  details: ""
};

function buildAvatarUrl(rawConfig, size) {
  const c = Object.assign({}, DEFAULT_AVATAR_CONFIG, rawConfig || {});
  const params = new URLSearchParams();
  params.set("seed", "detective");
  params.set("size", String(size));
  params.set("skinColor", c.skinColor);
  params.set("hair", c.hair);
  params.set("hairColor", c.hairColor);
  params.set("eyes", c.eyes);
  params.set("eyebrows", c.eyebrows);
  params.set("mouth", c.mouth);

  if (c.glasses) {
    params.set("glasses", c.glasses);
    params.set("glassesProbability", "100");
  } else {
    params.set("glassesProbability", "0");
  }

  if (c.earrings) {
    params.set("earrings", c.earrings);
    params.set("earringsProbability", "100");
  } else {
    params.set("earringsProbability", "0");
  }

  if (c.details) {
    params.set("details", c.details);
    params.set("detailsProbability", "100");
  } else {
    params.set("detailsProbability", "0");
  }

  return DICEBEAR_BASE + "?" + params.toString();
}

function parseAvatarConfig(raw) {
  if (!raw) return null;
  let parsed = raw;
  if (typeof raw === "string") {
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }
  // Only treat as a valid "new" config if it has the DiceBear-shaped fields.
  if (parsed && typeof parsed === "object" && "hair" in parsed && "skinColor" in parsed) {
    return parsed;
  }
  return null;
}

// Renders a child's avatar as an <img> tag: uses the DiceBear config if present,
// otherwise falls back to the legacy emoji (for profiles created before this system existed).
function renderChildAvatar(child, size) {
  const config = parseAvatarConfig(child.avatar_config);
  if (config) {
    const url = buildAvatarUrl(config, size);
    return `<img src="${url}" width="${size}" height="${size}" alt="${(child.codename || "detective").replace(/"/g, "")}" style="display:block; width:${size}px; height:${size}px; border-radius:50%;">`;
  }
  const fontSize = Math.round(size * 0.55);
  return `<div style="font-size:${fontSize}px; line-height:1; display:flex; align-items:center; justify-content:center; width:${size}px; height:${size}px;">${child.avatar_emoji || "🕵️"}</div>`;
}
