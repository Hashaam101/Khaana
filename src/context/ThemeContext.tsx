"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

const darkVars: Record<string, string> = {
  "--background": "#060a06",
  "--foreground": "#edf5ed",
  "--olivine-pale": "#0e1710",
  "--cream": "#14150e",
  "--surface": "#060a06",
  "--surface-secondary": "#0c1410",
  "--surface-tertiary": "#142218",
  "--surface-inset": "#1e3222",
  "--content": "#f0f7f0",
  "--content-secondary": "#cce0d0",
  "--content-tertiary": "#9cc4a4",
  "--content-muted": "#6a9872",
  "--content-faint": "#3a5e40",
  "--edge": "#132018",
  "--edge-strong": "#1e3224",
  "--edge-stronger": "#2a4430",
};

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
    for (const [key, value] of Object.entries(darkVars)) {
      root.style.setProperty(key, value);
    }
  } else {
    root.classList.remove("dark");
    for (const key of Object.keys(darkVars)) {
      root.style.removeProperty(key);
    }
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("khaana-theme") as Theme | null;
    if (stored === "dark") {
      setTheme("dark");
      applyTheme("dark");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("khaana-theme", theme);
    applyTheme(theme);
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
