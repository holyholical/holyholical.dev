"use client";

import { useEffect, useRef, useState } from "react";
import { createChiptune, type ChiptunePlayer } from "@/lib/chiptune";
import { useShrine } from "@/lib/shrine-context";

/** Opt-in chiptune. Nothing plays until the visitor presses this. */
export default function BgmButton() {
  const { t } = useShrine();
  const player = useRef<ChiptunePlayer | null>(null);
  const [isOn, setOn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => () => {
    player.current?.stop();
  }, []);

  const toggle = async () => {
    try {
      if (!player.current) player.current = createChiptune();
      if (player.current.isPlaying()) {
        await player.current.stop();
        setOn(false);
      } else {
        await player.current.start();
        setOn(true);
      }
      setError(null);
    } catch {
      setError(t("Your browser would not let me play. Sorry!"));
      setOn(false);
    }
  };

  return (
    <div className="bgm">
      <button type="button" className={`btn ${isOn ? "btn--active" : ""}`} onClick={toggle} aria-pressed={isOn}>
        ♪ BGM: {isOn ? "ON" : "OFF"}
      </button>
      {isOn ? <span className="bgm__eq" aria-hidden="true"><i /><i /><i /><i /></span> : null}
      {error ? <p className="bgm__error" role="alert">{error}</p> : null}
    </div>
  );
}
