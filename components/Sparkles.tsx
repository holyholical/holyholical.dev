"use client";

import { useEffect, useRef } from "react";
import { useShrine } from "@/lib/shrine-context";

const GLYPHS = ["✦", "✧", "★", "♡", "･", "✿"];
const COLORS = ["#ff2d95", "#c8a2ff", "#7bd5ff", "#ffd166", "#b5ead7", "#ff8fc8"];
const THROTTLE_MS = 40;
const MAX_LIVE = 48;
const LIFE_MS = 900;

/** Pastel sparkles that trail the pointer. Skipped on touch and for reduced-motion users. */
export default function Sparkles() {
  const { isMax } = useShrine();
  const layer = useRef<HTMLDivElement>(null);
  const last = useRef(0);
  const max = useRef(isMax);

  useEffect(() => {
    max.current = isMax;
  }, [isMax]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const host = layer.current;
    if (reduced || !finePointer || !host) return;

    const spawn = (x: number, y: number) => {
      if (host.childElementCount >= MAX_LIVE) host.firstElementChild?.remove();
      const star = document.createElement("span");
      star.className = "sparkle";
      star.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      star.style.left = `${x + (Math.random() - 0.5) * 24}px`;
      star.style.top = `${y + (Math.random() - 0.5) * 24}px`;
      star.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      star.style.setProperty("--drift", `${(Math.random() - 0.5) * 40}px`);
      host.appendChild(star);
      setTimeout(() => star.remove(), LIFE_MS);
    };

    const onMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - last.current < THROTTLE_MS) return;
      last.current = now;
      const count = max.current ? 3 : 1;
      for (let i = 0; i < count; i += 1) spawn(event.clientX, event.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div ref={layer} className="sparkles" aria-hidden="true" />;
}
