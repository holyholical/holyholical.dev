import type { ReactNode } from "react";

interface ShelfTagProps {
  heading?: string;
  children: ReactNode;
  className?: string;
}

/** A white paper tag clipped to a shelf wire, for hand-set copy: the intro, notices, errors. */
export default function ShelfTag({ heading, children, className = "" }: ShelfTagProps) {
  return (
    <div className={`tag ${className}`.trim()}>
      <span className="tag__clip" aria-hidden="true" />
      {heading ? <h2 className="tag__heading">{heading}</h2> : null}
      <div className="tag__body">{children}</div>
    </div>
  );
}
