"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, SlidersHorizontal, Star, Clock, X, Locate } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { BrowsePageSkeleton } from "@/components/Skeleton";
import { RestaurantLogo } from "@/components/RestaurantLogos";
import { useRandomData } from "@/context/RandomDataContext";

/* ── Filter / sort constants ─────────────────────────── */

const categoryFilters = [
  { id: "all", label: "All" },
  { id: "meals", label: "Meals" },
  { id: "bakery", label: "Bakery" },
  { id: "groceries", label: "Groceries" },
  { id: "cafe", label: "Cafe" },
];

const sortOptions = [
  { id: "recommended", label: "Recommended" },
  { id: "distance", label: "Nearest first" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "rating", label: "Highest rated" },
];

const pickupOptions = [
  { id: "all", label: "Any time" },
  { id: "today", label: "Today" },
  { id: "tomorrow", label: "Tomorrow" },
];

/* ── Islamabad map data ──────────────────────────────── */

const MAP_W = 1100;
const MAP_H = 1300;
const USER_LOC = { x: 480, y: 460 };

// Pins positioned at real Islamabad addresses (px on canvas)
const mapPins = [
  { id: "savour-foods", x: 485, y: 428 },
  { id: "monal-restaurant", x: 620, y: 95 },
  { id: "burning-brownie", x: 295, y: 403 },
  { id: "tehzeeb-bakers", x: 1010, y: 452 },
  { id: "jalal-sons", x: 335, y: 468 },
  { id: "kabul-restaurant", x: 500, y: 312 },
  { id: "chaaye-khana", x: 462, y: 442 },
  { id: "des-pardes", x: 510, y: 448 },
  { id: "rahat-bakers", x: 680, y: 1012 },
  { id: "street1-cafe", x: 262, y: 488 },
  { id: "tandoori-islamabad", x: 900, y: 488 },
  { id: "kohsar-greens", x: 348, y: 488 },
];

// Sector blocks
const sectors: { name: string; x: number; y: number; w: number; h: number; park?: boolean; highlight?: boolean }[] = [
  { name: "E-7", x: 203, y: 185, w: 181, h: 150 },
  { name: "Diplomatic Enclave", x: 584, y: 185, w: 180, h: 150 },
  { name: "Blue Area", x: 394, y: 295, w: 180, h: 42, highlight: true },
  { name: "F-5", x: 10, y: 345, w: 183, h: 208 },
  { name: "F-6", x: 203, y: 345, w: 181, h: 208 },
  { name: "F-7", x: 394, y: 345, w: 180, h: 208 },
  { name: "F-8", x: 584, y: 345, w: 180, h: 208 },
  { name: "F-9", x: 774, y: 345, w: 180, h: 208, park: true },
  { name: "F-10", x: 964, y: 345, w: 126, h: 208 },
  { name: "G-6", x: 203, y: 563, w: 181, h: 185 },
  { name: "G-7", x: 394, y: 563, w: 180, h: 185 },
  { name: "G-8", x: 584, y: 563, w: 180, h: 185 },
  { name: "G-9", x: 774, y: 563, w: 180, h: 185 },
  { name: "H-8", x: 584, y: 758, w: 180, h: 188 },
  { name: "H-9", x: 774, y: 758, w: 180, h: 188 },
  { name: "I-8", x: 584, y: 955, w: 180, h: 185 },
  { name: "I-9", x: 774, y: 955, w: 180, h: 185 },
];

