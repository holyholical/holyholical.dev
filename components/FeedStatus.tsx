"use client";

import { GITHUB_PROFILE_URL, type FeedState } from "@/lib/github";
import { useShrine } from "@/lib/shrine-context";

interface FeedStatusProps {
  state: FeedState;
  retry: () => void;
}

const REASONS: Record<string, string> = {
  "rate-limit": "GitHub says I have asked too many times this hour. Rude, but fair.",
  offline: "I could not reach GitHub at all. Are you online?",
  "bad-data": "GitHub sent back something I could not read.",
};

/** Loading, error, and empty states for the live feed. Returns null when there is data to show. */
export default function FeedStatus({ state, retry }: FeedStatusProps) {
  const { t } = useShrine();
  if (state.status === "ready") return null;
  if (state.status === "loading") {
    return (
      <p className="feed-status">
        <span className="spinner" aria-hidden="true">
          ◐
        </span>{" "}
        {t("Loading from GitHub, please wait warmly...")}
      </p>
    );
  }
  if (state.status === "empty") {
    return <p className="feed-status">{t("GitHub lists no public repositories right now.")}</p>;
  }
  return (
    <div className="feed-status feed-status--error" role="alert">
      <p>{t(REASONS[state.reason])}</p>
      <p className="feed-status__actions">
        <button type="button" className="btn" onClick={retry}>
          {t("try again")}
        </button>
        <a className="btn" href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
          {t("open GitHub instead")} ↗
        </a>
      </p>
    </div>
  );
}
