"use client";

import { useShrine } from "@/lib/shrine-context";
import { UWU_LABELS, UWU_LEVELS } from "@/lib/uwu";

/** Three-way switch for how cute the copy is. Off is plain English. */
export default function UwuToggle() {
  const { level, setLevel } = useShrine();
  return (
    <div className="uwu" role="radiogroup" aria-label="Speech style">
      <span className="uwu__label" aria-hidden="true">
        speech:
      </span>
      {UWU_LEVELS.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={level === option}
          className={`btn btn--tiny ${level === option ? "btn--active" : ""}`}
          onClick={() => setLevel(option)}
        >
          {UWU_LABELS[option]}
        </button>
      ))}
    </div>
  );
}
