import { describe, expect, test } from "vitest";
import { applyPatches, CAST, EXPRESSIONS, spriteToRects, WAIFU_BASE } from "./sprites";

describe("WAIFU_BASE", () => {
  test("is a rectangular grid", () => {
    const widths = new Set(WAIFU_BASE.map((row) => row.length));
    expect(widths.size).toBe(1);
    expect(WAIFU_BASE.length).toBeGreaterThan(20);
  });

  test("only uses characters that every palette defines", () => {
    const used = new Set(WAIFU_BASE.join("").replace(/\./g, ""));
    CAST.forEach((waifu) => {
      used.forEach((ch) => expect(waifu.palette).toHaveProperty(ch));
    });
  });
});

describe("EXPRESSIONS", () => {
  test("every patch lands inside the grid", () => {
    const height = WAIFU_BASE.length;
    const width = WAIFU_BASE[0].length;
    Object.values(EXPRESSIONS).forEach((patches) => {
      patches.forEach((patch) => {
        expect(patch.row).toBeGreaterThanOrEqual(0);
        expect(patch.row).toBeLessThan(height);
        expect(patch.col + patch.text.length).toBeLessThanOrEqual(width);
      });
    });
  });

  test("applyPatches returns a new grid and leaves the base alone", () => {
    const before = WAIFU_BASE.join("\n");
    const patched = applyPatches(WAIFU_BASE, EXPRESSIONS.happy);
    expect(WAIFU_BASE.join("\n")).toBe(before);
    expect(patched.join("\n")).not.toBe(before);
    expect(patched.length).toBe(WAIFU_BASE.length);
  });

  test("applyPatches overwrites exactly the patch text", () => {
    const grid = ["....", "....", "...."];
    const patched = applyPatches(grid, [{ row: 1, col: 1, text: "ab" }]);
    expect(patched).toEqual(["....", ".ab.", "...."]);
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
});

describe("CAST", () => {
  test("has four waifus with unique ids and at least three lines each", () => {
    expect(CAST.length).toBe(4);
    expect(new Set(CAST.map((w) => w.id)).size).toBe(4);
    CAST.forEach((w) => expect(w.lines.length).toBeGreaterThanOrEqual(3));
  });
});
