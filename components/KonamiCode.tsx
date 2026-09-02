"use client";

import { useEffect, useState } from "react";
import { useShrine } from "@/lib/shrine-context";

const SEQUENCE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const TOAST_MS = 3200;

/** Listens for the Konami code and flips MAXIMUM KAWAII mode. Also exposes a button for touch visitors. */
export default function KonamiCode() {
  const { isMax, setMax, t } = useShrine();
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    let progress = 0;
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      progress = key === SEQUENCE[progress] ? progress + 1 : key === SEQUENCE[0] ? 1 : 0;
      if (progress === SEQUENCE.length) {
        progress = 0;
        setMax(!isMax);
        setToast(isMax ? "Back to regular kawaii." : "MAXIMUM KAWAII UNLOCKED!!");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMax, setMax]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), TOAST_MS);
    return () => clearTimeout(id);
  }, [toast]);

  return (
    <>
      {toast ? (
        <p className="toast" role="status">
          {t(toast)}
        </p>
      ) : null}
      {isMax ? (
        <button type="button" className="btn btn--tiny max-off" onClick={() => setMax(false)}>
          {t("calm down")}
        </button>
      ) : null}
    </>
  );
}
