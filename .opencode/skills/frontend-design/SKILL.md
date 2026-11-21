---
name: frontend-design
description: Design and build UI for the Text/Behind offline studio in its Neo-Pop system. Use when adding a page, section, component or visual change to this repo, or when reviewing UI for consistency with DESIGN.md.
---

# Text/Behind — Neo-Pop Frontend Skill

Use this skill for any visual or UI work in this repository. `DESIGN.md` is the
system of record. `PRODUCT.md` is the product truth. This file is the procedure.

## Read first

1. `DESIGN.md` — palette, type, components, motion, rules.
2. `app/globals.css` — tokens and utilities.
3. `tailwind.config.ts` — `font-display`, `font-sans`, `font-marker`, `pop.*`,
   `shadow-neo*`.
4. One nearby component in `components/site/` or `components/editor/`.

Also use the vendored skills for specific work: `impeccable` for craft audits,
`design-taste-frontend` for copy and layout gates, `emil-design-eng` and
`animate` for motion decisions.

## Non-negotiables

- **Offline only.** No external fonts, images, icons, analytics or requests.
  Fonts come from `public/fonts`, model from `public/imgly`.
- **Neo-Pop only.** Paper and ink, 2 px borders, hard offset shadows, flat
  accents. No gradients, glass, blur decoration or soft depth.
- **Anton** for display (`font-display`), **Space Grotesk** for UI and body
  (`font-sans`), **Permanent Marker** only for one short sticker.
- Ink `#0b0b0b` borders on accent surfaces, not `border-foreground`.
- Accent text is always ink, never white.
- Max two accents per section. Everything else is paper, ink or muted.
- No kicker above a heading. No caption under an image.
- Controls are 44 px tall on phones. Muted text stays at 65 percent or more.
- Preserve functionality: background removal, canvas compositing, drag and
  drop, dynamic export and the 24-font picker are fixed.

## Recipes

**Section shell**

```tsx
<section id="name" className="mx-auto max-w-[1360px] px-5 py-16 sm:px-8 sm:py-24">
  <SectionHeading title={<>One clear claim.</>} description="Short support." />
  {/* grid or list */}
</section>
```

`SectionHeading` takes `title`, `description` and `className` only.

**Card**

```tsx
<div className="rounded-2xl border-2 border-[#0b0b0b] bg-card p-6 shadow-neo transition-transform duration-200 hover:-translate-y-1">
  <span className="grid h-11 w-11 place-items-center rounded-xl border-2 border-[#0b0b0b] bg-pop-pink text-[#0b0b0b]">
    <Icon className="h-5 w-5" strokeWidth={2.2} />
  </span>
  <h3 className="mt-6 font-display text-lg uppercase leading-tight">Title</h3>
  <p className="mt-2 text-sm leading-relaxed text-foreground/80">Body.</p>
</div>
```

**Comic panel page**

```tsx
<div className="grid gap-4 border-2 border-foreground bg-background p-4 shadow-neo-lg sm:grid-cols-2 lg:grid-cols-6">
  <article className="relative rounded-[2px] border-2 border-[#0b0b0b] bg-pop-cyan p-6 text-[#0b0b0b] sm:col-span-2 lg:col-span-3 lg:row-span-2">
    <span aria-hidden className="halftone pointer-events-none absolute right-0 top-0 h-40 w-40 opacity-20" />
    <div className="relative z-10 flex h-full flex-col">
      <Burst fillClassName="text-pop-pink" className="h-20 w-20">
        <Icon className="h-7 w-7" />
      </Burst>
      <h3 className="mt-8 font-display text-3xl uppercase">Title</h3>
    </div>
  </article>
</div>
```

Use a 2 px page frame, 16 px paper gutters, sharp `rounded-[2px]` panels and
`Burst` from `components/site/burst`. On inverted panels pass
`strokeClassName="stroke-background"`. Keep two accents per page. No hover
motion: panels are printed, not clickable. Add `bubble` to `SectionHeading` for
the caption.

