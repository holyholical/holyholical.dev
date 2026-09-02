/**
 * Pixel waifus. Each sprite is a grid of palette keys; "." is transparent.
 * Keys: K outline, H hair, h hair shade, S skin, B blush, E iris, e iris shade,
 * W eye highlight, D dress, d dress shade, R ribbon, M mouth.
 */
export type PaletteKey = "K" | "H" | "h" | "S" | "B" | "E" | "e" | "W" | "D" | "d" | "R" | "M";
export type Palette = Record<PaletteKey, string>;

export const WAIFU_BASE: readonly string[] = [
  "......KKKKKKKK......",
  "....KKHHHHHHHHKK....",
  "...KHHHHHHHHHHHHK...",
  "..KHHHHHHHHHHHHHHK..",
  "..KHHHHHHHHHHHHHHK..",
  ".KHHHHHHHHHHHHHHHHK.",
  ".KHHHhHHHHHHHHHHhHK.",
  ".KHHhHHHHHHHHHHHHhK.",
  ".KHHHSHHHSSHHHSSHHK.",
  ".KHHSSSHSSSSSHSSSHK.",
  ".KHSSSSSSSSSSSSSSHK.",
  ".KHSKKKSSSSSSKKKSHK.",
  ".KHSWEESSSSSSWEESHK.",
  ".KHSEEESSSSSSEEESHK.",
  ".KHSeEeSSSSSSeEeSHK.",
  ".KHSBBSSSSSSSSBBSHK.",
  ".KHSSSSSSKKSSSSSSHK.",
  "..KHSSSSSSSSSSSSHK..",
  "...KHSSSSSSSSSSHK...",
  "..KHKKKKSSSSKKKKHK..",
  ".KHHK..KSSSSK..KHHK.",
  ".KHHKKKDDDDDDKKKHHK.",
  ".KHHKDDDRRRRDDDKHHK.",
  ".KHKDDDDDRRDDDDDKHK.",
  ".KHKDDDDDDDDDDDDKHK.",
  ".KKDDDDddddddDDDDKK.",
  "..KDDDDDDDDDDDDDDK..",
  "..KKKKKKKKKKKKKKKK..",
  "....KSSK....KSSK....",
  "....KSSK....KSSK....",
  "...KKKKK....KKKKK...",
];

export const SPRITE_WIDTH = WAIFU_BASE[0].length;
export const SPRITE_HEIGHT = WAIFU_BASE.length;

export interface Patch {
  row: number;
  col: number;
  text: string;
}

const LEFT_EYE = 4;
const RIGHT_EYE = 13;
const EYE_TOP = 11;
const MOUTH_ROW = 16;
const MOUTH_COL = 8;

const eyes = (rows: readonly string[], col: number): Patch[] =>
  rows.map((text, i) => ({ row: EYE_TOP + i, col, text }));
const bothEyes = (rows: readonly string[]): Patch[] => [...eyes(rows, LEFT_EYE), ...eyes(rows, RIGHT_EYE)];
const mouth = (top: string, bottom: string): Patch[] => [
  { row: MOUTH_ROW, col: MOUTH_COL, text: top },
  { row: MOUTH_ROW + 1, col: MOUTH_COL, text: bottom },
];

const CLOSED_HAPPY = ["SKS", "KSK", "SSS", "SSS"];
const CLOSED_FLAT = ["SSS", "SSS", "KKK", "SSS"];
const WIDE = ["KKK", "WEE", "EEE", "KKK"];
const HEART = ["MSM", "MMM", "MMM", "SMS"];
const SMILE = mouth("KSSK", "SKKS");
const FROWN = mouth("SKKS", "KSSK");
const OPEN = mouth("KMMK", "SKKS");

export type Expression = "normal" | "happy" | "wink" | "surprised" | "sad" | "love" | "sleepy";

export const EXPRESSIONS: Record<Expression, readonly Patch[]> = {
  normal: [],
  happy: [...bothEyes(CLOSED_HAPPY), ...SMILE],
  wink: [...eyes(CLOSED_FLAT, RIGHT_EYE), ...SMILE],
  surprised: [...bothEyes(WIDE), ...OPEN],
  sad: [...FROWN, { row: 10, col: LEFT_EYE, text: "SSK" }, { row: 10, col: RIGHT_EYE, text: "KSS" }],
  love: [...bothEyes(HEART), ...SMILE],
  sleepy: bothEyes(CLOSED_FLAT),
};

