import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";
import { BUTTON_DIR, BUTTONS, buttonSrc, embedSnippet, SITE_BUTTON } from "./buttons";
import { BASE_PATH, SITE_URL } from "./site";

const PUBLIC_DIR = join(process.cwd(), "public", BUTTON_DIR);

/** Reads the logical screen size out of a GIF header. Bytes 6-9 are width and height, little-endian. */
function gifSize(file: string): { width: number; height: number } {
  const bytes = readFileSync(join(PUBLIC_DIR, file));
  expect(bytes.subarray(0, 4).toString("latin1"), `${file} is not a GIF`).toBe("GIF8");
  return { width: bytes.readUInt16LE(6), height: bytes.readUInt16LE(8) };
}

const ALL = [SITE_BUTTON, ...BUTTONS];

describe("button wall", () => {
  test("every button ships as an 88×31 GIF in public/", () => {
    ALL.forEach((button) => {
      expect(gifSize(button.file), button.file).toEqual({ width: 88, height: 31 });
    });
  });

  test("files and alt text are unique and non-empty", () => {
    const files = ALL.map((button) => button.file);
    const alts = ALL.map((button) => button.alt.trim());
    expect(new Set(files).size).toBe(files.length);
    expect(new Set(alts).size).toBe(alts.length);
    alts.forEach((alt) => expect(alt.length).toBeGreaterThan(0));
  });

  test("links, when present, are https", () => {
    ALL.filter((button) => button.href).forEach((button) => {
      expect(button.href, button.file).toMatch(/^https:\/\//);
    });
  });

  test("buttonSrc prefixes the basePath so GitHub Pages can find the file", () => {
    expect(buttonSrc("neko.gif")).toBe(`${BASE_PATH}/${BUTTON_DIR}/neko.gif`);
  });
});

describe("embedSnippet", () => {
  test("links home and points at the absolute button URL", () => {
    const snippet = embedSnippet();
    expect(snippet).toContain(`href="${SITE_URL}/"`);
    expect(snippet).toContain(`src="${SITE_URL}/${BUTTON_DIR}/${SITE_BUTTON.file}"`);
    expect(snippet).toContain(`alt="${SITE_BUTTON.alt}"`);
    expect(snippet).toContain('width="88" height="31"');
  });

  test("is a single line so it pastes cleanly into a 1998 guestbook", () => {
    expect(embedSnippet()).not.toContain("\n");
  });
});
