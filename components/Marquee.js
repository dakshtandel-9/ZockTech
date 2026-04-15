import React from "react";

export function Marquee({
  className = "",
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) {
  const animClass = vertical
    ? "animate-magic-marquee-vertical flex-col"
    : reverse
    ? "animate-magic-marquee-reverse flex-row"
    : "animate-magic-marquee flex-row";

  return (
    <div
      {...props}
      className={`group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] gap-[var(--gap)] ${
        vertical ? "flex-col" : "flex-row"
      } ${className}`}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`flex shrink-0 justify-around gap-[var(--gap)] ${animClass} ${
              pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
            }`}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
