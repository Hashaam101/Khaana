"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Search, Heart, User } from "lucide-react";

const navItems = [
  { href: "/", label: "Discover", icon: Home },
  { href: "/browse", label: "Browse", icon: Search },
  { href: "/favorites", label: "Favourites", icon: Heart },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 bg-white border-t border-gray-100 px-2 pb-2 pt-1 z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg ${
                isActive ? "text-forest" : "text-gray-400"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.8}
                fill={isActive && item.icon === Heart ? "#1B512D" : "none"}
              />
              <span
                className={`text-[10px] ${isActive ? "font-semibold" : "font-medium"}`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
