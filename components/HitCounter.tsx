"use client";

import { useShrine } from "@/lib/shrine-context";
import { useLocalCount } from "@/lib/use-local-count";

const DIGITS = 6;

/** Counts visits in this browser only, and says so. No fake global number. */
export default function HitCounter() {
  const { t } = useShrine();
  const { count } = useLocalCount("howwy-hits", true);
  const digits = String(count).padStart(DIGITS, "0").split("");
  return (
    <div className="counter">
      <p className="counter__label">{t("You are visitor number")}</p>
      <p className="counter__digits" aria-label={`${count}`}>
        {digits.map((digit, i) => (
          <span key={i} className="counter__digit">
            {digit}
          </span>
        ))}
      </p>
      <p className="counter__note">{t("(counted on your computer only)")}</p>
    </div>
  );
}
