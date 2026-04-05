"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cities } from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";

export default function Header() {
  const [city, setCity] = useState("Karachi");
  const [showCities, setShowCities] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 bg-khaana-surface/95 backdrop-blur-sm z-40 border-b border-khaana-border">
      <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden">
            <Image
              src="/Khaana-Photoshoot/1.1 - Casual Desi Dinner.png"
              alt="Khaana logo"
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="font-bold text-lg text-khaana-dark dark:text-khaana-light">
            Khaana
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* City picker */}
          <div className="relative">
            <button
              onClick={() => setShowCities(!showCities)}
              className="flex items-center gap-1 text-sm text-khaana-muted"
            >
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {city}
              <svg
                width="12"
                height="12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showCities && (
              <div className="absolute right-0 top-8 bg-khaana-surface border border-khaana-border rounded-xl shadow-lg py-1 w-40 z-50">
                {cities.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCity(c);
                      setShowCities(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-khaana-cream transition-colors ${
                      c === city
                        ? "text-khaana-dark dark:text-khaana-light font-semibold"
                        : "text-khaana-text"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="w-8 h-8 rounded-full bg-khaana-cream flex items-center justify-center transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="#1B512D"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="#ADC178"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            )}
          </button>

          {/* Preferences */}
          <Link
            href="/preferences"
            className="w-8 h-8 rounded-full bg-khaana-cream flex items-center justify-center"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="#1B512D"
              viewBox="0 0 24 24"
              strokeWidth={2}
              className="dark:stroke-khaana-light"
            >
              <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
