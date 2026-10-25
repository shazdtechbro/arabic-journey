export const KEY = "arabic-journey-v2";
export const zone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
export function dateKey(date = new Date(), timeZone = zone()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
export const ordinal = (k) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(k)) throw Error("Invalid date");
  const n = Date.parse(k + "T12:00:00Z");
  if (!Number.isFinite(n) || new Date(n).toISOString().slice(0, 10) !== k)
    throw Error("Invalid date");
  return Math.floor(n / 86400000);
};
export const blank = () => ({
  version: 2,
  name: "",
  started: false,
  completed: {},
  activity: {},
  attempts: [],
  joined: null,
  timeZone: zone(),
  reason: "",
  reminder: "",
  experience: "new",
  pages: {},
});
export function streaks(activity, now = dateKey()) {
  const days = Object.keys(activity)
      .filter((k) => activity[k] > 0)
      .map(ordinal)
      .sort((a, b) => a - b),
    today = ordinal(now);
  let longest = 0,
    run = 0,
    last = -Infinity;
  for (const d of days) {
    if (d > today) continue;
    run = d === last + 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
    last = d;
  }
  let current = 0,
    day = days.includes(today) ? today : today - 1;
  const set = new Set(days);
  while (set.has(day)) {
    current++;
    day--;
  }
  return { current, longest, total: days.filter((d) => d <= today).length };
}
export function scoreQuiz(qs, answers) {
  const correct = qs.filter((q, i) => answers[i] === q.correct).length;
  return {
    score: correct,
    total: qs.length,
    passed: correct >= Math.ceil(qs.length * 0.8),
  };
}
export const unlocked = (s, n) => Number.isInteger(n) && n >= 1 && n <= 30;
export function record(s, n, result, now = new Date()) {
  if (!unlocked(s, n)) throw Error("Invalid learning day");
  const date = dateKey(now, s.timeZone);
  const next = structuredClone(s);
  next.attempts.push({ day: n, ...result, at: now.toISOString() });
  if (result.passed && !next.completed[n]) {
    next.completed[n] = {
      score: result.score,
      total: result.total,
      at: now.toISOString(),
      date,
    };
    next.activity[date] = (next.activity[date] || 0) + 1;
  }
  return next;
}
export const eligible = (s) =>
  Array.from({ length: 30 }, (_, i) => i + 1).every(
    (n) =>
      s.completed[n] &&
      s.completed[n].score >= Math.ceil(s.completed[n].total * 0.8),
  );
export function validateBackup(obj) {
  if (
    obj?.version !== 2 ||
    !obj.data ||
    typeof obj.data.name !== "string" ||
    obj.data.name.length > 60 ||
    !obj.data.completed ||
    !obj.data.activity ||
    !Array.isArray(obj.data.attempts)
  )
    throw Error("Invalid backup");
  const s = obj.data;
  if (
    s.attempts.some(
      (a) =>
        !a ||
        !Number.isInteger(a.day) ||
        a.day < 1 ||
        a.day > 30 ||
        !Number.isInteger(a.score) ||
        !Number.isInteger(a.total) ||
        a.total < 1 ||
        a.score < 0 ||
        a.score > a.total ||
        typeof a.passed !== "boolean" ||
        a.passed !== a.score >= Math.ceil(a.total * 0.8) ||
        !Number.isFinite(Date.parse(a.at)),
    )
  )
    throw Error("Invalid attempt");
  dateKey(new Date(), s.timeZone);
  for (const [k, v] of Object.entries(s.activity)) {
    ordinal(k);
    if (!Number.isInteger(v) || v < 1 || v > 30)
      throw Error("Invalid activity");
  }
  for (const [k, v] of Object.entries(s.completed)) {
    if (
      !Number.isInteger(+k) ||
      +k < 1 ||
      +k > 30 ||
      !Number.isInteger(v.total) ||
      v.total < 1 ||
      !Number.isInteger(v.score) ||
      v.score > v.total ||
      v.score < Math.ceil(v.total * 0.8) ||
      !Number.isFinite(Date.parse(v.at))
    )
      throw Error("Invalid result");
    ordinal(v.date);
    if (!s.activity[v.date]) throw Error("Invalid sequence");
  }
  const expected = {};
  for (const v of Object.values(s.completed))
    expected[v.date] = (expected[v.date] || 0) + 1;
  if (
    JSON.stringify(Object.entries(expected).sort()) !==
    JSON.stringify(Object.entries(s.activity).sort())
  )
    throw Error("Activity does not match completions");
  const pages = s.pages || {};
  for (const [key, value] of Object.entries(pages)) {
    if (
      !Number.isInteger(+key) ||
      +key < 1 ||
      +key > 128 ||
      !value ||
      !Number.isFinite(Date.parse(value.at))
    )
      throw Error("Invalid page progress");
  }
  return {
    ...blank(),
    pages,
    name: s.name,
    started: !!s.started,
    completed: s.completed,
    activity: s.activity,
    attempts: s.attempts.slice(-2000),
    joined: s.joined,
    timeZone: s.timeZone,
    reason: String(s.reason || "").slice(0, 300),
    reminder: /^\d\d:\d\d$/.test(s.reminder) ? s.reminder : "",
    experience: ["new", "some"].includes(s.experience) ? s.experience : "new",
  };
}
export function loadProgress(storage) {
  try {
    const raw = storage.getItem(KEY);
    return raw ? validateBackup(JSON.parse(raw)) : blank();
  } catch {
    return blank();
  }
}
export function saveProgress(storage, s) {
  storage.setItem(KEY, JSON.stringify({ version: 2, data: s }));
}
