import { questions, reviewIndices } from "./assessment.js";
import { guides } from "./guides.js";
import { units, reviewDays, sourceLinks } from "./data.js";
import {
  KEY,
  dateKey,
  blank,
  loadProgress,
  saveProgress,
  streaks,
  record,
  unlocked,
  eligible,
  validateBackup,
} from "./core.js";
const today = () => dateKey(new Date(), state.timeZone);
const safe = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const arab = (s) => `<span class="arabic" lang="ar">${safe(s)}</span>`;
const defaults = blank;
let state = loadProgress(localStorage),
  view = state.started ? "dashboard" : "home",
  activeDay = 1,
  answers = {},
  graded = false,
  installEvent = null,
  toastTimer;
const persist = () => {
  try {
    saveProgress(localStorage, state);
  } catch {
    notify("Storage is unavailable. Export a backup before leaving.");
  }
};
const completedCount = () => Object.keys(state.completed).length;
const activityDates = () => Object.keys(state.activity);
const streak = () => streaks(state.activity, today()).current;
function notify(message) {
  document.querySelector(".toast")?.remove();
  const el = document.createElement("div");
  el.className = "toast";
  el.role = "status";
  el.textContent = message;
  document.body.append(el);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.remove(), 3200);
}
function setView(v, day) {
  if (day && !unlocked(state, day)) {
    notify("Pass the previous day to unlock this lesson.");
    return;
  }
  view = v;
  history.pushState({}, "", `#${v}${day ? "/" + day : ""}`);
  if (day) {
    activeDay = day;
    wordOrder = [];
    answers = {};
    graded = false;
  }
  render();
  document.getElementById("main-content")?.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "instant" });
}
const icon = {
  home: "⌂",
  dashboard: "▦",
  learn: "▤",
  progress: "▥",
  about: "ⓘ",
  certificate: "✧",
};
const nav = [
  ["dashboard", "Overview"],
  ["learn", "Lessons"],
  ["progress", "My progress"],
  ["certificate", "Certificate"],
  ["about", "About & credits"],
];
function layout(body) {
  const active = view === "lesson" ? "learn" : view;
  return `<a class="skip" href="#main-content">Skip to content</a>${!navigator.onLine ? '<div class="status-offline" role="status">Offline · Your downloaded learning space is available.</div>' : ""}<div class="shell"><aside class="sidebar"><a class="brand" href="#" data-view="home"><span class="brandmark">ع</span> Arabic Journey</a><div class="navlabel">YOUR SPACE</div>${nav.map(([id, label]) => `<button class="navbtn ${active === id ? "active" : ""}" data-view="${id}"><span class="ico">${icon[id]}</span>${label}</button>`).join("")}<div class="sidefoot"><strong>بِسْمِ اللَّهِ</strong><p>Small steps, sincerely taken. May Allah put barakah in your learning.</p></div></aside><main class="main"><header class="topbar"><div class="crumb">Arabic Journey <span style="color:#c5cdc7">/</span> <b>${view === "lesson" ? `Day ${activeDay}` : view === "home" ? "Welcome" : nav.find((n) => n[0] === view)?.[1] || "Learn"}</b></div><div class="topactions"><span class="topstreak">♨ ${streak()} day streak</span><span class="avatar">${safe(
    (state.name || "AJ")
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase(),
  )}</span></div></header><div class="content" id="main-content" tabindex="-1">${body}<footer class="footer"><a href="#about" data-view="about">About, credits & privacy</a> · Sanni Shazily · © ${new Date().getFullYear()} Arabic Journey</footer></div></main></div><nav class="mobilebar" aria-label="Mobile navigation">${nav
    .filter((n) => n[0] !== "certificate")
    .map(
      ([id, label]) =>
        `<button data-view="${id}" class="${active === id ? "active" : ""}"><span class="ico">${icon[id]}</span>${label.split(" ")[0]}</button>`,
    )
    .join("")}</nav>`;
}
function home() {
  return `<div class="landing-grid"><section class="hero"><span class="eyebrow">ONE LESSON. EVERY DAY. A NEW BEGINNING.</span><h1>Your first 30 days<br/>of Arabic<br/><em>start here.</em></h1><p>Take your first 30 days of Arabic seriously. One lesson a day. Small steps. Real understanding.</p><div class="btnrow"><button class="btn btn-primary" data-action="start">Start learning →</button><button class="btn btn-outline" data-view="learn">See the journey</button></div><p class="muted">Free · No account · Your progress stays with you</p></section><div class="preview" aria-label="Illustrative dashboard preview"><span class="eyebrow">A LOOK INSIDE · EXAMPLE DASHBOARD</span><h2>One step closer.</h2><p class="muted">Day 5 · Whose book is it?</p><div class="phrase"><span class="arabic" lang="ar" dir="rtl">كِتَابُ الطَّالِبِ</span><p>The student’s book</p></div><div class="progressbar"><div style="width:13%"></div></div><p class="muted">4 of 30 learning days complete · Sample data</p><div class="mini-calendar">${Array.from({ length: 35 }, (_, i) => `<i class="heatcell ${[22, 23, 24, 25].includes(i) ? "level3" : ""}"></i>`).join("")}</div><p class="muted">Your effort, made visible. No streak for simply opening the app.</p></div></div><div class="sectionhead"><div><span class="eyebrow">A MONTH WITH DIRECTION</span><h2>Build understanding. Then make it yours.</h2><p>A structured companion to Madinah Arabic Book 1 by Dr. V. Abdur-Raheem.</p></div></div><div class="coursegrid">${[
    [
      "01–23",
      "Learn the foundations",
      "From your first nominal sentence to pronouns, ownership, numbers and diptotes.",
    ],
    [
      "24–29",
      "Return, recall, connect",
      "Six focused revision sessions bring vocabulary and grammar back together.",
    ],
    [
      "30",
      "Show what you understand",
      "A cumulative assessment, useful feedback, and a personal completion certificate.",
    ],
  ]
    .map(
      ([n, t, d]) =>
        `<div class="panel"><span class="eyebrow">DAYS ${n}</span><h3>${t}</h3><p class="muted">${d}</p></div>`,
    )
    .join(
      "",
    )}</div><div class="sectionhead"><div><h2>The rule should make sense.</h2><p>Understand why an answer works, rather than memorising the right option.</p></div></div><section class="panel"><div class="landing-grid"><div><span class="eyebrow">A REAL LESSON PATTERN</span><h3>Two words. One complete thought.</h3><p class="arabic" lang="ar" dir="rtl">هَذَا قَلَمٌ</p><p>This is a pen. Arabic needs no separate word for “is” in this present-tense nominal sentence.</p><details><summary>Why does it end in ـٌ?</summary><p>The noun is indefinite and nominative here. The doubled ḍammah is tanwīn: read it as “-un”.</p></details></div><div><span class="eyebrow">TRY A GUIDED QUESTION</span><h3>Which word points to something nearby?</h3><button class="btn btn-outline" data-demo="yes"><span class="arabic" lang="ar">هَذَا</span> · this</button> <button class="btn btn-outline" data-demo="no"><span class="arabic" lang="ar">ذَلِكَ</span> · that</button><p class="practice-result" id="demo-result" role="status"></p></div></div></section><div class="sectionhead"><div><h2>Small steps, sincerely taken.</h2></div></div><div class="coursegrid">${[
    [
      "Connect",
      "Every new idea has roots in something familiar. We revisit those roots.",
    ],
    [
      "Reason",
      "Ask what each word is doing, and what caused its grammatical ending.",
    ],
    [
      "Return",
      "A mistake is a useful clue. Review, explain the correction, and try again.",
    ],
  ]
    .map(
      ([t, d]) =>
        `<div class="panel"><h3>${t}</h3><p class="muted">${d}</p></div>`,
    )
    .join(
      "",
    )}</div><section class="panel founder"><span class="eyebrow">FROM ONE LEARNER TO ANOTHER</span><h2>23 lessons. 23 consecutive days.</h2><p>Understand the grammar. Revisit the difficult ideas. Keep going.</p><p>From October 1–23, 2026, Sanni Shazily, a Nigerian university student and software engineer, studied all 23 lessons of Madinah Arabic Book 1. His routine combined explanations, grammatical reasoning, examples, quizzes, and returning to earlier ideas.</p><p>Arabic Journey shares that approach with beginners, with the hope of becoming ongoing beneficial knowledge — ṣadaqah jāriyah — by Allah’s permission.</p><button class="textlink" data-view="about">Meet the journey & read the credits →</button></section><section class="faq"><div class="sectionhead"><h2>Before you begin</h2></div>${[
    [
      "Do I need to know the Arabic alphabet?",
      "The lessons assume you can recognise Arabic letters and vowel marks. If you cannot yet read the script, begin with an alphabet course and use our fully vowelled examples alongside a teacher or the linked author resources.",
    ],
    [
      "Is this the original textbook?",
      "This is an independent companion, not an official edition, translation, or endorsement. The original textbook is by Dr. V. Abdur-Raheem. Explanations and exercises here are newly authored.",
    ],
    [
      "Must I finish in exactly 30 calendar days?",
      "No. The curriculum contains 30 learning days. Study at your own pace; your streak separately records actual consecutive calendar dates. Multiple lessons in one day count as one active date.",
    ],
    [
      "Will it work offline?",
      "After a successful first load and service-worker installation, the lessons, quizzes and your saved progress are available offline. External source links need internet.",
    ],
    [
      "Can I move my progress to another phone?",
      "Yes. Export your progress from My progress and import the JSON backup on the other device. There are no accounts or automatic cross-device sync.",
    ],
  ]
    .map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`)
    .join(
      "",
    )}</section>${installBanner()}<section class="final-cta"><h2>Begin with one good day.</h2><button class="btn btn-primary" data-action="start">Start learning →</button></section>`;
}
function heatmap() {
  const dates = [];
  const d = new Date(today() + "T12:00:00");
  for (let i = 83; i >= 0; i--) {
    const x = new Date(d);
    x.setDate(d.getDate() - i);
    dates.push(
      `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`,
    );
  }
  return `<div class="heatmap" aria-label="Last 84 days of activity">${dates.map((date) => `<div title="${date}${state.activity[date] ? " · studied" : " · no activity"}" aria-label="${date}: ${state.activity[date] ? state.activity[date] + " learning day(s) completed" : "no activity"}" tabindex="0" class="heatcell ${state.activity[date] >= 3 ? "level3" : state.activity[date] === 2 ? "level2" : state.activity[date] ? "level1" : ""} ${date === today() ? "today" : ""}"></div>`).join("")}</div><div class="legend">Last 12 weeks <span style="flex:1"></span>Less <i class="heatcell"></i><i class="heatcell level1"></i><i class="heatcell level2"></i><i class="heatcell level3"></i> More</div>`;
}
function stats() {
  return `<div class="stats"><div class="stat"><span class="eyebrow">DAYS COMPLETED</span><div class="big">${completedCount()}<span style="color:#a1aea4;font-size:16px">/30</span></div><div class="desc">Your learning path</div></div><div class="stat"><span class="eyebrow">CURRENT STREAK</span><div class="big">${streak()} <span style="font-size:16px;color:#19884c">●</span></div><div class="desc">Consecutive study days</div></div><div class="stat"><span class="eyebrow">LONGEST STREAK</span><div class="big">${streaks(state.activity, today()).longest}</div><div class="desc">Longest streak · ${activityDates().length} active dates</div></div><div class="stat"><span class="eyebrow">COMPLETION</span><div class="big">${Math.round((completedCount() / 30) * 100)}%</div><div class="desc">Keep moving forward</div></div></div>`;
}
function nextDay() {
  return (
    Array.from({ length: 30 }, (_, i) => i + 1).find(
      (i) => !state.completed[i],
    ) || 30
  );
}
function dashboard() {
  const n = nextDay(),
    u = units[n - 1];
  return `<div class="sectionhead" style="margin-top:0"><div><span class="eyebrow">YOUR LEARNING HOME</span><h2 style="font-size:31px;margin-top:8px">As-salāmu ʿalaykum, ${safe(state.name?.split(" ")[0] || "learner")} 👋</h2><p>Every small step counts. ${Object.keys(state.completed).filter((n) => +n <= 23).length}/23 foundations · ${state.attempts.filter((a) => a.passed).length} quizzes passed.${state.reminder ? ` Your study time: ${safe(state.reminder)}.` : ""}</p></div></div>${stats()}<div class="sectionhead"><div><h2>Your 30-day path</h2><p>${completedCount()} days completed. Pick up where you left off.</p></div><button class="textlink" data-view="learn">View all days →</button></div><section class="hero" style="padding:28px 31px"><span class="eyebrow">${eligible(state) ? "JOURNEY COMPLETE" : "UP NEXT · DAY " + String(n).padStart(2, "0")}</span><h1 style="font-size:32px;letter-spacing:-1px;margin:12px 0">${eligible(state) ? "A foundation worth building on." : safe(u ? u[1] : reviewDays[n - 24]?.[0] || "Graduation")}</h1><p style="margin-bottom:16px">${safe(u ? u[4] : reviewDays[n - 24]?.[1] || "You made it!")}</p>${eligible(state) ? '<button class="btn btn-primary" data-view="certificate">Celebrate your graduation →</button>' : `<button class="btn btn-primary" data-day="${n}">${state.completed[n] ? "Review this day" : "Continue learning"} →</button>`}</section><div class="sectionhead"><div><h2>Consistency, visualised</h2><p>Your study days, one green square at a time.</p></div></div><div class="panel"><div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:14px">Your contribution calendar</b><span class="eyebrow">${activityDates().length} ACTIVE DAYS</span></div>${heatmap()}</div><div class="sectionhead"><div><h2>Small wins, remembered</h2><p>${state.reason ? `Your reason: ${safe(state.reason)}` : "Each completed lesson is another piece of your foundation."}</p></div></div><div class="coursegrid">${
    Object.keys(state.completed)
      .slice(-3)
      .map((n) => courseCard(+n))
      .join("") ||
    '<div class="panel"><h3>Your first milestone is one lesson away.</h3><p class="muted">Pass Day 1 to begin your activity history.</p></div>'
  }</div>${installBanner()}`;
}
function courseCard(n) {
  const u = units[n - 1],
    r = reviewDays[n - 24],
    done = !!state.completed[n];
  return `<button ${!unlocked(state, n) ? 'disabled aria-disabled="true"' : ""} class="coursecard ${done ? "done" : ""}" data-day="${n}"><span class="day">DAY ${String(n).padStart(2, "0")} ${n > 23 ? '<span class="reviewtag">REVIEW</span>' : ""}</span><h3>${safe(u ? u[1] : r[0])}</h3>${u ? `<div class="arabic" lang="ar">${safe(u[2])}</div>` : `<p class="muted">${safe(r[1])}</p>`}<div class="bottom"><span>${done ? "Completed" : !unlocked(state, n) ? "Locked · finish previous day" : n > 23 ? "Revision & practice" : "Learn & practise"}</span><span class="check">${done ? "✓" : "→"}</span></div></button>`;
}
function learn() {
  return `<div class="sectionhead" style="margin-top:0"><div><span class="eyebrow">THE CURRICULUM</span><h2 style="font-size:33px;margin-top:8px">30 days. A stronger foundation.</h2><p>Original companion explanations mapped to Madinah Arabic Book 1. Pass each day to unlock the next; completed lessons remain available for review.</p></div></div><div class="panel" style="margin-bottom:22px"><div style="display:flex;justify-content:space-between;margin-bottom:12px"><b style="font-size:12px">Overall progress</b><b style="font-size:12px;color:#197e4a">${completedCount()}/30</b></div><div class="progressbar"><div style="width:${(completedCount() / 30) * 100}%"></div></div></div><div class="sectionhead"><div><h2>Foundation · Days 01–23</h2><p>One concept at a time, with clear examples and a short quiz.</p></div></div><div class="coursegrid">${Array.from({ length: 23 }, (_, i) => courseCard(i + 1)).join("")}</div><div class="sectionhead"><div><h2>Consolidation · Days 24–30</h2><p>Revisit the rules until you can use them confidently.</p></div></div><div class="coursegrid">${Array.from({ length: 7 }, (_, i) => courseCard(i + 24)).join("")}</div>`;
}
function scaffolds(n) {
  const u = units[n - 1],
    g = guides[n - 1];
  return `<section class="panel"><span class="eyebrow">WHAT YOU WILL UNDERSTAND</span><p>${safe(g.objective)}</p><h3>Start with something familiar</h3><p>${safe(g.connection)}</p></section><section class="panel"><span class="eyebrow">UNDERSTAND THE GRAMMAR</span><h3>Each word has a job</h3><table class="grammar-table"><caption class="muted">A construction from today’s lesson</caption><thead><tr><th scope="col">Arabic</th><th scope="col">Its job</th></tr></thead><tbody>${g.breakdown.map(([a, en]) => `<tr><td class="arabic" lang="ar" dir="rtl">${safe(a)}</td><td>${safe(en)}</td></tr>`).join("")}</tbody></table><details><summary>One mistake to watch for</summary><p>${safe(g.mistake)}</p></details></section><section class="panel"><span class="eyebrow">YOUR WORDS FOR TODAY</span><h3>Recall first. Reveal second.</h3><div class="vocab-grid">${g.vocab.map(([a, t, en]) => `<details class="vocab-card"><summary><span class="arabic" lang="ar" dir="rtl">${safe(a)}</span><br/><small>${safe(t)}</small></summary><p>${safe(en)}</p></details>`).join("")}</div></section><section class="panel"><span class="eyebrow">GUIDED PRACTICE · NO SCORE</span><h3>Build the example</h3><p>Arrange the words to say: ${safe(u[3])}</p><div class="wordbank" dir="rtl">${u[2]
    .split(" ")
    .map((w, i) => ({ w, i }))
    .reverse()
    .map(
      ({ w, i }) =>
        `<button class="btn btn-outline arabic" lang="ar" data-word="${i}">${safe(w)}</button>`,
    )
    .join(
      "",
    )}</div><p id="word-answer" class="arabic" lang="ar" dir="rtl"></p><p id="word-feedback" role="status"></p><button class="btn btn-quiet" data-action="reset-words">Start again</button></section><section class="panel"><span class="eyebrow">TAKE THIS WITH YOU</span><h3>${safe(g.summary)}</h3><p>Before the assessment, cover the notes and explain the rule in your own words.</p><a href="https://www.lqtoronto.com/madinaarabic.html" target="_blank" rel="noopener noreferrer" class="textlink">Verify with the author’s English key · Lesson ${n}, PDF pp. ${g.pages} ↗</a></section>`;
}
function reviewScaffolds(n) {
  return `<section class="panel"><span class="eyebrow">YOUR REVISION ROUTINE</span><h3>Retrieve → explain → apply</h3><p>First recall the rule without notes. Then open each short recap, say an example aloud, and explain why its ending or agreement works.</p>${reviewIndices(
    n,
  )
    .map(
      (i) =>
        `<details><summary>Day ${i} · ${safe(units[i - 1][1])}</summary><p>${safe(guides[i - 1].summary)}</p><p class="arabic" lang="ar" dir="rtl">${safe(units[i - 1][2])}</p><p>${safe(units[i - 1][3])}</p><p>${safe(guides[i - 1].mistake)}</p></details>`,
    )
    .join("")}</section>`;
}
function lesson() {
  const n = activeDay,
    u = units[n - 1],
    r = reviewDays[n - 24],
    qs = questions(n),
    score = qs.filter((q, i) => answers[i] === q.correct).length,
    passed = score >= Math.ceil(qs.length * 0.8),
    done = !!state.completed[n];
  const topic = u ? u[1] : r[0];
  return `<button class="back" data-view="learn">← Back to all lessons</button><div class="lessonhead"><span class="eyebrow">DAY ${String(n).padStart(2, "0")} OF 30 · ${n <= 23 ? "FOUNDATION" : "REVIEW"}</span><h1>${safe(topic)}</h1><p>${safe(u ? u[4] : r[1])}</p></div><div class="lessonlayout"><div class="lessonbody">${u ? `<section class="panel"><span class="eyebrow">TODAY'S IDEA</span><div class="phrase">${arab(u[2])}<div class="meaning">${safe(u[3])}</div></div><h3>Let's make it simple</h3><p>${safe(u[5])}</p><div class="aha"><b style="color:#14713f;font-size:12px">✦ YOUR AHA MOMENT</b><p>${safe(u[6])}</p></div></section><section class="panel"><span class="eyebrow">SEE IT IN CONTEXT</span><h3>Three examples to remember</h3><div class="examples">${u[7].map(([a, b]) => `<div class="example">${arab(a)}<span>${safe(b)}</span></div>`).join("")}</div><p>Say each example aloud. Then cover the English and explain it yourself.</p></section>` : `<section class="panel"><span class="eyebrow">REVISION LAB</span><h3>Make yesterday's knowledge useful today.</h3><p>${safe(r[1])} The questions below draw from earlier days. Before selecting an answer, explain the grammar rule in your own words.</p><div class="aha"><b style="color:#14713f;font-size:12px">✦ LEARNING METHOD</b><p>Recall first, check second, and explain the correction. Repeating a quiz is useful when you understand why the answer works.</p></div></section>`}${u ? scaffolds(n) : reviewScaffolds(n)}<section class="panel" id="quiz"><span class="eyebrow">CHECK YOUR UNDERSTANDING</span><h3>${n === 30 ? "Final knowledge check" : "A short mastery quiz"}</h3><p>Answer every question. Your result comes with corrections, so you can learn from mistakes.</p>${qs
    .map((q, i) => {
      const order = (q.options || []).map(
        (_, j) =>
          q.options[(j + ((i + 1) % q.options.length)) % q.options.length],
      );
      return `<div class="quizitem"><h4><span style="color:#16834a">${String(i + 1).padStart(2, "0")}.</span> ${safe(q.q)} ${n > 23 ? `<small style="color:#a0aaa2">· From day ${q.source}</small>` : ""}</h4>${q.type === "fill" ? `<label class="formfield" for="answer-${i}">Your English answer</label><input class="textinput" id="answer-${i}" data-question="${i}" value="${safe(answers[i] || "")}" ${graded ? "disabled" : ""} autocomplete="off" spellcheck="false"/>` : ""}${order.map((opt) => `<label class="option ${graded ? (opt === q.correct ? "correct" : answers[i] === opt ? "wrong" : "") : ""}"><input type="radio" name="q${i}" value="${safe(opt)}" data-question="${i}" ${answers[i] === opt ? "checked" : ""} ${graded ? "disabled" : ""}/><span ${/[\u0600-\u06FF]/.test(opt) ? 'class="arabic" lang="ar"' : ""}>${safe(opt)}</span>${graded && opt === q.correct ? " ✓" : ""}</label>`).join("")}${graded ? `<div class="quizfeedback bad"><b>${answers[i] === q.correct ? "Correct — here is why:" : "Review this:"}</b> ${safe(q.explanation)}</div>` : ""}</div>`;
    })
    .join(
      "",
    )}${graded ? `<div class="quizfeedback" role="status"><b>${score} / ${qs.length} correct · ${Math.round((score / qs.length) * 100)}%</b><div>${passed ? "Mā shāʾ Allāh! You passed this day." : "Keep going. Review the explanations and try again."}</div>${done ? "<div>✓ This day is saved to your progress.</div>" : ""}</div><div class="btnrow"><button class="btn btn-outline" data-action="retry">Try again</button>${passed && n < 30 ? `<button class="btn btn-primary" data-day="${n + 1}">Go to day ${n + 1} →</button>` : passed && n === 30 ? `<button class="btn btn-primary" data-view="certificate">View certificate →</button>` : ""}</div>` : `<button class="btn btn-primary" data-action="grade" ${qs.some((_, i) => !answers[i]) ? "disabled" : ""}>Grade my answers →</button><p class="muted">Pass mark: ${Math.ceil(qs.length * 0.8)} out of ${qs.length}. Unlimited attempts.</p>`}</section></div><aside class="sticky"><div class="panel"><span class="eyebrow">YOUR DAILY ROUTINE</span><h3 style="font-size:17px">Make it stick</h3><p class="muted">1. Read the explanation.</p><p class="muted">2. Say the examples aloud.</p><p class="muted">3. Explain the rule in your own words.</p><p class="muted">4. Take the quiz.</p><div class="progressbar" style="margin:18px 0"><div style="width:${done ? "100" : graded ? Math.round((score / qs.length) * 100) : 0}%"></div></div><p class="muted">${done ? "✓ Completed" : graded ? "Try until you understand" : "Ready when you are"}</p></div><div class="callout" style="margin-top:14px"><span class="eyebrow">ORIGINAL MATERIALS</span><h3>Learn with the author</h3><p>These notes are an independent study companion. The original course is by Dr. V. Abdur-Raheem.</p><a class="textlink" href="${sourceLinks[0].url}" target="_blank" rel="noopener noreferrer">Open the source lessons ↗</a></div></aside></div>`;
}
function progress() {
  return `<div class="sectionhead" style="margin-top:0"><div><span class="eyebrow">YOUR JOURNEY IN NUMBERS</span><h2 style="font-size:32px;margin-top:8px">Your progress</h2><p>Consistency is built by showing up, even when the lesson is difficult.</p></div></div>${stats()}<div class="sectionhead"><div><h2>Daily activity</h2><p>Each green square is a calendar day on which you completed a quiz.</p></div></div><div class="panel">${heatmap()}</div><div class="sectionhead"><div><h2>Milestones</h2></div></div><div class="panel">${[
    [1, "The first step"],
    [7, "One week of lessons"],
    [14, "Halfway through the foundations"],
    [23, "23 foundational lessons"],
    [30, "30-day curriculum completed"],
  ]
    .map(
      ([n, t]) =>
        `<div class="milestone" style="border-bottom:1px solid #eef1ee;padding:13px 0"><div class="num">${state.completed[n] ? "✓" : "○"}</div><div><b>${t}</b><p class="muted" style="margin:4px 0">${state.completed[n] ? "Achieved" : "Keep studying to unlock"}</p></div></div>`,
    )
    .join(
      "",
    )}</div><div class="sectionhead"><div><h2>Your settings</h2><p>Stored on this device. Export a backup to move your progress. Study timezone: ${safe(state.timeZone)} (fixed when travelling).</p></div></div><div class="panel"><label class="formfield" for="profile-name">Your display name</label><input class="textinput" id="profile-name" maxlength="60" value="${safe(state.name)}" placeholder="Your name"/><div class="btnrow" style="margin-top:14px"><button class="btn btn-primary" data-action="save-name">Save name</button><button class="btn btn-outline" data-action="export">Export progress</button><label class="btn btn-outline" style="cursor:pointer">Import progress<input type="file" accept="application/json" id="import-file" hidden/></label><button class="btn btn-quiet" data-action="reset">Reset progress</button></div><p class="muted">Progress is local to this browser. Clearing browser storage or changing devices can remove it unless you export a backup.</p></div>`;
}
function certificate() {
  if (!eligible(state))
    return `<div class="sectionhead" style="margin-top:0"><div><span class="eyebrow">YOUR NEXT MILESTONE</span><h2 style="font-size:32px">Your certificate is waiting.</h2><p>Complete all 30 learning days to unlock it.</p></div></div><div class="callout"><div class="milestone"><div class="num">${completedCount()}/30</div><div><h3>Keep showing up</h3><p>You've made progress. Your completion certificate will be available when every learning day is passed. This is a self-paced curriculum; active calendar dates are counted separately.</p><button class="btn btn-primary" data-day="${nextDay()}">Continue learning →</button></div></div></div>`;
  return `<div class="no-print" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;gap:12px"><div><span class="eyebrow">ACHIEVEMENT UNLOCKED</span><h2 style="margin:6px 0">Your graduation certificate</h2></div><div class="btnrow"><button class="btn btn-primary" data-action="print">Print / Save PDF</button><button class="btn btn-outline" data-action="png">Download PNG</button><button class="btn btn-outline" data-action="share">Share achievement</button></div></div><section class="cert"><span class="eyebrow">ARABIC JOURNEY · CERTIFICATE OF COMPLETION</span><div class="arabic">الْحَمْدُ لِلَّهِ</div><h1>A foundation worth building on.</h1><p class="muted">This recognises the dedication and consistent effort of</p><div class="certname">${safe(state.name || "Arabic Learner")}</div><p>for completing <b>23 foundational lessons and 7 days of revision</b><br/>in the Arabic Journey independent learning companion.</p><p>Final assessment: <b>${state.completed[30].score}/${state.completed[30].total} (${Math.round((state.completed[30].score / state.completed[30].total) * 100)}%)</b> · Longest streak: ${streaks(state.activity, today()).longest} days.</p><div class="certstat"><div><b>30/30</b><span>DAYS COMPLETE</span></div><div><b>100%</b><span>COURSE PROGRESS</span></div><div><b>${activityDates().length}</b><span>ACTIVE DATES</span></div></div><p class="arabic" style="font-size:25px">رَبِّ زِدْنِي عِلْمًا</p><p class="muted">“My Lord, increase me in knowledge.” · Qur'an 20:114</p><p class="muted">Completed ${new Date(state.completed[30].at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })} · Self-paced completion, not an accredited qualification.</p></section>`;
}
function about() {
  return `<div class="sectionhead" style="margin-top:0"><div><span class="eyebrow">WHY THIS EXISTS</span><h2 style="font-size:32px;margin-top:8px">Arabic begins with one day.</h2><p>Created by Sanni Shazily, with the hope of ongoing beneficial knowledge, by Allah’s permission.</p></div></div><div class="panel"><h3>A personal learning method, shared</h3><p class="muted" style="font-size:14px">Arabic Journey was founded by Sanni Shazily, a Nigerian university student and software engineer. From October 1–23, 2026, he studied all 23 lessons of Madinah Book 1 on consecutive calendar days. This platform shares his method: simple explanations, linking new rules to old ones, spotting the “aha” moment, and testing understanding immediately. The final seven days help consolidate what you've learned. The lessons and quizzes here are newly written companion content, not copies of the source textbook.</p><h3 style="margin-top:26px">Credit where it's due</h3><p class="muted" style="font-size:14px">The foundational learning journey was inspired by <b>Durūs al-Lughah al-ʿArabiyyah li-Ghayr al-Nāṭiqīna Bihā</b> (Lessons in Arabic Language for Non-Native Speakers), by <b>Dr. V. Abdur-Raheem</b>. This is an independent, unofficial companion; it is not endorsed by the author or publisher. The original work, translations, keys and recordings belong to their respective rights holders.</p>${sourceLinks.map((x) => `<a class="resource" href="${x.url}" target="_blank" rel="noopener noreferrer">${safe(x.label)} ↗</a>`).join("")}<h3 style="margin-top:26px">What this app does and doesn't do</h3><p class="muted" style="font-size:14px">Your learning progress is stored on your device using browser storage. It works offline after the first successful load on a secure host. It does not collect personal accounts or send your answers to a server. Lessons are introductory and cannot replace listening practice or correction from a qualified Arabic teacher. Quiz completion reflects practice, not certification of fluency.</p><h3 style="margin-top:26px">A duʿāʾ for every learner</h3><p class="arabic" style="font-size:29px;color:#167947">اللَّهُمَّ انْفَعْنَا بِمَا عَلَّمْتَنَا وَعَلِّمْنَا مَا يَنْفَعُنَا وَزِدْنَا عِلْمًا</p><p class="muted">O Allah, benefit us through what You have taught us, teach us what benefits us, and increase us in knowledge.</p></div>${installBanner()}`;
}
function installBanner() {
  return `<div class="install-banner no-print"><div><b style="font-size:13px">📱 Keep Arabic Journey on your home screen</b><p>Install the app for one-tap access and offline learning after your first visit.</p></div><button class="btn btn-outline" data-action="install">How to install ↗</button></div>`;
}
function render() {
  document.title = `${view === "lesson" ? `Day ${activeDay}` : view[0].toUpperCase() + view.slice(1)} · Arabic Journey`;
  document.getElementById("app").innerHTML = layout(
    {
      home,
      dashboard,
      learn,
      lesson,
      progress,
      certificate,
      about,
      onboarding,
    }[view]?.() || home(),
  );
}
function complete(n, score, total) {
  state = record(state, n, { score, total, passed: true });
  persist();
}
function onboarding() {
  return `<section class="panel onboard"><span class="eyebrow">A SMALL BEGINNING</span><h1>Make this journey yours.</h1><p>No account. No pressure. Your progress stays on this device.</p><form id="onboarding"><label for="learner-name">What should we call you?</label><input class="textinput" id="learner-name" name="name" maxlength="60" required autocomplete="given-name"/><label for="reason">Why Arabic? <small>Optional</small></label><textarea class="textinput" id="reason" name="reason" maxlength="300" placeholder="Something to return to on the difficult days."></textarea><label for="experience">Have you studied Arabic before?</label><select class="textinput" id="experience" name="experience"><option value="new">This is my first beginning</option><option value="some">I have studied a little</option></select><label for="reminder">Daily study time <small>Optional</small></label><input class="textinput" type="time" id="reminder" name="reminder"/><p class="muted">A personal routine cue on your dashboard. Browser notifications are not enabled. Streak dates use your study timezone: ${safe(state.timeZone)}. This stays fixed when you travel.</p><button class="btn btn-primary" type="submit">Start learning →</button></form></section>`;
}
function start() {
  setView(state.started ? "dashboard" : "onboarding");
}
function grade() {
  if (!state.started) {
    notify("Choose your display name before saving a learning day.");
    start();
    return;
  }
  const qs = questions(activeDay);
  if (qs.some((_, i) => !answers[i]))
    return notify("Answer every question before grading.");
  graded = true;
  const score = qs.filter((q, i) => answers[i] === q.correct).length;
  if (score < Math.ceil(qs.length * 0.8)) {
    state = record(state, activeDay, {
      score,
      total: qs.length,
      passed: false,
    });
    persist();
  }
  if (score >= Math.ceil(qs.length * 0.8)) {
    complete(activeDay, score, qs.length);
    notify("Mā shāʾ Allāh! Day completed and saved.");
  }
  render();
  document
    .getElementById("quiz")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}
