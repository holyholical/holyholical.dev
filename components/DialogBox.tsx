"use client";

import { useCallback, useEffect, useState } from "react";
import PixelWaifu from "@/components/PixelWaifu";
import { useShrine } from "@/lib/shrine-context";
import type { Expression, Waifu } from "@/lib/sprites";

export interface DialogLine {
  text: string;
  expression: Expression;
}

interface DialogBoxProps {
  speaker: Waifu;
  lines: readonly DialogLine[];
}

const TYPE_MS = 28;

/** Visual-novel text box: types each line out, click or Enter to finish or advance. */
export default function DialogBox({ speaker, lines }: DialogBoxProps) {
  const { t } = useShrine();
  const [{ index, shown }, setCursor] = useState({ index: 0, shown: 0 });
  const current = lines[index];
  const full = t(current.text);
  const visible = Math.min(shown, full.length);
  const isTyping = visible < full.length;
  const isLast = index === lines.length - 1;

  useEffect(() => {
    if (!isTyping) return;
    const id = setTimeout(() => setCursor((c) => ({ ...c, shown: c.shown + 1 })), TYPE_MS);
    return () => clearTimeout(id);
  }, [isTyping, visible]);

  const advance = useCallback(() => {
    setCursor((c) =>
      c.shown < full.length ? { ...c, shown: full.length } : { index: isLast ? 0 : c.index + 1, shown: 0 },
    );
  }, [full.length, isLast]);

  return (
    <div className="vn">
      <div className="vn__portrait">
        <PixelWaifu waifu={speaker} expression={current.expression} scale={5} />
      </div>
      <button type="button" className="vn__box" onClick={advance} aria-live="polite">
        <span className="vn__name">{speaker.name}</span>
        <span className="vn__text">{full.slice(0, visible)}</span>
        <span className="vn__hint" aria-hidden="true">
          {isTyping ? "…" : isLast ? "↺ again" : "▼"}
        </span>
        <span className="vn__count" aria-hidden="true">
          {index + 1}/{lines.length}
        </span>
      </button>
    </div>
  );
}
