"use client";

import { useEffect, useState, type RefObject } from "react";

/** Reads how many columns a CSS grid currently lays out, so a rack can pad its last shelf with empty slots. */
export function useColumnCount(ref: RefObject<HTMLElement | null>): number {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => {
      const template = getComputedStyle(element).gridTemplateColumns;
      const count = template.split(" ").filter((track) => track.trim().length > 0).length;
      setColumns(count > 0 ? count : 1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return columns;
}
