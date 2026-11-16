# Radio Remedy independent UX critique

Reviewer: `/root/ui_reviewer`; method: `independent-agent`; UTC: 2026-11-16T22:59:03Z.
Reviewed local build at http://127.0.0.1:4173/, committed source revision `aa073508438bac308318f52bc9b1b39b75fd80a3` (fingerprints rechecked after commit). The final evidence report should identify its current committed revision. Reviewer did not implement the changes. No current author score was supplied.

## Requirements and primary journeys

Preserve the actual Melbourne band's orange radio identity, existing palette, repertoire, recordings, members, SEO and external destinations. Arrival should lead clearly to listening, official video or contact. A chosen recording should provide visible connection feedback, slow/error recovery and a permanent direct destination. Native mobile navigation and no-JavaScript contact navigation remain usable.

## Rendered evidence actually opened

The reviewer opened these PNG files with the image viewer, all under `test-results/`:

- `mobile-390-first-screen.png`, `mobile-390.png`: 390×844 viewport, `/`, initial unloaded media; full-page image also covers contact shortcut, repertoire and footer.
- `mobile-390-menu.png`: 390×844, `/`, open menu and visible focus.
- `mobile-390-loading.png`, `mobile-390-slow.png`, `mobile-390-loaded.png`, `mobile-390-error.png`: 390×844, `/`, first recording connection, delayed response, fixture document loaded and synthetic error feedback respectively.
- `mobile-320-slow.png`: 320×568, `/`, delayed first recording; text wraps without clipping. The direct destination is below this captured viewport and remains available by scrolling, as verified by the executed test.
- `desktop-first-screen.png`, `desktop.png`: 1440×1000 viewport, `/`, initial unloaded media and full page.
- `desktop-loading.png`, `desktop-slow.png`, `desktop-loaded.png`, `desktop-error.png`: 1440×1000, `/`, matching first-recording states.

- `desktop-zoom-200.png`: 1440×1000, `/`, 200% CSS zoom of repertoire; enlarged text remains readable without horizontal clipping in the opened capture.
- `reflow-720-contact.png`: 720×500, `/`, equivalent narrower reflow/contact section with readable email and social actions. Parent executed overflow and Contact menu/focus assertions; CSS zoom plus equivalent viewport is not native browser zoom.

The white loaded/error frame is a deliberately synthetic HTML fixture, not an inspected actual SoundCloud player. The error screenshot retains successful fixture content because the test dispatches the error event after retry; it proves surrounding error copy and styling only.

## Checks and limitations

Read `tests/site.spec.mjs`, `assets/site.js`, design requirements and the executed browser log `/tmp/radio-tests.log`, ending **24 passed (1.3m)**. Tests cover 320/375/390/1440 viewports, original content and recording IDs, no initial third-party requests, layout overflow, axe scans in initial/menu/slow states, skip link, menu keyboard opening/Escape/focus return, section focus, no-JavaScript navigation, asset resolution, loading, 12-second timeout, late load, reload, one iframe per attempt, and synthetic error/recovery. Interaction findings rely on those executed tests; this reviewer inspected screenshots and source rather than driving a browser directly.

Calculated contrast from actual CSS tokens: muted/background 9.59:1; muted/panel 8.61:1; ink/background 16.37:1; accent/background and dark-on-accent 16.82:1. These support AA text contrast for the relevant states. Automated checks are not a full accessibility audit. Human screen-reader, physical device, Safari/Firefox, actual SoundCloud audio, YouTube playback and delivered mail are outside this review. Cross-origin frame `load` does not confirm playback, and remote failures do not reliably emit iframe `error`; the always-available direct link and retained troubleshooting sentence address that limitation. No absent empty/destructive state is required for this static site.

## Scores

| Category | Score / 5 | Evidence and finding |
|---|---:|---|
| hierarchy | 4 | First screens clearly identify band/location/genre and emphasize Listen. Sections remain legible and editorial; the contact shortcut appears before the lengthy repertoire on both layouts. |
| journeys | 4 | Listen, official video and contact destinations are explicit. Each recording retains a named direct link in all states, and reload is obvious. External playback/mail delivery remain unverified. |
| responsive | 4 | Full mobile and desktop renders are unclipped, with useful columns on desktop and a readable mobile stack. 320px slow feedback wraps cleanly; executed checks cover additional 375px width. |
| accessibility | 4 | Strong text contrast, semantic status, named frames/controls, generous fallback links, visible menu focus and executed keyboard/axe checks. Human assistive-technology audit remains outside scope. |
| consistency | 4 | Existing spacing/type/color system is retained; recovery accents and controls belong to the recording instead of using transient global notifications. |
| states | 4 | Connection, disabled loading, timed delay, document load and synthetic error feedback are visible and recoverable; late load and retry are tested. Document-load wording retains fallback guidance rather than promising audio playback. |
| brand | 4 | Real orange radio artwork and established dark/lime palette remain central. Band members, repertoire and recordings are preserved; no invented imagery or rebrand was added. |

Mean: **4.00/5**. Minimum: **4/5**.

## Decision and correction history

No UX blockers found in the reviewed scope. The numeric rubric and independent rendered-review requirements pass. Final strict gate and source/revision provenance remain the author's responsibility; this critique alone does not assert deployment success.

Nonblocking limitations: actual third-party playback still needs external-service/manual verification. A future approved refinement could replace the decorative desktop Watch mark with supplied authentic imagery, but no replacement asset is established here and this is not required for the current task. The repertoire is intentionally long; the newly visible contact shortcut limits its cost for organisers.

No implementation correction requested by this reviewer. Supplemental 200% CSS zoom and equivalent 720px viewport screenshots were opened after the main review; parent reports overflow and Contact menu/focus assertions passed. These supplement the 24-test suite but do not establish native browser zoom coverage.

## Reviewed implementation SHA-256

- `assets/site.js`: `b68381bac7787040586381cb054d12b6f6dd92982d80de80256e6594f7775149`
- `assets/site.css`: `9df962db57f6647eb7eae57380ba860570b5c874753de9688108c64060d36596`
- `index.html`: `3655032b3f1740d28f23d24f8247ef7833d6a61eb3a600e8d59b96fb58db5ce9`
- `tests/site.spec.mjs`: `1e615a83700587fbb67f5e61b3a29b259b9514670a6e3ef178ffec49dcb3c012`
