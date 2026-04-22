"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Moon, Sun, Bell, Globe, Shield, Info } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { KhaanaLogo } from "@/components/KhaanaLogo";
import { useTheme } from "@/context/ThemeContext";

export default function SettingsPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");

  return (
    <div className="flex flex-col min-h-dvh bg-surface-secondary">
      {/* Header */}
      <div className="bg-surface px-4 pt-6 pb-4 border-b border-edge">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2.5 -ml-1 rounded-full hover:bg-surface-tertiary transition-colors"
          >
            <ArrowLeft size={22} className="text-content" />
          </button>
          <h1 className="text-xl font-bold text-content">Settings</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        {/* Appearance */}
        <div className="bg-surface mt-2 px-4 py-3">
          <p className="text-[11px] font-semibold text-content-muted uppercase tracking-wide mb-2">
            Appearance
          </p>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 py-3"
          >
            <div className="w-10 h-10 bg-surface-tertiary rounded-full flex items-center justify-center">
              {isDark ? (
                <Moon size={20} className="text-forest" />
              ) : (
                <Sun size={20} className="text-forest" />
              )}
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-content">Dark mode</p>
              <p className="text-xs text-content-tertiary">
                {isDark
                  ? "On — easier on the eyes"
                  : "Off — light theme active"}
              </p>
            </div>
            {/* Toggle */}
            <div
              className={`w-12 h-7 rounded-full transition-colors duration-300 flex items-center px-0.5 ${
                isDark ? "bg-forest" : "bg-surface-inset"
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
                  isDark ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Preferences */}
        <div className="bg-surface mt-2 px-4 py-3">
          <p className="text-[11px] font-semibold text-content-muted uppercase tracking-wide mb-2">
            Preferences
          </p>
          <button
            onClick={() => setNotifications(!notifications)}
            className="w-full flex items-center gap-3 py-3 border-b border-edge"
          >
            <div className="w-10 h-10 bg-surface-tertiary rounded-full flex items-center justify-center">
              <Bell size={20} className="text-content-tertiary" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-content">Notifications</p>
            </div>
            <div className={`w-11 h-6 rounded-full transition-colors duration-300 flex items-center px-0.5 ${notifications ? "bg-forest" : "bg-surface-inset"}`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${notifications ? "translate-x-5" : "translate-x-0"}`} />
            </div>
          </button>
          <button
            onClick={() => setLanguage(language === "English" ? "Urdu" : "English")}
            className="w-full flex items-center gap-3 py-3"
          >
            <div className="w-10 h-10 bg-surface-tertiary rounded-full flex items-center justify-center">
              <Globe size={20} className="text-content-tertiary" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-content">Language</p>
            </div>
            <span className="text-xs text-content-muted">{language}</span>
          </button>
        </div>

        {/* About */}
        <div className="bg-surface mt-2 px-4 py-3">
          <p className="text-[11px] font-semibold text-content-muted uppercase tracking-wide mb-2">
            About
          </p>
          {[
            { icon: Shield, label: "Privacy policy" },
            { icon: Info, label: "About Khaana" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 py-3 border-b border-edge last:border-0"
            >
              <div className="w-10 h-10 bg-surface-tertiary rounded-full flex items-center justify-center">
                <item.icon size={20} className="text-content-tertiary" />
              </div>
              <p className="text-sm font-medium text-content flex-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* App Info */}
        <div className="px-4 py-6 flex flex-col items-center">
          <KhaanaLogo size="sm" />
          <p className="text-[11px] text-content-muted mt-2">
            Version 1.0.0 MVP
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
