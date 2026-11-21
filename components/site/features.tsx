import {
  Cpu,
  WifiOff,
  SlidersHorizontal,
  FileImage,
  Moon,
  ShieldCheck,
} from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";

const features = [
  {
    icon: Cpu,
    title: "Your machine does the work",
    body: "An ONNX segmentation model runs on WebAssembly right in the tab. Nothing is uploaded, nothing is queued.",
    className: "md:col-span-2 bg-pop-cyan text-[#0b0b0b]",
  },
  {
    icon: WifiOff,
    title: "Works with the Wi-Fi off",
    body: "Model, fonts and images are all served locally. Pull the plug and the studio still runs.",
    className: "bg-card",
  },
  {
    icon: SlidersHorizontal,
    title: "Every type control",
    body: "Font, size, weight, spacing, opacity, rotation and 3D tilt, all live on the canvas.",
    className: "bg-card",
  },
  {
    icon: FileImage,
    title: "Full-resolution PNG",
    body: "Export redraws at the source image size, and type scales with the live preview.",
    className: "bg-card",
  },
  {
    icon: Moon,
    title: "Light and dark",
    body: "Two complete themes from one set of tokens. Both stay readable at any size.",
    className: "bg-card",
  },
  {
    icon: ShieldCheck,
    title: "Nothing tracked",
    body: "No analytics, ads or cookies. After setup the browser makes no network request at all.",
    className: "md:col-span-3 bg-card",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-[1360px] px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading
        title={
          <>
            A tool that
            <br />
            respects the machine.
          </>
        }
        description="Everything needed to make the image is already in the browser. Nothing else is loaded."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className={`neo-hover rounded-2xl border-2 border-[#0b0b0b] p-6 shadow-neo ${feature.className}`}
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl border-2 border-[#0b0b0b] bg-pop-pink text-[#0b0b0b]">
              <feature.icon className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <h3 className="mt-6 font-display text-lg uppercase leading-tight tracking-tight">
              {feature.title}
            </h3>
            <p className="mt-2 max-w-[46ch] text-sm leading-relaxed opacity-80">
              {feature.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
