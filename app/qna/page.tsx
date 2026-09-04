"use client";

import RetroWindow from "@/components/RetroWindow";
import { GITHUB_PROFILE_URL } from "@/lib/github";
import { useShrine } from "@/lib/shrine-context";

interface QAItem {
  question: string;
  answer: string;
}

const QA: readonly QAItem[] = [
  {
    question: "How did you start coding?",
    answer:
      "I started coding at a young age, fascinated by how software could bring ideas to life. Over time I explored different languages and frameworks.",
  },
  {
    question: "What is your favourite programming language?",
    answer: "I enjoy TypeScript the most for its type safety and flexibility, combined with React for front-end development.",
  },
  {
    question: "Do you contribute to open source?",
    answer: "Yes! I love contributing to open-source projects and learning from the community.",
  },
];

export default function QnAPage() {
  const { t } = useShrine();
  return (
    <RetroWindow title={t("questions & answers")} icon="letter" headingId="qna-title">
      <p className="lead">{t("Things people have asked me, answered by me.")}</p>
      <ol className="chat">
        {QA.map((item) => (
          <li key={item.question} className="chat__pair">
            <p className="chat__q">
              <span className="chat__who">{t("visitor")}</span>
              {t(item.question)}
            </p>
            <div className="chat__a">
              <p>
                <span className="chat__who">Holy</span>
                {t(item.answer)}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div className="notice">
        <p>{t("Got a question of your own? This page is static, so there is no box to type into. Come find me on GitHub instead.")}</p>
        <a className="btn btn--pink" href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
          {t("say hi on GitHub")} ↗
        </a>
      </div>
    </RetroWindow>
  );
}
