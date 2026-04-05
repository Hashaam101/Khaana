"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Bell, CalendarCheck, ChevronRight } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import StoreCard from "@/components/StoreCard";
import CategoryTabs from "@/components/CategoryTabs";
import { KhaanaLogo } from "@/components/KhaanaLogo";
import { DiscoverPageSkeleton } from "@/components/Skeleton";
import { useRandomData } from "@/context/RandomDataContext";

export default function DiscoverPage() {
  const { stores, monthlyPlans } = useRandomData();
  const [activeCategory, setActiveCategory] = useState("all");
  const [showNotification, setShowNotification] = useState(false);

  const filteredStores =
    activeCategory === "all"
      ? stores
      : stores.filter((s) => s.categoryType === activeCategory);

  const recommended = filteredStores.filter(
    (s) => s.rating >= 4.4 && s.pickupDay === "Today"
  );
  const nearby = filteredStores
    .slice()
    .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

  return (
    <div className="flex flex-col min-h-dvh bg-surface relative">
      <div className="skeleton-overlay">
        <DiscoverPageSkeleton />
        <BottomNav />
      </div>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-surface">
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <KhaanaLogo size="sm" />
          <button
            onClick={() => setShowNotification(!showNotification)}
            className="relative p-2 rounded-full hover:bg-surface-tertiary"
          >
            <Bell size={22} className="text-content-secondary" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 px-4 pb-2 text-sm">
          <span className="text-forest font-bold text-base">📍</span>
          <span className="text-content-tertiary">Current location</span>
          <span className="font-semibold text-content">Islamabad</span>
        </div>

        {/* Category Tabs */}
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="mx-4 mb-3 p-3 bg-olivine-pale border border-olivine rounded-xl flex items-start gap-3">
          <span className="text-2xl">🎉</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-forest">
              New bags available!
            </p>
            <p className="text-xs text-content-secondary mt-0.5">
              3 new Surprise Bags just dropped near F-7. Grab them before
              they&apos;re gone!
            </p>
          </div>
          <button
            onClick={() => setShowNotification(false)}
            className="text-content-muted text-lg leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-tertiary -mr-1"
          >
            ×
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Recommended Section */}
        {recommended.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center justify-between px-4 mb-3">
              <h2 className="font-bold text-base text-content">
                Recommended for you
              </h2>
              <Link href="/browse" className="text-sm font-medium text-forest">
                See all
              </Link>
            </div>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4">
              {recommended.map((store) => (
                <StoreCard key={store.id} store={store} variant="vertical" />
              ))}
            </div>
          </section>
        )}

        {/* Monthly Plan Banner */}
        <section className="mb-6 px-4">
          <div className="bg-gradient-to-r from-forest to-forest/85 rounded-2xl p-4 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-center gap-2 mb-1">
              <CalendarCheck size={18} />
              <h3 className="font-bold text-sm">Monthly Plans</h3>
            </div>
            <p className="text-xs text-white/80 mb-3 max-w-[240px]">
              Subscribe to your favourite stores and save up to {monthlyPlans[monthlyPlans.length - 1].savingsPercent}% with regular Surprise Bag pickups.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold bg-white/20 px-2.5 py-1 rounded-full">
                From Rs. {monthlyPlans[0].pricePerMonth.toLocaleString()}/mo
              </span>
              <Link
                href={`/store/${stores[0].id}`}
                className="text-xs font-semibold flex items-center gap-0.5 underline underline-offset-2"
              >
                View plans <ChevronRight size={12} />
              </Link>
            </div>
          </div>
        </section>

        {/* Nearby Section */}
        <section>
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="font-bold text-base text-content">Nearby</h2>
            <Link href="/browse" className="text-sm font-medium text-forest">See all</Link>
          </div>
          <div className="flex flex-col gap-3 px-4">
            {nearby.map((store) => (
              <StoreCard key={store.id} store={store} variant="horizontal" />
            ))}
          </div>
        </section>

        {/* Empty state */}
        {filteredStores.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-8">
            <span className="text-5xl mb-4">🔍</span>
            <p className="text-content-tertiary text-center">
              No Surprise Bags available in this category right now. Check back
              later!
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
