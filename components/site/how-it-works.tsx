import { ImageUp, Type, Download } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";

const steps = [
  {
    n: "01",
    icon: ImageUp,
    title: "Drop a photo",
    body: "Pick a JPG or PNG. The subject is segmented automatically in your browser, with no masking and no waiting on a server.",
    tint: "bg-pop-yellow text-[#0b0b0b]",
  },
  {
    n: "02",
    icon: Type,
    title: "Type your line",
    body: "Dial in font, weight, colour, spacing, rotation and 3D tilt. The cut-out stays on top, so the type sits behind it.",
    tint: "bg-foreground text-background",
  },
  {
    n: "03",
    icon: Download,
    title: "Export the PNG",
    body: "One click re-draws every layer at source resolution and saves a PNG straight to your downloads.",
    tint: "bg-pop-pink text-[#0b0b0b]",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-[1360px] px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading
        title={
          <>
            Three steps to a finished image.
          </>
        }
        description="The whole pipeline runs in the tab. Nothing is sent to a server at any point."
      />

      <ol className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <li
            key={step.n}
            className={`relative rounded-2xl border-2 border-[#0b0b0b] bg-card p-6 shadow-neo transition-transform duration-200 hover:-translate-y-1 ${
              i === 1 ? "md:translate-y-6" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`grid h-11 w-11 place-items-center rounded-xl border-2 border-[#0b0b0b] ${step.tint}`}
              >
                <step.icon className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="font-display text-2xl leading-none text-foreground/25">
                {step.n}
              </span>
            </div>
            <h3 className="mt-6 font-display text-xl uppercase leading-none tracking-tight">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/75">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
