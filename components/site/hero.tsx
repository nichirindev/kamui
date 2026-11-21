/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const stats = [
  { value: "0", label: "uploads" },
  { value: "100%", label: "in-browser" },
  { value: "PNG", label: "full res" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] border-l-2 border-foreground bg-pop-cyan/25 lg:block"
      />
      <div
        aria-hidden
        className="halftone pointer-events-none absolute -bottom-10 left-0 h-40 w-40 opacity-20"
      />

      <div className="relative mx-auto grid max-w-[1360px] items-center gap-14 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
        <div className="pop-enter">
          <h1 className="font-display text-[clamp(2.9rem,8vw,5.6rem)] uppercase leading-[0.84] tracking-tight">
            Put type
            <br />
            <span className="inline-block bg-pop-pink px-2 text-[#0b0b0b]">
              behind
            </span>{" "}
            the subject.
          </h1>

          <p className="mt-7 max-w-[46ch] text-base leading-relaxed text-foreground/75">
            Drop a photo. The subject is cut out on your machine, then you place
            type behind it. No uploads, no account, no network after setup.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/app">
                Launch the studio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <a href="#how">
                See how it works
                <ArrowDown className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 border-t-2 border-foreground pt-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-l-2 border-foreground pl-5 first:border-0 first:pl-0"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl leading-none tabular">
                  {stat.value}
                </dd>
                <dd className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/70">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="pop-enter relative mx-auto w-full max-w-[520px] lg:max-w-none">
          <div className="relative -rotate-1 border-2 border-[#0b0b0b] bg-card p-2 shadow-neo-xl">
            <img
              src="/gallery/pressure.jpg"
              srcSet="/gallery/pressure-640.jpg 640w, /gallery/pressure.jpg 1200w"
              sizes="(min-width: 1024px) 560px, 88vw"
              alt="A portrait with oversized type layered behind the subject"
              className="aspect-[4/5] w-full border-2 border-[#0b0b0b] object-cover"
              fetchPriority="high"
            />
            <span className="absolute -right-4 -top-4 rotate-6 border-2 border-[#0b0b0b] bg-pop-pink px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0b0b0b] shadow-neo-sm">
              On-device
            </span>
          </div>
          <div
            aria-hidden
            className="absolute -bottom-5 -left-5 -z-10 h-32 w-32 border-2 border-foreground bg-pop-cyan"
          />
        </figure>
      </div>
    </section>
  );
}
