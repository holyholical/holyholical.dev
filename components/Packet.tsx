import PlantPrint, { PLANT_COMMON_NAMES, pickPrint } from "@/components/PlantPrint";
import { bandInk, stampDate, tendedLabel, type Repo } from "@/lib/github";

interface PacketProps {
  repo: Repo;
  /** Packets most recently pushed lean forward out of the slot. */
  leans: boolean;
  /** Index on the rack; drives the slot-in stagger. */
  index: number;
}

const straplineFor = (repo: Repo) => {
  if (repo.isArchived) return "archived · no longer tended";
  if (repo.isFork) return "fork · grown from another garden";
  return "open source · grown in public";
};

export default function Packet({ repo, leans, index }: PacketProps) {
  const print = pickPrint(repo.name);
  return (
    <a
      className={`packet${leans ? " packet--lean" : ""}`}
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      style={
        {
          "--slot-index": index,
          "--band": repo.bandColor,
          "--band-ink": bandInk(repo.bandColor) === "ink" ? "var(--ink)" : "var(--packet-paper)",
        } as React.CSSProperties
      }
    >
      <span className="packet__body">
        <span className="packet__face packet__front">
          <span className="packet__band">
            <span>{repo.language ?? "unlabelled"}</span>
            <span className="packet__band-mark" aria-hidden="true">
              №{String(index + 1).padStart(2, "0")}
            </span>
          </span>
          <span className="packet__print">
            <PlantPrint name={print} bandColor={repo.bandColor} />
          </span>
          <span className="packet__name">{repo.name}</span>
          <span className="packet__strap">{straplineFor(repo)}</span>
          <span className="packet__tended">{tendedLabel(repo.pushedAt)}</span>
        </span>
        <span className="packet__face packet__back">
          <span className="packet__back-name">{repo.name}</span>
          <span className="packet__back-head">Sowing instructions</span>
          <span className="packet__desc">{repo.description ?? "No description written yet. Open the packet to see what is inside."}</span>
          <span className="packet__meta">
            <span className="stamp">
              <span className="stamp__small">Packed for</span>
              <span className="stamp__date">{stampDate(repo.pushedAt)}</span>
            </span>
            <span className="packet__variety">{PLANT_COMMON_NAMES[print]} print</span>
          </span>
          <span className="packet__open">Open on GitHub ↗</span>
        </span>
      </span>
    </a>
  );
}