function exportData() {
  const blob = new Blob(
    [
      JSON.stringify(
        { version: 2, exportedAt: new Date().toISOString(), data: state },
        null,
        2,
      ),
    ],
    { type: "application/json" },
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "arabic-journey-progress.json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
function importData(file) {
  if (!file || file.size > 200000)
    return notify("Please choose a small Arabic Journey backup file.");
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const obj = JSON.parse(reader.result);
      const restored = validateBackup(obj);
      if (!confirm("Replace your current progress with this backup?")) return;
      state = restored;
      persist();
      setView("progress");
      notify("Your progress has been restored.");
    } catch {
      notify("This is not a valid Arabic Journey backup.");
    }
  };
  reader.readAsText(file);
}
document.addEventListener("click", async (e) => {
  const v = e.target.closest("[data-view]");
  if (v) {
    e.preventDefault();
    setView(v.dataset.view);
    return;
  }
  const day = e.target.closest("[data-day]");
  if (day) {
    setView("lesson", Number(day.dataset.day));
    return;
  }
  const a = e.target.closest("[data-action]");
  if (!a) return;
  switch (a.dataset.action) {
    case "start":
      start();
      break;
    case "grade":
      grade();
      break;
    case "retry":
      answers = {};
      graded = false;
      render();
      document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
      break;
    case "save-name":
      state.name =
        document.getElementById("profile-name").value.trim().slice(0, 60) ||
        "Arabic Learner";
      persist();
      render();
      notify("Name saved.");
      break;
    case "export":
      exportData();
      break;
    case "reset":
      if (
        confirm(
          "Permanently reset all local learning progress? Export a backup first if needed.",
        )
      ) {
        state = defaults();
        persist();
        setView("home");
        notify("Local progress reset.");
      }
      break;
    case "print":
      window.print();
      break;
    case "png":
      downloadCertificate();
      break;
    case "share":
      shareCertificate();
      break;
    case "install":
      if (installEvent) {
        installEvent.prompt();
        await installEvent.userChoice;
        installEvent = null;
      } else {
        alert(
          "On iPhone: open in Safari, tap Share, then Add to Home Screen.\n\nOn Android: open in Chrome, tap the menu (⋮), then Install app or Add to Home screen.\n\nOn desktop Chrome/Edge: use the install icon in the address bar if available.",
        );
      }
      break;
  }
});
document.addEventListener("change", (e) => {
  if (e.target.matches("input[type=radio][data-question]")) {
    answers[Number(e.target.dataset.question)] = e.target.value;
    const btn = document.querySelector('[data-action="grade"]');
    if (btn) btn.disabled = questions(activeDay).some((_, i) => !answers[i]);
  }
  if (e.target.id === "import-file") importData(e.target.files?.[0]);
});
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  installEvent = e;
});
if ("serviceWorker" in navigator && location.protocol !== "file:")
  window.addEventListener("load", () =>
    navigator.serviceWorker
      .register("./sw.js")
      .then((reg) => {
        reg.addEventListener("updatefound", () => {
          const worker = reg.installing;
          worker?.addEventListener("statechange", () => {
            if (
              worker.state === "installed" &&
              navigator.serviceWorker.controller
            )
              notify("An update is ready. Close and reopen the app to use it.");
          });
        });
      })
      .catch(() =>
        notify(
          "Offline setup did not finish. Keep this page online and reload to retry.",
        ),
      ),
  );
