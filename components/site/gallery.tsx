/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { SectionHeading } from "@/components/site/section-heading";

const shots = [
  { src: "/gallery/pressure.jpg", w: 1200, alt: "Portrait with condensed type behind the subject", tag: "Portrait", tilt: "-rotate-1" },
  { src: "/gallery/cold.jpg", w: 1200, alt: "Cool-toned poster design with layered type", tag: "Poster", tilt: "rotate-1" },
  { src: "/gallery/nature.jpg", w: 1112, alt: "Outdoors photo with oversized headline", tag: "Editorial", tilt: "-rotate-2" },
  { src: "/gallery/sf.jpg", w: 1200, alt: "City scene with bold type behind a landmark", tag: "Travel", tilt: "rotate-2" },
  { src: "/gallery/snap.jpg", w: 1174, alt: "Street photograph with playful typography", tag: "Street", tilt: "-rotate-1" },
  { src: "/gallery/vie.jpg", w: 1126, alt: "Lifestyle shot with a loud text treatment", tag: "Lifestyle", tilt: "rotate-1" },
];

export function Gallery() {
  return (
    <section id="gallery" className="border-y-2 border-foreground bg-secondary/40">
      <div className="mx-auto max-w-[1360px] px-5 py-16 sm:px-8 sm:py-24">
        <SectionHeading
          title={
            <>
              Real exports.
              <br />
              No mock-ups.
            </>
          }
          description="Each frame is a photo with type placed behind the cut-out subject, exported as a PNG at source size."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shots.map((shot, i) => (
            <Link
              key={shot.src}
              href="/app"
              className={`group ui-press block focus-visible:outline-offset-4 ${shot.tilt} transition-transform duration-300 hov:hover:rotate-0`}
              aria-label={`${shot.tag}: open the studio`}
            >
              <div className="relative overflow-hidden border-2 border-[#0b0b0b] bg-card p-1.5 shadow-neo transition-shadow duration-200 hov:group-hover:shadow-neo-lg">
                <img
                  src={shot.src}
                  srcSet={`${shot.src.replace(/\.jpg$/, "-640.jpg")} 640w, ${shot.src} ${shot.w}w`}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 45vw, 90vw"
                  alt={shot.alt}
                  loading={i > 2 ? "lazy" : "eager"}
                  decoding="async"
                  className="aspect-[4/5] w-full border-2 border-[#0b0b0b] object-cover transition-transform duration-500 hov:group-hover:scale-[1.02]"
                />
                <span className="absolute left-4 top-4 border-2 border-[#0b0b0b] bg-pop-yellow px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0b0b0b]">
                  {shot.tag}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
