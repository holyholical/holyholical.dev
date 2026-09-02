import { describe, expect, test } from "vitest";
import { ICON_PALETTE, ICON_SIZE, ICONS } from "./icons";

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