export const EXPRESSION_CYCLE: readonly Expression[] = ["normal", "happy", "wink", "surprised", "love", "sleepy", "sad"];

/** Returns a new grid with each patch's text written over the base. The base is never mutated. */
export function applyPatches(grid: readonly string[], patches: readonly Patch[]): string[] {
  return patches.reduce<string[]>(
    (rows, patch) =>
      rows.map((row, index) =>
        index === patch.row ? row.slice(0, patch.col) + patch.text + row.slice(patch.col + patch.text.length) : row,
      ),
    [...grid],
  );
}

export interface PixelRect {
  x: number;
  y: number;
  fill: string;
}

/** Flattens a grid into paintable rects, skipping transparent cells. */
export function spriteToRects(grid: readonly string[], palette: Partial<Record<string, string>>): PixelRect[] {
  return grid.flatMap((row, y) =>
    Array.from(row).flatMap((key, x) => {
      const fill = key === "." ? undefined : palette[key];
      return fill ? [{ x, y, fill }] : [];
    }),
  );
}

export interface Waifu {
  id: string;
  name: string;
  title: string;
  palette: Palette;
  /** Plain English. The page runs these through uwuify. */
  lines: readonly string[];
}

const SKIN = { S: "#ffe4d6", B: "#ffa3c2", W: "#ffffff", M: "#ff6f9c" };

export const CAST: readonly Waifu[] = [
  {
    id: "howwy",
    name: "Howwy-tan",
    title: "site mascot",
    palette: { ...SKIN, K: "#3a1f3a", H: "#ff8fc8", h: "#ff5fb0", E: "#7b4dff", e: "#5a2fd6", D: "#ffe1f0", d: "#ffbfe0", R: "#ff2d95" },
    lines: [
      "Welcome to my homepage! Please sign the guestbook... oh wait, there isn't one.",
      "Every project on this site is pulled live from GitHub. No stale pages allowed here.",
      "Press the BGM button in the sidebar. The music is very cute, I promise.",
      "I'm introverted but I love talking with people. Really!",
      "Try the Konami code. I dare you.",
    ],
  },
  {
    id: "minto",
    name: "Minto",
    title: "TypeScript fairy",
    palette: { ...SKIN, K: "#1f3a33", H: "#9ef0d0", h: "#5fd6ad", E: "#2f7bff", e: "#1c55c9", D: "#e1e8ff", d: "#bfcfff", R: "#39c8a0" },
    lines: [
      "Have you tried TypeScript? It's like JavaScript but it holds your hand.",
      "Strict mode on. Always. I will not be taking questions.",
      "A type error is just a friend telling you the truth early.",
      "The projects page has filters. Click my language and I'll show you what I built.",
    ],
  },
  {
    id: "lavvy",
    name: "Lavvy",
    title: "low level lurker",
    palette: { ...SKIN, K: "#2c1f3a", H: "#c8a2ff", h: "#a878f0", E: "#ff5fa8", e: "#d63a85", D: "#e2fff3", d: "#bff0dc", R: "#b070ff" },
    lines: [
      "C and C++ are cozy once you stop being scared of pointers.",
      "Assembly is not hard. It's just very honest about what the machine is doing.",
      "The skills page lists everything Holy actually works in. No padding.",
      "I like a page that loads in one round trip. This one mostly does.",
    ],
  },
  {
    id: "kuro",
    name: "Kuro",
    title: "resident goth",
    palette: { ...SKIN, K: "#1a0f1f", H: "#2b2140", h: "#1a1228", E: "#ff3d5a", e: "#c92040", D: "#3a2b4a", d: "#2a1f38", R: "#ff3d5a" },
    lines: [
      "I only use dark mode. This page has no dark mode. I suffer for the aesthetic.",
      "Python is fine. I said what I said.",
      "Somebody set the background to sparkles. It was not me.",
      "If you found a bug, the source code link is in the footer. Go on.",
    ],
  },
];
