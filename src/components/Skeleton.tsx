"use client";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`bg-gray-200 rounded-lg animate-pulse ${className}`}
    />
  );
}

export function StoreCardSkeleton({ variant = "vertical" }: { variant?: "horizontal" | "vertical" }) {
  if (variant === "horizontal") {
    return (
      <div className="flex bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
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
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
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
    <div className="flex flex-col min-h-screen bg-white">
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
    <div className="flex flex-col min-h-screen bg-white">
      <div className="px-4 pt-4 pb-2">
        <Skeleton className="h-11 w-full rounded-xl" />
        <div className="flex mt-3 bg-gray-100 rounded-xl p-1">
          <Skeleton className="flex-1 h-9 rounded-lg" />
          <Skeleton className="flex-1 h-9 rounded-lg" />
        </div>
      </div>
      <Skeleton className="h-[420px] w-full rounded-none mx-0" />
    </div>
  );
}

export function ProfilePageSkeleton() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-white px-4 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div>
            <Skeleton className="h-5 w-32 mb-1" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
      </div>
      <div className="bg-white mt-2 px-4 py-4">
        <Skeleton className="h-5 w-24 mb-3" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
      <div className="bg-white mt-2 px-4 py-4">
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
    <div className="flex flex-col min-h-screen bg-white">
      <div className="px-4 pt-6 pb-4 border-b border-gray-100">
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

export function StoreDetailSkeleton() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
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
