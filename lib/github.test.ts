import { describe, expect, test } from "vitest";
import { bandInk, isFresh, parseRepo, parseRepoList, stampDate, tendedLabel } from "./github";

const raw = {
  id: 1,
  name: "shrine",
  html_url: "https://github.com/holyholical/shrine",
  pushed_at: "2026-09-01T00:00:00Z",
  language: "TypeScript",
  description: null,
  fork: false,
  archived: false,
};

describe("parseRepo", () => {
  test("accepts a well-formed entry", () => {
    const repo = parseRepo(raw);
    expect(repo?.name).toBe("shrine");
    expect(repo?.bandColor).toBe("#2a63a6");
  });

  test("rejects an entry without a name", () => {
    expect(parseRepo({ ...raw, name: "" })).toBeNull();
  });

  test("rejects a non-object", () => {
    expect(parseRepo("nope")).toBeNull();
  });
});

describe("parseRepoList", () => {
  test("sorts newest push first and drops junk", () => {
    const list = parseRepoList([{ ...raw, id: 2, pushed_at: "2020-01-01T00:00:00Z" }, raw, 42]);
    expect(list.map((r) => r.id)).toEqual([1, 2]);
  });
});

describe("helpers", () => {
  test("stampDate reads like a stamp", () => {
    expect(stampDate(new Date("2026-09-01T00:00:00Z"))).toBe("1 SEP 2026");
  });

  test("tendedLabel buckets days", () => {
    const now = new Date("2026-09-10T00:00:00Z");
    expect(tendedLabel(new Date("2026-09-10T00:00:00Z"), now)).toBe("tended today");
    expect(tendedLabel(new Date("2026-09-01T00:00:00Z"), now)).toBe("tended 9 days ago");
  });

  test("isFresh is true within seven days", () => {
    const now = new Date("2026-09-10T00:00:00Z");
    expect(isFresh(new Date("2026-09-05T00:00:00Z"), now)).toBe(true);
    expect(isFresh(new Date("2026-08-01T00:00:00Z"), now)).toBe(false);
  });

  test("bandInk picks paper on dark bands", () => {
    expect(bandInk("#000000")).toBe("paper");
    expect(bandInk("#ffffff")).toBe("ink");
  });
});
