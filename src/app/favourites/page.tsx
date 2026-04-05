"use client";

import { useState } from "react";
import Header from "@/components/Header";
import BagCard from "@/components/BagCard";
import { stores } from "@/lib/data";

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState<string[]>(["1", "4", "6"]);

  const favouriteStores = stores.filter((s) => favourites.includes(s.id));

  return (
    <>
      <Header />

      <div className="px-4 pt-4">
        <h1 className="font-bold text-xl">Your Favourites</h1>
        <p className="text-sm text-khaana-muted mt-1">
          Get notified when your favourite spots have surprise bags
        </p>
      </div>

      {favouriteStores.length > 0 ? (
        <div className="flex flex-col gap-3 px-4 mt-4">
          {favouriteStores.map((store) => (
            <div key={store.id} className="relative">
              <BagCard store={store} variant="horizontal" />
              <button
                onClick={() =>
                  setFavourites((f) => f.filter((id) => id !== store.id))
                }
                className="absolute top-2 right-2 w-7 h-7 bg-khaana-surface rounded-full shadow flex items-center justify-center z-10"
              >
                <svg
                  width="16"
                  height="16"
                  fill="#1B512D"
                  viewBox="0 0 24 24"
                  stroke="#1B512D"
                  strokeWidth={2}
                >
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          <div className="w-16 h-16 bg-khaana-cream rounded-full flex items-center justify-center mb-4">
            <svg
              width="32"
              height="32"
              fill="none"
              stroke="#1B512D"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="font-semibold text-lg">No favourites yet</h2>
          <p className="text-sm text-khaana-muted mt-2">
            Browse surprise bags and tap the heart to save your favourite spots
          </p>
        </div>
      )}

      <div className="h-8" />
    </>
  );
}
