"use client";

import Link from "next/link";
import FeedStatus from "@/components/FeedStatus";
import NewTag from "@/components/NewTag";
import { isFresh, stampDate, tendedLabel } from "@/lib/github";
import { useShrine } from "@/lib/shrine-context";
import { useFeed } from "@/lib/use-feed";

const SHOWN = 3;

/** The three most recently pushed repos, straight from GitHub. */
export default function WhatsNew() {
  const { t } = useShrine();
  const { state, retry } = useFeed();
  return (
    <div className="whatsnew">
      <FeedStatus state={state} retry={retry} />
      {state.status === "ready" ? (
        <>
          <ul className="whatsnew__list">
            {state.repos.slice(0, SHOWN).map((repo) => (
              <li key={repo.id} className="whatsnew__item">
                {isFresh(repo.pushedAt) ? <NewTag /> : null}
                <a href={repo.url} target="_blank" rel="noopener noreferrer" className="whatsnew__name">
                  {repo.name}
                </a>
                <span className="chip" style={{ background: repo.bandColor }} aria-hidden="true" />
                <span className="whatsnew__lang">{repo.language ?? t("unlabelled")}</span>
                <span className="whatsnew__date">{stampDate(repo.pushedAt)}</span>
                <p className="whatsnew__desc">{repo.description ?? t("No description written yet.")}</p>
              </li>
            ))}
          </ul>
          <p className="whatsnew__foot">
            {state.repos.length} {t("repositories,")} {t(tendedLabel(state.repos[0].pushedAt))}.{" "}
            <Link href="/projects/">{t("see them all")} →</Link>
          </p>
        </>
      ) : null}
    </div>
  );
}
