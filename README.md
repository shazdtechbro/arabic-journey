# Arabic Journey

**Your first 30 days of Arabic start here.**

An independent, offline-first educational companion created for Sanni Shazily’s beginner learning journey: 23 foundational lessons aligned to Madinah Arabic Book 1, followed by seven revision and assessment days.

## Development

Requires Node.js 22.12+ (tested with Node 24).

```sh
npm ci
npm run dev
```

## Build and test

```sh
npm test
npx playwright install chromium
npm run build
npm run test:e2e
```

The production build is `dist/`. The build generates a content-versioned service worker that precaches the application, entire curriculum, icons and locally hosted fonts. Test against the production build to exercise offline behavior. `TEST_URL=https://your-host.example npm run test:e2e` tests a deployed copy. Tests use isolated browser storage; the full-journey test performs all 30 assessments and generates synthetic graduation artifacts.

## Architecture

The supplied dependency-free JavaScript implementation was retained and improved to preserve its working interface. Vite handles production bundling; the application ships plain JavaScript with no framework runtime. Content and logic are separate:

- `data.js`: corrected chapter order, original readings, explanations and quizzes; reuses suitable material from the supplied `starter-data.js`.
- `guides.js`: learning objectives, cumulative connections, vocabulary, grammar breakdowns, common mistakes and source references.
- `assessment.js`: reusable question construction and seven revision selections.
- `core.js`: scoring, unrestricted lesson access, completion integrity, calendar dates, streaks, strict backups, storage and graduation eligibility.
- `app.js` / `style.css`: responsive application shell, onboarding, dashboard, lesson renderer, quizzes, progress, credits and certificate UI.
- `scripts/build-sw.js`: production offline shell, immutable content cache and update lifecycle.
- `tests/`: Vitest logic/content checks and Playwright production browser journeys/accessibility checks.

Additional books can provide a new content module and guide metadata; the renderer and assessment engine remain reusable. Accounts, audio, spaced repetition and server synchronization are future features.

## Learning and activity rules

A score of **80% or above** passes. Five-question foundation assessments require four correct answers; Day 30 has 46 items and requires 37 correct answers. All 30 lessons and assessments are accessible from the beginning, including through direct links. A learner can study and complete any lesson in any order. Every attempt is saved; first-passing completion results are retained. Failed attempts do not award completion or streak credit.

Streak credit is awarded only on a day’s first successful completion. Retaking an already completed day never creates new activity. Multiple new days completed on one date count as one active calendar date, with a stronger calendar shade. Current streak is the consecutive run ending today or yesterday; a missed full day breaks it. The study timezone is fixed at onboarding and shown in settings so travel does not rewrite history. Calendar arithmetic uses date ordinals, not elapsed local milliseconds, avoiding DST-length assumptions.

“30 days” describes curriculum units, not a claim of 30 consecutive calendar dates. Certificates show actual active dates, final score and completion date. They are self-paced completion records, not accredited qualifications.

## Privacy and backup

The app uses localStorage as a small, synchronous browser persistence layer. There are no accounts, analytics, advertising, cloud learning records or Firebase. Your name, optional motivation/study time, timezone, quiz attempts and completions remain in your browser. Static hosting receives ordinary web requests. Progress can be exported/imported as validated version-2 JSON. Backups contain your profile and learning history: keep them private. Clearing browser data removes progress unless backed up. Starter v1 backups are intentionally not imported as verified v2 learning records because the curriculum order and completion integrity rules changed.

The optional study time is a dashboard routine cue, **not a background notification**. Android/desktop installation uses the browser prompt when available; iPhone Safari uses Share → Add to Home Screen. Installation UI differs by browser. New versions wait for older tabs to close before activation. External references require internet; app lessons do not after successful initial caching.

## Deployment

Deploy `dist/` to an HTTPS static host. No backend, secret or runtime environment variable is needed. Hash routing works without server rewrite rules. All assets use relative paths to support a GitHub Pages project path.

