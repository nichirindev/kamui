# Neo-Pop Design System

This is the visual system of record for Text/Behind. It was restored on
21 November 2026 after a short Dark Studio experiment. Product truth lives in
`PRODUCT.md`.

## 1. Principles

- Paper ground, ink lines, loud flat colour. Think screen print, not glass.
- Two pixels of ink do the work that gradients and blurs do elsewhere.
- Hard offset shadows: the page is a stack of printed sheets.
- Bold condensed display type, plain body type, short marker stickers only.
- Motion is short and mechanical. Controls press, cards step, nothing floats.
- Everything is local. No font, image or script leaves the origin.

## 2. Colours

| Role | Token | Value |
| --- | --- | --- |
| Paper | `--background` | `#FFF8E7` |
| Ink | `--foreground` | `#0B0B0B` |
| Card | `--card` | `#FFFFFF` |
| Pink | `pop-pink` | `#FF3EA5` |
| Cyan | `pop-cyan` | `#2DE2E6` |
| Yellow | `pop-yellow` | `#FFE600` |
| Orange | `pop-orange` | `#FF5C00` |
| Lime | `pop-lime` | `#B6FF3B` |
| Violet | `pop-violet` | `#8B5CF6` |

Rules:

- Borders on accent surfaces are ink `#0B0B0B`, not `border-foreground`, so
  they stay ink when the theme flips.
- Text on an accent is always ink. Never white on pink, yellow, cyan or lime.
- At most two accents per section. Everything else is paper, ink or muted.
- Muted text stops at 65 percent ink, the contrast floor for small labels.
- Dark theme inverts paper and ink. Accents and their ink text do not change.

## 3. Typography

| Role | Face | Use |
| --- | --- | --- |
| Display | **Anton** (`font-display`) | Headlines, card titles, step numbers |
| Body and UI | **Space Grotesk** (`font-sans`) | Copy, buttons, labels, inspector |
| Sticker | **Permanent Marker** (`font-marker`) | Short hand-written notes only |

Scale:

- Hero: `clamp(2.9rem, 8vw, 5.6rem)`, uppercase, leading `0.84`
- Section title: `text-4xl sm:text-5xl`, uppercase, leading `0.9`
- Card title: `text-lg` to `text-xl`, uppercase
- Micro-label: `text-[10px]` bold uppercase, tracking `0.16em`
- Body: `text-sm` to `text-base`, line height 1.6

No kicker above a heading. No section numbers. No caption under an image.
Marker face is for one short sticker, never a paragraph or a label.

## 4. Foundation

- Border: 2 px ink on panels, cards, buttons, frames and section breaks.
- Radius: `1rem` for cards, `0.5rem` for tiles, full for pills and buttons.
- Shadow: `shadow-neo-sm` 3 px, `shadow-neo` 6 px, `shadow-neo-lg` 10 px,
  `shadow-neo-xl` 14 px. Always a hard offset, never a blur.
- Editor stage: `grid-paper`, 32 px ink lines at 7 percent. This is a
  measurement surface and the only place a grid is allowed.
- Halftone: flat radial dot overlay. Use at 15 to 20 percent. Never blur it.
- Selection is pink with ink text. Caret is pink. Focus ring is 2 px ink.
- Scrollbars follow the ink token.

## 5. Components

**Button** — pill, 2 px ink border, bold uppercase, `shadow-neo-sm`. Primary is
ink on paper; outline is paper and turns yellow on hover; secondary is cyan.
Every button steps up-left on hover and presses down-right on click. Minimum
44 px tall on phones.

**Section heading** — one display heading and one short right description.
Equal left and right edges with the page container. No eyebrow. The steps and
features headings use the speech-bubble variant: bordered card, top-left tail,
hard shadow.

**Comic panel page** — the steps and features are drawn as printed comic pages.
A 2 px ink page frame with 16 px paper gutters and a hard shadow holds
sharp-cornered panels. Icons sit in star bursts with a 2.5 px outline and a
zero-blur offset shadow. Step panels carry a black number plate with a yellow
border. Halftone corners are flat, never blurred.

**Step page** — a wide first panel and two equal panels below. Fills are paper,
inverted ink and pink. Tags read 01 to 03. The page uses yellow and pink only.

**Feature page** — a cyan splash panel spanning two rows, one inverted panel,
then three equal panels. Pink bursts throughout. The page uses cyan and pink
only.

**Gallery** — six tilted frames with 2 px borders and a yellow tag inside the
frame. Hover straightens the frame and deepens the shadow. Every image ships a
640 px and a master variant with `srcSet` and `sizes`.

**FAQ** — one bordered card holding a divided accordion. Triggers are display
type and turn pink on hover.

**CTA** — ink band with halftone, one outline line of display type and a pink
button with a paper shadow.

**Editor** — paper stage, grid, checkerboard transparent board, 2 px preview
frame, pink loader. Inspector: white panel, 2 px dividers, pink layer tile,
cyan add button. Layer order stays base, text, cut-out.

## 6. Motion

| Element | Value |
| --- | --- |
| Button press | 120 ms, translate 2 px, shadow closes |
| Hover step | 120 ms, translate -2 px, shadow opens |
| Gallery hover | 300 ms straighten, 500 ms image zoom to 1.02 |
| Accordion | 180 ms ease-out |
| Hero entrance | 420 ms fade and 12 px rise, once |

No `ease-in`, no scale from zero, no scroll-linked motion, no parallax.
Hover transforms are gated behind a fine pointer. Reduced motion removes
movement and keeps opacity.

## 7. Page anatomy

Landing: header, hero, ticker, steps, gallery, features, FAQ, CTA, footer.
One idea per band. Every section starts with its heading. Steps and features
are closed comic pages. The other bands stay open layouts.

Editor: header, stage, inspector. The PNG renders at the source image
resolution. Type and letter spacing scale by `canvas.width / previewWidth`.
Keep this dynamic scale. Never restore a fixed multiplier.

Errors render an inline alert panel with a recovery action. No browser alert.

## 8. Accessibility

- Body text contrast is at least 4.5 to 1; large text at least 3 to 1.
- Controls and icon buttons are 44 px tall on phones.
- Both themes are checked at 1440 px and 390 px before a change ships.
- Focus, selection and caret follow the pink token.

## 9. Verify

```bash
npm run build
npm run shots
node scripts/smoke-test.mjs public/pressure.png
node .opencode/skills/design-taste-frontend/scripts/copy-lint.mjs page.html --kind software
```

The smoke test must report no external requests and no page errors. The copy
lint must report zero failures. Screenshots live in `design-inspiration/screens`.
