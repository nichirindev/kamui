import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: React.ReactNode;
  description?: string;
  className?: string;
  bubble?: boolean;
};

export function SectionHeading({
  title,
  description,
  className,
  bubble = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <h2 className="font-display text-4xl uppercase leading-[0.9] tracking-tight sm:text-5xl">
        {title}
      </h2>
      {description ? (
        bubble ? (
          <div className="relative w-full max-w-sm rounded-xl border-2 border-foreground bg-card p-4 shadow-neo-sm">
            <span
              aria-hidden
              className="absolute -top-2.5 left-8 h-4 w-4 rotate-45 border-l-2 border-t-2 border-foreground bg-card"
            />
            <p className="text-sm leading-relaxed text-foreground/80">
              {description}
            </p>
          </div>
        ) : (
          <p className="max-w-sm text-sm leading-relaxed text-foreground/70 sm:text-right">
            {description}
          </p>
        )
      ) : null}
    </div>
  );
}
