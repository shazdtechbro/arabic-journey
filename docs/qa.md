# Quality assurance

The browser journey uses an isolated profile and test name. It deliberately fails and retakes Day 1, passes all 30 days through the actual UI, verifies unrestricted lesson access, downloads the certificate and backup, restores the backup, changes to a 390px viewport, and reopens a completed lesson offline. Synthetic test records are never included in production learner storage.

Automated logic checks cover the 80% threshold, failed attempts, duplicate completion, distinct-date activity, longest/current streaks, missed dates, yesterday grace, DST/leap/year boundaries, storage round-trips, malformed backups and all-30 graduation eligibility. Content checks verify 23 mapped lessons, seven revision days, distinct answer choices, feedback and final-assessment coverage.

Accessibility checks use axe WCAG 2 A/AA rules on the landing page and Day 1; keyboard checks exercise skip navigation and browser Back. These are automated checks, not a claim of complete accessibility certification.

PWA inspection uses Chromium’s manifest and installability APIs. Device-specific installation sheets (particularly physical iPhone Safari) require real-device acceptance testing and are not claimed as tested by desktop emulation.

Offline QA found a real cache lookup issue caused by static responses varying on the Origin header. The static same-origin asset cache now ignores Vary when matching; it does not cache cross-origin responses, authenticated APIs or user data. The production shell and Arabic fonts are precached atomically. Service-worker registration failures show a retry message.

Source resources were fetched successfully from drvaniya.com and lqtoronto.com. Source PDFs used for checking are held outside the repository and are not bundled.
