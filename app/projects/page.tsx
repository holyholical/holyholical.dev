"use client";

import { useMemo, useState } from "react";
import ShelfTag from "@/components/ShelfTag";
import { GITHUB_PROFILE_URL, stampDate, type Repo } from "@/lib/github";
import { useFeed } from "@/lib/use-feed";

const ALL = "all";
const NO_REPOS: Repo[] = [];

function languagesOf(repos: Repo[]): string[] {
  const seen = new Set<string>();
  repos.forEach((repo) => seen.add(repo.language ?? "unlabelled"));
  return Array.from(seen).sort((a, b) => a.localeCompare(b));
}

function CatalogueRow({ repo }: { repo: Repo }) {
  return (
    <li>
      <a
        className="catalogue__row"
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ "--band": repo.bandColor } as React.CSSProperties}
      >
        <span className="catalogue__swatch" aria-hidden="true" />
        <span>
          <span className="catalogue__name">{repo.name}</span>
          <span className="catalogue__lang">
            {repo.language ?? "unlabelled"}
            {repo.isFork ? " · fork" : ""}
            {repo.isArchived ? " · archived" : ""}
          </span>
        </span>
        <p className="catalogue__desc">{repo.description ?? "No description written yet."}</p>
        <span className="catalogue__date">Packed {stampDate(repo.pushedAt)}</span>
      </a>
    </li>
  );
}

export default function ProjectsPage() {
  const { state, retry } = useFeed();
  const [language, setLanguage] = useState(ALL);

  const repos = state.status === "ready" ? state.repos : NO_REPOS;
  const languages = useMemo(() => languagesOf(repos), [repos]);
  const shown = useMemo(
    () => (language === ALL ? repos : repos.filter((repo) => (repo.language ?? "unlabelled") === language)),
    [repos, language],
  );

  return (
    <section className="shelf" aria-labelledby="catalogue-title">
      <div className="shelf__head">
        <h1 id="catalogue-title" className="shelf__title">
          Seed catalogue
        </h1>
        <p className="shelf__note">Every public repository, in the order it was last packed.</p>
      </div>

      {state.status === "loading" ? <p className="shelf__note">Fetching the catalogue from GitHub…</p> : null}

      {state.status === "error" ? (
        <ShelfTag heading="The catalogue is out of reach">
          <p>GitHub did not return the repository list. This is usually the unauthenticated rate limit.</p>
          <p className="tag__actions">
            <button type="button" className="tag__button" onClick={retry}>
              Try again
            </button>
            <a className="tag__link" href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
              Browse on GitHub ↗
            </a>
          </p>
        </ShelfTag>
      ) : null}

      {state.status === "empty" ? (
        <ShelfTag heading="Nothing sown yet">
          <p>GitHub lists no public repositories for holyholical right now.</p>
        </ShelfTag>
      ) : null}

      {state.status === "ready" ? (
        <>
          <ul className="filters" aria-label="Filter by language">
            <li>
              <button type="button" className="filter" aria-pressed={language === ALL} onClick={() => setLanguage(ALL)}>
                All ({repos.length})
              </button>
            </li>
            {languages.map((lang) => (
              <li key={lang}>
                <button
                  type="button"
                  className="filter"
                  aria-pressed={language === lang}
                  onClick={() => setLanguage(lang)}
                >
                  {lang}
                </button>
              </li>
            ))}
          </ul>
          <ul className="catalogue" aria-live="polite">
            {shown.map((repo) => (
              <CatalogueRow key={repo.id} repo={repo} />
            ))}
          </ul>
        </>
      ) : null}
    </section>
  );
}
