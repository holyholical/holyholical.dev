"use client";

const skills = [
  {
    name: "HTML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    url: "https://www.typescriptlang.org/",
  },
  {
    name: "Next.js / React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    url: "https://nextjs.org/",
  },
  {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    url: "https://isocpp.org/",
  },
  {
    name: "C#",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
  },
  {
    name: "C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    url: "https://en.wikipedia.org/wiki/C_(programming_language)",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    url: "https://www.python.org/",
  },
  {
    name: "Assembly",
    icon: "",
    url: "https://en.wikipedia.org/wiki/Assembly_language",
  },
];

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-8">Skills</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {skills.map((skill, idx) => {
          const cardContent = (
            <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center shadow-lg">
              {skill.icon && (
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-16 h-16 mb-4"
                />
              )}
              <h2 className="text-xl font-semibold mb-2 text-center">
                {skill.name}
              </h2>
            </div>
          );

          return skill.url ? (
            <a
              key={idx}
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-gray-700 transition-colors cursor-pointer"
            >
              {cardContent}
            </a>
          ) : (
            <div key={idx}>{cardContent}</div>
          );
        })}
      </div>
    </div>
  );
}
