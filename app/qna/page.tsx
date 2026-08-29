import ShelfTag from "@/components/ShelfTag";
import { GITHUB_PROFILE_URL } from "@/lib/github";

interface QAItem {
  question: string;
  answer: string;
}

const QA: QAItem[] = [
  {
    question: "How did you start coding?",
    answer:
      "I started coding at a young age, fascinated by how software could bring ideas to life. Over time, I explored different languages and frameworks.",
  },
  {
    question: "What is your favorite programming language?",
    answer:
      "I enjoy TypeScript the most for its type safety and flexibility, combined with React for front-end development.",
  },
  {
    question: "Do you contribute to open source?",
    answer: "Yes! I love contributing to open-source projects and learning from the community.",
  },
];

const TILTS = ["-1.2deg", "0.8deg", "-0.5deg"];

export default function QnAPage() {
  return (
    <section className="shelf" aria-labelledby="qna-title">
      <div className="shelf__head">
        <h1 id="qna-title" className="shelf__title">
          Ask the grower
        </h1>
        <p className="shelf__note">Questions people have asked me, pinned up on index cards.</p>
      </div>

      <ul className="cards">
        {QA.map((item, i) => (
          <li key={item.question} className="card" style={{ "--tilt": TILTS[i % TILTS.length] } as React.CSSProperties}>
            <h2 className="card__q">{item.question}</h2>
            <p className="card__a">{item.answer}</p>
          </li>
        ))}
      </ul>

      <ShelfTag heading="Got one of your own?">
        <p>
          This site is static, so there is no question box to post into. The quickest way to reach me is through
          GitHub.
        </p>
        <p>
          <a className="tag__link" href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
            Find me on GitHub ↗
          </a>
        </p>
      </ShelfTag>
    </section>
  );
}
