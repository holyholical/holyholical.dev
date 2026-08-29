const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

interface Skill {
  name: string;
  family: string;
  icon: string | null;
  url: string;
}

const SKILLS: Skill[] = [
  { name: "HTML", family: "Markup", icon: `${DEVICON}/html5/html5-original.svg`, url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { name: "CSS", family: "Stylesheets", icon: `${DEVICON}/css3/css3-original.svg`, url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { name: "JavaScript", family: "Language", icon: `${DEVICON}/javascript/javascript-original.svg`, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "TypeScript", family: "Language", icon: `${DEVICON}/typescript/typescript-original.svg`, url: "https://www.typescriptlang.org/" },
  { name: "Next.js / React", family: "Framework", icon: `${DEVICON}/react/react-original.svg`, url: "https://nextjs.org/" },
  { name: "C++", family: "Language", icon: `${DEVICON}/cplusplus/cplusplus-original.svg`, url: "https://isocpp.org/" },
  { name: "C#", family: "Language", icon: `${DEVICON}/csharp/csharp-original.svg`, url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
  { name: "C", family: "Language", icon: `${DEVICON}/c/c-original.svg`, url: "https://en.wikipedia.org/wiki/C_(programming_language)" },
  { name: "Python", family: "Language", icon: `${DEVICON}/python/python-original.svg`, url: "https://www.python.org/" },
  { name: "Assembly", family: "Language", icon: null, url: "https://en.wikipedia.org/wiki/Assembly_language" },
];

const hostOf = (url: string) => new URL(url).hostname.replace(/^www\./, "");

export default function SkillsPage() {
  return (
    <section className="shelf" aria-labelledby="guide-title">
      <div className="shelf__head">
        <h1 id="guide-title" className="shelf__title">
          Growing guide
        </h1>
        <p className="shelf__note">What grows on this rack, and where to read up on each variety.</p>
      </div>
      <table className="guide">
        <thead>
          <tr>
            <th scope="col">Variety</th>
            <th scope="col">Family</th>
            <th scope="col">Reference</th>
          </tr>
        </thead>
        <tbody>
          {SKILLS.map((skill) => (
            <tr key={skill.name}>
              <td>
                <span className="guide__variety">
                  {skill.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="guide__icon" src={skill.icon} alt="" width={28} height={28} loading="lazy" />
                  ) : (
                    <span className="guide__icon guide__icon--text" aria-hidden="true">
                      ASM
                    </span>
                  )}
                  {skill.name}
                </span>
              </td>
              <td className="guide__family">{skill.family}</td>
              <td>
                <a className="guide__link" href={skill.url} target="_blank" rel="noopener noreferrer">
                  {hostOf(skill.url)} ↗
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
