"use client";
import { Clipboard } from "lucide-react";
import { useState } from "react";

interface KeyItem {
  name: string;
  type: string;
  description: string;
  value: string;
}

const keys: KeyItem[] = [
  {
    name: "PGP Public Key",
    type: "PGP",
    description: "My public key for encrypted communication.",
    value: `
-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: Keybase OpenPGP v1.0.0
Comment: https://keybase.io/crypto
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
cQNtEie1yg==
=vrq+
-----END PGP PUBLIC KEY BLOCK-----
      
      `,
  },
];
const shortenKey = (key: string, chars = 100) => {
  const lines = key.split("\n").map((line) => line.trimEnd());
  const totalLength = lines.reduce((sum, l) => sum + l.length, 0);
  if (totalLength <= chars * 2) return key;
  let start = "";
  let end = "";
  let startCount = 0;
  let endCount = 0;
  for (const line of lines) {
    if (startCount + line.length <= chars) {
      start += line + "\n";
      startCount += line.length;
    } else {
      start += line.slice(0, chars - startCount) + "\n";
      break;
    }
  }
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    if (endCount + line.length <= chars) {
      end = line + "\n" + end;
      endCount += line.length;
    } else {
      end = line.slice(line.length - (chars - endCount)) + "\n" + end;
      break;
    }
  }
  return `${start}...\n${end}`;
};

export default function KeysPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const handleCopy = (value: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          setCopiedKey(value);
          setTimeout(() => setCopiedKey(null), 2000);
        })
        .catch(() => {
          alert("Clipboard API not available");
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = value;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopiedKey(value);
        setTimeout(() => setCopiedKey(null), 2000);
      } catch {
        alert("Copy not supported");
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-8">Keys</h1>
      <div className="max-w-4xl mx-auto space-y-6">
        {keys.map((key, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold">{key.name}</h2>
              <button
                onClick={() => handleCopy(key.value)}
                className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-sm px-3 py-1 rounded transition"
              >
                <Clipboard className="w-4 h-4" />
                {copiedKey === key.value ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-gray-400 mb-2">{key.description}</p>
            <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm">
              {expanded ? key.value : shortenKey(key.value)}
            </pre>
            <button
              className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear mt-3"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show Less" : "Show More"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
