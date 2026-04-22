"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Search, Leaf, User } from "lucide-react";

const navItems = [
  { href: "/#nav", label: "Discover", icon: Home },
  { href: "/browse#nav", label: "Browse", icon: Search },
  { href: "/impact#nav", label: "Impact", icon: Leaf },
  { href: "/profile#nav", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="sticky bottom-0 bg-surface border-t border-edge px-2 pt-1 z-50" style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}>
      <span id="nav" />
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const path = item.href.replace("#nav", "");
          const isActive =
            path === "/"
              ? pathname === "/"
              : pathname.startsWith(path);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item flex flex-col items-center justify-center gap-0.5 min-w-[44px] min-h-[44px] px-3 py-1.5 rounded-lg ${
                isActive ? "text-forest" : "text-content-muted"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.8}
                fill="none"
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
