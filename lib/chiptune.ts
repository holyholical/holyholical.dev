/** Tiny Web Audio chiptune: an original loop, square lead over a triangle bass. No audio files. */

/** A note name like "C5" or "-" for a rest, and a length in beats. */
export type Step = readonly [note: string, beats: number];

const NOTE_INDEX: Record<string, number> = {
  C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5, "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11,
};
const NOTE_PATTERN = /^([A-G]#?)(\d)$/;
const A4 = 440;
const SEMITONES_PER_OCTAVE = 12;
const A4_OFFSET = 9;

export function noteToFrequency(note: string): number {
  if (note === "-") return 0;
  const match = NOTE_PATTERN.exec(note);
  if (!match) throw new Error(`Bad note: ${note}`);
  const semitones = NOTE_INDEX[match[1]] + (Number(match[2]) - 4) * SEMITONES_PER_OCTAVE - A4_OFFSET;
  return A4 * 2 ** (semitones / SEMITONES_PER_OCTAVE);
}

export const BPM = 150;
export const SECONDS_PER_BEAT = 60 / BPM;

export const MELODY: readonly Step[] = [
  ["E5", 0.5], ["G5", 0.5], ["A5", 1], ["G5", 0.5], ["E5", 0.5], ["C5", 1],
  ["D5", 0.5], ["E5", 0.5], ["D5", 1], ["C5", 0.5], ["A4", 0.5], ["C5", 1],
  ["E5", 0.5], ["G5", 0.5], ["A5", 1], ["C6", 0.5], ["A5", 0.5], ["G5", 1],
  ["E5", 0.5], ["D5", 0.5], ["E5", 1], ["G5", 0.5], ["E5", 0.5], ["D5", 1],
  ["C5", 0.5], ["E5", 0.5], ["G5", 0.5], ["E5", 0.5], ["A5", 1], ["G5", 1],
  ["F5", 0.5], ["A5", 0.5], ["C6", 1], ["A5", 0.5], ["F5", 0.5], ["G5", 1],
  ["E5", 0.5], ["G5", 0.5], ["C6", 1], ["B5", 0.5], ["A5", 0.5], ["G5", 1],
  ["A5", 0.5], ["G5", 0.5], ["E5", 1], ["D5", 0.5], ["C5", 0.5], ["C5", 1],
];

export const BASS: readonly Step[] = [
  ["C3", 1], ["G3", 1], ["C3", 1], ["G3", 1],
  ["A2", 1], ["E3", 1], ["A2", 1], ["E3", 1],
  ["C3", 1], ["G3", 1], ["C3", 1], ["G3", 1],
  ["G2", 1], ["D3", 1], ["G2", 1], ["D3", 1],
  ["C3", 1], ["G3", 1], ["C3", 1], ["G3", 1],
  ["F2", 1], ["C3", 1], ["F2", 1], ["C3", 1],
  ["C3", 1], ["G3", 1], ["E3", 1], ["G3", 1],
  ["G2", 1], ["D3", 1], ["C3", 1], ["-", 1],
];

export function totalBeats(steps: readonly Step[]): number {
  return steps.reduce((sum, [, beats]) => sum + beats, 0);
}

const LEAD_GAIN = 0.07;
const BASS_GAIN = 0.09;
const ATTACK = 0.01;
const RELEASE_RATIO = 0.85;
const LOOKAHEAD_MS = 1000;

interface Voice {
  steps: readonly Step[];
  type: OscillatorType;
  gain: number;
}

const VOICES: readonly Voice[] = [
  { steps: MELODY, type: "square", gain: LEAD_GAIN },
  { steps: BASS, type: "triangle", gain: BASS_GAIN },
];

function scheduleVoice(ctx: AudioContext, master: GainNode, voice: Voice, startAt: number): void {
  voice.steps.reduce((time, [note, beats]) => {
    const seconds = beats * SECONDS_PER_BEAT;
    const frequency = noteToFrequency(note);
    if (frequency > 0) {
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = voice.type;
      osc.frequency.value = frequency;
      env.gain.setValueAtTime(0, time);
      env.gain.linearRampToValueAtTime(voice.gain, time + ATTACK);
      env.gain.linearRampToValueAtTime(0, time + seconds * RELEASE_RATIO);
      osc.connect(env).connect(master);
      osc.start(time);
      osc.stop(time + seconds);
    }
    return time + seconds;
  }, startAt);
}

export interface ChiptunePlayer {
  start(): Promise<void>;
  stop(): Promise<void>;
  isPlaying(): boolean;
}

/** Loops the tune until stopped. Everything is created lazily on first start so autoplay rules are respected. */
export function createChiptune(makeContext: () => AudioContext = () => new AudioContext()): ChiptunePlayer {
  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;
  const loopSeconds = totalBeats(MELODY) * SECONDS_PER_BEAT;

  const scheduleLoop = (startAt: number) => {
    if (!ctx || !master) return;
    VOICES.forEach((voice) => scheduleVoice(ctx as AudioContext, master as GainNode, voice, startAt));
    const nextStart = startAt + loopSeconds;
    const wait = Math.max(0, (nextStart - ctx.currentTime) * 1000 - LOOKAHEAD_MS);
    timer = setTimeout(() => scheduleLoop(nextStart), wait);
  };

  return {
    async start() {
      if (ctx) return;
      ctx = makeContext();
      master = ctx.createGain();
      master.gain.value = 1;
      master.connect(ctx.destination);
      if (ctx.state === "suspended") await ctx.resume();
      scheduleLoop(ctx.currentTime + 0.05);
    },
    async stop() {
      if (timer) clearTimeout(timer);
      timer = null;
      const closing = ctx;
      ctx = null;
      master = null;
      if (closing) await closing.close();
    },
    isPlaying: () => ctx !== null,
  };
}
