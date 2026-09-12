// Maps each investigation case title to a representative image.
const CASE_IMAGES = {
  "The Vanishing Diamond": "case-diamond.jpg",
  "The Silenced Solo": "case-violin.jpg",
  "The Silenced Bell": "case-bell.jpg",
  "The Forged Signature": "case-art.jpg",
  "The Empty Reliquary": "case-chapel.jpg",
  "The Vanished Specimen": "case-panda.jpg",
  "The Archive Whisper": "case-library.jpg",
  "The Melted Masterpiece": "case-ice.jpg",
  "The Conjurers Loss": "case-watch.jpg",
  "The Sabotaged Dish": "case-cooking.jpg"
};

function getCaseImage(title) {
  return CASE_IMAGES[title] || null;
}
