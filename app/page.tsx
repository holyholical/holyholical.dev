"use client";

import { useState } from "react";
import ColorfulText from "@/components/ui/colorful-text";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function Home() {
  // Story steps
  const storySteps = [
    `Hello there! I'm Holy, a passionate developer and tech enthusiast.`,
    `I'm introverted but I love talking with people.`,
    `My coding journey began at a young age, and I've been fascinated by technology ever since.`,
    `On this website, you'll find a collection of my projects, programming keys, and a Q&A section.`,
    `Feel free to explore and reach out if you'd like to connect!`,
  ];

  const [currentStep, setCurrentStep] = useState(0);

  // Words for typewriter effect
  const words = [
    { text: "Welcome" },
    { text: "to" },
    { text: "my" },
    { text: "personal" },
    { text: "website!" },
    { text: "Explore" },
    { text: "my" },
    { text: "projects," },
    { text: "keys," },
    { text: "and" },
    { text: "Q&A." },
  ];

  const handleNextStep = () => {
    if (currentStep < storySteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleResetStory = () => {
    setCurrentStep(0);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center py-2 bg-black overflow-hidden">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-10 text-center z-10">
        <h1 className="text-6xl font-bold text-white mb-8">
          <ColorfulText text="holyholical.dev" />
        </h1>
        <div className="max-w-3xl text-left mb-6">
          <TextGenerateEffect
            key={currentStep}
            words={storySteps[currentStep]}
          />
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
          {currentStep < storySteps.length - 1 ? (
            <button
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              onClick={handleNextStep}
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Next
              </span>
            </button>
          ) : (
            <button
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              onClick={handleResetStory}
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Restart
              </span>
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
