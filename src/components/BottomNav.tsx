"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

export default function BottomNav() {
  const pathname = usePathname();
  const { theme } = useTheme();

  void theme;

  // Hide on admin routes
  if (pathname.startsWith("/admin")) return null;

  const activeColor = "#ADC178";
  const inactiveColor = "rgba(255,255,255,0.45)";

  const tabs = [
    {
      label: "Discover",
      href: "/",
      icon: (active: boolean) => (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={active ? activeColor : inactiveColor} strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15l3-9 3 9-9-3 9 3z" />
        </svg>
      ),
    },
    {
      label: "Browse",
      href: "/browse",
      icon: (active: boolean) => (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={active ? activeColor : inactiveColor} strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      label: "Favourites",
      href: "/favourites",
      icon: (active: boolean) => (
        <svg width="24" height="24" fill={active ? activeColor : "none"} viewBox="0 0 24 24" stroke={active ? activeColor : inactiveColor} strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (active: boolean) => (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={active ? activeColor : inactiveColor} strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-khaana-dark z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const active =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center gap-0.5 py-1"
            >
              {tab.icon(active)}
              <span
                className={`text-[10px] font-medium ${active ? "text-khaana-light" : "text-white/45"}`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
