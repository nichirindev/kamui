# Text Behind Image — Offline Fork

A fully offline fork of [text-behind-image](https://github.com/RexanWONG/text-behind-image).

Create "text behind image" designs (text layered *behind* the subject of a photo).
Everything runs **locally in your browser**: the ML background-removal model,
the editing UI, the font set and the PNG export. No accounts, no server API,
no internet connection — after the one-time setup.

## What changed vs. upstream

| Upstream | This fork |
| --- | --- |
| Supabase login gate | Removed — the editor opens directly |
| Free-generation limit + Stripe billing | Removed |
| Ads / analytics | Removed |
| ML model fetched from `staticimgly.com` CDN | Served locally from `public/imgly` |
| ~250 Google Fonts from `fonts.googleapis.com` | 24 self-hosted fonts in `public/fonts` |
| next/image for `blob:` previews | Plain `<img>` (works offline without the image optimizer) |
| Unused deps (supabase, stripe, axios, zod…) | Removed |

## Design

The UI uses a **Neo-Pop** system: warm paper, black ink, 2 px borders, hard
offset shadows, halftone texture and a small set of loud flat accents. The
landing page and editor are both built from the same tokens.

- [`PRODUCT.md`](./PRODUCT.md) — product truth and fixed constraints
- [`DESIGN.md`](./DESIGN.md) — palette, typography, components, motion, rules
- [`design-inspiration/`](./design-inspiration/README.md) — reference board and screenshots
- [`.opencode/skills/frontend-design/SKILL.md`](./.opencode/skills/frontend-design/SKILL.md) — agent workflow for UI changes

Preview screenshots live in `design-inspiration/screens/`. Regenerate them with
the app running:

```bash
npm run shots
```

## Design skills (vendored)

Three groups of upstream skills are checked into `.opencode/skills/` so the
review process travels with the repo. Nothing is fetched at runtime.

| Skill | Source | Use |
| --- | --- | --- |
| `impeccable` | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | Craft floor, contrast/shadow/type audits, browser screenshots, detector |
| `design-taste-frontend` | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | Anti-template review, copy lint, one-section-per-screen gate |
| `emilkowalski/*` | [emilkowalski/skills](https://github.com/emilkowalski/skills) | Motion decisions, animation review, component polish (`emil-design-eng`, `animate`, `review-animations`, `choreograph` and others) |

All upstream skills are full offline copies with their reference files and
scripts. Nothing here ships in the Next.js bundle. `.opencode/` is tooling, not
app code. The `frontend-design` skill is local policy.

The Neo-Pop direction is recorded in `PRODUCT.md` and `DESIGN.md`. It overrides
upstream defaults that would ban hard offset shadows, multiple accents or the
violet/lime palette. Those are intentional decisions for this brief.

```bash
# mechanical design detector (Windows launcher)
.opencode/skills/impeccable/scripts/impeccable.cmd detect --json --changed

# copy lint against a rendered page
node .opencode/skills/design-taste-frontend/scripts/copy-lint.mjs ./page.html --kind software
```

## Dynamic output size

Nothing about the output is fixed to one screen size:

- **Export:** the PNG is drawn at the uploaded image's native resolution, and
  type is scaled by `canvas.width / previewWidth`, measured from the live
  preview element. A 1600 px photo exports at 1600 px with the same visual
  proportions as the preview; a large window or a small one gives the same
  result. There is no hardcoded multiplier.
- **Page weight:** every hero and gallery photo ships a 640 px variant next to
  the 1200 px master, wired with `srcSet` + `sizes`. A phone fetches the small
  file, a desktop fetches the master.

## Quick start

```bash
npm install
npm run build
npm start
```

Open http://localhost:3000, click **Open the app**, upload a JPG/PNG.
The background is removed automatically — no manual masking.

For development: `npm run dev`.

> The model assets (`public/imgly`, ~165 MB) and fonts (`public/fonts`) are already
> included. If you ever need to re-download them:

```bash
npm run assets
```

## Running with no internet

1. Run `npm install`, `npm run build` once while online (npm packages are needed).
2. After that, `npm start` serves everything from disk. Disconnect and it still works.

The browser never requests a third-party origin: model, WASM runtime, fonts and
images are all same-origin.

## How it works

```
upload ─► removeBackground()  (ONNX isnet model, WASM, in-browser)
       ─► original image      (bottom layer)
          + text layers       (middle)
          + cut-out subject   (top layer)   ← automatic, no manual work
       ─► "Save image" re-draws all layers on a <canvas> and downloads a PNG
```

The segmentation is automatic (`@imgly/background-removal`). Manual work is
limited to styling the text: content, font, colour, position, size, weight,
letter spacing, opacity, rotation and 3D tilt.

## Model options

`public/imgly` ships two models:

- `isnet_fp16` (84 MB) — default, higher quality
- `isnet_quint8` (42 MB) — quantized, smallest/fastest

Switch with an environment variable before building:

```bash
# .env.local
NEXT_PUBLIC_TBI_MODEL=isnet_quint8
```

Or re-download a different model with the asset script (`npm run assets -Models isnet`).

## Fonts

The 24 bundled families (latin subset) are listed in `constants/fonts.ts`.
They are referenced by `@font-face` rules in `app/fonts.css`, generated by
`scripts/download-assets.ps1`. Add or remove entries there and re-run
`npm run assets` (needs internet) to change the set.

## Verify assets

```bash
npm run verify:assets
```

Checks that every chunk referenced by `resources.json` exists.

## Smoke test (headless browser)

With the app running (`npm start`), in another terminal:

```bash
npm run test:smoke -- public/pressure.png
```

It uploads an image, waits for automatic background removal, adds a text layer,
exports a PNG, and asserts that **no request left localhost** and that the page
logged no errors. Requires Chrome or Edge installed.

## Notes

- Cross-Origin-Opener-Policy / Cross-Origin-Embedder-Policy headers are set in
  `next.config.mjs` so the WASM inference can use multiple threads. Serving with
  `next start` keeps those headers. If you deploy statically, configure the same
  headers on your host (otherwise inference still works, just single-threaded).
- Upstream is AGPL-3.0 — this fork keeps the same licence (see `LICENSE`).
