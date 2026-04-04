"use client";

import Image from "next/image";

const logoFiles: Record<string, string> = {
  "savour-foods": "/logos/savour-foods.png",
  "monal-restaurant": "/logos/monal.png",
  "burning-brownie": "/logos/burning-brownine.png",
  "tehzeeb-bakers": "/logos/Tehzeeb-Bakers.png",
  "jalal-sons": "/logos/Jalal-sons.png",
  "kabul-restaurant": "/logos/kabul.png",
  "chaaye-khana": "/logos/chaaye-khana.png",
  "des-pardes": "/logos/Des-pardes.png",
  "rahat-bakers": "/logos/rahat.png",
  "street1-cafe": "/logos/street-1-cafe.png",
  "tandoori-islamabad": "/logos/tandoori.png",
  "kohsar-greens": "/logos/Kohsar-Market-Greens.png",
};

// Some logos look better with specific background treatments
const logoBg: Record<string, string> = {
  "chaaye-khana": "#1a1a1a",
  "kabul-restaurant": "#2a2a2a",
  "street1-cafe": "#0a1a3a",
  "kohsar-greens": "#1B6B3A",
};

// Logos with unusual aspect ratios that need cover instead of contain
const logoCover = new Set(["kohsar-greens"]);

export function RestaurantLogo({
  storeId,
  size = 40,
  className,
}: {
  storeId: string;
  size?: number;
  className?: string;
}) {
  const src = logoFiles[storeId];
  const bg = logoBg[storeId];

  if (!src) {
    return (
      <div
        className={`rounded-full bg-gray-300 flex items-center justify-center text-white font-bold ${className ?? ""}`}
        style={{ width: size, height: size, fontSize: size * 0.35 }}
      >
        ?
      </div>
    );
  }

  return (
    <div
      className={`rounded-full overflow-hidden flex-shrink-0 ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        backgroundColor: bg ?? "#ffffff",
      }}
    >
      <Image
        src={src}
        alt={storeId}
        width={size}
        height={size}
        className={`w-full h-full ${logoCover.has(storeId) ? "object-cover" : "object-contain"}`}
        quality={75}
      />
    </div>
  );
}
