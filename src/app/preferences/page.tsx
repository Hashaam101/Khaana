"use client";

import { useState } from "react";
import Link from "next/link";
import { allergyOptions, dietaryOptions } from "@/lib/data";

export default function PreferencesPage() {
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 800]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [dietary, setDietary] = useState<string[]>(["Halal"]);
  const [mealTypes, setMealTypes] = useState<string[]>([
    "Lunch",
    "Dinner",
  ]);
  const [saved, setSaved] = useState(false);

  const toggleItem = (
    list: string[],
    setList: (v: string[]) => void,
    item: string
  ) => {
    setList(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
    );
  };

  return (
    <div className="min-h-screen bg-khaana-surface">
      {/* Header */}
      <header className="sticky top-0 bg-khaana-dark z-40 shadow-md">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="w-8 h-8 rounded-full flex items-center justify-center"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="#ADC178"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="font-bold text-base text-white">Food Preferences</h1>
          <div className="w-8" />
        </div>
      </header>

      <div className="px-4 pt-4">
        {saved && (
          <div className="bg-khaana-light/20 border border-khaana-light rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="#1B512D"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-khaana-dark dark:text-khaana-light font-medium">
              Preferences saved!
            </span>
          </div>
        )}

        {/* Price Range */}
        <section className="mb-8">
          <h2 className="font-bold text-sm mb-1">Price Range (PKR)</h2>
          <p className="text-xs text-khaana-muted mb-4">
            Set your budget for surprise bags
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-[10px] text-khaana-muted uppercase tracking-wide">
                Min
              </label>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                className="w-full mt-1 border border-khaana-border bg-khaana-card rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-khaana-dark"
                min={0}
                step={50}
              />
            </div>
            <span className="text-khaana-muted mt-4">-</span>
            <div className="flex-1">
              <label className="text-[10px] text-khaana-muted uppercase tracking-wide">
                Max
              </label>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="w-full mt-1 border border-khaana-border bg-khaana-card rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-khaana-dark"
                min={0}
                step={50}
              />
            </div>
          </div>
        </section>

        {/* Allergies */}
        <section className="mb-8">
          <h2 className="font-bold text-sm mb-1">Allergies</h2>
          <p className="text-xs text-khaana-muted mb-4">
            We&apos;ll filter out bags containing these allergens
          </p>
          <div className="flex flex-wrap gap-2">
            {allergyOptions.map((allergy) => (
              <button
                key={allergy}
                onClick={() => toggleItem(allergies, setAllergies, allergy)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  allergies.includes(allergy)
                    ? "bg-red-100 text-red-700 border border-red-300"
                    : "bg-khaana-surface text-khaana-text border border-khaana-border"
                }`}
              >
                {allergies.includes(allergy) && "✕ "}
                {allergy}
              </button>
            ))}
          </div>
        </section>

        {/* Dietary Preferences */}
        <section className="mb-8">
          <h2 className="font-bold text-sm mb-1">Dietary Preferences</h2>
          <p className="text-xs text-khaana-muted mb-4">
            Select your dietary requirements
          </p>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((option) => (
              <button
                key={option}
                onClick={() => toggleItem(dietary, setDietary, option)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  dietary.includes(option)
                    ? "bg-khaana-dark text-white"
                    : "bg-khaana-surface text-khaana-text border border-khaana-border"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        {/* Meal Times */}
        <section className="mb-8">
          <h2 className="font-bold text-sm mb-1">Preferred Meal Times</h2>
          <p className="text-xs text-khaana-muted mb-4">
            When do you usually pick up?
          </p>
          <div className="flex flex-wrap gap-2">
            {["Breakfast", "Lunch", "Dinner", "Late Night"].map((meal) => (
              <button
                key={meal}
                onClick={() => toggleItem(mealTypes, setMealTypes, meal)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  mealTypes.includes(meal)
                    ? "bg-khaana-light text-khaana-dark border border-khaana-light"
                    : "bg-khaana-surface text-khaana-text border border-khaana-border"
                }`}
              >
                {meal}
              </button>
            ))}
          </div>
        </section>

        {/* Subscription Plan */}
        <section className="mb-8">
          <h2 className="font-bold text-sm mb-1">Subscription Plan</h2>
          <p className="text-xs text-khaana-muted mb-4">
            Choose how often you want surprise bags
          </p>
          <div className="space-y-2">
            {[
              {
                name: "Daily Khaana",
                desc: "1 surprise bag every day",
                price: "Rs. 6,000/month",
                savings: "Save up to 60%",
              },
              {
                name: "Weekly Khaana",
                desc: "3 surprise bags per week",
                price: "Rs. 3,500/month",
                savings: "Save up to 50%",
              },
              {
                name: "Weekend Khaana",
                desc: "2 surprise bags on weekends",
                price: "Rs. 2,000/month",
                savings: "Save up to 45%",
              },
              {
                name: "Pay As You Go",
                desc: "Reserve bags individually",
                price: "No commitment",
                savings: "Save up to 40%",
              },
            ].map((plan, i) => (
              <button
                key={plan.name}
                className={`w-full text-left p-4 rounded-2xl border transition-colors ${
                  i === 1
                    ? "border-khaana-dark bg-khaana-dark/5"
                    : "border-khaana-border bg-khaana-surface"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{plan.name}</p>
                    <p className="text-xs text-khaana-muted mt-0.5">
                      {plan.desc}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-khaana-dark dark:text-khaana-light">
                      {plan.price}
                    </p>
                    <p className="text-[10px] text-khaana-light font-medium">
                      {plan.savings}
                    </p>
                  </div>
                </div>
                {i === 1 && (
                  <span className="inline-block mt-2 text-[10px] bg-khaana-dark text-white px-2 py-0.5 rounded-full font-medium">
                    Most Popular
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Save button */}
      <div className="sticky bottom-0 bg-khaana-dark p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.15)]">
        <button
          onClick={() => setSaved(true)}
          className="w-full bg-khaana-light text-khaana-dark py-3.5 rounded-xl font-semibold text-sm active:scale-[0.98] transition-transform hover:brightness-110"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
