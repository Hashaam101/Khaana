"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { label: "Stats", href: "/admin/stats" },
    { label: "Storefronts", href: "/admin/storefronts" },
  ];

  return (
    <header className="bg-khaana-dark sticky top-0 z-40 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <Link href="/admin/stats" className="font-bold text-lg text-white">
            Khaana <span className="text-khaana-light text-sm font-normal ml-1">Admin</span>
          </Link>
          <nav className="flex gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-khaana-light/20 text-khaana-light"
                      : "text-white/60 hover:text-white/90"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <button
          onClick={() => router.push("/admin/login")}
          className="text-sm text-white/60 hover:text-white/90 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
