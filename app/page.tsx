"use client";

import { GITHUB_PROFILE_URL } from "@/lib/github";
import { useShrine } from "@/lib/shrine-context";

const BLURB: readonly string[] = [
  "Hi, I'm Holy. This is my homepage.",
  "I'm a developer. I mostly write TypeScript and React, and I also speak C, C++, C#, Python, and a little Assembly.",
  "Everything on the projects page is pulled live from GitHub, so it is never out of date.",
  "I'm introverted, but I love talking with people. Come say hi on GitHub.",
];

/** Front page: a few lines under the mascot, nothing else. */
export default function Home() {
  const { t } = useShrine();
  return (
    <div className="blurb">
      {BLURB.map((line) => (
        <p key={line}>{t(line)}</p>
      ))}
      <p>
        <a className="btn btn--pink" href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
          {t("say hi on GitHub")} ↗
        </a>
      </p>
    </div>
  );
}
