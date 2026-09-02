"use client";

import { useShrine } from "@/lib/shrine-context";

interface MarqueeProps {
  items: readonly string[];
}

/** The scrolling banner every 1998 page had. Pauses on hover. Text is duplicated for a seamless loop. */
export default function Marquee({ items }: MarqueeProps) {
  const { t } = useShrine();
  const text = items.map((item) => `☆ ${t(item)}`).join("  ");
  return (
    <div className="marquee" aria-label={text}>
      <div className="marquee__track" aria-hidden="true">
        <span>{text}&nbsp;&nbsp;</span>
        <span>{text}&nbsp;&nbsp;</span>
      </div>
    </div>
  );
}
