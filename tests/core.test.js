import { describe, it, expect } from "vitest";
import {
  blank,
  dateKey,
  streaks,
  scoreQuiz,
  record,
  eligible,
  validateBackup,
  saveProgress,
  loadProgress,
} from "../core.js";
const pass = { score: 4, total: 5, passed: true };
describe("learning integrity", () => {
  it("scores at 80 percent", () => {
    const q = Array.from({ length: 5 }, () => ({ correct: "a" }));
    expect(scoreQuiz(q, ["a", "a", "a", "a", "b"]).passed).toBe(true);
    expect(scoreQuiz(q, ["a", "a", "a", "b", "b"]).passed).toBe(false);
  });
  it("counts only first successful completion, and distinct active dates", () => {
    let s = blank();
    s.timeZone = "UTC";
    s = record(s, 1, pass, new Date("2026-10-01T10:00Z"));
    s = record(s, 1, pass, new Date("2026-10-02T10:00Z"));
    s = record(s, 2, pass, new Date("2026-10-01T11:00Z"));
    expect(s.activity).toEqual({ "2026-10-01": 2 });
    expect(s.attempts).toHaveLength(3);
  });
  it("does not complete failed quizzes or skip days", () => {
    expect(
      record(blank(), 1, { score: 0, total: 5, passed: false }).completed,
    ).toEqual({});
    expect(() => record(blank(), 3, pass)).toThrow();
  });
  it("handles missed days, yesterday grace, and future dates", () => {
    const a = { "2026-10-01": 2, "2026-10-02": 1, "2026-10-04": 1 };
    expect(streaks(a, "2026-10-05")).toEqual({
      current: 1,
      longest: 2,
      total: 3,
    });
    expect(streaks(a, "2026-10-06").current).toBe(0);
    expect(streaks(a, "2026-10-02").longest).toBe(2);
  });
  it("handles DST, leap day, year boundaries and fixed timezone", () => {
    expect(dateKey(new Date("2026-03-08T07:30Z"), "America/New_York")).toBe(
      "2026-03-08",
    );
    expect(dateKey(new Date("2026-01-01T00:30Z"), "America/New_York")).toBe(
      "2025-12-31",
    );
    expect(
      streaks(
        { "2024-02-28": 1, "2024-02-29": 1, "2024-03-01": 1 },
        "2024-03-01",
      ).current,
    ).toBe(3);
    expect(
      streaks({ "2025-12-31": 1, "2026-01-01": 1 }, "2026-01-01").current,
    ).toBe(2);
  });
  it("round trips persistence and rejects corrupted imports", () => {
    const s = record(blank(), 1, pass);
    const m = new Map(),
      storage = { setItem: (k, v) => m.set(k, v), getItem: (k) => m.get(k) };
    saveProgress(storage, s);
    expect(loadProgress(storage)).toEqual(s);
    expect(() =>
      validateBackup({ version: 2, data: { ...s, activity: { bad: 1 } } }),
    ).toThrow();
    expect(() =>
      validateBackup({ version: 2, data: { ...s, activity: {} } }),
    ).toThrow();
  });
  it("requires all thirty passing days for graduation", () => {
    let s = blank();
    expect(eligible(s)).toBe(false);
    for (let n = 1; n <= 30; n++) s = record(s, n, pass);
    expect(eligible(s)).toBe(true);
  });
});
