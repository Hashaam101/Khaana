"use client";

import { useState, useRef } from "react";
import {
  Leaf,
  Wallet,
  UtensilsCrossed,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  Users,
  Store,
  Share2,
  Flame,
  Trophy,
  Info,
  X,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { ImpactPageSkeleton } from "@/components/Skeleton";
import { useRandomData, type RandomData } from "@/context/RandomDataContext";

function StatCard({
  icon: Icon,
  iconBg,
  iconColor,
  value,
  unit,
  label,
  subtitle,
  cardBg,
}: {
  icon: typeof Leaf;
  iconBg: string;
  iconColor: string;
  value: number;
  unit?: string;
  label: string;
  subtitle: string;
  cardBg: string;
}) {
  const displayValue = Number.isInteger(value)
    ? value.toLocaleString()
    : value.toFixed(1);

  return (
    <div className={`${cardBg} rounded-2xl p-4 text-center`}>
      <div
        className={`w-11 h-11 ${iconBg} rounded-full flex items-center justify-center mx-auto mb-2`}
      >
        <Icon size={20} className={iconColor} />
      </div>
      <p className={`text-2xl font-bold ${iconColor}`}>
        {displayValue}
        {unit && <span className="text-base font-semibold ml-0.5">{unit}</span>}
      </p>
      <p className="text-[11px] text-content-secondary mt-0.5 font-medium">{label}</p>
      <p className="text-[10px] text-content-muted mt-1">{subtitle}</p>
    </div>
  );
}

function WeeklyChart({
  data,
  selectedDay,
  onSelectDay,
}: {
  data: RandomData;
  selectedDay: number | null;
  onSelectDay: (i: number | null) => void;
}) {
  const maxMeals = Math.max(...data.weeklyActivity.map((d) => d.meals), 1);
  const totalWeek = data.weeklyActivity.reduce((sum, d) => sum + d.meals, 0);

  return (
    <div className="bg-surface rounded-2xl p-4 border border-edge">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-sm text-content">This week</h3>
          <p className="text-xs text-content-tertiary">{totalWeek} meals rescued</p>
        </div>
        <div className="flex items-center gap-1 bg-olivine-pale px-2.5 py-1 rounded-full">
          <TrendingUp size={12} className="text-forest" />
          <span className="text-[11px] font-semibold text-forest">+{data.trendPct}%</span>
        </div>
      </div>

      <div className="flex items-end justify-between gap-2 h-32 mb-2">
        {data.weeklyActivity.map((day, i) => {
          const height = day.meals > 0 ? (day.meals / maxMeals) * 100 : 4;
          const isSelected = selectedDay === i;
          const isToday = i === 5;

          return (
            <button
              key={day.day}
              onClick={() => onSelectDay(isSelected ? null : i)}
              className="flex-1 flex flex-col items-center gap-1 group"
            >
              {isSelected && day.meals > 0 && (
                <div className="bg-forest text-white text-[10px] font-semibold px-2 py-1 rounded-lg mb-1 whitespace-nowrap">
                  {day.meals} {day.meals === 1 ? "meal" : "meals"}
                </div>
              )}
              <div className="w-full flex justify-center">
                <div
                  className={`w-8 rounded-t-lg transition-all duration-300 ${
                    day.meals === 0
                      ? "bg-surface-tertiary"
                      : isSelected
                        ? "bg-forest shadow-lg"
                        : isToday
                          ? "bg-forest/80"
                          : "bg-olivine"
                  }`}
                  style={{ height: `${height}%`, minHeight: day.meals === 0 ? "4px" : "20px" }}
                />
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between gap-2">
        {data.weeklyActivity.map((day, i) => (
          <div key={day.day} className="flex-1 text-center">
            <span
              className={`text-[10px] font-medium ${
                i === 5 ? "text-forest font-bold" : "text-content-muted"
              }`}
            >
              {day.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EquivalentsCarousel({ data }: { data: RandomData }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  const prev = () => setCurrent((c) => (c === 0 ? data.environmentalEquivalents.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === data.environmentalEquivalents.length - 1 ? 0 : c + 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  };

  const eq = data.environmentalEquivalents[current];

  return (
    <div className="bg-gradient-to-br from-forest to-forest-dark rounded-2xl p-4 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="flex items-center justify-between mb-3 relative z-10">
        <h3 className="font-bold text-sm">Did you know?</h3>
        <div className="flex gap-1">
          <button onClick={prev} className="p-1 rounded-full bg-white/15 hover:bg-white/25 transition-colors">
            <ChevronLeft size={14} />
          </button>
          <button onClick={next} className="p-1 rounded-full bg-white/15 hover:bg-white/25 transition-colors">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div
        className="relative z-10 min-h-[80px] flex flex-col justify-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center gap-3">
          <span className="text-4xl">{eq.icon}</span>
          <div>
            <p className="text-2xl font-bold">
              {eq.value} <span className="text-sm font-medium text-white/80">{eq.label}</span>
            </p>
            <p className="text-xs text-white/70 mt-0.5">{eq.description}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-1.5 mt-3 relative z-10">
        {data.environmentalEquivalents.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function LevelProgress({ data }: { data: RandomData }) {
  const progress = (data.currentXP / data.nextXP) * 100;

  return (
    <div className="bg-surface rounded-2xl p-4 border border-edge">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-sm">
            <Trophy size={18} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-sm text-content">Level {data.level}</p>
            <p className="text-xs text-content-tertiary">{data.levelName}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-forest">{data.currentXP}/{data.nextXP} meals</p>
          <p className="text-[10px] text-content-muted">to {data.nextLevel}</p>
        </div>
      </div>

      <div className="h-3 bg-surface-tertiary rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-olivine to-forest rounded-full progress-bar"
          style={{ "--progress": `${progress}%` } as React.CSSProperties}
        />
      </div>

      <div className="flex justify-between mt-2">
        {["🌱", "⭐", "🌍", "🦸", "🏆"].map((emoji, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className={`text-sm ${i < data.level ? "" : "grayscale opacity-50 dark:opacity-60"}`}>{emoji}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AchievementsGrid({ data }: { data: RandomData }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-base text-content">Achievements</h3>
        <span className="text-xs text-content-tertiary">
          {data.achievements.filter((a) => a.earned).length}/{data.achievements.length} earned
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {data.achievements.map((badge) => {
          const isExpanded = expandedId === badge.id;
          const progressPct = badge.target
            ? Math.min(((badge.progress ?? 0) / badge.target) * 100, 100)
            : 100;

          return (
            <button
              key={badge.id}
              onClick={() => setExpandedId(isExpanded ? null : badge.id)}
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
                badge.earned
                  ? "bg-olivine-pale border border-olivine/30 dark:border-olivine/50"
                  : "bg-surface-secondary border border-edge"
              } ${isExpanded ? "ring-2 ring-forest/30 scale-105" : ""}`}
            >
              <span className={`text-2xl mb-1 ${badge.earned ? "" : "grayscale opacity-50 dark:opacity-60"}`}>
                {badge.icon}
              </span>
              <p
                className={`text-[11px] font-semibold text-center leading-tight ${
                  badge.earned ? "text-forest" : "text-content-muted"
                }`}
              >
                {badge.name}
              </p>
              {!badge.earned && badge.target && (
                <div className="w-full h-1 bg-surface-inset rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-olivine rounded-full"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {expandedId && (() => {
        const badge = data.achievements.find((a) => a.id === expandedId);
        if (!badge) return null;
        return (
          <div className="mt-3 bg-surface-secondary rounded-xl p-3 flex items-start gap-3 animate-in">
            <span className="text-2xl">{badge.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-content">{badge.name}</p>
              <p className="text-xs text-content-tertiary mt-0.5">{badge.description}</p>
              {badge.earned ? (
                <p className="text-[10px] text-forest font-medium mt-1">Earned {badge.date}</p>
              ) : (
                <div className="mt-1.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-content-tertiary">
                      {badge.progress?.toLocaleString()}/{badge.target?.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-semibold text-forest">
                      {Math.round(((badge.progress ?? 0) / (badge.target ?? 1)) * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-surface-inset rounded-full overflow-hidden">
                    <div
                      className="h-full bg-forest rounded-full progress-bar"
                      style={{
                        "--progress": `${((badge.progress ?? 0) / (badge.target ?? 1)) * 100}%`,
                      } as React.CSSProperties}
                    />
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => setExpandedId(null)} className="p-0.5 text-content-muted">
              <X size={14} />
            </button>
          </div>
        );
      })()}
    </div>
  );
}

function MonthlyTrend({ data }: { data: RandomData }) {
  const [activeMetric, setActiveMetric] = useState<"meals" | "co2" | "saved">("meals");
  const maxVal = Math.max(...data.monthlyHistory.map((m) => m[activeMetric]));

  const metricConfig = {
    meals: { label: "Meals", color: "bg-forest", unit: "" },
    co2: { label: "CO₂", color: "bg-olivine", unit: " kg" },
    saved: { label: "Savings", color: "bg-amber-500", unit: " Rs" },
  };

  return (
    <div className="bg-surface rounded-2xl p-4 border border-edge">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-sm text-content">Monthly trend</h3>
        <div className="flex bg-surface-tertiary rounded-lg p-0.5">
          {(["meals", "co2", "saved"] as const).map((metric) => (
            <button
              key={metric}
              onClick={() => setActiveMetric(metric)}
              className={`px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all ${
                activeMetric === metric
                  ? "bg-surface text-forest shadow-sm"
                  : "text-content-muted"
              }`}
            >
              {metricConfig[metric].label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        {data.monthlyHistory.map((month, i) => {
          const width = (month[activeMetric] / maxVal) * 100;
          return (
            <div key={month.month} className="flex items-center gap-3">
              <span className="text-[11px] text-content-tertiary w-16 flex-shrink-0">{month.month.slice(0, 3)}</span>
              <div className="flex-1 h-6 bg-surface-secondary rounded-lg overflow-hidden">
                <div
                  className={`h-full ${metricConfig[activeMetric].color} rounded-lg transition-all duration-500 flex items-center justify-end pr-2`}
                  style={{
                    width: `${width}%`,
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  <span className="text-[10px] font-bold text-white whitespace-nowrap">
                    {activeMetric === "saved"
                      ? month[activeMetric].toLocaleString()
                      : month[activeMetric]}
                    {metricConfig[activeMetric].unit}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CommunitySection({ data }: { data: RandomData }) {
  const [showInfo, setShowInfo] = useState(false);
  const userContribution = ((data.userProfile.mealsRescued / data.communityImpact.totalMealsRescued) * 100).toFixed(2);

  return (
    <div className="bg-surface rounded-2xl p-4 border border-edge">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-sm text-content">Islamabad community</h3>
          <button onClick={() => setShowInfo(!showInfo)} className="text-content-muted">
            <Info size={14} />
          </button>
        </div>
      </div>

      {showInfo && (
        <div className="bg-cream rounded-xl p-3 mb-3 text-xs text-content-secondary">
          Combined impact of all {data.communityImpact.totalUsers.toLocaleString()} Khaana users
          across {data.communityImpact.activeStores} partner stores in Islamabad.
        </div>
      )}

      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-olivine-pale/60 rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <UtensilsCrossed size={14} className="text-forest" />
          </div>
          <p className="text-lg font-bold text-forest">
            {data.communityImpact.totalMealsRescued.toLocaleString()}
          </p>
          <p className="text-[10px] text-content-tertiary">meals rescued</p>
        </div>
        <div className="bg-olivine-pale/60 rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users size={14} className="text-forest" />
          </div>
          <p className="text-lg font-bold text-forest">
            {data.communityImpact.totalUsers.toLocaleString()}
          </p>
          <p className="text-[10px] text-content-tertiary">active users</p>
        </div>
        <div className="bg-cream/80 rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Leaf size={14} className="text-amber-700 dark:text-amber-400" />
          </div>
          <p className="text-lg font-bold text-amber-700 dark:text-amber-400">
            {(data.communityImpact.totalCo2Saved / 1000).toFixed(1)}t
          </p>
          <p className="text-[10px] text-content-tertiary">CO₂ avoided</p>
        </div>
        <div className="bg-cream/80 rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Store size={14} className="text-amber-700 dark:text-amber-400" />
          </div>
          <p className="text-lg font-bold text-amber-700 dark:text-amber-400">
            {data.communityImpact.activeStores}
          </p>
          <p className="text-[10px] text-content-tertiary">partner stores</p>
        </div>
      </div>

      <div className="mt-3 bg-surface-secondary rounded-xl p-3 flex items-center gap-3">
        <div className="w-9 h-9 bg-forest rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-sm">🌟</span>
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-content">Your contribution</p>
          <p className="text-[10px] text-content-tertiary">
            You make up <span className="font-bold text-forest">{userContribution}%</span> of
            Islamabad&apos;s total food rescue
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ImpactPage() {
  const data = useRandomData();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [shareToast, setShareToast] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "My Khaana Impact",
      text: `I've rescued ${data.userProfile.mealsRescued} meals, saved ${data.userProfile.co2Avoided}kg CO₂, and saved Rs. ${data.userProfile.moneySaved.toLocaleString()} with Khaana! Join me in fighting food waste.`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareData.text);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-dvh bg-surface-secondary relative">
      <div className="skeleton-overlay">
        <ImpactPageSkeleton />
        <BottomNav />
      </div>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-surface px-4 pt-6 pb-4 border-b border-edge">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-content">Your Impact</h1>

            <p className="text-xs text-content-tertiary mt-0.5">
              Making Islamabad greener, one meal at a time
            </p>
          </div>
          <button
            onClick={handleShare}
            className="p-2.5 bg-olivine-pale rounded-full hover:bg-olivine-light transition-colors"
          >
            <Share2 size={18} className="text-forest" />
          </button>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-2 mt-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 rounded-xl px-3 py-2">
          <Flame size={18} className="text-orange-500" />
          <div className="flex-1">
            <p className="text-xs font-semibold text-content">
              <span className="text-orange-500">{data.streak} day streak!</span> Keep it going
            </p>
          </div>
          <span className="text-[10px] text-content-muted">Best: {data.bestStreak} days</span>
        </div>
      </div>

      {/* Share Toast */}
      {shareToast && (
        <div className="fixed left-1/2 -translate-x-1/2 z-50 bg-forest text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg" style={{ top: "max(5rem, calc(env(safe-area-inset-top) + 3rem))" }}>
          Copied to clipboard!
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Hero Stats */}
        <div className="px-4 pt-4">
          <div className="grid grid-cols-3 gap-2.5">
            <StatCard
              icon={UtensilsCrossed}
              iconBg="bg-olivine/30"
              iconColor="text-forest"
              value={data.userProfile.mealsRescued}
              label="meals rescued"
              subtitle={`${data.bagsCount} bags saved`}
              cardBg="bg-surface border border-edge"
            />
            <StatCard
              icon={Leaf}
              iconBg="bg-olivine/30"
              iconColor="text-forest"
              value={data.userProfile.co2Avoided}
              unit="kg"
              label="CO₂ avoided"
              subtitle="this year"
              cardBg="bg-surface border border-edge"
            />
            <StatCard
              icon={Wallet}
              iconBg="bg-amber-100 dark:bg-amber-900/30"
              iconColor="text-amber-700 dark:text-amber-400"
              value={data.userProfile.moneySaved}
              label="Rs. saved"
              subtitle={`avg ${data.avgPerBag}/bag`}
              cardBg="bg-surface border border-edge"
            />
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="px-4 mt-4">
          <WeeklyChart data={data} selectedDay={selectedDay} onSelectDay={setSelectedDay} />
        </div>

        {/* Environmental Equivalents */}
        <div className="px-4 mt-4">
          <EquivalentsCarousel data={data} />
        </div>

        {/* Level Progress */}
        <div className="px-4 mt-4">
          <LevelProgress data={data} />
        </div>

        {/* Achievements */}
        <div className="px-4 mt-4">
          <AchievementsGrid data={data} />
        </div>

        {/* Monthly Trend */}
        <div className="px-4 mt-4">
          <MonthlyTrend data={data} />
        </div>

        {/* Community */}
        <div className="px-4 mt-4">
          <CommunitySection data={data} />
        </div>

        {/* Share CTA */}
        <div className="px-4 mt-4 mb-2">
          <button
            onClick={handleShare}
            className="w-full bg-forest text-white py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <Share2 size={16} />
            Share your impact
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
