"use client";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`bg-surface-inset rounded-lg animate-pulse ${className}`}
    />
  );
}

export function StoreCardSkeleton({ variant = "vertical" }: { variant?: "horizontal" | "vertical" }) {
  if (variant === "horizontal") {
    return (
      <div className="flex bg-surface rounded-xl overflow-hidden shadow-sm border border-edge">
        <Skeleton className="w-28 h-28 flex-shrink-0 rounded-none" />
        <div className="flex-1 p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-3 w-16 mt-1" />
          </div>
          <div className="flex items-center justify-between mt-2">
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="flex items-center justify-between mt-1">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 w-[200px]">
      <div className="bg-surface rounded-xl overflow-hidden shadow-sm border border-edge">
        <Skeleton className="h-28 w-full rounded-none" />
        <div className="p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Skeleton className="w-5 h-5 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-3 w-16 mt-1" />
          <Skeleton className="h-3 w-28 mt-2" />
          <Skeleton className="h-4 w-20 mt-2" />
        </div>
      </div>
    </div>
  );
}

export function DiscoverPageSkeleton() {
  return (
    <div className="flex flex-col min-h-dvh bg-surface">
      {/* Header skeleton */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-xl" />
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
      </div>

      {/* Location skeleton */}
      <div className="px-4 pb-2">
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Category tabs skeleton */}
      <div className="flex gap-2 px-4 py-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className={`h-8 rounded-full ${i === 1 ? "w-12" : "w-20"}`} />
        ))}
      </div>

      {/* Recommended section skeleton */}
      <div className="px-4 mb-3">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-14" />
        </div>
        <div className="flex gap-3 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <StoreCardSkeleton key={i} variant="vertical" />
          ))}
        </div>
      </div>

      {/* Nearby section skeleton */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-14" />
        </div>
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => (
            <StoreCardSkeleton key={i} variant="horizontal" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BrowsePageSkeleton() {
  return (
    <div className="flex flex-col bg-surface" style={{ height: "100dvh" }}>
      {/* Search bar + toggle */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <Skeleton className="flex-1 h-11 rounded-xl" />
          <Skeleton className="w-11 h-11 rounded-xl" />
        </div>
        <div className="flex mt-3 bg-surface-tertiary rounded-xl p-1">
          <Skeleton className="flex-1 h-9 rounded-lg" />
          <Skeleton className="flex-1 h-9 rounded-lg" />
        </div>
      </div>

      {/* Full-page map skeleton */}
      <div className="flex-1 min-h-0 relative bg-[#EDF2E4] dark:bg-[#162016] overflow-hidden">
        {/* Hills placeholder */}
        <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#6B8F4A]/30 to-transparent animate-pulse" style={{
          clipPath: "polygon(0 0,100% 0,100% 80%,80% 60%,60% 75%,40% 55%,20% 70%,0 55%)",
        }} />

        {/* Road lines */}
        <div className="absolute top-[28%] left-0 right-0 h-[5px] bg-white/45 dark:bg-white/15 rounded-full animate-pulse" />
        <div className="absolute top-[55%] left-0 right-0 h-[4px] bg-white/35 dark:bg-white/12 rounded-full animate-pulse" />
        <div className="absolute top-[78%] left-0 right-0 h-[8px] bg-white/50 dark:bg-white/18 rounded-full animate-pulse" />
        <div className="absolute top-0 bottom-0 left-[35%] w-[5px] bg-white/45 dark:bg-white/15 rounded-full animate-pulse" />
        <div className="absolute top-0 bottom-0 left-[65%] w-[5px] bg-white/40 dark:bg-white/12 rounded-full animate-pulse" />

        {/* Sector placeholders */}
        <div className="absolute top-[30%] left-[5%] w-[28%] h-[22%] bg-[#E6E0D6]/30 dark:bg-[#2a3a2a]/30 rounded-lg animate-pulse" />
        <div className="absolute top-[30%] left-[37%] w-[26%] h-[22%] bg-[#E6E0D6]/30 dark:bg-[#2a3a2a]/30 rounded-lg animate-pulse" />
        <div className="absolute top-[30%] left-[67%] w-[26%] h-[22%] bg-[#E6E0D6]/30 dark:bg-[#2a3a2a]/30 rounded-lg animate-pulse" />
        <div className="absolute top-[56%] left-[37%] w-[26%] h-[18%] bg-[#E6E0D6]/30 dark:bg-[#2a3a2a]/30 rounded-lg animate-pulse" />
        <div className="absolute top-[56%] left-[67%] w-[26%] h-[18%] bg-[#E6E0D6]/30 dark:bg-[#2a3a2a]/30 rounded-lg animate-pulse" />

        {/* Pin placeholders */}
        {[
          { x: 45, y: 38 },
          { x: 30, y: 35 },
          { x: 75, y: 42 },
          { x: 42, y: 36 },
          { x: 25, y: 44 },
          { x: 55, y: 28 },
        ].map((pin, i) => (
          <div key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${pin.x}%`, top: `${pin.y}%` }}>
            <div className="w-11 h-11 rounded-full bg-surface-inset/50 border-[2.5px] border-white/70 animate-pulse" />
            <div className="w-0 h-0 border-l-[7px] border-r-[7px] border-t-[9px] border-l-transparent border-r-transparent border-t-white/70 mx-auto -mt-[1px]" />
          </div>
        ))}

        {/* User location placeholder */}
        <div className="absolute left-[44%] top-[40%] -translate-x-1/2 -translate-y-1/2">
          <div className="w-5 h-5 rounded-full bg-blue-300/50 border-[3px] border-white/70 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ProfilePageSkeleton() {
  return (
    <div className="flex flex-col min-h-dvh bg-surface-secondary">
      <div className="bg-surface px-4 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div>
            <Skeleton className="h-5 w-32 mb-1" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
      </div>
      <div className="bg-surface mt-2 px-4 py-4">
        <Skeleton className="h-5 w-24 mb-3" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
      <div className="bg-surface mt-2 px-4 py-4">
        <Skeleton className="h-5 w-24 mb-3" />
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-36 rounded-xl" />
          <Skeleton className="h-36 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function FavoritesPageSkeleton() {
  return (
    <div className="flex flex-col min-h-dvh bg-surface">
      <div className="px-4 pt-6 pb-4 border-b border-edge">
        <Skeleton className="h-7 w-28 mb-1" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="px-4 py-4 flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <StoreCardSkeleton key={i} variant="horizontal" />
        ))}
      </div>
    </div>
  );
}

export function ImpactPageSkeleton() {
  return (
    <div className="flex flex-col min-h-dvh bg-surface-secondary">
      {/* Header */}
      <div className="bg-surface px-4 pt-6 pb-4 border-b border-edge">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-7 w-32 mb-1" />
            <Skeleton className="h-3 w-52" />
          </div>
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
        <Skeleton className="h-10 w-full rounded-xl mt-3" />
      </div>

      {/* Stats */}
      <div className="px-4 pt-4">
        <div className="grid grid-cols-3 gap-2.5">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
      </div>

      {/* Weekly chart */}
      <div className="px-4 mt-4">
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>

      {/* Equivalents */}
      <div className="px-4 mt-4">
        <Skeleton className="h-36 w-full rounded-2xl" />
      </div>

      {/* Level */}
      <div className="px-4 mt-4">
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>

      {/* Achievements */}
      <div className="px-4 mt-4">
        <Skeleton className="h-5 w-24 mb-3" />
        <div className="grid grid-cols-4 gap-2.5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function StoreDetailSkeleton() {
  return (
    <div className="flex flex-col min-h-dvh bg-surface">
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="px-4 pt-4">
        <div className="flex items-start gap-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-6 w-40 mb-1" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <Skeleton className="h-14 w-full rounded-xl mt-4" />
        <Skeleton className="h-16 w-full rounded-xl mt-3" />
        <Skeleton className="h-14 w-full rounded-xl mt-3" />
      </div>
      <div className="px-4 py-3 mt-2">
        <Skeleton className="h-5 w-36 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
