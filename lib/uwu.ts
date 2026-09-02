/** 0: plain English. 1: uwu. 2: MAXIMUM KAWAII. */
export type UwuLevel = 0 | 1 | 2;

export const UWU_LEVELS: readonly UwuLevel[] = [0, 1, 2];
export const UWU_LABELS: Record<UwuLevel, string> = { 0: "normie", 1: "uwu", 2: "MAX" };

/** FNV-1a, 32 bit. Stable across renders so the same sentence always uwus the same way. */
export function hashString(text: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

/** mulberry32: tiny seeded PRNG, good enough for choosing where the stutters land. */
function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SUFFIXES_SOFT = ["~", " ♡", " ✧", " uwu", " owo"];
const SUFFIXES_MAX = ["~~", " nya~", " >w<", " (◕‿◕)", " uwu", " owo", " ♡♡", " ✧･ﾟ"];
const STUTTER_CHANCE: Record<UwuLevel, number> = { 0: 0, 1: 0.035, 2: 0.12 };
const SUFFIX_CHANCE: Record<UwuLevel, number> = { 0: 0, 1: 0.35, 2: 0.7 };

/** Lowercase words of four or more letters only: proper nouns and short words never stutter. */
const STUTTER_PATTERN = /\b([bcdfghjkmnpqstvwxz])([a-z]{3,})/g;
const SENTENCE_END = /([.!?])(\s|$)/g;

function swapLetters(text: string, level: UwuLevel): string {
  const swapped = text
    .replace(/\bHoly\b/g, "Howwy")
    .replace(/\bholy\b/g, "howwy")
    .replace(/\blove/g, "wuv")
    .replace(/\bLove/g, "Wuv")
    .replace(/[rl]/g, "w")
    .replace(/[RL]/g, "W")
    .replace(/n([aeiou])/g, "ny$1")
    .replace(/N([aeiou])/g, "Ny$1")
    .replace(/N([AEIOU])/g, "NY$1");
  if (level < 2) return swapped;
  return swapped
    .replace(/\bthe\b/g, "da")
    .replace(/\bThe\b/g, "Da")
    .replace(/th/g, "d")
    .replace(/Th/g, "D");
}

/**
 * Turns plain English into cute anime speech. Deterministic: the same text and seed
 * always produce the same output, so React never sees a flicker between renders.
 */
export function uwuify(text: string, level: UwuLevel, seed: number = hashString(text)): string {
  if (level === 0 || text.length === 0) return text;
  const random = seededRandom(seed ^ hashString(text));
  const pool = level === 2 ? SUFFIXES_MAX : SUFFIXES_SOFT;
  const pick = () => pool[Math.floor(random() * pool.length)];

  return swapLetters(text, level)
    .replace(STUTTER_PATTERN, (match, first: string, rest: string) =>
      random() < STUTTER_CHANCE[level] ? `${first}-${first.toLowerCase()}${rest}` : match,
    )
    .replace(SENTENCE_END, (match, punct: string, space: string) =>
      random() < SUFFIX_CHANCE[level] ? `${punct}${pick()}${space}` : match,
    );
}
