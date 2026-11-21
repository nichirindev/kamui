import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const BURST_PATH =
  "M50 1L59.1 16.2L74.5 7.6L74.7 25.3L92.4 25.5L83.8 40.9L99 50L83.8 59.1L92.4 74.5L74.7 74.7L74.5 92.4L59.1 83.8L50 99L40.9 83.8L25.5 92.4L25.3 74.7L7.6 74.5L16.2 59.1L1 50L16.2 40.9L7.6 25.5L25.3 25.3L25.5 7.6L40.9 16.2Z";

type BurstProps = {
  children: ReactNode;
  className?: string;
  fillClassName?: string;
  iconClassName?: string;
  strokeClassName?: string;
  size?: "sm" | "lg";
};

/**
 * Comic action badge. The star is an inline SVG so the 2 px ink outline
 * stays crisp at every size. The hard offset comes from a zero-blur filter.
 */
export function Burst({
  children,
  className,
  fillClassName = "text-pop-yellow",
  iconClassName = "text-[#0b0b0b]",
  strokeClassName = "stroke-[#0b0b0b]",
  size = "sm",
}: BurstProps) {
  return (
    <span
      className={cn(
        "relative inline-grid shrink-0 place-items-center",
        size === "lg" ? "burst-shadow-lg" : "burst-shadow",
        className
      )}
    >
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className={cn("absolute inset-0 h-full w-full", fillClassName)}
      >
        <path
          d={BURST_PATH}
          fill="currentColor"
          className={strokeClassName}
          strokeWidth="2.5"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className={cn("relative", iconClassName)}>{children}</span>
    </span>
  );
}
