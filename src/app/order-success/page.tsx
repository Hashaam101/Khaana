"use client";

import { useState } from "react";
import Link from "next/link";
import { Share2, Copy, Check } from "lucide-react";
import { KhaanaIcon } from "@/components/KhaanaLogo";

export default function OrderSuccessPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Success Illustration */}
        <div className="relative mb-8">
          {/* Bag illustration */}
          <div className="w-40 h-48 bg-forest rounded-t-2xl rounded-b-lg relative mx-auto flex flex-col items-center justify-center">
            {/* Bag handles */}
            <div className="absolute -top-4 left-8 w-8 h-8 border-4 border-forest rounded-full bg-transparent" />
            <div className="absolute -top-4 right-8 w-8 h-8 border-4 border-forest rounded-full bg-transparent" />

            {/* Logo on bag */}
            <KhaanaIcon size="lg" />
            <span className="text-olivine font-bold text-sm mt-1">Khaana</span>
          </div>

          {/* Food items peeking out */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1">
            <span className="text-2xl">🥖</span>
            <span className="text-2xl">🥬</span>
            <span className="text-2xl">🍎</span>
          </div>

          {/* Sparkles */}
          <span className="absolute -top-2 -right-4 text-xl">✨</span>
          <span className="absolute top-4 -left-6 text-lg">🌟</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          You&apos;re a hero!
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed max-w-[280px]">
          Thanks for saving good food from going to waste. Your Khaana Bag is
          reserved and waiting for you!
        </p>

        {/* Order Details */}
        <div className="w-full bg-olivine-pale rounded-xl p-4 mt-6 text-left">
          <p className="text-sm font-semibold text-forest">Pickup reminder</p>
          <p className="text-xs text-gray-600 mt-1">
            Remember to collect your bag during the pickup window. Show this
            screen at the store.
          </p>
          <div className="mt-3 bg-white rounded-lg p-3 border border-olivine/30">
            <p className="text-xs text-gray-500">Order reference</p>
            <p className="font-mono font-bold text-forest text-lg mt-0.5">
              KH-2025-0405
            </p>
          </div>
        </div>

        {/* Hashtag */}
        <p className="text-forest font-bold mt-6 text-sm">#KhaanaHero</p>

        {/* Share Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-sm font-medium text-gray-700"
          >
            {copied ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Copy size={16} />
            )}
            {copied ? "Copied!" : "Copy link"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-forest text-white rounded-xl text-sm font-medium">
            <Share2 size={16} />
            Share
          </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="px-4 pb-6 pt-4 space-y-3">
        <Link
          href="/"
          className="block w-full py-3.5 bg-forest text-white font-bold rounded-2xl text-center text-base"
        >
          Back to Discover
        </Link>
        <Link
          href="/profile"
          className="block w-full py-3.5 bg-gray-100 text-gray-700 font-bold rounded-2xl text-center text-base"
        >
          View my orders
        </Link>
      </div>
    </div>
  );
}
