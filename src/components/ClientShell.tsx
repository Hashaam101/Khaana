"use client";

import SplashScreen from "./SplashScreen";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SplashScreen />
      <div className="app-shell">{children}</div>
    </>
  );
}
