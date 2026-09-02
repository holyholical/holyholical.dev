"use client";

import { useState, type ReactNode } from "react";

interface RetroWindowProps {
  title: string;
  icon?: string;
  children: ReactNode;
  className?: string;
  headingId?: string;
}

/** A Windows-95 style window. Minimise and close both fold the body; the title bar always stays so it can reopen. */
export default function RetroWindow({ title, icon = "♡", children, className, headingId }: RetroWindowProps) {
  const [isOpen, setOpen] = useState(true);
  return (
    <section className={`win ${isOpen ? "" : "win--folded"} ${className ?? ""}`.trim()} aria-labelledby={headingId}>
      <div className="win__bar">
        <span className="win__icon" aria-hidden="true">
          {icon}
        </span>
        <h2 className="win__title" id={headingId}>
          {title}
        </h2>
        <span className="win__controls">
          <button type="button" className="win__ctl" onClick={() => setOpen((o) => !o)} aria-expanded={isOpen} aria-label={isOpen ? "Minimise" : "Restore"}>
            {isOpen ? "_" : "□"}
          </button>
          <button type="button" className="win__ctl" onClick={() => setOpen(false)} aria-label="Close (it just folds, nothing is lost)">
            ×
          </button>
        </span>
      </div>
      {isOpen ? <div className="win__body">{children}</div> : <p className="win__folded">(folded ⋯ press □ to open)</p>}
    </section>
  );
}
