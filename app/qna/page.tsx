"use client";

import React from "react";

interface QAItem {
  question: string;
  answer: string;
}

const qaList: QAItem[] = [
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
    answer:
      "Yes! I love contributing to open-source projects and learning from the community.",
  },
];

export default function QnAPage() {
  return (
    <div className="min-h-screen bg-black text-white py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-8">Q&amp;A</h1>
      <div className="max-w-4xl mx-auto space-y-6">
        {qaList.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{item.question}</h2>
            <p className="text-gray-300">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
