"use client";

import { useRouter } from "next/navigation";

interface TopBarProps {
  buttons: { label: string; path: string }[];
}

export default function TopBar({ buttons }: TopBarProps) {
  const router = useRouter();

  if (!buttons || buttons.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto py-3 px-6 mt-5 rounded-full shadow-lg relative z-10 bg-black backdrop-blur-sm">
      <div className="flex justify-center gap-3 bg-black">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => router.push(btn.path)}
            className="px-5 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors duration-200 font-medium shadow-sm"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
