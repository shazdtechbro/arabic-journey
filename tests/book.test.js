import { it, expect } from "vitest";
import {
  bookPages,
  pagesForLesson,
  pagePractice,
  markPage,
  bookProgress,
} from "../book.js";
import { blank, record, validateBackup } from "../core.js";
import { tablesForLesson } from "../teaching-tables.js";
it("maps every source PDF page once and all 23 chapters", () => {
  expect(bookPages).toHaveLength(128);
  expect(bookPages.map((p) => p.number)).toEqual(
    Array.from({ length: 128 }, (_, i) => i + 1),
  );
  expect(bookPages.filter((p) => p.kind === "study")).toHaveLength(119);
  for (let n = 1; n <= 23; n++) {
    expect(pagesForLesson(n).length).toBeGreaterThan(0);
    expect(tablesForLesson(n).length).toBeGreaterThan(0);
  }
  for (const p of bookPages) {
    expect(p.focus.length).toBeGreaterThan(40);
    expect(p.task.length).toBeGreaterThan(40);
    const q = pagePractice(p);
    if (q) {
      expect(new Set(q.options).size).toBe(q.options.length);
      expect(q.options).toContain(q.correct);
    }
  }
});
it("keeps page reading separate from assessed completion and streaks", () => {
  const s = markPage(blank(), 124, new Date("2026-10-25T12:00Z"));
  expect(s.activity).toEqual({});
  expect(s.completed).toEqual({});
  expect(bookProgress(s)).toEqual({ done: 1, total: 119 });
  expect(bookProgress(s, 23)).toEqual({ done: 1, total: 4 });
  expect(markPage(s, 124, new Date("2026-10-26T12:00Z")).pages[124].at).toBe(
    "2026-10-25T12:00:00.000Z",
  );
  expect(() => markPage(s, 129)).toThrow();
});
it("round trips non-sequential quizzes and page progress in existing version-2 backups", () => {
  const s = markPage(
    record(blank(), 23, { score: 4, total: 5, passed: true }),
    121,
  );
  expect(validateBackup({ version: 2, data: s })).toEqual(s);
  const legacy = { ...s };
  delete legacy.pages;
  expect(validateBackup({ version: 2, data: legacy }).pages).toEqual({});
  expect(() =>
    validateBackup({
      version: 2,
      data: { ...s, pages: { 129: { at: new Date().toISOString() } } },
    }),
  ).toThrow();
});
