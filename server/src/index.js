const express = require("express");
const cors = require("cors");
const { getTodayLesson } = require("./lessons");
const { isNonEmptyString, badRequest } = require("./validate");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ ok: true, status: "up" });
});

// Get today's lesson
app.get("/api/lesson/today", (req, res) => {
  const lesson = getTodayLesson();
  res.json({ ok: true, lesson });
});

// Submit an attempt (basic scoring now; upgrade to AI later)
app.post("/api/attempt", (req, res) => {
  const { lessonId, attemptText } = req.body ?? {};

  if (!isNonEmptyString(lessonId)) {
    return badRequest(res, "lessonId is required");
  }
  if (!isNonEmptyString(attemptText)) {
    return badRequest(res, "attemptText is required");
  }

  // MVP assumption: attempt is for today's lesson
  const expectedLesson = getTodayLesson();
  const expected = expectedLesson.phrase.trim();
  const attempt = attemptText.trim();

  const exactMatch = attempt === expected;
  const overlap = countCharOverlap(attempt, expected);
  const score = exactMatch
    ? 1.0
    : Math.min(0.85, overlap / Math.max(1, expected.length));

  const feedback = exactMatch
    ? "Nice — exact match."
    : "Good try. Follow the pinyin, then repeat. Focus on matching characters and rhythm.";

  res.json({
    ok: true,
    result: {
      lessonId,
      expected,
      attempt,
      score: Number(score.toFixed(2)),
      feedback
    }
  });
});

// Error handler (keeps responses consistent)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ ok: false, error: { message: "Internal server error" } });
});

function countCharOverlap(a, b) {
  const freq = new Map();
  for (const ch of b) freq.set(ch, (freq.get(ch) || 0) + 1);

  let overlap = 0;
  for (const ch of a) {
    const n = freq.get(ch) || 0;
    if (n > 0) {
      overlap += 1;
      freq.set(ch, n - 1);
    }
  }
  return overlap;
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
