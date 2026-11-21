import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="relative overflow-hidden border-y-2 border-foreground bg-foreground text-background">
      <div aria-hidden className="pointer-events-none absolute inset-0 halftone opacity-15" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rotate-12 border-2 border-background bg-pop-pink"
      />

      <div className="relative mx-auto flex max-w-[1360px] flex-col items-center px-5 py-20 text-center sm:px-8 sm:py-24">
        <h2 className="font-display text-[clamp(2.6rem,9vw,6.5rem)] uppercase leading-[0.82] tracking-tight">
          Make something
          <br />
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "2px hsl(var(--background))" }}
          >
            loud.
          </span>
        </h2>

        <p className="mt-6 max-w-[44ch] text-sm leading-relaxed text-background/75">
          No sign-up, queue or watermark. Just a photo, your words and a studio
          that runs on your machine.
        </p>

        <Button
          asChild
          size="lg"
          variant="outline"
          className="mt-8 w-full border-[#0b0b0b] bg-pop-pink text-[#0b0b0b] shadow-[6px_6px_0_0_hsl(var(--background))] hover:bg-pop-yellow hover:text-[#0b0b0b] sm:w-auto"
        >
          <Link href="/app">
            Open the studio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
