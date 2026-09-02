import { describe, expect, test } from "vitest";
import { MELODY, noteToFrequency, SECONDS_PER_BEAT, totalBeats } from "./chiptune";

describe("noteToFrequency", () => {
  test("A4 is 440", () => {
    expect(noteToFrequency("A4")).toBeCloseTo(440, 3);
  });

  test("C5 is a minor third above A4", () => {
    expect(noteToFrequency("C5")).toBeCloseTo(523.25, 1);
  });

  test("rest has no frequency", () => {
    expect(noteToFrequency("-")).toBe(0);
  });

  test("rejects garbage", () => {
    expect(() => noteToFrequency("H9")).toThrow();
  });
});

describe("MELODY", () => {
  test("every step has a positive length", () => {
    MELODY.forEach(([, beats]) => expect(beats).toBeGreaterThan(0));
  });

  test("loops over whole bars of four beats", () => {
    expect(totalBeats(MELODY) % 4).toBe(0);
  });

  test("a beat is a sane tempo", () => {
    expect(SECONDS_PER_BEAT).toBeGreaterThan(0.2);
    expect(SECONDS_PER_BEAT).toBeLessThan(0.6);
  });
});