**Image frame**

```tsx
<Link href="/app" className="group -rotate-1 transition-transform duration-300 hover:rotate-0">
  <div className="border-2 border-[#0b0b0b] bg-card p-1.5 shadow-neo group-hover:shadow-neo-lg">
    <img
      src="/gallery/x.jpg"
      srcSet="/gallery/x-640.jpg 640w, /gallery/x.jpg 1200w"
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 45vw, 90vw"
      alt="…"
      loading="lazy"
      className="aspect-[4/5] w-full border-2 border-[#0b0b0b] object-cover"
    />
  </div>
</Link>
```

Every new image needs a 640 px variant. Tags go inside the frame as a yellow
chip. Never put a caption under the image.

**Button**

```tsx
<Button asChild size="lg">
  <Link href="/app">Launch the studio <ArrowRight className="h-4 w-4" /></Link>
</Button>
```

Use plain `<img>` for `blob:` previews. The optimizer is unnecessary offline.

## Adding a section

1. Create `components/site/<name>.tsx`, server component unless it needs state.
2. Reuse `SectionHeading` and the container width.
3. One job, one heading, no eyebrow, no third accent.
4. Compose it in `app/page.tsx`; update the header links only if needed.
5. Check dark and light at 390 px and 1440 px.
6. Add a 640 px variant for any new image.

## Editor rules

- File: `app/app/page.tsx`. Keep `removeBackground`, `setupImage`, `textSets`,
  `saveCompositeImage` and the hidden canvas intact.
- Export scale is dynamic. `saveCompositeImage` measures `previewImgRef` and
  scales font size and letter spacing by the source width divided by the
  preview width. Never restore a fixed multiplier.
- Failures render the inline alert panel with a recovery action. No `alert()`.
- Header actions stay: Upload image, Save image, theme toggle. The smoke test
  finds the file input, `Add New Text Set`, `Save image`, `img[alt="Removed bg"]`
  and the `edit` accordion trigger.
- Stage keeps `img[alt="Uploaded"]` and the layers in order: base, text, cut-out.
- Inspector needs `lg:grid-rows-[minmax(0,1fr)]` and `min-h-0` on the scroll
  area or the canvas clips.

## Motion rules

- Decide whether motion is needed before adding it. High-frequency controls do
  not animate beyond press feedback.
- One authored entrance per page. Nothing animates on scroll.
- UI motion stays under 300 ms except one dealt moment.
- Use transitions for interruptible UI. Gate hover with a fine pointer.
- Respect `prefers-reduced-motion`: remove movement, keep opacity.

## Gotchas

- Fonts are imported once in `app/layout.tsx`. Do not import them again.
- `next build` runs Tailwind. Keep the shadcn semantic tokens in the config.
- The Dark Studio utilities (`studio-*`, `shadow-float`, `grid-measure`) were
  removed. Do not restore them.
- Do not bump `@imgly/background-removal` past 1.5.5.
- Leave `public/imgly` and `public/fonts` untouched during visual work.

## Quality checklist

- [ ] 2 px ink borders, hard offset shadows, two accents at most
- [ ] Comic pages use 16 px gutters, sharp corners and a visible burst outline
- [ ] No kicker, no caption, no soft shadow, no gradient
- [ ] Accent text is ink, never white
- [ ] Buttons 44 px on phones, muted text at 65 percent or more
- [ ] Motion short, reduced motion handled
- [ ] New images ship a 640 px variant with `srcSet` and `sizes`
- [ ] Dark and light checked at 390 px and 1440 px
- [ ] No external request introduced
- [ ] `npm run build` passes
- [ ] `node scripts/smoke-test.mjs public/pressure.png` passes

## Commands

```bash
npm run dev
npm run build
npm start
npm run shots
node scripts/smoke-test.mjs public/pressure.png
```
