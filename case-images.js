// Maps each investigation case title to a representative image and its ideal crop position.
const CASE_IMAGES = {
  "The Vanishing Diamond": { url: "case-diamond2.jpg", position: "center 25%" },
  "The Silenced Solo": { url: "case-violin2.jpg", position: "center 75%" },
  "The Silenced Bell": { url: "case-bell.jpg", position: "center 75%" },
  "The Forged Signature": { url: "case-art.jpg", position: "center 75%" },
  "The Empty Reliquary": { url: "case-chapel.jpg", position: "center 75%" },
  "The Vanished Specimen": { url: "case-panda.jpg", position: "center 75%" },
  "The Archive Whisper": { url: "case-library.jpg", position: "center 75%" },
  "The Melted Masterpiece": { url: "case-ice.jpg", position: "center 75%" },
  "The Conjurers Loss": { url: "case-watch.jpg", position: "center 75%" },
  "The Sabotaged Dish": { url: "case-cooking.jpg", position: "center 75%" }
};

function getCaseImage(title) {
  const entry = CASE_IMAGES[title];
  return entry ? entry.url : null;
}

function getCaseImagePosition(title) {
  const entry = CASE_IMAGES[title];
  return entry && entry.position ? entry.position : "center 75%";
}
