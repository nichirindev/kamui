import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#gallery", label: "Gallery" },
  { href: "#features", label: "Features" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-foreground bg-background">
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Text Behind home">
          <span className="grid h-9 w-9 place-items-center rounded-lg border-2 border-[#0b0b0b] bg-pop-pink font-display text-lg leading-none text-[#0b0b0b] shadow-neo-sm transition-transform duration-200 ease-neo hov:group-hover:-rotate-6">
            T/
          </span>
          <span className="font-display text-xl uppercase leading-none tracking-wide sm:text-2xl">
            Text<span className="text-pop-pink">/</span>Behind
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-bold uppercase tracking-[0.16em] transition-colors hover:text-pop-pink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/app">
              Open studio
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="sm" className="sm:hidden">
            <Link href="/app">Studio</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
