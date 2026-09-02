"use client";

import RetroWindow from "@/components/RetroWindow";
import { useShrine } from "@/lib/shrine-context";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

interface Skill {
  name: string;
  family: string;
  icon: string | null;
  url: string;
  note: string;
}

const SKILLS: readonly Skill[] = [
  { name: "HTML", family: "markup", icon: `${DEVICON}/html5/html5-original.svg`, url: "https://developer.mozilla.org/en-US/docs/Web/HTML", note: "Where every page starts. This one has tables on purpose." },
  { name: "CSS", family: "stylesheets", icon: `${DEVICON}/css3/css3-original.svg`, url: "https://developer.mozilla.org/en-US/docs/Web/CSS", note: "Bevels, blinks, and sparkles are all CSS." },
  { name: "JavaScript", family: "language", icon: `${DEVICON}/javascript/javascript-original.svg`, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", note: "The one that runs in your browser right now." },
  { name: "TypeScript", family: "language", icon: `${DEVICON}/typescript/typescript-original.svg`, url: "https://www.typescriptlang.org/", note: "My favourite. Types are friends." },
  { name: "Next.js / React", family: "framework", icon: `${DEVICON}/react/react-original.svg`, url: "https://nextjs.org/", note: "This site is a static Next.js export." },
  { name: "C++", family: "language", icon: `${DEVICON}/cplusplus/cplusplus-original.svg`, url: "https://isocpp.org/", note: "For when it has to be fast." },
  { name: "C#", family: "language", icon: `${DEVICON}/csharp/csharp-original.svg`, url: "https://learn.microsoft.com/en-us/dotnet/csharp/", note: "Comfortable and well behaved." },
  { name: "C", family: "language", icon: `${DEVICON}/c/c-original.svg`, url: "https://en.wikipedia.org/wiki/C_(programming_language)", note: "Pointers are not scary once you make friends with them." },
  { name: "Python", family: "language", icon: `${DEVICON}/python/python-original.svg`, url: "https://www.python.org/", note: "Quick scripts and experiments." },
  { name: "Assembly", family: "language", icon: null, url: "https://en.wikipedia.org/wiki/Assembly_language", note: "Very honest about what the machine is doing." },
];

const hostOf = (url: string) => new URL(url).hostname.replace(/^www\./, "");

export default function SkillsPage() {
  const { t } = useShrine();
  return (
    <RetroWindow title={t("my skills")} icon="sword" headingId="skills-title">
      <p className="lead">{t("What I actually work in, as a collection. No star ratings, I refuse to grade myself.")}</p>
      <ul className="cards">
        {SKILLS.map((skill) => (
          <li key={skill.name} className="card">
            <div className="card__head">
              {skill.icon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="card__icon" src={skill.icon} alt="" width={32} height={32} loading="lazy" />
              ) : (
                <span className="card__icon card__icon--text" aria-hidden="true">
                  ASM
                </span>
              )}
              <span className="card__name">{skill.name}</span>
            </div>
            <p className="card__family">{t(skill.family)}</p>
            <p className="card__note">{t(skill.note)}</p>
            <a className="card__link" href={skill.url} target="_blank" rel="noopener noreferrer">
              {hostOf(skill.url)} ↗
            </a>
          </li>
        ))}
      </ul>
    </RetroWindow>
  );
}
