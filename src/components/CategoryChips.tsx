"use client";

import { categories } from "@/lib/data";

export default function CategoryChips({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (cat: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar px-4 py-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            selected === cat
              ? "bg-khaana-dark text-white"
              : "bg-khaana-card text-khaana-text border border-khaana-border"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
