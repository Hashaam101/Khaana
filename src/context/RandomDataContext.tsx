"use client";

import { createContext, useContext, useState } from "react";
import {
  stores as baseStores,
  userProfile as baseProfile,
  pendingOrder as basePendingOrder,
  weeklyActivity as baseWeekly,
  monthlyHistory as baseMonthly,
  achievements as baseAchievements,
  communityImpact as baseCommunity,
  environmentalEquivalents as baseEquivalents,
  monthlyPlans,
  type Store,
  type WeeklyDay,
  type MonthlyImpact,
  type Achievement,
  type CommunityImpact,
} from "@/data/stores";

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randFloat = (min: number, max: number, d = 1) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(d));
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

function randomizeStores(): Store[] {
  return baseStores.map((s) => {
    const rating = clamp(randFloat(s.rating - 0.3, s.rating + 0.3), 3.8, 5.0);
    const reviewCount = rand(Math.round(s.reviewCount * 0.7), Math.round(s.reviewCount * 1.4));
    const originalPrice = rand(Math.round(s.originalPrice * 0.85), Math.round(s.originalPrice * 1.15));
    const discountPct = randFloat(0.55, 0.72);
    const discountedPrice = Math.round((originalPrice * (1 - discountPct)) / 50) * 50;
    const available = rand(1, 10);
    const pickupRating = clamp(randFloat(s.pickupRating - 0.3, s.pickupRating + 0.3), 3.5, 5.0);
    const valueRating = clamp(randFloat(s.valueRating - 0.3, s.valueRating + 0.3), 3.5, 5.0);

    return {
      ...s,
      rating,
      reviewCount,
      originalPrice,
      discountedPrice,
      available,
      pickupRating,
      valueRating,
    };
  });
}

function randomizeProfile() {
  const mealsRescued = rand(20, 55);
  const co2Avoided = randFloat(mealsRescued * 0.55, mealsRescued * 0.8);
  const moneySaved = rand(mealsRescued * 200, mealsRescued * 300);

  return {
    ...baseProfile,
    mealsRescued,
    co2Avoided,
    moneySaved,
    co2Equivalent: `equivalent to ${rand(Math.round(co2Avoided * 4), Math.round(co2Avoided * 6))} cups of coffee`,
  };
}

function randomizePendingOrder() {
  const hours = rand(17, 21);
  const end = hours + 1;
  return {
    ...basePendingOrder,
    collectTime: `${hours}:00 - ${end}:00`,
  };
}

function randomizeWeekly(): WeeklyDay[] {
  return baseWeekly.map((d) => ({
    ...d,
    meals: Math.random() < 0.25 ? 0 : rand(1, 4),
  }));
}

function randomizeMonthly(): MonthlyImpact[] {
  const meals = [rand(10, 18), rand(6, 14), rand(3, 10), rand(2, 7)].sort((a, b) => b - a);
  return baseMonthly.map((m, i) => ({
    month: m.month,
    meals: meals[i],
    co2: randFloat(meals[i] * 0.55, meals[i] * 0.8),
    saved: rand(meals[i] * 200, meals[i] * 300),
  }));
}

function randomizeAchievements(mealsRescued: number, co2Avoided: number, moneySaved: number): Achievement[] {
  return baseAchievements.map((a) => {
    switch (a.id) {
      case "first-rescue":
        return { ...a, earned: mealsRescued >= 1 };
      case "regular-saver":
        return { ...a, earned: mealsRescued >= 10 };
      case "eco-warrior":
        return { ...a, earned: co2Avoided >= 10 };
      case "food-hero":
        return { ...a, earned: mealsRescued >= 25 };
      case "money-master":
        return { ...a, earned: moneySaved >= 5000 };
      case "gold-rescuer":
        return { ...a, earned: mealsRescued >= 50, progress: mealsRescued, target: 50 };
      case "planet-guardian":
        return { ...a, earned: co2Avoided >= 50, progress: Math.round(co2Avoided), target: 50 };
      case "super-saver":
        return { ...a, earned: moneySaved >= 25000, progress: moneySaved, target: 25000 };
      default:
        return a;
    }
  });
}

