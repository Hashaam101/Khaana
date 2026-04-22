"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Settings,
  ChevronRight,
  Leaf,
  Wallet,
  ShoppingBag,
  HelpCircle,
  LogOut,
  Award,
  Moon,
  Sun,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { KhaanaLogo } from "@/components/KhaanaLogo";
import { ProfilePageSkeleton } from "@/components/Skeleton";
import { RestaurantLogo } from "@/components/RestaurantLogos";
import { useRandomData } from "@/context/RandomDataContext";
import { useTheme } from "@/context/ThemeContext";

function useCountdown(collectDate: string, collectTime: string) {
  const getTargetTime = () => {
    const startHour = parseInt(collectTime.split(":")[0], 10);
    const now = new Date();
    const target = new Date(now.getFullYear(), now.getMonth(), parseInt(collectDate), startHour, 0, 0);
    // If collect date includes a month name, parse it properly
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const parts = collectDate.split(" ");
    if (parts.length === 2) {
      const day = parseInt(parts[0], 10);
      const monthIndex = monthNames.indexOf(parts[1]);
      if (monthIndex !== -1) {
        target.setMonth(monthIndex);
        target.setDate(day);
      }
    }
    return target;
  };

  const calcRemaining = () => {
    const diff = Math.max(0, Math.floor((getTargetTime().getTime() - Date.now()) / 1000));
    return diff;
  };

  const [remaining, setRemaining] = useState(calcRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(calcRemaining());
    }, 1000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectDate, collectTime]);

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;
  const formatted = `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const isExpired = remaining === 0;

  return { formatted, isExpired };
}

export default function ProfilePage() {
  const { userProfile, pendingOrder } = useRandomData();
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const countdown = useCountdown(pendingOrder.collectDate, pendingOrder.collectTime);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();

  const pastOrders = [
    {
      id: 1,
      store: "Savour Foods",
      storeId: "savour-foods",
      date: "2 April",
      price: 450,
    },
    {
      id: 2,
      store: "Chaaye Khana",
      storeId: "chaaye-khana",
      date: "29 March",
      price: 500,
    },
    {
      id: 3,
      store: "Jalal Sons",
      storeId: "jalal-sons",
      date: "25 March",
      price: 850,
    },
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-surface-secondary relative">
      <div className="skeleton-overlay">
        <ProfilePageSkeleton />
        <BottomNav />
      </div>
      {/* Header */}
      <div className="bg-surface px-4 pt-6 pb-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src="/user-avatar.png"
              alt={userProfile.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-content">
                {userProfile.name}
              </h1>
              <p className="text-xs text-content-tertiary">
                Member since {userProfile.joinedDate}
              </p>
            </div>
          </div>
          <Link href="/settings" className="p-2 rounded-full hover:bg-surface-tertiary">
            <Settings size={22} className="text-content-secondary" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Orders Section */}
        <div className="bg-surface mt-2 px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-base text-content">Your orders</h2>
            <button
              onClick={() => setShowAllOrders(!showAllOrders)}
              className="text-sm font-medium text-forest"
            >
              See all
            </button>
          </div>

          {/* Pending Order */}
          <div className="bg-olivine-pale border border-olivine/30 dark:border-olivine/50 rounded-xl p-3 mb-3">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[10px] font-semibold bg-forest text-white px-2 py-0.5 rounded-full">
                {pendingOrder.status}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <RestaurantLogo storeId="burning-brownie" size={40} className="flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-sm text-content">
                  {pendingOrder.storeName}
                </p>
                <p className="text-xs text-content-secondary">
                  Collect {pendingOrder.collectDate},{" "}
                  {pendingOrder.collectTime}
                </p>
              </div>
              <ChevronRight size={18} className="text-content-muted" />
            </div>
            <Link
              href="/order-success"
              className="block mt-3 w-full text-center py-2 bg-forest text-white text-sm font-semibold rounded-xl"
            >
              {countdown.isExpired ? "Ready to collect!" : `Collect in ${countdown.formatted}`}
            </Link>
          </div>

          {/* Past Orders */}
          {showAllOrders &&
            pastOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-3 py-3 border-t border-edge"
              >
                <RestaurantLogo storeId={order.storeId} size={40} className="flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-sm text-content">{order.store}</p>
                  <p className="text-xs text-content-tertiary">{order.date}</p>
                </div>
                <span className="text-sm font-semibold text-content-secondary">
                  Rs. {order.price}
                </span>
              </div>
            ))}
        </div>

        {/* Impact Tracker */}
        <div className="bg-surface mt-2 px-4 py-4">
          <h2 className="font-bold text-base text-content mb-3">Your impact</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-olivine-pale rounded-xl p-4 text-center">
              <div className="w-10 h-10 bg-olivine/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <Leaf size={20} className="text-forest" />
              </div>
              <p className="text-2xl font-bold text-forest">
                {userProfile.co2Avoided}
              </p>
              <p className="text-[11px] text-content-secondary mt-0.5">
                kg CO₂e avoided
              </p>
              <p className="text-[10px] text-content-muted mt-1">
                ≈ 116 cups of chai
              </p>
            </div>
            <div className="bg-cream rounded-xl p-4 text-center">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <Wallet size={20} className="text-amber-700 dark:text-amber-400" />
              </div>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                {userProfile.moneySaved.toLocaleString()}
              </p>
              <p className="text-[11px] text-content-secondary mt-0.5">Rs. saved</p>
              <p className="text-[10px] text-content-muted mt-1">
                across {userProfile.mealsRescued} bags
              </p>
            </div>
          </div>

          {/* Achievement Badge */}
          <div className="mt-4 flex items-center gap-3 bg-surface-secondary rounded-xl p-3">
            <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center flex-shrink-0">
              <Award size={20} className="text-olivine" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-content">Food Rescue Hero</p>
              <p className="text-xs text-content-tertiary">
                You&apos;ve rescued {userProfile.mealsRescued} meals! 6 more to
                reach Gold status.
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-surface mt-2">
          <button
            onClick={() => setShowAllOrders(!showAllOrders)}
            className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-edge"
          >
            <ShoppingBag size={20} className="text-content-secondary" />
            <span className="flex-1 text-left text-sm font-medium text-content-secondary">
              Order history
            </span>
            <ChevronRight size={16} className="text-content-faint" />
          </button>
          <Link
            href="/settings"
            className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-edge"
          >
            <HelpCircle size={20} className="text-content-secondary" />
            <span className="flex-1 text-left text-sm font-medium text-content-secondary">
              Help & support
            </span>
            <ChevronRight size={16} className="text-content-faint" />
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-edge"
          >
            {isDark ? (
              <Moon size={20} className="text-content-secondary" />
            ) : (
              <Sun size={20} className="text-content-secondary" />
            )}
            <span className="flex-1 text-left text-sm font-medium text-content-secondary">
              Dark mode
            </span>
            <div
              className={`w-11 h-6 rounded-full transition-colors duration-300 flex items-center px-0.5 ${
                isDark ? "bg-forest" : "bg-surface-inset"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                  isDark ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </button>

          {/* Log out */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center gap-3 px-4 py-3.5"
          >
            <LogOut size={20} className="text-red-500" />
            <span className="flex-1 text-left text-sm font-medium text-red-500">
              Log out
            </span>
            <ChevronRight size={16} className="text-content-faint" />
          </button>
        </div>

        {/* Logout Confirmation */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40" onClick={() => setShowLogoutConfirm(false)}>
            <div className="bg-surface w-full max-w-[430px] rounded-t-2xl p-5 space-y-3" style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }} onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-bold text-content text-center">Log out?</h3>
              <p className="text-sm text-content-secondary text-center">Are you sure you want to log out of your account?</p>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  router.push("/");
                }}
                className="w-full py-3 bg-red-500 text-white font-semibold rounded-xl text-sm"
              >
                Log out
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full py-3 bg-surface-tertiary text-content-secondary font-semibold rounded-xl text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* App Info */}
        <div className="px-4 py-6 flex flex-col items-center">
          <KhaanaLogo size="sm" />
          <p className="text-[11px] text-content-muted mt-2">Version 1.0.0 MVP</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