For GitHub Pages, enable Actions as the Pages build source, set the repository variable `ENABLE_GITHUB_PAGES=true`, and use the included workflow, which runs logic tests, builds and publishes the static output. By default, the workflow runs tests and builds without publishing to Pages. The connected integration can push code but cannot enable Pages or change repository metadata; Sites is the configured public host. For Vercel/Netlify: build `npm run build`, output directory `dist`. For Sites, `.openai/hosting.json` records the selected project and static directory. Publishing must use a version built from the exact pushed commit.

Source repository: https://github.com/shazdtechbro/arabic-journey. The initialized repository history and original copyright notice are preserved.

## Sources, authorship and copyright

The primary work is **Durūs al-Lughah al-ʿArabiyyah li-Ghayr al-Nāṭiqīna Bihā, Book 1**, by **Dr. V. Abdur-Raheem**. Arabic Journey is an independent learning companion, not an official edition, translation or endorsement.

- [Authorized Arabic textbook on the author’s website](https://drvaniya.com/wp-content/uploads/2019/09/%D8%AF%D8%B1%D9%88%D8%B3-%D8%A7%D9%84%D9%84%D8%BA%D8%A9-%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9-Madinah-Book-1.pdf)
- [Author’s teaching resources](https://drvaniya.com/?page_id=2141)
- [LQ Toronto textbook, English key and solutions](https://www.lqtoronto.com/madinaarabic.html)
- [Verified lesson map and editorial scope](docs/lesson-map.md)

The newly authored explanations, exercises and readings accompany these sources. Source PDFs are neither committed nor redistributed. The founder’s story is based on Sanni Shazily’s supplied account of studying October 1–23, 2026. Curriculum alignment was checked against source materials; qualified teacher editorial review remains a useful future improvement.

The **MIT license applies to original application code only**. Third-party textbooks, source keys, recordings and other linked material retain their owners’ rights and are excluded. Original educational prose is copyright © 2026 Sanni Shazily, all rights reserved unless separately licensed. DM Sans and Noto Naskh Arabic are distributed under the SIL Open Font License; license texts are in `public/assets/`.

## Page-by-page book companion

The pages-first lesson view combines original teaching with explicit references to the authorized source. `book.js` maps all **128 PDF file pages**, including front/back matter; 119 teaching pages span PDF pages 6–124. This particular edition’s printed pages differ from file page numbers. `book-ui.js` provides page navigation, original study directions, expandable grammar explanations, word-role tables, concept checks and an optional on-demand viewer for the externally hosted PDF. `teaching-tables.js` supplies additional original grammar comparisons. Learners can switch to the existing concepts/assessment route at any time.

This is **not a verbatim transcription of the textbook**. No source PDF, page raster, extracted source text, or original exercise transcription is distributed. Learners read the author’s actual page via its authorized link, attempt the original exercises there, then use the companion to understand and check concepts. The app does not automatically grade the textbook’s original exercises or claim exhaustive item-level mastery.

Reading progress is stored in `pages` under the existing version-2 backup envelope; old backups without that field remain compatible. A learner must pass the companion concept check and acknowledge studying the original page before recording a teaching page. Front/back reference pages can be acknowledged separately. Page study is self-reported, distinct from quiz passes, and never awards streak credit. Finishing quizzes alone does not imply the source pages were studied. Both counts are displayed separately.

Two original AI-generated illustration sheets support vocabulary retrieval and spatial relationships. Arabic captions are real text in Noto Naskh Arabic, never embedded in generated images. The image assets are in `assets/` and are included in offline caching.

The landing page displays a dismissible install banner immediately. `beforeinstallprompt` is used only when supplied by the browser and triggered by a user click. Otherwise, an accessible platform-specific dialog explains installation. iPhone Safari uses Share → Add to Home Screen. Sites cannot silently install apps or download an iOS application. Installed standalone mode suppresses the banner.
