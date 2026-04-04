"use client";

import { useState, useEffect } from "react";

export default function SplashScreen() {
  const [phase, setPhase] = useState<"visible" | "fading" | "gone">("visible");

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setPhase("fading");
    }, 2000);

    const removeTimer = setTimeout(() => {
      setPhase("gone");
    }, 2500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1B512D",
        opacity: phase === "fading" ? 0 : 1,
        transition: "opacity 0.5s ease-out",
        overflow: "hidden",
      }}
    >
      {/* Animated background glow */}
      <div style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(173,193,120,0.15) 0%, transparent 70%)",
        animation: "splashGlow 3s ease-in-out infinite",
      }} />

      {/* Floating food particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${6 + i * 2}px`,
            height: `${6 + i * 2}px`,
            borderRadius: "50%",
            background: i % 2 === 0 ? "rgba(173,193,120,0.3)" : "rgba(232,240,216,0.2)",
            animation: `splashFloat ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
            left: `${15 + i * 13}%`,
            bottom: "-20px",
          }}
        />
      ))}

      {/* Main content */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        animation: "splashContentIn 0.8s ease-out both",
      }}>
        {/* Animated leaf icon */}
        <div style={{
          position: "relative",
          width: "72px",
          height: "72px",
          animation: "splashIconIn 0.6s ease-out both",
          animationDelay: "0.2s",
        }}>
          {/* Outer ring */}
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid rgba(173,193,120,0.3)",
            animation: "splashRingSpin 4s linear infinite",
          }}>
            <div style={{
              position: "absolute",
              top: "-3px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#ADC178",
            }} />
          </div>

          {/* Pulsing circle */}
          <div style={{
            position: "absolute",
            inset: "8px",
            borderRadius: "50%",
            background: "rgba(173,193,120,0.1)",
            animation: "splashPulse 2s ease-in-out infinite",
          }} />

          {/* Leaf SVG */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            style={{
              position: "absolute",
              inset: "18px",
              width: "36px",
              height: "36px",
              animation: "splashLeafBounce 2s ease-in-out infinite",
              animationDelay: "0.5s",
            }}
          >
            <path
              d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22.23C7.57 17.62 10.48 13.34 17 12V15L22 8.5L17 2V5C17 5 17 5.33 17 8Z"
              fill="#ADC178"
            />
            <path
              d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22.23C7.57 17.62 10.48 13.34 17 12"
              stroke="#E8F0D8"
              strokeWidth="0.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Brand name */}
        <div style={{
          animation: "splashTextIn 0.7s ease-out both",
          animationDelay: "0.4s",
          textAlign: "center",
        }}>
          <h1 style={{
            fontSize: "42px",
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-1px",
            margin: 0,
            lineHeight: 1.1,
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          }}>
            {"Khaana".split("").map((char, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  animation: "splashLetterIn 0.4s ease-out both",
                  animationDelay: `${0.5 + i * 0.06}s`,
                }}
              >
                {char}
              </span>
            ))}
          </h1>

          {/* Decorative line */}
          <div style={{
            width: "40px",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #ADC178, transparent)",
            margin: "12px auto",
            animation: "splashLineExpand 0.6s ease-out both",
            animationDelay: "0.9s",
          }} />

          {/* Tagline */}
          <p style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "rgba(232,240,216,0.8)",
            margin: 0,
            letterSpacing: "2px",
            textTransform: "uppercase",
            animation: "splashTaglineIn 0.5s ease-out both",
            animationDelay: "1s",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          }}>
            Save food. Save money.
          </p>
        </div>

        {/* Loading dots */}
        <div style={{
          display: "flex",
          gap: "6px",
          animation: "splashDotsIn 0.4s ease-out both",
          animationDelay: "1.2s",
        }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#ADC178",
                animation: "splashDotBounce 1.2s ease-in-out infinite",
                animationDelay: `${1.3 + i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom branding accent */}
      <div style={{
        position: "absolute",
        bottom: "48px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        animation: "splashBottomIn 0.5s ease-out both",
        animationDelay: "1.1s",
      }}>
        <span style={{
          fontSize: "10px",
          color: "rgba(232,240,216,0.4)",
          letterSpacing: "3px",
          textTransform: "uppercase",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        }}>
          Rescue food in Islamabad
        </span>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes splashGlow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 1; }
        }

        @keyframes splashFloat {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
        }

        @keyframes splashContentIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes splashIconIn {
          from { opacity: 0; transform: scale(0.5) rotate(-20deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        @keyframes splashRingSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes splashPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.15); opacity: 0.6; }
        }

        @keyframes splashLeafBounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(3deg); }
        }

        @keyframes splashLetterIn {
          from { opacity: 0; transform: translateY(15px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes splashLineExpand {
          from { width: 0px; opacity: 0; }
          to { width: 40px; opacity: 1; }
        }

        @keyframes splashTaglineIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes splashDotsIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes splashDotBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-8px); opacity: 1; }
        }

        @keyframes splashBottomIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
