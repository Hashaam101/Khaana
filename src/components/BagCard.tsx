import Image from "next/image";
import Link from "next/link";
import type { Store } from "@/lib/data";

export default function BagCard({
  store,
  variant = "vertical",
}: {
  store: Store;
  variant?: "vertical" | "horizontal";
}) {
  if (variant === "horizontal") {
    return (
      <Link
        href={`/store/${store.id}`}
        className="flex bg-khaana-card rounded-2xl shadow-sm border border-khaana-border overflow-hidden"
      >
        <div className="relative w-28 h-28 shrink-0">
          <Image
            src={store.image}
            alt={store.name}
            fill
            className="object-cover"
            sizes="112px"
          />
        </div>
        <div className="flex flex-col justify-between p-3 flex-1 min-w-0">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                style={{ backgroundColor: store.logoColor }}
              >
                {store.logo}
              </span>
              <h3 className="font-semibold text-sm truncate">{store.name}</h3>
            </div>
            <p className="text-xs text-khaana-muted mt-1">{store.category}</p>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[11px] text-khaana-muted">
              {store.pickupDay} {store.pickupTime} | {store.distance}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-khaana-muted line-through">
                Rs. {store.originalPrice}
              </span>
              <span className="text-sm font-bold text-khaana-dark dark:text-khaana-light">
                Rs. {store.discountedPrice}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/store/${store.id}`}
      className="block bg-khaana-card rounded-2xl shadow-sm border border-khaana-border overflow-hidden w-64 shrink-0"
    >
      <div className="relative h-36 w-full">
        <Image
          src={store.image}
          alt={store.name}
          fill
          className="object-cover"
          sizes="256px"
        />
        <div className="absolute top-2 right-2 bg-black/60 text-white text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
          <svg width="12" height="12" fill="#FFD700" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {store.rating}
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2">
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ backgroundColor: store.logoColor }}
          >
            {store.logo}
          </span>
          <h3 className="font-semibold text-sm truncate">{store.name}</h3>
        </div>
        <p className="text-xs text-khaana-muted mt-1">{store.category}</p>
        <div className="flex items-center gap-1 mt-1 text-[11px] text-khaana-muted">
          <svg
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          Collect {store.pickupDay.toLowerCase()} {store.pickupTime} |{" "}
          {store.distance}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-khaana-muted line-through">
            Rs. {store.originalPrice}
          </span>
          <span className="text-sm font-bold text-khaana-dark dark:text-khaana-light">
            Rs. {store.discountedPrice}
          </span>
        </div>
      </div>
    </Link>
  );
}
