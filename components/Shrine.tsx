"use client";

import WaifuButton from "@/components/WaifuButton";
import { useShrine } from "@/lib/shrine-context";
import { CAST } from "@/lib/sprites";
import { useLocalCount } from "@/lib/use-local-count";

/** The full cast, plus a heart offering counter that lives in this browser. */
export default function Shrine() {
  const { t } = useShrine();
  const { count, bump } = useLocalCount("howwy-hearts");
  return (
    <div className="shrine-hall">
      <p className="shrine-hall__hint">{t("Click a girl to hear what she has to say.")}</p>
      <ul className="cast">
        {CAST.map((waifu) => (
          <li key={waifu.id}>
            <WaifuButton waifu={waifu} scale={4} />
          </li>
        ))}
      </ul>
      <div className="offering">
        <button type="button" className="btn btn--pink" onClick={bump}>
          ♡ {t("offer a heart")}
        </button>
        <span className="offering__count" aria-live="polite">
          {count} {t(count === 1 ? "heart offered" : "hearts offered")}
        </span>
      </div>
    </div>
  );
}
