"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import CategoryChips from "@/components/CategoryChips";
import BagCard from "@/components/BagCard";
import { stores, photos } from "@/lib/data";

export default function Home() {
  const [category, setCategory] = useState("All");

  const filtered =
    category === "All"
      ? stores
      : stores.filter((s) => s.category === category);

  const recommended = stores.filter((s) => s.rating >= 4.5);
  const nearby = stores.filter((s) => parseFloat(s.distance) <= 2);

  return (
    <>
      <Header />

      {/* Hero banner */}
      <div className="relative h-44 mx-4 mt-4 rounded-2xl overflow-hidden">
        <Image
          src={photos.fatherDaughterDesi}
          alt="Save food with Khaana"
          fill
          className="object-cover"
          sizes="(max-width: 512px) 100vw, 512px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-khaana-dark/90 to-khaana-dark/40 flex flex-col justify-center px-6">
          <h1 className="text-white text-xl font-bold leading-tight">
            Save <span className="text-khaana-light italic">delicious</span>
            <br />
            food from waste
          </h1>
          <p className="text-white/80 text-xs mt-2">
            Rescue surplus meals from top restaurants across Pakistan
          </p>
        </div>
      </div>

      {/* Category filter */}
      <CategoryChips selected={category} onSelect={setCategory} />

      {/* Recommended section */}
      {category === "All" && (
        <section className="mt-2">
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="font-bold text-base">Recommended for you</h2>
            <button className="text-khaana-dark dark:text-khaana-light text-sm font-medium">
              See all
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4 pb-2">
            {recommended.map((store) => (
              <BagCard key={store.id} store={store} />
            ))}
          </div>
        </section>
      )}

      {/* Nearby / Filtered section */}
      <section className="mt-6 px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-base">
            {category === "All" ? "Nearby" : category}
          </h2>
          {category === "All" && (
            <button className="text-khaana-dark dark:text-khaana-light text-sm font-medium">
              See all
            </button>
          )}
        </div>
        <div className="flex flex-col gap-3">
          {(category === "All" ? nearby : filtered).map((store) => (
            <BagCard key={store.id} store={store} variant="horizontal" />
          ))}
          {(category === "All" ? nearby : filtered).length === 0 && (
            <div className="text-center py-12 text-khaana-muted">
              <p className="text-sm">No bags available in this category yet.</p>
              <p className="text-xs mt-1">Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}
