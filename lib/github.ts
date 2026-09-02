export const GITHUB_USER = "holyholical";
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USER}`;
const REPOS_URL = `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=100`;

/** GitHub linguist colors for the languages that appear on the rack. Unknown languages fall back to kraft. */
const LINGUIST_COLORS: Record<string, string> = {
  // linguist #3178c6 darkened ~12% so paper text on the band clears 4.5:1; see DESIGN.md, The Linguist Rule.
  TypeScript: "#2a63a6",
  JavaScript: "#f1e05a",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Python: "#3572a5",
  Rust: "#dea584",
  Go: "#00add8",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#663399",
  Assembly: "#6e4c13",
};
export const KRAFT = "#b58a55";

/** Relative luminance (WCAG) of a hex color, used to pick ink or paper text on a band. */
export function luminance(hex: string): number {
  const channel = (i: number) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
}

const LIGHT_BAND_LUMINANCE = 0.2;

/** Bands lighter than the threshold (C++, kraft) take ink text; darker bands take paper. */
export function bandInk(hex: string): "ink" | "paper" {
  return luminance(hex) > LIGHT_BAND_LUMINANCE ? "ink" : "paper";
}

export interface Repo {
  id: number;
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  bandColor: string;
  isFork: boolean;
  isArchived: boolean;
  pushedAt: Date;
}

export type FeedState =
  | { status: "loading" }
  | { status: "ready"; repos: Repo[] }
  | { status: "empty" }
  | { status: "error"; reason: "rate-limit" | "offline" | "bad-data" };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const asString = (value: unknown): string | null =>
  typeof value === "string" && value.length > 0 ? value : null;

/** Validates one raw API entry; returns null when the shape is not what a repo looks like. */
export function parseRepo(raw: unknown): Repo | null {
  if (!isRecord(raw)) return null;
  const id = raw.id;
  const name = asString(raw.name);
  const url = asString(raw.html_url);
  const pushed = asString(raw.pushed_at);
  if (typeof id !== "number" || !name || !url || !pushed) return null;
  const pushedAt = new Date(pushed);
  if (Number.isNaN(pushedAt.getTime())) return null;
  const language = asString(raw.language);
  return {
    id,
    name,
    description: asString(raw.description),
    url,
    homepage: asString(raw.homepage),
    language,
    bandColor: (language && LINGUIST_COLORS[language]) || KRAFT,
    isFork: raw.fork === true,
    isArchived: raw.archived === true,
    pushedAt,
  };
}

export function parseRepoList(raw: unknown): Repo[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map(parseRepo)
    .filter((repo): repo is Repo => repo !== null)
    .sort((a, b) => b.pushedAt.getTime() - a.pushedAt.getTime());
}

export async function fetchFeed(signal?: AbortSignal): Promise<FeedState> {
  let response: Response;
  try {
    response = await fetch(REPOS_URL, {
      signal,
      headers: { Accept: "application/vnd.github+json" },
    });
  } catch {
    return { status: "error", reason: "offline" };
  }
  if (response.status === 403 || response.status === 429) {
    return { status: "error", reason: "rate-limit" };
  }
  if (!response.ok) return { status: "error", reason: "bad-data" };

  let json: unknown;
  try {
    json = await response.json();
  } catch {
    return { status: "error", reason: "bad-data" };
  }
  const repos = parseRepoList(json);
  if (repos.length === 0) return { status: "empty" };
  return { status: "ready", repos };
}

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/** "29 AUG 2026", the way a packing stamp reads. */
export function stampDate(date: Date): string {
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

const DAY_MS = 86_400_000;
const FRESH_DAYS = 7;

/** True when the repo was pushed within the last week: it gets the blinking NEW! tag. */
export function isFresh(date: Date, now: Date = new Date()): boolean {
  return now.getTime() - date.getTime() < FRESH_DAYS * DAY_MS;
}

/** "tended today", "tended 3 days ago", "tended 2 months ago". */
export function tendedLabel(date: Date, now: Date = new Date()): string {
  const days = Math.max(0, Math.floor((now.getTime() - date.getTime()) / DAY_MS));
  if (days === 0) return "tended today";
  if (days === 1) return "tended yesterday";
  if (days < 30) return `tended ${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `tended ${months} ${months === 1 ? "month" : "months"} ago`;
  const years = Math.floor(days / 365);
  return `tended ${years} ${years === 1 ? "year" : "years"} ago`;
}
