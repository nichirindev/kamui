# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Graphic designers are the primary users. Their main job is to make a social
graphic: upload one photo, put type behind the cut-out subject, and export a PNG.
They work in a browser tab on a desktop or laptop. They expect a fast tool with
no sign-in and no upload step.

## Product Purpose

Text/Behind makes text-behind-image designs from a photo. The subject is cut out
automatically, type is placed behind it, and the result is saved as a PNG. The
product exists so designers can make this effect without a server, an account,
or manual masking. Success means a finished PNG at the source image resolution
that matches the on-screen preview.

## Positioning

The segmentation model runs on the user's device. The photo never leaves the
browser. There is no login, no queue, no watermark, and no network request after
setup. The exported PNG scales with the source image and the live preview, so
the download matches what the user sees.

## Operating Context

The user opens the studio, drags in a JPG or PNG, waits for automatic cut-out,
then edits type in a side inspector. Controls cover text, font, size, weight,
spacing, opacity, rotation, 3D tilt and position. After setup, the whole
pipeline works with the network disconnected. The model and fonts are served
from the same origin.

## Capabilities and Constraints

- Fully offline after one-time install and build. No third-party requests.
- Automatic background removal with `@imgly/background-removal`; keep the
  pinned version at 1.5.5.
- WebAssembly inference with COOP and COEP headers from `next.config.mjs`.
- 24 self-hosted font families in `public/fonts` and the model in
  `public/imgly`. Both stay untouched during visual work.
- Hidden canvas compositing and dynamic export scale. Export type size and
  letter spacing follow `canvas.width / previewWidth`.
- Plain `<img>` elements for `blob:` previews; the image optimizer is not used.
- Single-image workflow. No account, billing, analytics or upload path.

## Brand Commitments

Name: Text/Behind. License: AGPL-3.0, inherited from the upstream fork.
The visual direction is Neo-Pop: warm paper, black ink, 2 px borders, hard
offset shadows, halftone texture, condensed display type and a small set of
loud flat accents. This is a binding visual constraint. A short Dark Studio
experiment was reverted on 21 November 2026.

## Evidence on Hand

- Real exported examples in `public/gallery/` (six images).
- Local model assets in `public/imgly/` and fonts in `public/fonts/`.
- A working headless smoke test in `scripts/smoke-test.mjs`.
- No customer quotes, testimonials, pricing or usage figures are available.
  Future work must not invent them.

## Product Principles

- On-device first. If a task can run locally, it runs locally.
- No gate between the user and the tool. No sign-in, queue or watermark.
- The export matches the preview at any image size or window width.
- One photo, one clear result. Depth comes from the effect, not from features.
- Preserve the working pipeline when changing the visual layer.

## Accessibility & Inclusion

Controls stay at least 44 px tall on phones. Text contrast meets 4.5:1 for body
copy and 3:1 for large text. Light and dark themes must both remain legible.
Reduced-motion users get no position animation.
