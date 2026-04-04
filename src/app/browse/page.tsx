"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, SlidersHorizontal, Star, Clock } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { BrowsePageSkeleton } from "@/components/Skeleton";
import { RestaurantLogo } from "@/components/RestaurantLogos";
import { stores } from "@/data/stores";

const mapPins = [
  { id: "savour-foods", x: 55, y: 35 },
  { id: "burning-brownie", x: 40, y: 50 },
  { id: "jalal-sons", x: 65, y: 55 },
  { id: "chaaye-khana", x: 48, y: 30 },
  { id: "street1-cafe", x: 35, y: 65 },
  { id: "kohsar-greens", x: 70, y: 45 },
  { id: "tehzeeb-bakers", x: 25, y: 40 },
  { id: "monal-restaurant", x: 80, y: 20 },
];

function useDraggableMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const state = useRef({ dragging: false, startX: 0, startY: 0, offX: 0, offY: 0, moved: 0 });

  const wasDrag = useCallback(() => state.current.moved > 8, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const clamp = (v: number) => Math.max(-150, Math.min(150, v));

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      state.current.dragging = true;
      state.current.moved = 0;
      state.current.startX = e.clientX;
      state.current.startY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!state.current.dragging) return;
      e.preventDefault();
      const dx = e.clientX - state.current.startX;
      const dy = e.clientY - state.current.startY;
      state.current.moved = Math.abs(dx) + Math.abs(dy);
      setOffset({ x: clamp(state.current.offX + dx), y: clamp(state.current.offY + dy) });
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!state.current.dragging) return;
      state.current.dragging = false;
      state.current.offX = clamp(state.current.offX + (e.clientX - state.current.startX));
      state.current.offY = clamp(state.current.offY + (e.clientY - state.current.startY));
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return { containerRef, offset, wasDrag };
}

export default function BrowsePage() {
  const [view, setView] = useState<"list" | "map">("map");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const map = useDraggableMap();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredStores = searchQuery
    ? stores.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.area.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : stores;

  const selectedStore = selectedPin
    ? stores.find((s) => s.id === selectedPin)
    : null;

  if (isLoading) {
    return (
      <>
        <BrowsePageSkeleton />
        <BottomNav />
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Search Header */}
      <div className="sticky top-0 z-40 bg-white px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search restaurants, bakeries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-olivine"
            />
          </div>
          <button className="p-2.5 bg-gray-100 rounded-xl">
            <SlidersHorizontal size={18} className="text-gray-600" />
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex mt-3 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setView("list")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === "list" ? "bg-forest text-white" : "text-gray-600"
            }`}
          >
            List
          </button>
          <button
            onClick={() => setView("map")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === "map" ? "bg-forest text-white" : "text-gray-600"
            }`}
          >
            Map
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {view === "map" ? (
          <div className="relative">
            <div
              ref={map.containerRef}
              className="h-[420px] bg-[#E8F4E5] map-grid relative overflow-hidden cursor-grab active:cursor-grabbing touch-none select-none"
              style={{ userSelect: "none", WebkitUserSelect: "none" }}
              onDragStart={(e) => e.preventDefault()}
            >
              <div
                className="absolute inset-0"
                style={{
                  transform: `translate(${map.offset.x}px, ${map.offset.y}px)`,
                }}
              >
                <div className="absolute top-[30%] left-0 right-0 h-[2px] bg-white/60" />
                <div className="absolute top-[55%] left-0 right-0 h-[2px] bg-white/60" />
                <div className="absolute top-0 bottom-0 left-[40%] w-[2px] bg-white/60" />
                <div className="absolute top-0 bottom-0 left-[65%] w-[2px] bg-white/60" />

                <div className="absolute top-[10%] left-[10%] w-16 h-12 bg-olivine/20 rounded-xl" />
                <div className="absolute top-[70%] left-[55%] w-20 h-14 bg-olivine/20 rounded-xl" />

                <div className="absolute top-[27%] left-[45%] text-[9px] text-gray-400 font-medium">
                  Jinnah Avenue
                </div>
                <div className="absolute top-[52%] left-[15%] text-[9px] text-gray-400 font-medium">
                  Margalla Road
                </div>

                {mapPins.map((pin) => {
                  const store = stores.find((s) => s.id === pin.id);
                  if (!store) return null;
                  return (
                    <button
                      key={pin.id}
                      onClick={() => {
                        if (map.wasDrag()) return;
                        setSelectedPin(selectedPin === pin.id ? null : pin.id);
                      }}
                      className={`absolute transform -translate-x-1/2 -translate-y-full transition-transform ${
                        selectedPin === pin.id ? "scale-125 z-20" : "z-10"
                      }`}
                      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    >
                      <div
                        className={`w-10 h-10 rounded-full shadow-lg border-2 overflow-hidden ${
                          selectedPin === pin.id
                            ? "border-forest"
                            : "border-white"
                        }`}
                      >
                        <RestaurantLogo storeId={pin.id} size={36} className="w-full h-full !rounded-none" />
                      </div>
                      <div
                        className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent mx-auto -mt-0.5"
                        style={{ borderTopColor: "#ffffff" }}
                      />
                    </button>
                  );
                })}

                <div className="absolute left-[50%] top-[48%] transform -translate-x-1/2 -translate-y-1/2 z-30">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" />
                </div>
              </div>
            </div>

            {selectedStore && (
              <Link href={`/store/${selectedStore.id}`}>
                <div className="mx-4 -mt-6 relative z-30 bg-white rounded-xl shadow-lg border border-gray-100 p-3">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 relative bg-gray-100">
                      <Image
                        src={selectedStore.imageUrl}
                        alt={selectedStore.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                        quality={60}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <RestaurantLogo storeId={selectedStore.id} size={20} className="flex-shrink-0" />
                        <h3 className="font-semibold text-sm truncate">
                          {selectedStore.name}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {selectedStore.distance} · {selectedStore.area}
                      </p>
                      <div className="flex items-center justify-between mt-1.5">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="flex items-center gap-0.5">
                            <Clock size={11} />
                            {selectedStore.pickupDay} {selectedStore.pickupTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-1">
                          <Star size={12} className="star-filled fill-amber-400" />
                          <span className="text-xs font-medium">
                            {selectedStore.rating}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-forest">
                          Rs. {selectedStore.discountedPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3 px-4 py-3">
            {filteredStores.map((store) => (
              <Link key={store.id} href={`/store/${store.id}`}>
                <div className="store-card flex bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden bg-gray-100">
                    <Image
                      src={store.imageUrl}
                      alt={store.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                      quality={60}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2U1ZTdlYiIvPjwvc3ZnPg=="
                    />
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900 truncate">
                        {store.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {store.category} · {store.distance}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="star-filled fill-amber-400" />
                        <span className="text-xs font-medium">{store.rating}</span>
                      </div>
                      <span className="text-sm font-bold text-forest">
                        Rs. {store.discountedPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {filteredStores.length === 0 && (
              <div className="text-center py-12">
                <span className="text-4xl">🔍</span>
                <p className="text-gray-500 mt-2 text-sm">
                  No results for &ldquo;{searchQuery}&rdquo;
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
