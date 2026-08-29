import Link from "next/link";

/** The header sign hung from the top of the rack. */
export default function RackSign() {
  return (
    <header className="sign">
      <span className="sign__hook sign__hook--left" aria-hidden="true" />
      <span className="sign__hook sign__hook--right" aria-hidden="true" />
      <Link href="/" className="sign__title">
        holyholical.dev
      </Link>
      <p className="sign__line">Everything on this rack is live from my GitHub. Pick a packet.</p>
    </header>
  );
}
