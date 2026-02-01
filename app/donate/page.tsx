"use client";
import { useState } from "react";

const Crypto = [
  {
    name: "Bitcoin (BTC)",
    address: "bc1qkfnkfma8wsgphpwvz9tctemu2tcx2aqdumsu0p",
  },
  {
    name: "Ethereum (ETH)",
    address: "0xC9C746046532ac960433d4D79c89D72A42740208",
  },
  {
    name: "Litecoin (LTC)",
    address: "LSVQNpQF3ZSfyurtFbZPSB9q9yBfoDJD95",
  },
  {
    name: "Solana (SOL)",
    address: "57REvDD54RVsgzipn9xqkLvyeBmWkuuxu1WJBtihpeGz",
  },
];

export default function DonatePage() {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(address);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-center mb-8">
          Donate me via crypto
        </h1>
        {Crypto.map((crypto) => (
          <div
            key={crypto.name}
            className="mt-6 flex items-center justify-center space-x-4"
          >
            <span className="text-xl font-semibold">{crypto.name}:</span>
            <p
              className="text-gray-300 break-all bg-gray-800 border border-gray-600 rounded-md px-2 py-1 font-mono cursor-pointer"
              onClick={() => copyToClipboard(crypto.address)}
              title="Click to copy"
            >
              {copied === crypto.address ? "Copied!" : crypto.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
