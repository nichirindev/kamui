import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/site/section-heading";

const faqs = [
  {
    q: "Is my photo ever uploaded?",
    a: "No. The background-removal model is downloaded to the app once, then runs entirely in your browser. Your image never leaves the device.",
  },
  {
    q: "Do I need an account?",
    a: "No account, paywall or sign-up. Open the studio and start editing.",
  },
  {
    q: "Does it work offline?",
    a: "Yes. After the app is installed and built once, every asset is served locally. Disconnect and the whole pipeline still works.",
  },
  {
    q: "What can I export?",
    a: "A full-resolution PNG with the original photo, your text layers and the cut-out subject composited in the right order.",
  },
  {
    q: "Which fonts are included?",
    a: "Twenty-four open-source families, self-hosted as web fonts so the picker works without network access.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-t-2 border-foreground">
      <div className="mx-auto grid max-w-[1360px] gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          className="self-start lg:flex-col lg:items-start lg:gap-5"
          title={
            <>
              Questions,
              <br />
              answered.
            </>
          }
          description="Short answers about privacy, offline use and export."
        />

        <div className="rounded-2xl border-2 border-[#0b0b0b] bg-card px-5 shadow-neo sm:px-7">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>
                  <p className="max-w-[58ch] pb-5 text-sm leading-relaxed text-foreground/75">
                    {faq.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
