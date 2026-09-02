"use client";

import WebButton from "@/components/WebButton";
import { BUTTONS } from "@/lib/buttons";
import { useShrine } from "@/lib/shrine-context";

const ARCHIVE_URL = "https://cyber.dabamos.de/88x31/";

/** The wall of 88×31 buttons at the bottom of every page, the way the old web signed off. */
export default function ButtonWall() {
  const { t } = useShrine();
  return (
    <section className="wall" aria-labelledby="wall-title">
      <h2 id="wall-title" className="wall__title">
        ☆ {t("button wall")} ☆
      </h2>
      <ul className="wall__list">
        {BUTTONS.map((button) => (
          <li key={button.file}>
            <WebButton button={button} />
          </li>
        ))}
      </ul>
      <p className="wall__credit">
        {t("buttons rescued from")}{" "}
        <a href={ARCHIVE_URL} target="_blank" rel="noopener noreferrer">
          the 88×31 GIF collection
        </a>
        . {t("Copied, not hot-linked, like it asks.")}
      </p>
    </section>
  );
}