// Building footprints [x, y, w, h]
const buildings: number[][] = [
  // F-6
  225,365,32,20, 280,375,25,18, 240,405,38,16, 300,418,20,25, 345,372,28,20, 268,448,25,16, 322,442,30,20, 250,478,20,16,
  // F-7
  416,368,30,22, 468,382,25,18, 438,418,35,16, 498,428,20,25, 535,370,28,22, 452,458,25,16, 515,448,32,18, 428,478,20,18,
  // F-8
  608,372,30,20, 658,388,25,16, 632,422,35,18, 698,432,22,22, 725,368,28,20, 652,462,25,16,
  // Blue Area
  412,302,40,14, 462,300,35,15, 515,304,30,13, 558,298,38,14,
  // G-7
  418,578,28,18, 468,592,22,16, 442,618,30,15, 502,612,25,20, 538,582,22,18,
  // G-8
  608,578,28,18, 655,595,25,16, 632,622,30,15, 698,615,22,18,
  // I-8
  608,978,28,18, 658,988,22,16, 632,1015,30,15, 698,1008,25,20,
  // F-5
  35,372,28,20, 78,388,22,16, 52,422,30,18, 105,435,25,20,
  // E-7
  228,202,30,18, 278,218,25,16, 245,248,35,15, 315,228,22,18,
  // F-10
  985,372,28,18, 1025,388,22,16, 998,422,30,15, 1048,435,25,18,
].reduce<number[][]>((acc, _, i, arr) => {
  if (i % 4 === 0) acc.push(arr.slice(i, i + 4));
  return acc;
}, []);

/* ── Draggable map hook ──────────────────────────────── */

function useDraggableMap() {
  const elRef = useRef<HTMLDivElement | null>(null);
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);
  const stateRef = useRef({ dragging: false, startX: 0, startY: 0, offX: 0, offY: 0, moved: 0 });

  const wasDrag = useCallback(() => stateRef.current.moved > 8, []);

  // Callback ref – fires when the DOM node mounts/unmounts
  const containerRef = useCallback((node: HTMLDivElement | null) => {
    elRef.current = node;
    setEl(node);
  }, []);

  const clamp = useCallback((x: number, y: number) => {
    const node = elRef.current;
    if (!node) return { x, y };
    const vw = node.clientWidth;
    const vh = node.clientHeight;
    return {
      x: MAP_W <= vw ? (vw - MAP_W) / 2 : Math.max(-(MAP_W - vw), Math.min(0, x)),
      y: MAP_H <= vh ? (vh - MAP_H) / 2 : Math.max(-(MAP_H - vh), Math.min(0, y)),
    };
  }, []);

  const recenter = useCallback(() => {
    const node = elRef.current;
    if (!node) return;
    const vw = node.clientWidth;
    const vh = node.clientHeight;
    // Guard: if layout hasn't happened yet, defer to next frame
    if (vw === 0 || vh === 0) {
      requestAnimationFrame(() => {
        const vw2 = node.clientWidth;
        const vh2 = node.clientHeight;
        if (vw2 === 0 || vh2 === 0) return;
        const pos = clamp(-(USER_LOC.x - vw2 / 2), -(USER_LOC.y - vh2 / 2));
        setOffset(pos);
        stateRef.current.offX = pos.x;
        stateRef.current.offY = pos.y;
      });
      return;
    }
    const pos = clamp(-(USER_LOC.x - vw / 2), -(USER_LOC.y - vh / 2));
    setOffset(pos);
    stateRef.current.offX = pos.x;
    stateRef.current.offY = pos.y;
  }, [clamp]);

  // Center on user when map element appears
  useEffect(() => {
    if (offset !== null || !el) return;
    recenter();
  }, [offset, recenter, el]);

  // Pointer event listeners – re-attach when `el` becomes available
  useEffect(() => {
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      e.preventDefault();
      try { el.setPointerCapture(e.pointerId); } catch { /* pointer already gone */ }
      const s = stateRef.current;
      s.dragging = true;
      s.moved = 0;
      s.startX = e.clientX;
      s.startY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      const s = stateRef.current;
      if (!s.dragging) return;
      e.preventDefault();
      const dx = e.clientX - s.startX;
      const dy = e.clientY - s.startY;
      s.moved = Math.abs(dx) + Math.abs(dy);
      setOffset(clamp(s.offX + dx, s.offY + dy));
    };

    const onPointerUp = (e: PointerEvent) => {
      const s = stateRef.current;
      if (!s.dragging) return;
      s.dragging = false;
      try { el.releasePointerCapture(e.pointerId); } catch { /* already released */ }
      const final = clamp(s.offX + (e.clientX - s.startX), s.offY + (e.clientY - s.startY));
      s.offX = final.x;
      s.offY = final.y;
    };

    // {passive:false} ensures preventDefault() works on all mobile browsers
    el.addEventListener("pointerdown", onPointerDown, { passive: false });
    el.addEventListener("pointermove", onPointerMove, { passive: false });
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    // Block native touch handling (iOS Safari fallback)
    const preventTouch = (e: TouchEvent) => e.preventDefault();
    el.addEventListener("touchstart", preventTouch, { passive: false });
    el.addEventListener("touchmove", preventTouch, { passive: false });

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("touchstart", preventTouch);
      el.removeEventListener("touchmove", preventTouch);
    };
  }, [el, clamp]);

  return { containerRef, offset: offset ?? { x: 0, y: 0 }, wasDrag, recenter };
}

