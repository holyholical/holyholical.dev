"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AISLES = [
  { label: "Home", path: "/", sub: "the rack" },
  { label: "Projects", path: "/projects", sub: "catalogue" },
  { label: "Skills", path: "/skills", sub: "growing guide" },
  { label: "Q&A", path: "/qna", sub: "ask the grower" },
];

const normalize = (path: string) => (path.length > 1 ? path.replace(/\/$/, "") : path);

export default function AisleNav() {
  const current = normalize(usePathname() ?? "/");
  return (
    <nav className="aisle" aria-label="Site">
      <ul className="aisle__list">
        {AISLES.map((aisle) => {
          const isActive = current === aisle.path;
          return (
            <li key={aisle.path}>
              <Link className="aisle__sign" href={aisle.path} aria-current={isActive ? "page" : undefined}>
                <span className="aisle__label">{aisle.label}</span>
                <span className="aisle__sub">{aisle.sub}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
