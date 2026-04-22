"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Mock authentication
    if (email === "admin@khaana.pk" && password === "admin123") {
      localStorage.setItem("khaana-admin", "true");
      router.push("/admin/stats");
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen bg-khaana-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-khaana-dark dark:text-khaana-light">
            Khaana
          </h1>
          <p className="text-khaana-muted text-sm mt-1">Admin Portal</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-khaana-card border border-khaana-border rounded-2xl p-6 space-y-4"
        >
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@khaana.pk"
              className="w-full px-3 py-2.5 rounded-xl border border-khaana-border bg-khaana-surface text-khaana-text text-sm outline-none focus:border-khaana-dark dark:focus:border-khaana-light transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-3 py-2.5 rounded-xl border border-khaana-border bg-khaana-surface text-khaana-text text-sm outline-none focus:border-khaana-dark dark:focus:border-khaana-light transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-khaana-dark text-white py-2.5 rounded-xl font-medium text-sm hover:bg-khaana-dark/90 transition-colors"
          >
            Sign In
          </button>

          <p className="text-[11px] text-khaana-muted text-center">
            Demo: admin@khaana.pk / admin123
          </p>
        </form>
      </div>
    </div>
  );
}
