"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import PixelIcon from "@/components/PixelIcon";
import UwuToggle from "@/components/UwuToggle";
import type { IconName } from "@/lib/icons";

const LINKS = [
  { href: "/", label: "home", icon: "home" as IconName },
  { href: "/projects/", label: "projects", icon: "disk" as IconName },
  { href: "/skills/", label: "skills", icon: "sword" as IconName },
  { href: "/qna/", label: "q & a", icon: "letter" as IconName },
] as const;

const normalise = (path: string) => (path.endsWith("/") ? path : `${path}/`);

/** The horizontal bar under the mascot. Bevel buttons, current page pressed in, speech toggle at the end. */
export default function Nav() {
  const pathname = normalise(usePathname() ?? "/");
  return (
    <nav className="nav" aria-label="Site">
      <ul className="nav__list">
        {LINKS.map((link) => {
          const isCurrent = pathname === normalise(link.href);
          return (
            <li key={link.href}>
              <Link href={link.href} className={`btn nav__btn ${isCurrent ? "btn--active" : ""}`} aria-current={isCurrent ? "page" : undefined}>
                <PixelIcon name={link.icon} className="nav__icon" /> {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <UwuToggle />
    </nav>
  );
}
