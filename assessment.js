import { units } from "./data.js";
import { guides } from "./guides.js";
export function reviewIndices(n) {
  return (
    {
      24: [1, 2, 3, 4, 6, 7, 13, 17],
      25: [1, 3, 8, 9, 11, 21],
      26: [2, 6, 7, 10, 12, 13, 14, 15],
      27: [6, 13, 16, 17, 18, 19, 20],
      28: [4, 5, 9, 10, 22, 23],
      29: [5, 8, 11, 14, 18, 19, 20, 21, 23],
      30: Array.from({ length: 23 }, (_, i) => i + 1),
    }[n] || [1]
  );
}
export function foundationQuestions(n) {
  const u = units[n - 1];
  return [
    ...u
      .slice(8)
      .map((q, i) => ({
        q: q[0],
        options: q.slice(1),
        correct: q[1],
        source: n,
        explanation: u[5],
      })),
    ...guides[n - 1].vocab
      .slice(0, 2)
      .map(([a, t, en]) => ({
        type: "fill",
        q: `Translate into English: ${a} (${t}). Use the vocabulary card wording.`,
        correct: en.toLowerCase(),
        source: n,
        explanation: `${a} (${t}) means “${en}”. Recall it aloud, then use it in the lesson’s sentence pattern.`,
      })),
  ];
}
export function questions(n) {
  if (n <= 23) return foundationQuestions(n);
  return reviewIndices(n).flatMap((i) => {
    const q = foundationQuestions(i);
    return n === 24 ? [q[3]] : n === 30 ? [q[0], q[3]] : [q[(n + i) % 3], q[3]];
  });
}
