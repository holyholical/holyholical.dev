import { describe, expect, test } from "vitest";
import { ICON_PALETTE, ICON_SIZE, ICONS, spriteToRects } from "./icons";

describe("ICONS", () => {
  test("every icon is a square grid of the declared size", () => {
    Object.entries(ICONS).forEach(([name, grid]) => {
      expect(grid.length, name).toBe(ICON_SIZE);
      grid.forEach((row) => expect(row.length, name).toBe(ICON_SIZE));
    });
  });

  test("every icon only uses palette keys or transparency", () => {
    const allowed = new Set([".", ...Object.keys(ICON_PALETTE)]);
    Object.entries(ICONS).forEach(([name, grid]) => {
      Array.from(grid.join("")).forEach((ch) => expect(allowed.has(ch), `${name}: ${ch}`).toBe(true));
    });
  });

  test("no icon is empty", () => {
    Object.values(ICONS).forEach((grid) => expect(grid.join("").replace(/\./g, "").length).toBeGreaterThan(0));
  });
});

describe("spriteToRects", () => {
  test("skips transparent pixels and maps the rest through the palette", () => {
    const rects = spriteToRects(["K.", ".H"], { K: "#000", H: "#f0f" });
    expect(rects).toEqual([
      { x: 0, y: 0, fill: "#000" },
      { x: 1, y: 1, fill: "#f0f" },
    ]);
  });

  test("drops keys the palette does not define", () => {
    expect(spriteToRects(["KZ"], { K: "#000" })).toEqual([{ x: 0, y: 0, fill: "#000" }]);
  });
});
