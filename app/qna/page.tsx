"use client";

import React, { useState } from "react";

interface QAItem {
  question: string;
  answer: string;
}

interface UserQuestion {
  id: string;
  question: string;
  answer?: string;
  authorName?: string;
  authorEmail?: string;
  submittedAt: string;
  answeredAt?: string;
  status: "pending" | "answered";
}

const staticQAList: QAItem[] = [
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
  const [userQuestions] = useState<UserQuestion[]>([]);
  const [loading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    authorName: "",
    authorEmail: "",
  });
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage("");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Q&amp;A</h1>

        <div className="mb-16">
          <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Ask a Question</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="question"
                  className="block text-sm font-medium mb-2"
                >
                  Your Question *
                </label>
                <textarea
                  id="question"
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="What would you like to know?"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Maximum 500 characters
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="authorName"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="authorName"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label
                    htmlFor="authorEmail"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="authorEmail"
                    name="authorEmail"
                    value={formData.authorEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || !formData.question.trim()}
                className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
              >
                {submitting ? "Submitting..." : "Submit Question"}
              </button>
              <span className="text-xs text-gray-400 mt-1 pl-2 pt-2 font-medium italic text-center">
                Not working rn due to Github Pages serving only static pages.
              </span>
            </form>

            {submitMessage && (
              <div
                className={`mt-4 p-3 rounded-lg ${submitMessage.includes("✅") ? "bg-green-900" : "bg-red-900"}`}
              >
                <p className="text-sm">{submitMessage}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {staticQAList.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-3">{item.question}</h3>
                <p className="text-gray-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8">Community Questions</h2>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-400">Loading questions...</p>
            </div>
          ) : userQuestions.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <p className="text-gray-400">
                No answered questions yet. Be the first to ask!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {userQuestions.map((q) => (
                <div
                  key={q.id}
                  className="bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold mb-3">{q.question}</h3>
                  <p className="text-gray-300 mb-4">{q.answer}</p>
                  <div className="text-sm text-gray-500 border-t border-gray-700 pt-3">
                    <p>Asked by {q.authorName || "Anonymous"}</p>
                    <p>
                      Answered on {new Date(q.answeredAt!).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
