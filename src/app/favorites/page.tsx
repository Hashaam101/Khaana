"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import StoreCard from "@/components/StoreCard";
import { FavoritesPageSkeleton } from "@/components/Skeleton";
import { stores } from "@/data/stores";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(
    stores.filter((s) => s.isFavorite)
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((s) => s.id !== id));
  };

  if (isLoading) {
    return (
      <>
        <FavoritesPageSkeleton />
        <BottomNav />
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white px-4 pt-6 pb-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Favourites</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {favorites.length} saved {favorites.length === 1 ? "store" : "stores"}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {favorites.length > 0 ? (
          <div className="flex flex-col gap-3">
            {favorites.map((store) => (
              <div key={store.id} className="relative">
                <StoreCard store={store} variant="horizontal" />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFavorite(store.id);
                  }}
                  className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-sm border border-gray-100 z-10"
                >
                  <Heart size={16} className="text-red-500 fill-red-500" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Heart size={32} className="text-gray-300" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">
              No favourites yet
            </h3>
            <p className="text-sm text-gray-500 text-center max-w-[240px]">
              Tap the heart icon on any store to save it here for quick access
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
