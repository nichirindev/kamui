import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  slow?: boolean;
};

/**
 * Pure-CSS infinite ticker. The list is rendered twice so the
 * -50% translate loops seamlessly.
 */
export function Marquee({ items, className, slow }: MarqueeProps) {
  const content = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center">
          <span className="whitespace-nowrap">{item}</span>
          <span aria-hidden className="mx-6 inline-block text-[0.55em] align-middle">
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "marquee relative flex w-full overflow-hidden border-y-2 border-foreground bg-foreground py-3 text-background",
        className
      )}
    >
      <div
        className={cn(
          "flex min-w-full items-center",
          slow ? "marquee-track-slow" : "marquee-track"
        )}
      >
        {content}
        {content}
      </div>
    </div>
  );
}
