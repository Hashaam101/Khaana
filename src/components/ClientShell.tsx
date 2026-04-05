"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SplashScreen from "./SplashScreen";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { RandomDataProvider } from "@/context/RandomDataContext";
import { useDragScroll } from "@/hooks/useDragScroll";

// Module-level flags — survive component re-mounts during client-side navigation
let splashDismissed = false;
let initialPathname: string | null = null;

function AppContent({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [showSplash, setShowSplash] = useState(!splashDismissed);
  const pathname = usePathname();
  useDragScroll();

  // Record the very first pathname (survives re-mounts)
  if (initialPathname === null) {
    initialPathname = pathname;
  }

  // Dismiss splash immediately when user navigates away from the landing page
  useEffect(() => {
    if (showSplash && pathname !== initialPathname) {
      splashDismissed = true;
      setShowSplash(false);
    }
  }, [pathname, showSplash]);

  const dismissSplash = () => {
    splashDismissed = true;
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && (
        <div
          className="splash-overlay"
          onAnimationEnd={dismissSplash}
        >
          <SplashScreen />
        </div>
      )}
      <div className={`app-shell${theme === "dark" ? " dark" : ""}`}>
        {children}
      </div>
    </>
  );
}

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <RandomDataProvider>
        <AppContent>{children}</AppContent>
      </RandomDataProvider>
    </ThemeProvider>
  );
}
