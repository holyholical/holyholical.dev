import { GITHUB_PROFILE_URL } from "@/lib/github";

const REPO_URL = "https://github.com/holyholical/holyholical.dev";

interface Badge {
  top: string;
  bottom: string;
  tone: "pink" | "sky" | "mint" | "lemon" | "lav" | "ink";
  href?: string;
}

const BADGES: readonly Badge[] = [
  { top: "GitHub", bottom: "holyholical", tone: "ink", href: GITHUB_PROFILE_URL },
  { top: "MIT", bottom: "licensed", tone: "mint", href: `${REPO_URL}/blob/main/LICENSE` },
  { top: "view", bottom: "source", tone: "sky", href: REPO_URL },
  { top: "800×600", bottom: "forever", tone: "lemon" },
  { top: "made with", bottom: "♡ & HTML", tone: "pink" },
  { top: "no cookies", bottom: "localStorage", tone: "lav" },
];

/** The 88×31 button wall. Pure CSS, no GIFs. */
export default function Badges() {
  return (
    <ul className="badges" aria-label="Site badges">
      {BADGES.map((badge) => {
        const body = (
          <>
            <span className="badge__top">{badge.top}</span>
            <span className="badge__bottom">{badge.bottom}</span>
          </>
        );
        return (
          <li key={badge.top}>
            {badge.href ? (
              <a className={`badge badge--${badge.tone}`} href={badge.href} target="_blank" rel="noopener noreferrer">
                {body}
              </a>
            ) : (
              <span className={`badge badge--${badge.tone}`}>{body}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
