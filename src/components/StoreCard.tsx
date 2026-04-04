"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Clock, CalendarCheck } from "lucide-react";
import { RestaurantLogo } from "@/components/RestaurantLogos";
import type { Store } from "@/data/stores";

interface StoreCardProps {
  store: Store;
  variant?: "horizontal" | "vertical";
}

export default function StoreCard({
  store,
  variant = "vertical",
}: StoreCardProps) {
  if (variant === "horizontal") {
    return (
      <Link href={`/store/${store.id}`} className="store-card block">
        <div className="flex bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
          {/* Image */}
          <div className="w-28 h-28 flex-shrink-0 relative overflow-hidden bg-gray-100">
            <Image
              src={store.imageUrl}
              alt={store.name}
              fill
              className="object-cover"
              sizes="112px"
              quality={60}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PC9zdmc+"
            />
            {store.available <= 3 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10">
                {store.available} left
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <RestaurantLogo storeId={store.id} size={22} className="flex-shrink-0" />
                <h3 className="font-semibold text-sm text-gray-900 truncate">
                  {store.name}
                </h3>
              </div>
              <p className="text-xs text-gray-500">{store.category}</p>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="flex items-center gap-0.5">
                  <Clock size={11} />
                  {store.pickupDay} {store.pickupTime.split(" - ")[0]}
                </span>
                <span>·</span>
                <span>{store.distance}</span>
              </div>
              <span className="flex items-center gap-0.5 text-[9px] font-semibold text-forest bg-olivine-pale px-1.5 py-0.5 rounded-full ml-auto">
                <CalendarCheck size={9} /> Plans
              </span>
            </div>

            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1">
                <Star size={12} className="star-filled fill-amber-400" />
                <span className="text-xs font-medium">{store.rating}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-gray-400 line-through">
                  Rs. {store.originalPrice.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-forest">
                  Rs. {store.discountedPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/store/${store.id}`}
      className="store-card block flex-shrink-0 w-[200px]"
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
        {/* Image */}
        <div className="h-28 w-full relative overflow-hidden bg-gray-100">
          <Image
            src={store.imageUrl}
            alt={store.name}
            fill
            className="object-cover"
            sizes="200px"
            quality={60}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjExMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PC9zdmc+"
          />

          {/* Rating badge */}
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-1.5 py-0.5 flex items-center gap-0.5 z-10">
            <Star size={10} className="star-filled fill-amber-400" />
            <span className="text-[11px] font-semibold">{store.rating}</span>
          </div>

          {store.available <= 3 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10">
              {store.available} left
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <div className="flex items-center gap-1.5 mb-0.5">
            <RestaurantLogo storeId={store.id} size={22} className="flex-shrink-0" />
            <h3 className="font-semibold text-sm text-gray-900 truncate">
              {store.name}
            </h3>
          </div>
          <p className="text-xs text-gray-500 mb-1.5">{store.category}</p>
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
            <Clock size={11} />
            <span>
              {store.pickupDay} {store.pickupTime.split(" - ")[0]}
            </span>
            <span>·</span>
            <span>{store.distance}</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-gray-400 line-through">
              Rs. {store.originalPrice.toLocaleString()}
            </span>
            <span className="text-sm font-bold text-forest">
              Rs. {store.discountedPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