render();

document.addEventListener("submit", (e) => {
  if (e.target.id !== "onboarding") return;
  e.preventDefault();
  const f = new FormData(e.target);
  state.name = String(f.get("name")).trim();
  if (!state.name) return;
  state.reason = String(f.get("reason"));
  state.reminder = String(f.get("reminder"));
  state.experience = String(f.get("experience"));
  state.started = true;
  state.joined = today();
  persist();
  setView("dashboard");
});
window.addEventListener("offline", () =>
  notify(
    "You are offline. Downloaded lessons and your progress are available.",
  ),
);
window.addEventListener("online", () => notify("You are back online."));
async function downloadCertificate() {
  if (!eligible(state)) return;
  await document.fonts.ready;
  const canvas = document.createElement("canvas");
  canvas.width = 1800;
  canvas.height = 1280;
  const c = canvas.getContext("2d");
  c.fillStyle = "#fff";
  c.fillRect(0, 0, 1800, 1280);
  c.textAlign = "center";
  const line = (text, y, size = 36, color = "#202522") => {
    c.fillStyle = color;
    c.font = `${size}px "DM Sans", sans-serif`;
    c.fillText(text, 900, y, 1600);
  };
  line("ARABIC JOURNEY", 130, 26, "#167947");
  line("CERTIFICATE OF COMPLETION", 195, 22, "#666");
  line("A foundation worth building on.", 340, 62);
  line(state.name || "Arabic Learner", 475, 70);
  line("23 foundational lessons · 7 revision days", 580, 35);
  line(
    "30 learning days completed · " +
      activityDates().length +
      " active calendar " +
      (activityDates().length === 1 ? "date" : "dates"),
    650,
    30,
  );
  line(
    "Final assessment: " +
      state.completed[30].score +
      "/" +
      state.completed[30].total,
    720,
    30,
  );
  line("Completed " + state.completed[30].date, 790, 28);
  c.font = '52px "Noto Naskh Arabic", serif';
  c.fillStyle = "#167947";
  c.fillText("رَبِّ زِدْنِي عِلْمًا", 900, 930);
  line("My Lord, increase me in knowledge. — Qur’an 20:114", 1010, 26);
  line(
    "Independent self-paced companion · Not an accredited qualification",
    1150,
    23,
    "#666",
  );
  const a = document.createElement("a");
  a.download = "arabic-journey-certificate.png";
  a.href = canvas.toDataURL("image/png");
  a.click();
}
async function shareCertificate() {
  if (!eligible(state)) return;
  const text = `I completed the Arabic Journey 30-day curriculum: 23 foundational lessons and 7 revision days. ${activityDates().length} active study dates. Your first 30 days of Arabic start here.`;
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Arabic Journey",
        text,
        url: location.href.split("#")[0],
      });
    } catch {}
  } else {
    await navigator.clipboard.writeText(
      text + " " + location.href.split("#")[0],
    );
    notify(
      "Achievement copied. Share it on WhatsApp, X or LinkedIn. Download the PNG for Instagram.",
    );
  }
}

