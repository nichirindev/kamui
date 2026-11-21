import { Download, ImageUp, Type } from "lucide-react";

import { Burst } from "@/components/site/burst";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    icon: ImageUp,
    title: "Drop a photo",
    body: "Pick a JPG or PNG. The subject is segmented automatically in your browser, with no masking and no waiting on a server.",
    panel: "border-foreground bg-card text-foreground",
    bodyClass: "text-foreground/75",
    burst: "text-pop-yellow",
    halftone:
      "halftone pointer-events-none absolute right-0 top-0 h-28 w-28 opacity-20 md:inset-y-0 md:h-full md:w-1/3 md:opacity-10",
  },
  {
    n: "02",
    icon: Type,
    title: "Type your line",
    body: "Dial in font, weight, colour, spacing, rotation and 3D tilt. The cut-out stays on top, so the type sits behind it.",
    panel: "border-[#0b0b0b] bg-foreground text-background",
    bodyClass: "text-background/80",
    burst: "text-pop-pink",
    halftone: null,
  },
  {
    n: "03",
    icon: Download,
    title: "Export the PNG",
    body: "One click re-draws every layer at source resolution and saves a PNG straight to your downloads.",
    panel: "border-[#0b0b0b] bg-pop-pink text-[#0b0b0b]",
    bodyClass: "text-[#0b0b0b]/80",
    burst: "text-pop-yellow",
    halftone:
      "halftone pointer-events-none absolute right-0 top-0 h-28 w-28 opacity-20",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-[1360px] px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading
        bubble
        title={<>Three steps to a finished image.</>}
        description="The whole pipeline runs in the tab. Nothing is sent to a server at any point."
      />

      <ol className="mt-12 grid grid-cols-1 gap-4 border-2 border-foreground bg-background p-4 shadow-neo-lg md:grid-cols-2">
        {steps.map((step, i) => (
          <li
            key={step.n}
            className={cn(
              "relative rounded-[2px] border-2 p-5 sm:p-7",
              step.panel,
              i === 0 && "md:col-span-2"
            )}
          >
            {step.halftone ? (
              <span aria-hidden className={step.halftone} />
            ) : null}

            <span className="absolute -top-3 left-5 z-20 border-2 border-pop-yellow bg-[#0b0b0b] px-2.5 py-1 font-display text-sm leading-none tracking-[0.1em] text-pop-yellow shadow-neo-sm">
              {step.n}
            </span>

            <div className="relative z-10">
              {i === 0 ? (
                <div className="flex flex-col gap-6 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10">
                  <div className="order-2 md:order-1">
                    <h3 className="font-display text-3xl uppercase leading-[0.95] tracking-tight sm:text-4xl">
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 max-w-[52ch] text-sm leading-relaxed",
                        step.bodyClass
                      )}
                    >
                      {step.body}
                    </p>
                  </div>

                  <div className="order-1 md:order-2">
                    <Burst
                      size="lg"
                      fillClassName={step.burst}
                      className="h-16 w-16 md:h-28 md:w-28"
                    >
                      <step.icon
                        className="h-6 w-6 md:h-9 md:w-9"
                        strokeWidth={2.2}
                      />
                    </Burst>
                  </div>
                </div>
              ) : (
                <>
                  <Burst
                    fillClassName={step.burst}
                    strokeClassName={
                      i === 1 ? "stroke-background" : undefined
                    }
                    className="h-14 w-14"
                  >
                    <step.icon className="h-5 w-5" strokeWidth={2.2} />
                  </Burst>

                  <h3 className="mt-6 font-display text-2xl uppercase leading-none tracking-tight">
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 max-w-[48ch] text-sm leading-relaxed",
                      step.bodyClass
                    )}
                  >
                    {step.body}
                  </p>
                </>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
