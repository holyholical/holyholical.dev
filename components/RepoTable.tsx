"use client";

import { useMemo, useState } from "react";
import FeedStatus from "@/components/FeedStatus";
import NewTag from "@/components/NewTag";
import { isFresh, stampDate, type Repo } from "@/lib/github";
import { useShrine } from "@/lib/shrine-context";
import { useFeed } from "@/lib/use-feed";

const ALL = "all";
const NO_REPOS: Repo[] = [];

function languagesOf(repos: Repo[]): string[] {
  const seen = new Set<string>();
  repos.forEach((repo) => seen.add(repo.language ?? "unlabelled"));
  return Array.from(seen).sort((a, b) => a.localeCompare(b));
}

/** Every public repo in a proper HTML table, with language filter tabs. */
export default function RepoTable() {
  const { t } = useShrine();
  const { state, retry } = useFeed();
  const [language, setLanguage] = useState(ALL);

  const repos = state.status === "ready" ? state.repos : NO_REPOS;
  const languages = useMemo(() => languagesOf(repos), [repos]);
  const shown = useMemo(
    () => (language === ALL ? repos : repos.filter((repo) => (repo.language ?? "unlabelled") === language)),
    [repos, language],
  );

  return (
    <div>
      <FeedStatus state={state} retry={retry} />
      {state.status === "ready" ? (
        <>
          <div className="tabs" role="tablist" aria-label="Filter by language">
            <button type="button" role="tab" className={`btn btn--tiny ${language === ALL ? "btn--active" : ""}`} aria-selected={language === ALL} onClick={() => setLanguage(ALL)}>
              {t("all")} ({repos.length})
            </button>
            {languages.map((lang) => (
              <button key={lang} type="button" role="tab" className={`btn btn--tiny ${language === lang ? "btn--active" : ""}`} aria-selected={language === lang} onClick={() => setLanguage(lang)}>
                {lang}
              </button>
            ))}
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">{t("repo")}</th>
                  <th scope="col">{t("language")}</th>
                  <th scope="col">{t("about")}</th>
                  <th scope="col">{t("last push")}</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((repo) => (
                  <tr key={repo.id}>
                    <td>
                      {isFresh(repo.pushedAt) ? <NewTag /> : null}
                      <a href={repo.url} target="_blank" rel="noopener noreferrer">
                        {repo.name}
                      </a>
                      {repo.isFork ? <span className="tag">fork</span> : null}
                      {repo.isArchived ? <span className="tag">archived</span> : null}
                    </td>
                    <td>
                      <span className="chip" style={{ background: repo.bandColor }} aria-hidden="true" /> {repo.language ?? t("unlabelled")}
                    </td>
                    <td>{repo.description ?? t("No description written yet.")}</td>
                    <td className="table__date">{stampDate(repo.pushedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </div>
  );
}
