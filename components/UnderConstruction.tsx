"use client";

import { useShrine } from "@/lib/shrine-context";

export default function UnderConstruction() {
  const { t } = useShrine();
  return (
    <p className="construction">
      <span className="construction__text">
        <span aria-hidden="true">🚧</span> {t("always under construction")} <span aria-hidden="true">🚧</span>
      </span>
    </p>
  );
}
