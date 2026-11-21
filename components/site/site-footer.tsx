import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Studio", href: "/app" },
      { label: "How it works", href: "#how" },
      { label: "Gallery", href: "#gallery" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Features", href: "#features" },
      { label: "Source", href: "https://github.com/RexanWONG/text-behind-image" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto grid max-w-[1360px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg border-2 border-[#0b0b0b] bg-pop-pink font-display text-lg leading-none text-[#0b0b0b] shadow-neo-sm">
              T/
            </span>
            <span className="font-display text-xl uppercase tracking-wide">
              Text<span className="text-pop-pink">/</span>Behind
            </span>
          </Link>
          <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-foreground/70">
            An offline, open-source text-behind-image studio. Photos stay on the
            device.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/70">
              {column.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium transition-colors hover:text-pop-pink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-foreground">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-2 px-5 py-5 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© {new Date().getFullYear()} Text/Behind, offline fork</span>
          <span>AGPL-3.0 · Built with Next.js · No trackers</span>
        </div>
      </div>
    </footer>
  );
}
