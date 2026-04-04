"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { KhaanaLogo } from "@/components/KhaanaLogo";
import { ProfilePageSkeleton } from "@/components/Skeleton";
import { RestaurantLogo } from "@/components/RestaurantLogos";
import { userProfile, pendingOrder } from "@/data/stores";

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
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const countdown = useCountdown(pendingOrder.collectDate, pendingOrder.collectTime);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

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

  if (isLoading) {
    return (
      <>
        <ProfilePageSkeleton />
        <BottomNav />
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src="/user-avatar.png"
              alt={userProfile.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {userProfile.name}
              </h1>
              <p className="text-xs text-gray-500">
                Member since {userProfile.joinedDate}
              </p>
            </div>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Settings size={22} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-4">
        {/* Orders Section */}
        <div className="bg-white mt-2 px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-base">Your orders</h2>
            <button
              onClick={() => setShowAllOrders(!showAllOrders)}
              className="text-sm font-medium text-forest"
            >
              See all
            </button>
          </div>

          {/* Pending Order */}
          <div className="bg-olivine-pale border border-olivine/30 rounded-xl p-3 mb-3">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[10px] font-semibold bg-forest text-white px-2 py-0.5 rounded-full">
                {pendingOrder.status}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <RestaurantLogo storeId="burning-brownie" size={40} className="flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-sm">
                  {pendingOrder.storeName}
                </p>
                <p className="text-xs text-gray-600">
                  Collect {pendingOrder.collectDate},{" "}
                  {pendingOrder.collectTime}
                </p>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
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
                className="flex items-center gap-3 py-3 border-t border-gray-100"
              >
                <RestaurantLogo storeId={order.storeId} size={40} className="flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{order.store}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  Rs. {order.price}
                </span>
              </div>
            ))}
        </div>

        {/* Impact Tracker */}
        <div className="bg-white mt-2 px-4 py-4">
          <h2 className="font-bold text-base mb-3">Your impact</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-olivine-pale rounded-xl p-4 text-center">
              <div className="w-10 h-10 bg-olivine/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <Leaf size={20} className="text-forest" />
              </div>
              <p className="text-2xl font-bold text-forest">
                {userProfile.co2Avoided}
              </p>
              <p className="text-[11px] text-gray-600 mt-0.5">
                kg CO₂e avoided
              </p>
              <p className="text-[10px] text-gray-400 mt-1">
                ≈ 116 cups of chai
              </p>
            </div>
            <div className="bg-cream rounded-xl p-4 text-center">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Wallet size={20} className="text-amber-700" />
              </div>
              <p className="text-2xl font-bold text-amber-700">
                {userProfile.moneySaved.toLocaleString()}
              </p>
              <p className="text-[11px] text-gray-600 mt-0.5">Rs. saved</p>
              <p className="text-[10px] text-gray-400 mt-1">
                across {userProfile.mealsRescued} bags
              </p>
            </div>
          </div>

          {/* Achievement Badge */}
          <div className="mt-4 flex items-center gap-3 bg-gray-50 rounded-xl p-3">
            <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center flex-shrink-0">
              <Award size={20} className="text-olivine" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Food Rescue Hero</p>
              <p className="text-xs text-gray-500">
                You&apos;ve rescued {userProfile.mealsRescued} meals! 6 more to
                reach Gold status.
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white mt-2">
          {[
            {
              icon: ShoppingBag,
              label: "Order history",
              color: "text-gray-700",
            },
            {
              icon: HelpCircle,
              label: "Help & support",
              color: "text-gray-700",
            },
            {
              icon: LogOut,
              label: "Log out",
              color: "text-red-500",
            },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-0"
            >
              <item.icon size={20} className={item.color} />
              <span
                className={`flex-1 text-left text-sm font-medium ${item.color}`}
              >
                {item.label}
              </span>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          ))}
        </div>

        {/* App Info */}
        <div className="px-4 py-6 flex flex-col items-center">
          <KhaanaLogo size="sm" />
          <p className="text-[11px] text-gray-400 mt-2">Version 1.0.0 MVP</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
