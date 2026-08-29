"use client";

import { useRef } from "react";
import Packet from "@/components/Packet";
import ShelfTag from "@/components/ShelfTag";
import { GITHUB_PROFILE_URL, type FeedState, type Repo } from "@/lib/github";
import { useColumnCount } from "@/lib/use-column-count";

const LEANING_PACKETS = 3;
const RESTOCKING_ROWS = 2;

const ERROR_COPY: Record<Extract<FeedState, { status: "error" }>["reason"], { problem: string; recovery: string }> = {
  "rate-limit": {
    problem: "GitHub has stopped answering for now: too many people have asked it for this rack in the last hour.",
    recovery: "Wait a minute and restock, or browse the repositories on GitHub directly.",
  },
  offline: {
    problem: "The rack could not reach GitHub. That usually means the connection dropped.",
    recovery: "Check the connection and restock.",
  },
  "bad-data": {
    problem: "GitHub answered, but not with a list of repositories.",
    recovery: "Restock to try again, or open the profile on GitHub.",
  },
};

function EmptySlots() {
  const ref = useRef<HTMLUListElement>(null);
  const columns = useColumnCount(ref);
  return (
    <ul ref={ref} className="rack__shelves rack__shelves--restocking" aria-label="Loading repositories" aria-busy="true">
      {Array.from({ length: columns * RESTOCKING_ROWS }, (_, i) => (
        <li key={i} className="slot">
          <span className="price-label">restocking</span>
        </li>
      ))}
    </ul>
  );
}

function Shelves({ repos }: { repos: Repo[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const columns = useColumnCount(ref);
  const fillers = (columns - (repos.length % columns)) % columns;
  return (
    <ul ref={ref} className="rack__shelves" aria-label="Repositories, most recently pushed first">
      {repos.map((repo, index) => (
        <li key={repo.id} className="slot slot--filled">
          <Packet repo={repo} index={index} leans={index < LEANING_PACKETS} />
        </li>
      ))}
      {Array.from({ length: fillers }, (_, i) => (
        <li key={`filler-${i}`} className="slot slot--empty" aria-hidden="true" />
      ))}
    </ul>
  );
}

function RackContent({ state, retry }: { state: FeedState; retry: () => void }) {
  if (state.status === "loading") return <EmptySlots />;

  if (state.status === "error") {
    const copy = ERROR_COPY[state.reason];
    return (
      <ShelfTag heading="This shelf is empty">
        <p>{copy.problem}</p>
        <p>{copy.recovery}</p>
        <p className="tag__actions">
          <button type="button" className="tag__button" onClick={retry}>
            Restock the rack
          </button>
          <a className="tag__link" href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
            Browse on GitHub ↗
          </a>
        </p>
      </ShelfTag>
    );
  }

  if (state.status === "empty") {
    return (
      <ShelfTag heading="Nothing sown yet">
        <p>GitHub lists no public repositories for holyholical right now.</p>
        <p>
          <a className="tag__link" href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
            Check the profile on GitHub ↗
          </a>
        </p>
      </ShelfTag>
    );
  }

  return <Shelves repos={state.repos} />;
}

export default function Rack(props: { state: FeedState; retry: () => void }) {
  return (
    <div aria-live="polite">
      <RackContent {...props} />
    </div>
  );
}
