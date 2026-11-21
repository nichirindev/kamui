import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: React.ReactNode;
  description?: string;
  className?: string;
};

export function SectionHeading({
  title,
  description,
  className,
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
        <p className="max-w-sm text-sm leading-relaxed text-foreground/70 sm:text-right">
          {description}
        </p>
      ) : null}
    </div>
  );
}
