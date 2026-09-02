"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const emit = () => listeners.forEach((listener) => listener());

function read(key: string): number {
  try {
    const value = Number(window.localStorage.getItem(key));
    return Number.isFinite(value) && value >= 0 ? value : 0;
  } catch {
    return 0;
  }
}

function write(key: string, value: number): void {
  try {
    window.localStorage.setItem(key, String(value));
  } catch {
    // Storage unavailable: the number will not survive a reload, and that is fine.
  }
  emit();
}

/** A counter that lives only in this browser. `bump` adds one; `incrementOnMount` counts the visit itself. */
export function useLocalCount(key: string, incrementOnMount = false) {
  const count = useSyncExternalStore(subscribe, () => read(key), () => 0);

  useEffect(() => {
    if (incrementOnMount) write(key, read(key) + 1);
  }, [key, incrementOnMount]);

  const bump = useCallback(() => write(key, read(key) + 1), [key]);

  return { count, bump };
}
