# Design Inspiration Board — Neo-Pop

Reference board for the Text/Behind redesign. These are sources of patterns,
not assets to copy. The build is self-hosted; nothing here is fetched at runtime.

The implemented system is documented in [`../DESIGN.md`](../DESIGN.md). Product
truth is in [`../PRODUCT.md`](../PRODUCT.md). The agent workflow is in
[`../.opencode/skills/frontend-design/SKILL.md`](../.opencode/skills/frontend-design/SKILL.md).

## Sources

| Source | What it is | Pattern used |
| --- | --- | --- |
| [Risograph and screen-print posters](https://www.printmag.com) | Two-ink print tradition | Paper ground, flat spot colour, halftone, hard registration offset |
| [Swiss punk and DIY zines](https://www.designishistory.com) | Photocopied music and art zines | Condensed display type, cut-out frames, tape-and-sticker energy |
| [POP! comic covers](https://www.marvel.com/comics) | Mainstream comic covers | Bold lettering, heavy outlines, onomatopoeic blocks of colour |
| [Bauhaus posters](https://www.bauhaus.de) | Geometric print | Rigid grid, circles and bars, one loud accent per plane |
| [Emil Kowalski](https://emilkowal.ski) | Design engineering writing | Press feedback, custom easing, sub-300 ms UI motion, reduced-motion care |
| [impeccable craft floor](https://github.com/pbakaus/impeccable) | Design review system | Contrast floor, real depth, type measure, no decoration without a job |
| [figma.com](https://www.figma.com) | Product marketing benchmark | Real product UI as proof, one clear action per screen |
| [mobbin.com](https://mobbin.com) | Real shipped product flows | Inspector layout, empty state, progress state, touch details |

## Patterns extracted

### Layout
- One statement per band. A heading, a short note, then the evidence.
- Step cards with a ghost number and a tinted icon tile.
- Tilted gallery frames that straighten on hover.
- Editor as a shell: compact header, stage on the left, inspector on the right.
- Edge-to-edge bands use the same container edges as the sections.

### Surface and type
- Warm paper ground, ink lines, white cards.
- Two accents per section at most. Ink text on every accent.
- Anton for short display lines, Space Grotesk for reading, marker for one note.
- Micro-labels are metadata only, never a kicker above a heading.
- Shadows are hard offsets, never blurred. A border is always 2 px.

### Imagery
- Framed photographs with a 2 px ink border and a yellow tag inside the frame.
- Each photo ships a 640 px and a master variant for responsive download.
- The hero shows a real export, not a mood image.

### Interaction
- Buttons step up-left on hover and press down-right on click.
- Cards rise 4 px and keep their shadow.
- Gallery frames straighten and zoom the photo to 1.02.
- One hero entrance per landing page. No scroll-linked motion, tilt carousel or
  timed tab.

## Deliberately avoided

- Soft shadows, glass, blur, gradient text, glow and parallax.
- Section numbers, eyebrows and captions under images.
- White text on an accent surface.
- Three or more accents in one section.
- Any third-party embed, font CDN, analytics script or external image.

## Screenshots

Rendered from the built app (`npm run shots`):

| File | View |
| --- | --- |
| `screens/landing-desktop.png` | Landing, 1440 × 900, light theme |
| `screens/landing-dark.png` | Landing, dark theme |
| `screens/landing-mobile.png` | Landing, 390 × 844 |
| `screens/landing-full.png` | Landing, full page |
| `screens/editor-empty.png` | Editor empty state |
| `screens/editor-filled.png` | Editor with cut-out and text layer |
| `screens/editor-mobile.png` | Editor, 390 × 844 |
| `screens/editor-dark.png` | Editor, dark theme |
| `screens/export-check.png` | Exported PNG from the editor |
| `screens/export-preview.png` | The editor preview it was exported from |

## Using this board

1. Pick a pattern, not a pixel. Identify the job it does.
2. Map it onto the tokens in `DESIGN.md`. Never add a new colour or font.
3. Keep the offline constraint: no remote assets.
4. Run the build, screenshots, smoke test and copy lint before shipping.
