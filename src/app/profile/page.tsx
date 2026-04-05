"use client";

import Link from "next/link";
import { stores } from "@/lib/data";

export default function ProfilePage() {
  const pendingOrders = [stores[0], stores[3]];

  return (
    <>
      <header className="bg-khaana-dark text-white px-4 pt-8 pb-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-khaana-light flex items-center justify-center">
              <span className="text-khaana-dark font-bold text-xl">A</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">Ahmed Khan</h1>
              <p className="text-white/70 text-sm">ahmed@email.com</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 -mt-3">
        {/* Impact stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-khaana-card rounded-2xl border border-khaana-border p-4 text-center">
            <div className="w-10 h-10 bg-khaana-cream rounded-full flex items-center justify-center mx-auto mb-2">
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="#1B512D"
                viewBox="0 0 24 24"
                strokeWidth={2}
                className="dark:stroke-khaana-light"
              >
                <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-khaana-dark dark:text-khaana-light">12</p>
            <p className="text-xs text-khaana-muted mt-0.5">Meals rescued</p>
          </div>
          <div className="bg-khaana-card rounded-2xl border border-khaana-border p-4 text-center">
            <div className="w-10 h-10 bg-khaana-cream rounded-full flex items-center justify-center mx-auto mb-2">
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="#1B512D"
                viewBox="0 0 24 24"
                strokeWidth={2}
                className="dark:stroke-khaana-light"
              >
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-khaana-dark dark:text-khaana-light">Rs. 5,400</p>
            <p className="text-xs text-khaana-muted mt-0.5">Money saved</p>
          </div>
        </div>

        {/* Pending orders */}
        <section className="mt-6">
          <h2 className="font-bold text-base mb-3">Your orders</h2>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {pendingOrders.map((store) => (
              <div
                key={store.id}
                className="bg-khaana-card rounded-2xl border border-khaana-border p-3 w-60 shrink-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-medium text-khaana-dark dark:text-khaana-light border border-khaana-dark/30 dark:border-khaana-light/30 rounded-full px-2 py-0.5">
                    Pending collection
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: store.logoColor }}
                  >
                    {store.logo}
                  </span>
                  <div>
                    <p className="font-semibold text-sm">{store.name}</p>
                    <p className="text-[11px] text-khaana-muted">
                      {store.pickupDay} {store.pickupTime}
                    </p>
                  </div>
                </div>
                <div className="mt-3 bg-khaana-cream rounded-lg py-2 text-center">
                  <span className="text-xs font-medium text-khaana-dark dark:text-khaana-light">
                    Collect in 2:30:00
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Menu items */}
        <section className="mt-6">
          <h2 className="font-bold text-base mb-3">Settings</h2>
          <div className="bg-khaana-card rounded-2xl border border-khaana-border divide-y divide-khaana-border">
            <Link
              href="/preferences"
              className="flex items-center justify-between px-4 py-3.5"
            >
              <div className="flex items-center gap-3">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="#1B512D"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span className="text-sm font-medium">
                  Food Preferences & Allergies
                </span>
              </div>
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="#6B6B6B"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <button className="flex items-center justify-between px-4 py-3.5 w-full">
              <div className="flex items-center gap-3">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="#1B512D"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="text-sm font-medium">Notifications</span>
              </div>
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="#6B6B6B"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="flex items-center justify-between px-4 py-3.5 w-full">
              <div className="flex items-center gap-3">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="#1B512D"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">Help & Support</span>
              </div>
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="#6B6B6B"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>
      </div>

      <div className="h-8" />
    </>
  );
}
