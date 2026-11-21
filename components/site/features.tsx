import {
  Cpu,
  FileImage,
  Moon,
  ShieldCheck,
  SlidersHorizontal,
  WifiOff,
} from "lucide-react";

import { Burst } from "@/components/site/burst";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Cpu,
    title: "Your machine does the work",
    body: "An ONNX segmentation model runs on WebAssembly right in the tab. Nothing is uploaded, nothing is queued.",
    span: "sm:col-span-2 lg:col-span-3 lg:row-span-2",
    panel: "border-[#0b0b0b] bg-pop-cyan text-[#0b0b0b]",
    bodyClass: "text-[#0b0b0b]/80",
    burst: "text-pop-pink",
    splash: true,
    halftone: true,
  },
  {
    icon: WifiOff,
    title: "Works with the Wi-Fi off",
    body: "Model, fonts and images are all served locally. Pull the plug and the studio still runs.",
    span: "lg:col-span-3",
    panel: "border-[#0b0b0b] bg-foreground text-background",
    bodyClass: "text-background/80",
    burst: "text-pop-pink",
    splash: false,
    halftone: false,
  },
  {
    icon: SlidersHorizontal,
    title: "Every type control",
    body: "Font, size, weight, spacing, opacity, rotation and 3D tilt, all live on the canvas.",
    span: "lg:col-span-3",
    panel: "border-foreground bg-card text-foreground",
    bodyClass: "text-foreground/75",
    burst: "text-pop-pink",
    splash: false,
    halftone: false,
  },
  {
    icon: FileImage,
    title: "Full-resolution PNG",
    body: "Export redraws at the source image size, and type scales with the live preview.",
    span: "lg:col-span-2",
    panel: "border-foreground bg-card text-foreground",
    bodyClass: "text-foreground/75",
    burst: "text-pop-pink",
    splash: false,
    halftone: false,
  },
  {
    icon: Moon,
    title: "Light and dark",
    body: "Two complete themes from one set of tokens. Both stay readable at any size.",
    span: "lg:col-span-2",
    panel: "border-foreground bg-card text-foreground",
    bodyClass: "text-foreground/75",
    burst: "text-pop-pink",
    splash: false,
    halftone: false,
  },
  {
    icon: ShieldCheck,
    title: "Nothing tracked",
    body: "No analytics, ads or cookies. After setup the browser makes no network request at all.",
    span: "sm:col-span-2 lg:col-span-2",
    panel: "border-foreground bg-card text-foreground",
    bodyClass: "text-foreground/75",
    burst: "text-pop-pink",
    splash: false,
    halftone: true,
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-[1360px] px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading
        bubble
        title={
          <>
            A tool that
            <br />
            respects the machine.
          </>
        }
        description="Everything needed to make the image is already in the browser. Nothing else is loaded."
      />

      <div className="mt-12 grid gap-4 border-2 border-foreground bg-background p-4 shadow-neo-lg sm:grid-cols-2 lg:grid-cols-6">
        {features.map((feature, i) => (
          <article
            key={feature.title}
            className={cn(
              "relative h-full rounded-[2px] border-2",
              feature.splash ? "p-6 sm:p-8" : "p-5 sm:p-6",
              feature.panel,
              feature.span
            )}
          >
            {feature.halftone ? (
              <span
                aria-hidden
                className={cn(
                  "halftone pointer-events-none absolute right-0 top-0 opacity-20",
                  feature.splash ? "h-40 w-40" : "h-24 w-24"
                )}
              />
            ) : null}

            {feature.splash ? (
              <div className="relative z-10 flex h-full flex-col">
                <Burst
                  size="lg"
                  fillClassName={feature.burst}
                  strokeClassName={
                    i === 1 ? "stroke-background" : undefined
                  }
                  className="h-20 w-20"
                >
                  <feature.icon className="h-7 w-7" strokeWidth={2.2} />
                </Burst>

                <h3 className="mt-8 max-w-[18ch] font-display text-3xl uppercase leading-[0.95] tracking-tight sm:text-4xl">
                  {feature.title}
                </h3>
                <p
                  className={cn(
                    "mt-auto max-w-[36ch] border-t-2 border-[#0b0b0b]/25 pt-4 text-sm leading-relaxed",
                    feature.bodyClass
                  )}
                >
                  {feature.body}
                </p>
              </div>
            ) : (
              <div className="relative z-10 flex h-full flex-col">
                <Burst
                  fillClassName={feature.burst}
                  strokeClassName={
                    i === 1 ? "stroke-background" : undefined
                  }
                  className="h-12 w-12"
                >
                  <feature.icon className="h-5 w-5" strokeWidth={2.2} />
                </Burst>

                <h3 className="mt-5 font-display text-xl uppercase leading-tight tracking-tight">
                  {feature.title}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-sm leading-relaxed",
                    feature.bodyClass
                  )}
                >
                  {feature.body}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
