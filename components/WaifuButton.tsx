"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PixelWaifu from "@/components/PixelWaifu";
import { useShrine } from "@/lib/shrine-context";
import { EXPRESSION_CYCLE, type Expression, type Waifu } from "@/lib/sprites";

interface WaifuButtonProps {
  waifu: Waifu;
  scale?: number;
  showName?: boolean;
}

const BUBBLE_MS = 5000;

/** A clickable waifu: each click cycles her expression and she says one of her lines in a bubble. */
export default function WaifuButton({ waifu, scale = 4, showName = true }: WaifuButtonProps) {
  const { t } = useShrine();
  const [step, setStep] = useState(0);
  const [line, setLine] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const speak = useCallback(() => {
    setStep((current) => current + 1);
    setLine((current) => {
      const options = waifu.lines.filter((candidate) => candidate !== current);
      return options[Math.floor(Math.random() * options.length)] ?? waifu.lines[0];
    });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setLine(null), BUBBLE_MS);
  }, [waifu.lines]);

  const expression: Expression = EXPRESSION_CYCLE[step % EXPRESSION_CYCLE.length];

  return (
    <div className="waifu">
      {line ? (
        <p className="waifu__bubble" role="status">
          {t(line)}
        </p>
      ) : null}
      <button type="button" className="waifu__button" onClick={speak} aria-label={`Talk to ${waifu.name}`}>
        <PixelWaifu waifu={waifu} expression={expression} scale={scale} className="waifu__sprite" />
      </button>
      {showName ? (
        <p className="waifu__name">
          <span className="waifu__nametag">{waifu.name}</span>
          <span className="waifu__title">{t(waifu.title)}</span>
        </p>
      ) : null}
    </div>
  );
}
