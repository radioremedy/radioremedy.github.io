# Rebuild review

## Scope and provenance

Source: authoritative repository at `7dca731`. Completed audit unavailable during implementation; do not represent this as a verified audit sign-off. Implementation follows the task requirements and findings directly visible in the source.

| Finding / requirement | Change |
| --- | --- |
| Navigation pointed at theforestersmusic.com | All local navigation uses existing section fragments |
| Invalid head markup, multiple h1 elements, missing description | Semantic landmarks, one h1, section headings, language and metadata |
| Focus outlines removed | Visible keyboard focus, skip link, accessible names |
| Fixed legacy grids, tiny mobile content | Responsive grid, wrapping navigation, scalable type and artwork |
| Five immediate SoundCloud embeds | Explicit click-to-load with named iframe, direct no-JS links |
| jQuery, Modernizr, legacy plugins, analytics, HTTP fonts | Removed from site and legacy dependency files deleted |
| 1.7 MB band artwork | 480 / 960 px WebP variants with intrinsic dimensions and responsive selection |
| Generic README | Build, preview, validation, provenance and release instructions |
| Unverified testimonials / other-band imagery | Not reused |

No workflow, Pages configuration, default branch, credentials or production resources changed. Build output is an explicit allowlist. Original unused image sources remain recoverable in the repository and are excluded from build output.

## Remaining review

Obtain and reconcile the completed audit; verify historical lineup and mailbox with the band; manually confirm third-party playback and preferred public domain. Automated accessibility checks do not replace human assistive-technology review.

## Verification — 2026-11-15

- Node v22.23.5 installed at user scope for current validator compatibility.
- `npm run build`: passed; `dist/` occupies 112 KB on disk.
- `npm run check`: passed HTML validation and JavaScript syntax checks.
- `npm audit`: zero vulnerabilities.
- `npm test`: all four Chromium tests passed (375 px mobile and 1440 px desktop); axe reported zero violations. Initial browser launch lacked libatk; reran successfully using existing user-scoped browser libraries.
- Mobile and desktop full-page screenshots inspected; saved locally in ignored `test-results/`.
- `git diff --check`: passed.
- `master` remote remained `7dca731b5ce52e9535dce848ba6c5ba07a3e804f` before feature push.

For this VM, prefix checks with:

```sh
export PATH="/var/lib/bazworker/.local/share/radio-remedy-tools/node_modules/node/bin:$PATH"
export LD_LIBRARY_PATH="/var/lib/bazworker/.local/lib/bazfit-browser/usr/lib/x86_64-linux-gnu${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
```

These are local session settings; no system services or shell startup files were changed. Other machines with Playwright's browser dependencies installed do not need this library path.

## Owner feedback — 2026-11-16

- Preserved `img/glffmfpdijhfmcdl.png` unchanged. Its orange radio now appears in header/footer in place of the unrelated star, as well as the existing hero/favicon. `npm run images` also generates Apple touch (180), manifest (192/512) and uncropped social/share (1200×630) PNGs. The manifest uses browser display mode; no service worker or offline/installability claim.
- Replaced stacked mobile navigation with a native Menu disclosure and 48px menu links. Enter/Space and Tab work natively; Escape restores focus to Menu, and choosing a section closes the menu and moves focus there. Navigation remains functional without JavaScript. Desktop retains inline navigation.
- Compact mobile hero keeps the radio, readable headline and Listen action in the first screen; secondary hero footer is omitted on mobile. No new animation; reduced-motion override retained.
- Final `npm run build`, `npm run check`, `npm test`, and `git diff --check` passed. All 20 Chromium tests passed across 320×568, 375×667, 390×844 and 1440×1000. Tests cover first-screen bounds, mobile artwork/headline separation, horizontal overflow, keyboard menu/focus, no-JS navigation, asset resolution, original content and recording IDs. Axe reported zero violations for the page and open mobile menu.
- Reviewed first-screen screenshots at all four widths and the 320px open menu. Screenshots and full-page captures are in ignored `test-results/` and regenerate with `npm test`.
- Limitations: Chromium emulation only; no physical iOS/Safari/Firefox or human screen-reader testing. SoundCloud remains stubbed in tests. Social crawlers and Apple home-screen rendering cannot be verified against the un-deployed branch. Preview is VM-local at `http://127.0.0.1:4173/` while `npm run preview` runs; no hosted preview/deployment was created.

## YouTube channel integration — 16 November 2026

- User-supplied official channel: https://www.youtube.com/@radioremedyrocks1382 . Direct public HTML returned HTTP 200; YouTube metadata identifies **Radio Remedy**, channel ID `UCfpHpUTZAqAJ9bgnc19HJrQ`, and the same handle.
- Inspected the public Videos tab (14 listed uploads), including “Radio Remedy - Land of 1000 Dances”, “Fire - Radio Remedy @ On Top Bar, April '22”, “Superstition - Radio Remedy @ On Top Bar, April '22”, and “Vertigo - Radio Remedy @ On Top Bar, April '22”. Titles indicate relevant band material; this is not a claim to have watched all footage.
- Checked the watch-page response for `8ezD3kBGNg8`: author/channel match, public video, status OK, `playableInEmbed: true`. The privacy-enhanced embed rendered channel/title with a Referer header, but a browser without it displayed error 153. A subsequent browser attempt did not expose a usable Play button within 30 seconds. Actual embedded playback was not verified, so the site uses the explicitly requested channel-link fallback. No video IDs, thumbnails, embeds or YouTube scripts are shipped.
- Added a prominent Watch on YouTube section with a local inline SVG icon and direct channel button, a Watch navigation anchor, and a YouTube social link alongside Facebook. All work without JavaScript and make no YouTube requests before navigation.
- Preview remains local at http://127.0.0.1:4173/ while `npm run preview` runs. No hosted preview is configured; production Pages settings and master must remain unchanged.
- Validation: `npm run build`, `npm run check`, and the full `npm test` suite passed (20 tests). After the final mobile whitespace fix and channel-link assertions, reran `npm run build`, `npm run check`, and `npm test -- --grep 'content, navigation|without JavaScript' --workers=2` (8 passed). Chromium viewports: 320, 375, 390 and 1440 pixels; axe, overflow, keyboard navigation, no-JavaScript links and zero initial external requests passed. Reviewed mobile and desktop screenshots. Browser commands used existing user-scope libraries via `LD_LIBRARY_PATH=/var/lib/bazworker/.local/lib/bazfit-browser/usr/lib/x86_64-linux-gnu`; no system changes were required. Physical devices and Safari were not tested.
