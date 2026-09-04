"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { UWU_LEVELS, uwuify, type UwuLevel } from "./uwu";

const UWU_KEY = "howwy-uwu";
const DEFAULT_LEVEL: UwuLevel = 1;

interface ShrineState {
  level: UwuLevel;
  setLevel: (level: UwuLevel) => void;
  /** Runs plain English copy through the uwu-ifier at the current level. */
  t: (text: string) => string;
}

const ShrineContext = createContext<ShrineState | null>(null);

/* A tiny external store over localStorage so React can subscribe without setState-in-effect. */
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const emit = () => listeners.forEach((listener) => listener());

function readLevel(): UwuLevel {
  try {
    const raw = window.localStorage.getItem(UWU_KEY);
    if (raw === null) return DEFAULT_LEVEL;
    const stored = Number(raw);
    return UWU_LEVELS.includes(stored as UwuLevel) ? (stored as UwuLevel) : DEFAULT_LEVEL;
  } catch {
    return DEFAULT_LEVEL;
  }
}

function write(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Private mode or storage disabled: the setting just does not persist past this render.
  }
  emit();
}

export function ShrineProvider({ children }: { children: ReactNode }) {
  const level = useSyncExternalStore(subscribe, readLevel, () => DEFAULT_LEVEL);
  const setLevel = useCallback((next: UwuLevel) => write(UWU_KEY, String(next)), []);

  const value = useMemo<ShrineState>(
    () => ({ level, setLevel, t: (text) => uwuify(text, level) }),
    [level, setLevel],
  );

  return <ShrineContext.Provider value={value}>{children}</ShrineContext.Provider>;
}

export function useShrine(): ShrineState {
  const ctx = useContext(ShrineContext);
  if (!ctx) throw new Error("useShrine must be used inside ShrineProvider");
  return ctx;
}
