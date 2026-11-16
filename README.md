# Radio Remedy

A lightweight static rebuild of the existing Radio Remedy site. No runtime packages, remote fonts, tracking, or automatic embed requests. HTML works without JavaScript; each recording has a direct SoundCloud link. A dedicated Watch section and social link open the official Radio Remedy YouTube channel, with no remote video assets or scripts. See `docs/rebuild-review.md` for channel verification and the playback-check limitation.

## Work safely

Authoritative repository: `radioremedy/radioremedy.github.io`. GitHub reported `push: true` for authenticated account `gibovski`. Production Pages serves `/` from **master**. This work belongs on **feature/static-rebuild-20261115** only. No deployment workflow is included. Do not merge or change Pages settings as part of previewing.

## Preview and validate

Use Node **22.22+** (or 24.8+) and Python 3:

```sh
git switch feature/static-rebuild-20261115
npm ci
npm run build
npm run check
npm exec -- playwright install chromium
npm test
npm audit
npm run preview
```

Open http://127.0.0.1:4173. The build copies only the public site files to `dist/`. Browser tests run against that output at mobile and desktop sizes. They check the content baseline, fragment targets, horizontal overflow, keyboard skip link, no initial external requests, click-to-load embeds and axe accessibility. Player tests stub SoundCloud: they verify integration URLs, not availability or playback on the external service.

`npm run images` regenerates responsive WebP artwork, favicon, Apple touch icon, manifest icons and share image using the existing `img/glffmfpdijhfmcdl.png`. Keep the original for editing. Header and footer use the same orange radio, replacing the unrelated star. The mobile Menu is a native disclosure with keyboard and no-JavaScript support; Escape closes it and returns focus. Only the optimized artwork ships in the build. Original unused images remain in Git for preservation, but are excluded from `dist/`.

## Content and rights

The public source at commit `7dca731` is the content baseline: four member credits, all 42 songs, all five SoundCloud recording IDs, the enquiry email and Facebook URL. See `docs/content-baseline.json`. No private song sheets or rehearsal notes were copied. No testimonials, dates, prices, availability claims, phone numbers or booking terms were added. Existing spelling and artist credits are preserved for owner review.

The displayed band artwork already headed the authoritative site; optimized derivatives preserve that existing use. No new license or ownership claim is made. Legacy stock/concert images and other-band backgrounds have uncertain provenance and are not used in the build. Do not redistribute those retained source files as licensed stock. Third-party legacy scripts, saved embeds and CSS were removed; Git history retains the originals. Music rights remain with their respective owners and providers.

## SEO and release review

Canonical, Open Graph, sitemap and robots currently use the confirmed Pages URL `https://radioremedy.github.io/`. No CNAME exists in the source. Confirm the preferred custom domain before release and update these together if appropriate. Confirm the historical member credits, enquiry mailbox and recording availability with the band; no current status has been invented.

The referenced completed audit was not supplied or found in this checkout. `docs/rebuild-review.md` maps the requested fixes and independently observed issues; full audit sign-off remains pending receipt of that document.

## Review and eventual merge

Fetch and check out the feature branch, then use the local preview above. Review the diff against `master` and the screenshots produced in `test-results/`. No hosted preview is configured, because Pages is production. An authorized maintainer can later review and merge the feature branch into `master` in a separate release action; that may publish immediately through existing Pages settings. This implementation does not perform that action.