/* ── Page ─────────────────────────────────────────────── */

export default function BrowsePage() {
  const { stores } = useRandomData();
  const [view, setView] = useState<"list" | "map">("map");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  const [pickup, setPickup] = useState("all");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const map = useDraggableMap();

  const activeFilterCount =
    (category !== "all" ? 1 : 0) +
    (sortBy !== "recommended" ? 1 : 0) +
    (pickup !== "all" ? 1 : 0) +
    (maxPrice !== null ? 1 : 0);

  const filteredStores = stores
    .filter((s) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !s.name.toLowerCase().includes(q) &&
          !s.category.toLowerCase().includes(q) &&
          !s.area.toLowerCase().includes(q)
        )
          return false;
      }
      if (category !== "all" && s.categoryType !== category) return false;
      if (pickup === "today" && s.pickupDay !== "Today") return false;
      if (pickup === "tomorrow" && s.pickupDay !== "Tomorrow") return false;
      if (maxPrice !== null && s.discountedPrice > maxPrice) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return parseFloat(a.distance) - parseFloat(b.distance);
        case "price-low":
          return a.discountedPrice - b.discountedPrice;
        case "price-high":
          return b.discountedPrice - a.discountedPrice;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const selectedStore = selectedPin
    ? filteredStores.find((s) => s.id === selectedPin)
    : null;

  // Clear selection when filtered out
  useEffect(() => {
    if (selectedPin && !filteredStores.find((s) => s.id === selectedPin)) {
      setSelectedPin(null);
    }
  }, [filteredStores, selectedPin]);

  /* ── Shared header ──────────────────────────────────── */
  const headerContent = (
    <>
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-content-muted" />
          <input
            type="text"
            placeholder="Search restaurants, bakeries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface-tertiary rounded-xl text-sm text-content outline-none focus:ring-2 focus:ring-olivine placeholder:text-content-muted"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2.5 rounded-xl relative ${showFilters ? "bg-forest" : "bg-surface-tertiary"}`}
        >
          <SlidersHorizontal size={18} className={showFilters ? "text-white" : "text-content-secondary"} />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-olivine text-forest text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="mt-2 bg-surface-secondary rounded-xl p-3 space-y-3 border border-edge">
          <div>
            <p className="text-[11px] font-semibold text-content-muted uppercase tracking-wide mb-1.5">Category</p>
            <div className="flex flex-wrap gap-1.5">
              {categoryFilters.map((c) => (
                <button key={c.id} onClick={() => setCategory(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${category === c.id ? "bg-forest text-white" : "bg-surface text-content-secondary border border-edge-strong"}`}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-content-muted uppercase tracking-wide mb-1.5">Pickup</p>
            <div className="flex gap-1.5">
              {pickupOptions.map((p) => (
                <button key={p.id} onClick={() => setPickup(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${pickup === p.id ? "bg-forest text-white" : "bg-surface text-content-secondary border border-edge-strong"}`}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-content-muted uppercase tracking-wide mb-1.5">Max Price</p>
            <div className="flex flex-wrap gap-1.5">
              {[null, 500, 700, 1000].map((price) => (
                <button key={price ?? "any"} onClick={() => setMaxPrice(price)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${maxPrice === price ? "bg-forest text-white" : "bg-surface text-content-secondary border border-edge-strong"}`}>
                  {price === null ? "Any" : `Rs. ${price}`}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-content-muted uppercase tracking-wide mb-1.5">Sort by</p>
            <div className="flex flex-wrap gap-1.5">
              {sortOptions.map((s) => (
                <button key={s.id} onClick={() => setSortBy(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${sortBy === s.id ? "bg-forest text-white" : "bg-surface text-content-secondary border border-edge-strong"}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          {activeFilterCount > 0 && (
            <button onClick={() => { setCategory("all"); setSortBy("recommended"); setPickup("all"); setMaxPrice(null); }}
              className="text-xs text-forest font-medium flex items-center gap-1 pt-1">
              <X size={12} /> Clear all filters
            </button>
          )}
        </div>
      )}

      <div className="flex mt-3 bg-surface-tertiary rounded-xl p-1">
        <button onClick={() => setView("list")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${view === "list" ? "bg-forest text-white" : "text-content-secondary"}`}>
          List
        </button>
        <button onClick={() => setView("map")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${view === "map" ? "bg-forest text-white" : "text-content-secondary"}`}>
          Map
        </button>
      </div>
    </>
  );

  return (
    <div className="flex flex-col bg-surface relative overflow-hidden" style={{ height: "100dvh", overscrollBehavior: "none" }}>
      <div className="skeleton-overlay">
        <BrowsePageSkeleton />
        <BottomNav />
      </div>
      {/* Header */}
      <div className="z-40 bg-surface px-4 pt-4 pb-2">
        {headerContent}
      </div>

      {/* Content */}
      <div className={`flex-1 min-h-0 ${view === "map" ? "relative overflow-hidden" : "overflow-y-auto"}`}>
        {view === "map" ? (
          <>
            {/* ── Pannable Islamabad map ─────────────── */}
            <div
              ref={map.containerRef}
              className="absolute inset-0 bg-[#EDF2E4] dark:bg-[#0d1a0d] cursor-grab active:cursor-grabbing touch-none select-none overflow-hidden"
              style={{ userSelect: "none", WebkitUserSelect: "none", touchAction: "none", overscrollBehavior: "none" }}
              onDragStart={(e) => e.preventDefault()}
            >
              <div
                className="absolute"
                style={{
                  width: MAP_W,
                  height: MAP_H,
                  transform: `translate3d(${map.offset.x}px, ${map.offset.y}px, 0)`,
                  willChange: "transform",
                }}
              >
                {/* ── Margalla Hills (3 layers) ────── */}
                <div className="absolute inset-x-0 top-0" style={{
                  height: 178,
                  background: "linear-gradient(180deg, #4A6E36 0%, #5A7E42 30%, #6B8F4A 60%, #8BAA6B 100%)",
                  clipPath: "polygon(0 0,100% 0,100% 85%,96% 72%,91% 88%,84% 70%,78% 85%,71% 65%,64% 82%,57% 68%,50% 80%,43% 65%,36% 78%,29% 60%,22% 75%,15% 58%,8% 72%,0 62%)",
                }} />
                <div className="absolute inset-x-0 top-0" style={{
                  height: 155,
                  background: "linear-gradient(180deg, transparent 0%, rgba(90,126,66,0.45) 50%, rgba(107,143,74,0.5) 100%)",
                  clipPath: "polygon(0 0,100% 0,100% 78%,93% 65%,86% 80%,79% 62%,72% 76%,65% 58%,58% 74%,51% 60%,44% 72%,37% 55%,30% 70%,23% 52%,16% 68%,9% 50%,0 58%)",
                }} />
                <div className="absolute inset-x-0 top-0" style={{
                  height: 130,
                  background: "linear-gradient(180deg, transparent 0%, rgba(74,110,54,0.25) 60%, rgba(90,126,66,0.3) 100%)",
                  clipPath: "polygon(0 0,100% 0,100% 60%,90% 48%,80% 58%,70% 42%,60% 55%,50% 40%,40% 52%,30% 38%,20% 50%,10% 35%,0 45%)",
                }} />
                {/* Hills label */}
                <div className="absolute text-[10px] font-bold tracking-widest uppercase" style={{ left: 420, top: 30, color: "rgba(255,255,255,0.35)", letterSpacing: 6 }}>
                  Margalla Hills
                </div>

                {/* ── Rawal Lake ────────────────────── */}
                <div className="absolute" style={{
                  left: 890, top: 65, width: 170, height: 110,
                  background: "linear-gradient(135deg, #A0C4D8 0%, #8BB8D0 50%, #B0D0E0 100%)",
                  borderRadius: "45% 55% 50% 40%",
                  opacity: 0.55,
                }} />
                <div className="absolute text-[7px] font-semibold" style={{ left: 938, top: 112, color: "#6A9AB8", letterSpacing: 1 }}>
                  Rawal Lake
                </div>

                {/* ── Road to Monal ─────────────────── */}
                <div className="absolute bg-white/30 rounded-full" style={{
                  left: 608, top: 100, width: 2, height: 85,
                  transform: "rotate(12deg)", transformOrigin: "bottom center",
                }} />

                {/* ── Sector blocks ─────────────────── */}
                {sectors.map((s) => (
                  <div
                    key={s.name}
                    className={`absolute rounded-lg ${
                      s.park
                        ? "bg-[#B8D4A0]/35 border border-[#9FC488]/25"
                        : s.highlight
                        ? "bg-[#E0D5C0]/55"
                        : "bg-[#E6E0D6]/35"
                    }`}
                    style={{ left: s.x, top: s.y, width: s.w, height: s.h }}
                  >
                    <span
                      className={`absolute inset-0 flex items-center justify-center font-bold select-none ${
                        s.park ? "text-[#6B9050]/45" : "text-[#8A9B78]/35"
                      } ${s.name.length > 6 ? "text-[9px]" : "text-[14px]"}`}
                    >
                      {s.park ? "Fatima Jinnah\nPark" : s.name}
                    </span>
                  </div>
                ))}

                {/* ── Building footprints ───────────── */}
                {buildings.map(([x, y, w, h], i) => (
                  <div key={`b${i}`} className="absolute bg-[#D5CFC4]/40 rounded-sm" style={{ left: x, top: y, width: w, height: h }} />
                ))}

                {/* ── Major horizontal roads ────────── */}
                {/* Margalla Road */}
                <div className="absolute bg-white/70 rounded-full" style={{ left: 0, top: 178, width: MAP_W, height: 6 }} />
                <div className="absolute text-[7px] font-semibold tracking-wider uppercase" style={{ left: 800, top: 168, color: "#7A8B6A" }}>
                  Margalla Road
                </div>
                {/* Constitution Avenue */}
                <div className="absolute bg-white/65 rounded-full" style={{ left: 120, top: 340, width: 860, height: 5 }} />
                <div className="absolute text-[7px] font-semibold tracking-wider uppercase" style={{ left: 430, top: 330, color: "#7A8B6A" }}>
                  Constitution Avenue
                </div>
                {/* Khayaban-e-Iqbal */}
                <div className="absolute bg-white/55 rounded-full" style={{ left: 0, top: 558, width: MAP_W, height: 4 }} />
                <div className="absolute text-[7px] font-semibold tracking-wider uppercase" style={{ left: 220, top: 548, color: "#7A8B6A" }}>
                  Khayaban-e-Iqbal
                </div>
                {/* Faisal Avenue (highway) */}
                <div className="absolute rounded-full" style={{ left: 0, top: 750, width: MAP_W, height: 12, background: "linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.85), rgba(255,255,255,0.6))" }} />
                <div className="absolute bg-[#7A8B6A]/15 rounded-full" style={{ left: 0, top: 755, width: MAP_W, height: 2 }} />
                <div className="absolute text-[8px] font-bold tracking-wider uppercase" style={{ left: 400, top: 738, color: "#6B7B5A" }}>
                  Faisal Avenue
                </div>
                {/* IJP Road */}
                <div className="absolute bg-white/55 rounded-full" style={{ left: 30, top: 950, width: 1040, height: 5 }} />
                <div className="absolute text-[7px] font-semibold tracking-wider uppercase" style={{ left: 620, top: 940, color: "#7A8B6A" }}>
                  IJP Road
                </div>

                {/* ── Major vertical roads ──────────── */}
                {/* Ataturk Avenue */}
                <div className="absolute bg-white/65 rounded-full" style={{ left: 197, top: 0, width: 6, height: 1200 }} />
                <div className="absolute text-[7px] font-semibold tracking-wider uppercase" style={{ left: 172, top: 660, color: "#7A8B6A", writingMode: "vertical-rl" as const }}>
                  Ataturk Avenue
                </div>
                {/* Between 6-7 */}
                <div className="absolute bg-white/45 rounded-full" style={{ left: 388, top: 178, width: 4, height: 770 }} />
                {/* 7th Avenue */}
                <div className="absolute bg-white/65 rounded-full" style={{ left: 578, top: 0, width: 6, height: 1200 }} />
                <div className="absolute text-[7px] font-semibold tracking-wider uppercase" style={{ left: 553, top: 860, color: "#7A8B6A", writingMode: "vertical-rl" as const }}>
                  7th Avenue
                </div>
                {/* 9th Avenue */}
                <div className="absolute bg-white/65 rounded-full" style={{ left: 768, top: 178, width: 6, height: 1020 }} />
                <div className="absolute text-[7px] font-semibold tracking-wider uppercase" style={{ left: 743, top: 860, color: "#7A8B6A", writingMode: "vertical-rl" as const }}>
                  9th Avenue
                </div>
                {/* Between 10-11 */}
                <div className="absolute bg-white/45 rounded-full" style={{ left: 958, top: 178, width: 4, height: 770 }} />

                {/* ── Secondary roads (inside sectors) ─ */}
                {sectors.filter((s) => !s.park && s.h > 100).map((s) => (
                  <div key={`grid-${s.name}`}>
                    {/* 2 vertical streets */}
                    <div className="absolute bg-white/18 rounded-full" style={{ left: s.x + s.w / 3, top: s.y + 4, width: 1.5, height: s.h - 8 }} />
                    <div className="absolute bg-white/18 rounded-full" style={{ left: s.x + (s.w * 2) / 3, top: s.y + 4, width: 1.5, height: s.h - 8 }} />
                    {/* 3 horizontal streets */}
                    <div className="absolute bg-white/18 rounded-full" style={{ left: s.x + 4, top: s.y + s.h / 4, width: s.w - 8, height: 1.5 }} />
                    <div className="absolute bg-white/18 rounded-full" style={{ left: s.x + 4, top: s.y + s.h / 2, width: s.w - 8, height: 1.5 }} />
                    <div className="absolute bg-white/18 rounded-full" style={{ left: s.x + 4, top: s.y + (s.h * 3) / 4, width: s.w - 8, height: 1.5 }} />
                  </div>
                ))}

                {/* ── Landmarks ─────────────────────── */}
                {/* Faisal Mosque */}
                <div className="absolute flex flex-col items-center" style={{ left: 562, top: 150 }}>
                  <div className="w-4 h-4 bg-[#C8B060]/50 rounded-full border border-[#B8A050]/40" />
                  <span className="text-[6px] font-bold text-[#8A7B50]/60 mt-0.5 whitespace-nowrap">Faisal Mosque</span>
                </div>
                {/* Pakistan Monument */}
                <div className="absolute flex flex-col items-center" style={{ left: 495, top: 265 }}>
                  <div className="w-3 h-3 bg-[#C8B060]/40 rounded-sm rotate-45" />
                  <span className="text-[6px] font-bold text-[#8A7B50]/50 mt-0.5 whitespace-nowrap">Pak Monument</span>
                </div>

                {/* ── Restaurant pins ───────────────── */}
                {mapPins.map((pin) => {
                  const store = filteredStores.find((s) => s.id === pin.id);
                  if (!store) return null;
                  return (
                    <button
                      key={pin.id}
                      onClick={() => {
                        if (map.wasDrag()) return;
                        setSelectedPin(selectedPin === pin.id ? null : pin.id);
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-full transition-all duration-200 ${
                        selectedPin === pin.id ? "scale-125 z-20" : "z-10 hover:scale-110"
                      }`}
                      style={{ left: pin.x, top: pin.y }}
                    >
                      <div className="relative">
                        <div className={`w-11 h-11 rounded-full shadow-lg border-[2.5px] overflow-hidden ${
                          selectedPin === pin.id ? "border-forest shadow-forest/30" : "border-white shadow-md"
                        }`}>
                          <RestaurantLogo storeId={pin.id} size={36} className="w-full h-full !rounded-none" />
                        </div>
                        <div
                          className="w-0 h-0 border-l-[7px] border-r-[7px] border-t-[9px] border-l-transparent border-r-transparent mx-auto -mt-[1px]"
                          style={{ borderTopColor: selectedPin === pin.id ? "#1B512D" : "#ffffff" }}
                        />
                        {selectedPin === pin.id && (
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-2 bg-black/10 rounded-full blur-sm" />
                        )}
                      </div>
                    </button>
                  );
                })}

                {/* ── User location ─────────────────── */}
                <div className="absolute z-30 -translate-x-1/2 -translate-y-1/2" style={{ left: USER_LOC.x, top: USER_LOC.y }}>
                  <div className="w-5 h-5 bg-blue-500 rounded-full border-[3px] border-white shadow-lg shadow-blue-500/30" />
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" />
                  <div className="w-16 h-16 bg-blue-500/8 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* ── Recenter button ───────────────────── */}
            <button
              onClick={map.recenter}
              className="absolute bottom-20 right-3 z-30 w-10 h-10 bg-surface rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform"
            >
              <Locate size={18} className="text-forest" />
            </button>

            {/* ── Selected store card ───────────────── */}
            {selectedStore && (
              <div className="absolute bottom-3 left-0 right-0 z-30 px-4">
                <Link href={`/store/${selectedStore.id}`}>
                  <div className="bg-surface rounded-2xl shadow-xl border border-edge p-3.5">
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative bg-surface-tertiary">
                        <Image src={selectedStore.imageUrl} alt={selectedStore.name} fill className="object-cover" sizes="64px" quality={60} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <RestaurantLogo storeId={selectedStore.id} size={20} className="flex-shrink-0" />
                          <h3 className="font-semibold text-sm text-content truncate">{selectedStore.name}</h3>
                        </div>
                        <p className="text-xs text-content-tertiary mt-0.5">{selectedStore.distance} · {selectedStore.area}</p>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="flex items-center gap-0.5 text-xs text-content-tertiary">
                            <Clock size={11} /> {selectedStore.pickupDay} {selectedStore.pickupTime}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-1">
                            <Star size={12} className="star-filled fill-amber-400" />
                            <span className="text-xs font-medium">{selectedStore.rating}</span>
                          </div>
                          <span className="text-sm font-bold text-forest">Rs. {selectedStore.discountedPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </>
        ) : (
          /* ── List view ──────────────────────────── */
          <div className="flex flex-col gap-3 px-4 py-3 pb-20">
            {filteredStores.map((store) => (
              <Link key={store.id} href={`/store/${store.id}`}>
                <div className="store-card flex bg-surface rounded-xl overflow-hidden shadow-sm border border-edge">
                  <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden bg-surface-tertiary">
                    <Image
                      src={store.imageUrl} alt={store.name} fill className="object-cover"
                      sizes="96px" quality={60} loading="lazy"
                      placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2U1ZTdlYiIvPjwvc3ZnPg=="
                    />
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="font-semibold text-sm text-content truncate">{store.name}</h3>
                      <p className="text-xs text-content-tertiary">{store.category} · {store.distance}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="star-filled fill-amber-400" />
                        <span className="text-xs font-medium">{store.rating}</span>
                      </div>
                      <span className="text-sm font-bold text-forest">Rs. {store.discountedPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {filteredStores.length === 0 && (
              <div className="text-center py-12">
                <span className="text-4xl">🔍</span>
                <p className="text-content-tertiary mt-2 text-sm">No results for &ldquo;{searchQuery}&rdquo;</p>
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
