/** 10x10 pixel icons, same grid language as the waifus. K ink, P pink, W white, L lemon, S sky. */
export type IconName = "home" | "disk" | "sword" | "letter" | "chat" | "card" | "torii" | "construction" | "heart";

export const ICON_SIZE = 10;

export const ICON_PALETTE: Record<string, string> = {
  K: "#1c1025",
  P: "#b12140",
  W: "#fffaf7",
  L: "#ecd6cf",
  S: "#b9a5c4",
};

export const ICONS: Record<IconName, readonly string[]> = {
  home: [
    "....KK....",
    "...KPPK...",
    "..KPPPPK..",
    ".KPPPPPPK.",
    "KKKKKKKKKK",
    ".KWWWWWWK.",
    ".KWWKKWWK.",
    ".KWWKKWWK.",
    ".KWWKKWWK.",
    ".KKKKKKKK.",
  ],
  disk: [
    "KKKKKKKKK.",
    "KSKWWWKSKK",
    "KSKWWWKSSK",
    "KSKKKKKSSK",
    "KSSSSSSSSK",
    "KSSSSSSSSK",
    "KSKKKKKKSK",
    "KSKWWKWKSK",
    "KSKWWKWKSK",
    "KKKKKKKKKK",
  ],
  sword: [
    "........KK",
    ".......KWK",
    "......KWK.",
    ".....KWK..",
    ".K..KWK...",
    "..KKKK....",
    "..KLKK....",
    ".KLLK.....",
    "KLK.......",
    "KK........",
  ],
  letter: [
    "..........",
    "KKKKKKKKKK",
    "KWWWWWWWWK",
    "KKWWWWWWKK",
    "KWKWWWWKWK",
    "KWWKWWKWWK",
    "KWWWKKWWWK",
    "KWWWWWWWWK",
    "KKKKKKKKKK",
    "..........",
  ],
  chat: [
    ".KKKKKKKK.",
    "KWWWWWWWWK",
    "KWKWKWKWWK",
    "KWWWWWWWWK",
    "KWKWKWKWWK",
    "KWWWWWWWWK",
    ".KKKKKWWK.",
    "....KWWK..",
    "....KWK...",
    "....KK....",
  ],
  card: [
    "..........",
    "KKKKKKKKKK",
    "KPPPPPPPPK",
    "KKKKKKKKKK",
    "KWKKKWWWWK",
    "KWWWWWWWWK",
    "KWKKKKKWWK",
    "KWWWWWWWWK",
    "KWKKKKWWWK",
    "KKKKKKKKKK",
  ],
  torii: [
    "PPPPPPPPPP",
    ".PPPPPPPP.",
    "..PP..PP..",
    "..PP..PP..",
    ".PPPPPPPP.",
    "..PP..PP..",
    "..PP..PP..",
    "..PP..PP..",
    "..PP..PP..",
    ".PPP..PPP.",
  ],
  construction: [
    "....KK....",
    "...KLLK...",
    "...KLLK...",
    "..KLKKLK..",
    "..KLKKLK..",
    ".KLLKKLLK.",
    ".KLLLLLLK.",
    "KLLLKKLLLK",
    "KLLLLLLLLK",
    "KKKKKKKKKK",
  ],
  heart: [
    "..........",
    ".KK...KK..",
    "KPPK.KPPK.",
    "KPPPKPPPK.",
    "KPPPPPPPK.",
    ".KPPPPPK..",
    "..KPPPK...",
    "...KPK....",
    "....K.....",
    "..........",
  ],
};

export interface PixelRect {
  x: number;
  y: number;
  fill: string;
}

/** Turns a grid of palette keys into one rect per painted cell. "." is empty. */
export function spriteToRects(grid: readonly string[], palette: Partial<Record<string, string>>): PixelRect[] {
  return grid.flatMap((row, y) =>
    Array.from(row).flatMap((key, x) => {
      const fill = key === "." ? undefined : palette[key];
      return fill ? [{ x, y, fill }] : [];
    }),
  );
}
