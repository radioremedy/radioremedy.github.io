# Recording recovery improvements
Audience: listeners and event organisers seeking the real Melbourne band. Preserve content, SEO, original radio imagery and destinations. Prior critique: 3.86/5, chiefly missing loading and slow/error feedback.

Journey: Listen -> choose recording -> inline connecting status -> embedded document with manual playback. At 12 seconds offer reload and permanent SoundCloud fallback; late loads can recover. An iframe load cannot verify third-party playback: the loaded message explicitly retains troubleshooting guidance. Network errors on cross-origin frames are not reliably observable, so timeout is the primary recovery mechanism. No autoplay, remote scripts or requests before intent. Each recording is independent. Retain no-JS direct links. Static content has no empty, destructive or data-success states; these are N/A.

Composition: preserve existing desktop columns/mobile stack. Status follows its own load/reload control, frame beneath; direct link stays outside and usable. No transient toast or animation. Add a contact shortcut ahead of repertoire. See DESIGN.md for tokens and reference choices.

Success: unchanged baseline content and links; keyboard menu and no-JS journeys pass; 320/375/390/1440 layouts without overflow; deterministic loading/slow/error/retry fixtures, axe and inspected screenshots. Error dispatch tests exercise UI only, not real remote failure detection. Actual audio, mail delivery and physical devices remain outside automated scope.

Reference reachability on 2026-11-16 UTC: WCAG 2.2 HTTP 200; Bandcamp HTTP 403, so its current site is unvalidated and not relied upon for new visual decisions. Existing artist composition is the primary reference.