document.addEventListener("click", (e) => {
  const d = e.target.closest("[data-demo]");
  if (d)
    document.getElementById("demo-result").textContent =
      d.dataset.demo === "yes"
        ? "Correct. هَذَا points to a nearby masculine thing."
        : "Try again. ذَلِكَ points to something farther away; هَذَا is nearby.";
});

let wordOrder = [];
document.addEventListener("input", (e) => {
  if (e.target.matches("input:not([type=radio])[data-question]")) {
    answers[Number(e.target.dataset.question)] = e.target.value
      .trim()
      .toLowerCase();
    const b = document.querySelector('[data-action="grade"]');
    if (b) b.disabled = questions(activeDay).some((_, i) => !answers[i]);
  }
});
document.addEventListener("click", (e) => {
  const w = e.target.closest("[data-word]");
  if (w) {
    wordOrder.push(+w.dataset.word);
    w.disabled = true;
    document.getElementById("word-answer").textContent = wordOrder
      .map((i) => units[activeDay - 1][2].split(" ")[i])
      .join(" ");
    if (document.querySelectorAll("[data-word]:not(:disabled)").length === 0) {
      const good = wordOrder.every((v, i) => v === i);
      document.getElementById("word-feedback").textContent = good
        ? "Correct. " + guides[activeDay - 1].summary
        : "Compare with the example above. " + guides[activeDay - 1].summary;
    }
  }
  if (e.target.closest('[data-action="reset-words"]')) {
    wordOrder = [];
    document
      .querySelectorAll("[data-word]")
      .forEach((w) => (w.disabled = false));
    document.getElementById("word-answer").textContent = "";
    document.getElementById("word-feedback").textContent = "";
  }
});
window.addEventListener("popstate", () => {
  const [v, d] = location.hash.slice(1).split("/");
  if (
    [
      "home",
      "dashboard",
      "learn",
      "progress",
      "certificate",
      "about",
      "lesson",
      "onboarding",
    ].includes(v)
  ) {
    if (v === "lesson" && !unlocked(state, +d)) return;
    view = v;
    if (d) {
      activeDay = +d;
      answers = {};
      graded = false;
    }
    wordOrder = [];
    render();
  }
});

if (location.hash) window.dispatchEvent(new PopStateEvent("popstate"));
