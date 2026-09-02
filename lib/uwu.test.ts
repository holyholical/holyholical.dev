import { describe, expect, test } from "vitest";
import { hashString, uwuify, type UwuLevel } from "./uwu";

describe("hashString", () => {
  test("is deterministic for the same input", () => {
    expect(hashString("howwy")).toBe(hashString("howwy"));
  });

  test("differs for different inputs", () => {
    expect(hashString("holy")).not.toBe(hashString("holyholical"));
  });
});

describe("uwuify", () => {
  test("returns the input untouched at level off", () => {
    expect(uwuify("Hello there, I'm Holy.", 0)).toBe("Hello there, I'm Holy.");
  });

  test("turns r and l into w at level uwu", () => {
    const out = uwuify("really lovely", 1, 1);
    expect(out).not.toMatch(/[rl]/i);
    expect(out).toMatch(/w/);
  });

  test("Holy is always Howwy", () => {
    expect(uwuify("Holy is holy.", 1, 1)).toMatch(/^Howwy is howwy\./);
    expect(uwuify("Hello there, I'm Holy.", 1, 1)).toMatch(/H-h|Howwy/);
  });

  test("love is wuv but introverted keeps its shape", () => {
    expect(uwuify("I love being introverted", 1, 1)).toMatch(/wuv/);
    expect(uwuify("introverted", 1, 1)).toBe("intwovewted");
  });

  test("adds nya to n before a vowel", () => {
    expect(uwuify("nice", 1, 1)).toMatch(/^nyice/);
  });

  test("is deterministic for the same text and seed", () => {
    const text = "I am introverted but I love talking with people.";
    expect(uwuify(text, 2, 7)).toBe(uwuify(text, 2, 7));
  });

  test("MAX level is at least as transformed as uwu level", () => {
    const text = "The weather is really lovely this morning.";
    const soft = uwuify(text, 1, 3);
    const max = uwuify(text, 2, 3);
    expect(soft).toMatch(/weawwy/);
    expect(max.replace(/\b(\w)-/g, "")).toMatch(/[Dd]a weadew/);
  });

  test("proper nouns never stutter", () => {
    for (let seed = 0; seed < 50; seed += 1) {
      expect(uwuify("say hi on GitHub", 2, seed)).not.toMatch(/G-g/);
    }
  });

  test("never touches an empty string", () => {
    const levels: UwuLevel[] = [0, 1, 2];
    levels.forEach((level) => expect(uwuify("", level)).toBe(""));
  });
});
