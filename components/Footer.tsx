const REPO_URL = "https://github.com/holyholical/holyholical.dev";

/** The rack's base plate: license and source, stamped into the metal. */
export default function Footer() {
  return (
    <footer className="base">
      <p className="base__text">
        Except where otherwise noted, content on this site is licensed under a MIT license. holyholical 🄯 2026.
      </p>
      <p className="base__links">
        <a href={`${REPO_URL}/blob/main/LICENSE`}>Licensing</a>
        <span aria-hidden="true">·</span>
        <a href={REPO_URL}>Source code</a>
      </p>
    </footer>
  );
}
