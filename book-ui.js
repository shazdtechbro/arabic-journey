import { tablesForLesson } from "./teaching-tables.js";
import {
  bookPages,
  pagesForLesson,
  pageUrl,
  pagePractice,
  bookProgress,
} from "./book.js";
import { units } from "./data.js";
import { guides } from "./guides.js";
const safe = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const ar = (s) => `<span class="arabic" lang="ar" dir="rtl">${safe(s)}</span>`;
export function bookMeter(state, n) {
  const p = bookProgress(state, n);
  return `<div class="book-meter"><div><strong>${p.done} / ${p.total}</strong> <span>${n ? "lesson pages" : "teaching pages"} studied</span></div><progress value="${p.done}" max="${p.total}" aria-label="${n ? "Lesson" : "Book"} page progress">${p.done}/${p.total}</progress></div>`;
}
export function pageStudy(state, number, checks = {}) {
  const p = bookPages[number - 1] || bookPages[0],
    q = pagePractice(p),
    g = p.lesson ? guides[p.lesson - 1] : null,
    u = p.lesson ? units[p.lesson - 1] : null,
    done = !!state.pages?.[p.number],
    selection = checks.answer,
    hasAnswer = selection !== undefined,
    correct = q && selection === q.correct,
    ready = p.kind === "reference" || (checks.source && correct);
  return `<article class="page-study" aria-labelledby="page-title"><header class="page-study-head"><div><span class="eyebrow">${p.lesson ? "LESSON " + p.lesson : "PUBLICATION REFERENCE"} · PDF PAGE ${p.number} / 128${p.printed ? " · PRINTED " + p.printed : ""}</span><h2 id="page-title">${safe(p.title)}</h2><p>${done ? "✓ You marked this page studied. Review it whenever you need." : "Read the source, understand the idea, then put it to work."}</p></div><a class="btn btn-outline source-page" href="${pageUrl(p.number)}" target="_blank" rel="noopener noreferrer">Read original page ${p.number} ↗</a></header><div class="page-step"><span class="step-number">1</span><div><h3>Read this page in the original</h3><p>${safe(p.task)}</p><p class="muted">The source opens on the author’s website. These notes and exercises are original companion material; they do not reproduce the textbook. External PDF access needs an internet connection.</p><details class="pdf-details"><summary>Show the original PDF alongside these notes</summary><p class="muted">Loads the publisher-hosted PDF when opened. On phones, use “Read original page” if your browser does not show embedded PDFs.</p><iframe data-pdf-src="${pageUrl(p.number)}" title="Authorized textbook, PDF page ${p.number}" loading="lazy"></iframe></details></div></div><div class="page-step"><span class="step-number">2</span><div><h3>Understand the teaching point</h3><p class="teacher-note">${safe(p.focus)}</p>${g ? `<div class="connection-note"><strong>Connect it:</strong> ${safe(g.connection)}</div><details><summary>Explain the rule step by step</summary><p>${safe(u[5])}</p><h4>Why this matters</h4><p>${safe(u[4])}</p></details><div class="original-example"><span class="eyebrow">AN ORIGINAL COMPANION EXAMPLE</span><p>${ar(u[7][(p.number - 1) % u[7].length][0])}</p><p>${safe(u[7][(p.number - 1) % u[7].length][1])}</p></div><div class="table-scroll"><table class="grammar-table"><caption>Word roles to recognise while studying Lesson ${p.lesson}</caption><thead><tr><th scope="col">Arabic construction</th><th scope="col">What it is doing</th></tr></thead><tbody>${g.breakdown.map(([a, b]) => `<tr><td>${ar(a)}</td><td>${safe(b)}</td></tr>`).join("")}</tbody></table></div>${[5, 8].includes(p.lesson) ? spatialLab() : ""}${[6, 13, 15].includes(p.number) ? pictureLab() : ""}<details><summary>Explore the grammar table</summary>${grammarTables(p.lesson)}</details><details><summary>A mistake worth catching</summary><p>${safe(g.mistake)}</p></details>` : ""}</div></div>${q ? `<div class="page-step"><span class="step-number">3</span><div><h3>Check the concept</h3><p class="muted">A newly authored check for this lesson. It does not grade the textbook’s original exercises.</p><fieldset class="page-practice"><legend>${safe(q.prompt)}</legend>${q.options.map((opt, i) => `<label class="option ${hasAnswer ? (opt === q.correct ? "correct" : opt === selection ? "wrong" : "") : ""}"><input type="radio" name="page-practice-${p.number}" data-page-answer="${p.number}" value="${safe(opt)}" ${selection === opt ? "checked" : ""}/><span${/[\u0600-\u06ff]/.test(opt) ? ' class="arabic" lang="ar"' : ""}>${safe(opt)}</span></label>`).join("")}</fieldset>${hasAnswer ? `<div class="page-feedback" role="status"><b>${correct ? "Correct. Explain it once more in your own words." : "Not quite. Here is the connection to revisit."}</b><p>${safe(q.why)}</p></div>` : ""}<label class="source-check"><input type="checkbox" data-source-check="${p.number}" ${checks.source ? "checked" : ""}/> I studied the original page, attempted its exercises, and reviewed anything I could not explain.</label></div></div>` : ""}<footer class="page-study-footer"><p class="muted">Page study is self-reported reading progress. It does not award quiz completion or streak credit.</p><button class="btn btn-primary" data-mark-page="${p.number}" ${ready || done ? "" : "disabled"}>${done ? "✓ Page studied" : p.kind === "reference" ? "Mark reference reviewed" : "Mark this page studied"}</button></footer></article>`;
}
export function pageControls(page, range = bookPages) {
  const index = range.findIndex((p) => p.number === page);
  return `<nav class="page-controls" aria-label="Textbook page navigation"><button class="btn btn-outline" data-book-page="${range[index - 1]?.number || page}" ${index <= 0 ? "disabled" : ""}>← Previous page</button><label>Jump to page <select class="textinput book-page-select">${range.map((p) => `<option value="${p.number}" ${p.number === page ? "selected" : ""}>${p.number} · ${safe(p.title)}</option>`).join("")}</select></label><button class="btn btn-outline" data-book-page="${range[index + 1]?.number || page}" ${index >= range.length - 1 ? "disabled" : ""}>Next page →</button></nav>`;
}
export function lessonPages(state, n, page, checks) {
  const range = pagesForLesson(n),
    selected = range.some((p) => p.number === page) ? page : range[0].number;
  return `<section class="lesson-pages">${bookMeter(state, n)}<p class="muted">Two ways to learn: study each original PDF page with guidance here, or open “Concepts & assessment” for the full concept lesson and quiz. Every page and lesson is accessible.</p>${pageControls(selected, range)}${pageStudy(state, selected, checks[selected])}${pageControls(selected, range)}</section>`;
}
export function bookView(state, page, checks) {
  return `<header class="lessonhead"><span class="eyebrow">MADINAH ARABIC BOOK 1 · INDEPENDENT COMPANION</span><h1>One page. Real understanding.</h1><p>Read the author’s page. Understand its purpose. Practise the concept. Keep an honest record.</p></header>${bookMeter(state)}<p class="muted">This edition contains 128 PDF file pages, including front and back matter. The teaching sequence runs from PDF page 6 to 124 (119 pages). Printed page numbers differ. Your earlier quiz progress is kept separately.</p><details class="page-directory"><summary>Browse every page · ${Object.keys(state.pages || {}).length}/128 reviewed</summary><div class="page-grid">${bookPages.map((p) => `<button class="page-tile ${state.pages?.[p.number] ? "studied" : ""}" data-book-page="${p.number}" aria-label="PDF page ${p.number}: ${safe(p.title)}${state.pages?.[p.number] ? ", studied" : ""}">${p.number}${state.pages?.[p.number] ? " ✓" : ""}</button>`).join("")}</div></details>${pageControls(page)}${pageStudy(state, page, checks[page])}${pageControls(page)}`;
}
export function pictureLab() {
  const labels = [
    ["كِتَابٌ", "kitābun", "a book"],
    ["قَلَمٌ", "qalamun", "a pen"],
    ["بَابٌ", "bābun", "a door"],
    ["بَيْتٌ", "baytun", "a house"],
    ["كُرْسِيٌّ", "kursiyyun", "a chair"],
    ["مِفْتَاحٌ", "miftāḥun", "a key"],
  ];
  return `<section class="panel picture-lab"><span class="eyebrow">LOOK → RECALL → SAY IT</span><h3>Make a picture into a sentence.</h3><p>Look at each object. Name it before revealing the card. Then say “this is…” or “that is…” with the noun.</p><div class="picture-cards">${labels.map(([a, t, en], i) => `<details><summary><span class="picture-object" style="background-position:${(i % 3) * 50}% ${i < 3 ? 0 : 100}%" role="img" aria-label="${safe(en)}"></span><span>Reveal object ${i + 1}</span></summary><p>${ar(a)}</p><p>${safe(t)} · ${en}</p><p>${ar("هَذَا " + a)}</p></details>`).join("")}</div><p class="muted">Original AI-generated vocabulary illustrations. Arabic labels are typeset separately for clear vowel marks.</p></section>`;
}

