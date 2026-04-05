"use client";

import { useState } from "react";
import Header from "@/components/Header";
import BagCard from "@/components/BagCard";
import { stores } from "@/lib/data";

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "map">("list");

  const filtered = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />

      {/* Search bar */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 bg-khaana-surface border border-khaana-border rounded-xl px-3 py-2.5">
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="#6B6B6B"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search restaurants, cuisines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none placeholder-khaana-muted"
          />
        </div>
      </div>

      {/* List/Map toggle */}
      <div className="flex gap-1 mx-4 mt-3 bg-khaana-cream rounded-lg p-1">
        <button
          onClick={() => setView("list")}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            view === "list"
              ? "bg-khaana-dark text-white"
              : "text-khaana-muted"
          }`}
        >
          List
        </button>
        <button
          onClick={() => setView("map")}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            view === "map"
              ? "bg-khaana-dark text-white"
              : "text-khaana-muted"
          }`}
        >
          Map
        </button>
      </div>

      {view === "list" ? (
        <div className="flex flex-col gap-3 px-4 mt-4">
          {filtered.map((store) => (
            <BagCard key={store.id} store={store} variant="horizontal" />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-khaana-muted">
              <p className="text-sm">No results found.</p>
              <p className="text-xs mt-1">Try a different search term.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mx-4 mt-4 rounded-2xl overflow-hidden border border-khaana-border bg-khaana-cream h-80 flex items-center justify-center">
          <div className="text-center text-khaana-muted">
            <svg
              width="48"
              height="48"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="mx-auto mb-3 opacity-50"
            >
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-sm font-medium">Map view coming soon</p>
            <p className="text-xs mt-1">
              We&apos;re adding interactive maps for your city
            </p>
          </div>
        </div>
      )}

      <div className="h-8" />
    </>
  );
}
