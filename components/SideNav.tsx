"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "home", icon: "🏠" },
  { href: "/projects/", label: "projects", icon: "💾" },
  { href: "/skills/", label: "skills", icon: "⚔" },
  { href: "/qna/", label: "q & a", icon: "💌" },
] as const;

const normalise = (path: string) => (path.endsWith("/") ? path : `${path}/`);

/** Pixel bevel nav buttons. Marks the current page. */
export default function SideNav() {
  const pathname = normalise(usePathname() ?? "/");
  return (
    <nav className="nav" aria-label="Site">
      <ul className="nav__list">
        {LINKS.map((link) => {
          const isCurrent = pathname === normalise(link.href);
          return (
            <li key={link.href}>
              <Link href={link.href} className={`btn nav__btn ${isCurrent ? "btn--active" : ""}`} aria-current={isCurrent ? "page" : undefined}>
                <span aria-hidden="true">{link.icon}</span> {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