export function grammarTables(n) {
  return tablesForLesson(n)
    .map(
      (t) =>
        `<section class="grammar-lab"><h3>${safe(t.title)}</h3><div class="table-scroll"><table class="grammar-table"><thead><tr>${t.columns.map((c) => `<th scope="col">${safe(c)}</th>`).join("")}</tr></thead><tbody>${t.rows.map((row) => `<tr>${row.map((cell) => `<td>${/[\u0600-\u06ff]/.test(cell) ? ar(cell) : safe(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></section>`,
    )
    .join("");
}

export function spatialLab() {
  const examples = [
    ["عَلَى الْمَكْتَبِ", "on the desk", "The book rests on the desk surface."],
    ["تَحْتَ الْمَكْتَبِ", "under the desk", "The book is below the desk."],
    [
      "فِي الصُّنْدُوقِ",
      "in the box",
      "The book is inside the box, rather than merely on the desk.",
    ],
  ];
  return `<section class="panel spatial-lab"><span class="eyebrow">SEE THE RELATIONSHIP</span><h3>One book. Three different answers.</h3><p>The noun alone does not tell you the relationship. Look at the whole scene, then choose the phrase.</p><div class="spatial-cards">${examples.map(([a, en, alt], i) => `<figure><span class="spatial-object" role="img" aria-label="${alt}" style="background-position:${i * 50}% 0"></span><figcaption><p>${ar(a)}</p><p>${en}</p><details><summary>Why the ending?</summary><p>${i === 1 ? "The position word taḥta has a genitive complement in this iḍāfah." : "The preposition governs a genitive complement."} The definite ordinary noun takes kasrah here.</p></details></figcaption></figure>`).join("")}</div><p class="muted">Extra picture vocabulary: ${ar("صُنْدُوقٌ")} means a box. The illustration and examples are original companion material.</p></section>`;
}
