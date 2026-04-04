"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Heart,
  Star,
  Clock,
  MapPin,
  ChevronRight,
  ShoppingBag,
  Info,
  CalendarCheck,
  Zap,
} from "lucide-react";
import { StoreDetailSkeleton } from "@/components/Skeleton";
import { RestaurantLogo } from "@/components/RestaurantLogos";
import { stores, monthlyPlans } from "@/data/stores";

export default function StoreDetailPage() {
  const params = useParams();
  const router = useRouter();
  const store = stores.find((s) => s.id === params.id);
  const [isFavorite, setIsFavorite] = useState(store?.isFavorite ?? false);
  const [quantity, setQuantity] = useState(1);
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!store) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Store not found</p>
      </div>
    );
  }

  if (isLoading) {
    return <StoreDetailSkeleton />;
  }

  const handleReserve = () => {
    setShowReserveModal(true);
    setTimeout(() => {
      router.push("/order-success");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      {/* Hero Image */}
      <div className="h-56 w-full relative bg-gray-100">
        <Image
          src={store.imageUrl}
          alt={store.name}
          fill
          className="object-cover"
          sizes="430px"
          priority
          quality={70}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDMwIiBoZWlnaHQ9IjIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PC9zdmc+"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm z-10"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm z-10"
        >
          <Heart
            size={20}
            className={
              isFavorite ? "text-red-500 fill-red-500" : "text-gray-700"
            }
          />
        </button>

        {store.available <= 3 && (
          <div className="absolute bottom-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            Only {store.available} left!
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-28">
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-start gap-3">
            <RestaurantLogo storeId={store.id} size={48} className="flex-shrink-0" />
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">{store.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <ShoppingBag size={14} />
                  {store.category}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-1">
              <Star size={16} className="star-filled fill-amber-400" />
              <span className="font-semibold">{store.rating}</span>
              <span className="text-sm text-gray-500">
                ({store.reviewCount})
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-gray-400 line-through text-sm">
                Rs. {store.originalPrice.toLocaleString()}
              </span>
              <span className="text-xl font-bold text-forest">
                Rs. {store.discountedPrice.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3 p-3 bg-olivine-pale rounded-xl">
            <Clock size={18} className="text-forest flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Pick up: {store.pickupTime}
              </p>
              <p className="text-xs text-gray-600">{store.pickupDay}</p>
            </div>
            <span
              className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${
                store.pickupDay === "Today"
                  ? "bg-forest text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {store.pickupDay}
            </span>
          </div>

          <button className="w-full flex items-center gap-3 mt-3 p-3 bg-gray-50 rounded-xl text-left">
            <MapPin size={18} className="text-forest flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-forest">
                {store.address}
              </p>
              <p className="text-xs text-gray-500">
                More information about this store
              </p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="px-4 py-3 border-t border-gray-100">
          <h2 className="font-bold text-base mb-2">What you could get</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {store.description}
          </p>
          <div className="flex items-center gap-1 mt-2">
            <Info size={14} className="text-gray-400" />
            <p className="text-xs text-gray-400">
              Contents are a surprise and vary daily
            </p>
          </div>
          <div className="mt-2">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {store.category}
            </span>
          </div>
        </div>

        {/* Monthly Plans */}
        <div className="px-4 py-3 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <CalendarCheck size={18} className="text-forest" />
            <h2 className="font-bold text-base">Monthly Plans</h2>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Subscribe and save more with regular pickups from {store.name}
          </p>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-1 px-1 pb-1">
            {monthlyPlans.map((plan) => (
              <div
                key={plan.name}
                className={`flex-shrink-0 w-[155px] rounded-xl border p-3 ${
                  plan.name === "Regular"
                    ? "border-forest bg-olivine-pale"
                    : "border-gray-200 bg-white"
                }`}
              >
                {plan.name === "Regular" && (
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-white bg-forest px-1.5 py-0.5 rounded-full mb-1.5">
                    <Zap size={8} /> POPULAR
                  </span>
                )}
                <p className="font-bold text-sm text-gray-900">{plan.name}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{plan.description}</p>
                <p className="text-lg font-bold text-forest mt-2">
                  Rs. {plan.pricePerMonth.toLocaleString()}
                  <span className="text-[10px] font-normal text-gray-400">/mo</span>
                </p>
                <p className="text-[10px] text-forest font-semibold">
                  Save {plan.savingsPercent}% vs. one-time
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 py-3 border-t border-gray-100">
          <h2 className="font-bold text-base mb-3">Overall experience</h2>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl font-bold">{store.rating}</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  className={
                    star <= Math.round(store.rating)
                      ? "star-filled fill-amber-400"
                      : "text-gray-200"
                  }
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            Based on {store.reviewCount} recent reviews
          </p>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-700">
                  Pickup experience
                </span>
                <span className="text-sm font-semibold">
                  {store.pickupRating}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-forest rounded-full progress-bar"
                  style={
                    {
                      "--progress": `${(store.pickupRating / 5) * 100}%`,
                    } as React.CSSProperties
                  }
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-700">Value for money</span>
                <span className="text-sm font-semibold">
                  {store.valueRating}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-olivine rounded-full progress-bar"
                  style={
                    {
                      "--progress": `${(store.valueRating / 5) * 100}%`,
                    } as React.CSSProperties
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reserve Button */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-3 z-50">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm text-gray-600">Quantity:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 font-medium"
            >
              −
            </button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <button
              onClick={() =>
                setQuantity(Math.min(store.available, quantity + 1))
              }
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 font-medium"
            >
              +
            </button>
          </div>
          <span className="ml-auto text-lg font-bold text-forest">
            Rs. {(store.discountedPrice * quantity).toLocaleString()}
          </span>
        </div>
        <button
          onClick={handleReserve}
          className="w-full py-3.5 bg-forest text-white font-bold rounded-2xl text-base pulse-btn active:scale-[0.98] transition-transform"
        >
          Reserve
        </button>
      </div>

      {/* Reserve Modal */}
      {showReserveModal && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 mx-8 text-center">
            <div className="w-16 h-16 bg-olivine-pale rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="font-bold text-lg">Reserving your bag...</h3>
            <p className="text-sm text-gray-500 mt-1">
              {quantity}x Surprise Bag from {store.name}
            </p>
            <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-forest rounded-full animate-pulse w-3/4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
