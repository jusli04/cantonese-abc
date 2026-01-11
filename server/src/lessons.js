// Simple lesson "database" for MVP.
// Later: replace with a real DB/CMS.

const lessons = [
  {
    id: "greeting-001",
    title: "Classic greeting",
    phrase: "你食咗飯未？",
    jyutping: "nei5 sik6 zo2 faan6 mei6?",
    english: "Have you eaten yet?",
    tips: [
      "This is a common Cantonese greeting (not always literal).",
      "Focus on tones: nei5 sik6 zo2 faan6 mei6"
    ]
  },
  {
    id: "courtesy-001",
    title: "Polite thanks",
    phrase: "唔該晒！",
    jyutping: "m4 goi1 saai3!",
    english: "Thank you so much!",
    tips: ["Used for thanking someone for a service or help."]
  }
];

function getTodayLesson() {
  // Deterministic “daily” lesson selection
  const dayIndex = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
  return lessons[dayIndex % lessons.length];
}

module.exports = { getTodayLesson };
