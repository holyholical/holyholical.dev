"use client";

import PixelIcon from "@/components/PixelIcon";
import { useShrine } from "@/lib/shrine-context";

export default function UnderConstruction() {
  const { t } = useShrine();
  return (
    <p className="construction">
      <span className="construction__text">
        <PixelIcon name="construction" className="construction__icon" /> {t("always under construction")} <PixelIcon name="construction" className="construction__icon" />
      </span>
    </p>
  );
}
