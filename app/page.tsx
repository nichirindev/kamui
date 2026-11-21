import { SiteHeader } from "@/components/site/site-header";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { HowItWorks } from "@/components/site/how-it-works";
import { Gallery } from "@/components/site/gallery";
import { Features } from "@/components/site/features";
import { Faq } from "@/components/site/faq";
import { Cta } from "@/components/site/cta";
import { SiteFooter } from "@/components/site/site-footer";

const ticker = [
  "Text behind image",
  "Runs 100% locally",
  "No uploads",
  "No accounts",
  "Full-res PNG export",
  "24 bundled fonts",
  "Works offline",
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Marquee
          items={ticker}
          className="text-sm font-bold uppercase tracking-[0.18em] sm:text-base"
        />
        <HowItWorks />
        <Gallery />
        <Features />
        <Faq />
        <Cta />
      </main>
      <SiteFooter />
    </div>
  );
}
