"use client";

interface LogoPlaceholderProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function LogoPlaceholder({
  size = "md",
  showText = true,
}: LogoPlaceholderProps) {
  const sizes = {
    sm: { container: "w-8 h-8", text: "text-[8px]", brandText: "text-lg" },
    md: { container: "w-10 h-10", text: "text-[10px]", brandText: "text-xl" },
    lg: { container: "w-16 h-16", text: "text-xs", brandText: "text-3xl" },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${s.container} rounded-xl border-2 border-dashed border-olivine flex items-center justify-center bg-olivine-pale`}
      >
        <span className={`${s.text} text-forest font-bold`}>LOGO</span>
      </div>
      {showText && (
        <span className={`${s.brandText} font-extrabold text-forest`}>
          Khaana
        </span>
      )}
    </div>
  );
}
