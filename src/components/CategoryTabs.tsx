"use client";

import { categories } from "@/data/stores";

interface CategoryTabsProps {
  active: string;
  onChange: (id: string) => void;
}

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar px-4 py-3">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            active === cat.id
              ? "bg-forest text-white"
              : "bg-surface-tertiary text-content-secondary hover:bg-surface-inset"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
