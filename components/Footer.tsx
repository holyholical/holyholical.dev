"use client";

import { GITHUB_PROFILE_URL } from "@/lib/github";
import { useShrine } from "@/lib/shrine-context";

const REPO_URL = "https://github.com/holyholical/holyholical.dev";

/** Webring bar, license line, and the mandatory "best viewed at" notice. */
export default function Footer() {
  const { t } = useShrine();
  return (
    <footer className="foot">
      <div className="webring">
        <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
          « {t("my GitHub")}
        </a>
        <span className="webring__name">holyholical.dev</span>
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
          {t("this site's source")} »
        </a>
      </div>
      <p className="foot__line">
        {t("Best viewed at 800×600 in any browser that still supports blink. Made with")} ♡ {t("and HTML.")}
      </p>
      <p className="foot__line">
        {t("Content on this site is under the MIT license.")} holyholical (ↄ) 2026 ·{" "}
        <a href={`${REPO_URL}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer">
          {t("license")}
        </a>
      </p>
      <p className="foot__secret" aria-hidden="true">
        ↑↑↓↓←→←→BA
      </p>
    </footer>
  );
}
