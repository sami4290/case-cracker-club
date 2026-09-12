// Maps each investigation case title to a representative image.
const CASE_IMAGES = {
  "The Vanishing Diamond": "https://img.magnific.com/free-vector/illustration-realistic-graceful-necklace-with-precious-stones_1284-45571.jpg",
  "The Silenced Solo": "https://img.magnific.com/free-vector/violin_1308-83081.jpg",
  "The Silenced Bell": "https://img.magnific.com/free-vector/illustration-mediterranean-city-building-exterior-water-color-style_53876-6811.jpg",
  "The Forged Signature": "https://img.magnific.com/free-photo/canvas-easel-watercolour-paint-front-view_23-2148661011.jpg",
  "The Empty Reliquary": "https://img.magnific.com/free-photo/inside-view-church-with-religious-icons-walls-windows_181624-8869.jpg",
  "The Vanished Specimen": "https://img.magnific.com/free-photo/beautiful-endangered-red-panda-green-tree_475641-1326.jpg",
  "The Archive Whisper": "https://img.magnific.com/free-photo/diminishing-perspective-old-archive-shelves-glow-generated-by-ai_188544-16547.jpg",
  "The Melted Masterpiece": "https://img.magnific.com/free-vector/ice-sculptures-swan-queen-fantasy-characters-medieval-castle_107791-5453.jpg",
  "The Conjurers Loss": "https://img.magnific.com/free-photo/closeup-shot-vintage-pocket-watch-black-surface_181624-21863.jpg",
  "The Sabotaged Dish": "https://img.magnific.com/free-photo/front-view-professional-chefs-working-together_23-2151232215.jpg"
};

function getCaseImage(title) {
  return CASE_IMAGES[title] || null;
}
