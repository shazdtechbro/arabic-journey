# Verification results — 25 October 2026

- Production build: passed; approximately 1.4 MB total static output including local fonts.
- Vitest: 12 passing tests across progress/scoring/calendar/backup/graduation and curriculum coverage.
- Playwright: 7 passing browser tests covering the full 30-day learner flow, keyboard/navigation and axe WCAG 2 A/AA checks on landing and Day 1.
- Full journey: deliberately failed/retried Day 1, passed all 30 assessments, retained progress on refresh, exported/restored a backup and generated PNG plus one-page PDF graduation artifacts.
- Mobile: 390 × 844 viewport, no horizontal overflow.
- Offline: service worker installed; reopening and navigating to completed Day 23 succeeded with network disabled; Arabic font available locally.
- Manifest: Chromium returned no manifest or installability errors.
- Console: full learner-flow test reported no page errors.
- Dependency audit: zero reported vulnerabilities after upgrading the test tooling to Vitest 5.0.5.
- Source reference links: author and publisher resources returned HTTP 200.

These checks use Chromium automation. Physical iPhone/Android installation, assistive-technology user testing and qualified teacher editorial review are not claimed. Public-host verification is performed after deployment and reported in the project handoff.

## Unrestricted study and page companion update

All 30 lessons, direct links and assessments now permit study in any order. Existing progress remains compatible, and backups accept non-sequential completions. All 128 source PDF pages have original companion directions; 119 are chapter teaching pages. Page completion is independently persisted and never awards activity/streak credit.

New browser checks cover page navigation and persistence, source acknowledgement plus a correctly answered concept check, unrestricted access to late lessons, immediate install-banner visibility, dismiss/reload behavior, native install-prompt invocation via a controlled browser event, iPhone-specific instructions under emulation, and offline reopening of the book companion. Real-device installation has not been performed. The external source PDF requires internet and is not part of the offline bundle.

The page directions support reading and practising the actual textbook at its authorized source. They do not reproduce its exact text or automatically grade every original exercise. Broader qualified teacher review remains a worthwhile editorial step.