function randomizeCommunity(): CommunityImpact {
  const totalMeals = rand(8000, 18000);
  return {
    totalMealsRescued: totalMeals,
    totalUsers: rand(1500, 4000),
    totalCo2Saved: rand(5000, 12000),
    totalMoneySaved: totalMeals * rand(200, 300),
    topCategory: "Meals",
    activeStores: rand(30, 65),
  };
}

function randomizeEquivalents(co2: number, meals: number) {
  const chaiCups = rand(Math.round(co2 * 4), Math.round(co2 * 6));
  const carTrips = rand(Math.max(1, Math.round(co2 * 0.4)), Math.max(2, Math.round(co2 * 0.7)));
  const trees = rand(Math.max(1, Math.round(co2 * 0.1)), Math.max(2, Math.round(co2 * 0.2)));
  const waterLitres = rand(meals * 8, meals * 12);
  const foodWaste = rand(Math.max(1, Math.round(meals * 0.4)), Math.round(meals * 0.6));

  return [
    { value: String(chaiCups), label: "cups of chai", icon: "☕", description: `The energy saved equals brewing ${chaiCups} cups` },
    { value: String(carTrips), label: "car trips avoided", icon: "🚗", description: "From Islamabad to Rawalpindi and back" },
    { value: String(trees), label: "trees worth", icon: "🌳", description: `CO₂ absorbed by ${trees} trees in a month` },
    { value: String(waterLitres), label: "litres of water", icon: "💧", description: "Water saved from food production" },
    { value: String(foodWaste), label: "kg food waste", icon: "🗑️", description: "Diverted from landfills" },
  ];
}

function generateAllData() {
  const stores = randomizeStores();
  const userProfile = randomizeProfile();
  const pendingOrder = randomizePendingOrder();
  const weeklyActivity = randomizeWeekly();
  const monthly = randomizeMonthly();
  const achievements = randomizeAchievements(userProfile.mealsRescued, userProfile.co2Avoided, userProfile.moneySaved);
  const community = randomizeCommunity();
  const equivalents = randomizeEquivalents(userProfile.co2Avoided, userProfile.mealsRescued);

  const streak = rand(2, 9);
  const level = userProfile.mealsRescued < 10 ? 1 : userProfile.mealsRescued < 20 ? 2 : userProfile.mealsRescued < 30 ? 3 : userProfile.mealsRescued < 45 ? 4 : 5;
  const levelNames = ["Starter", "Regular Saver", "Eco Warrior", "Food Hero", "Gold Rescuer"];
  const nextLevelNames = ["Regular Saver", "Eco Warrior", "Food Hero", "Gold Rescuer", "Legend"];
  const levelThresholds = [10, 20, 30, 45, 60];

  return {
    stores,
    userProfile,
    pendingOrder,
    monthlyPlans,
    // Impact data
    weeklyActivity,
    monthlyHistory: monthly,
    achievements,
    communityImpact: community,
    environmentalEquivalents: equivalents,
    streak,
    bestStreak: streak + rand(3, 12),
    trendPct: rand(8, 45),
    level,
    levelName: levelNames[level - 1],
    nextLevel: nextLevelNames[level - 1],
    currentXP: userProfile.mealsRescued,
    nextXP: levelThresholds[level - 1] || 60,
    bagsCount: rand(Math.round(userProfile.mealsRescued * 0.7), userProfile.mealsRescued),
    avgPerBag: Math.round(userProfile.moneySaved / userProfile.mealsRescued),
  };
}

export type RandomData = ReturnType<typeof generateAllData>;

const RandomDataContext = createContext<RandomData>(null!);

export function useRandomData() {
  return useContext(RandomDataContext);
}

export function RandomDataProvider({ children }: { children: React.ReactNode }) {
  const [data] = useState(generateAllData);
  return (
    <RandomDataContext.Provider value={data}>
      {children}
    </RandomDataContext.Provider>
  );
}
