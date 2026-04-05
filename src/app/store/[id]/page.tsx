"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { stores } from "@/lib/data";

export default function StoreDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const store = stores.find((s) => s.id === id);
  const [reserved, setReserved] = useState(false);

  if (!store) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-khaana-muted">Store not found</p>
      </div>
    );
  }

  if (reserved) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center">
        <div className="w-20 h-20 bg-khaana-light rounded-full flex items-center justify-center mb-6">
          <svg
            width="40"
            height="40"
            fill="none"
            stroke="#1B512D"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-khaana-dark dark:text-khaana-light">
          You&apos;re a hero!
        </h1>
        <p className="text-khaana-muted mt-2">
          Thanks for saving good food from going to waste
        </p>
        <div className="mt-8 bg-khaana-cream rounded-2xl p-4 w-full">
          <p className="font-semibold text-sm">{store.name}</p>
          <p className="text-xs text-khaana-muted mt-1">
            Collect {store.pickupDay.toLowerCase()} {store.pickupTime}
          </p>
          <p className="text-xs text-khaana-muted">{store.address}</p>
        </div>
        <p className="text-sm text-khaana-dark dark:text-khaana-light font-medium mt-6">
          #KhaanaSavesFood
        </p>
        <Link
          href="/"
          className="mt-8 w-full bg-khaana-dark text-white py-3.5 rounded-xl font-semibold text-sm text-center block"
        >
          Back to Discover
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-khaana-surface">
      {/* Header image */}
      <div className="relative h-56 w-full">
        <Image
          src={store.image}
          alt={store.name}
          fill
          className="object-cover"
          sizes="(max-width: 512px) 100vw, 512px"
          priority
        />
        <Link
          href="/"
          className="absolute top-4 left-4 w-9 h-9 bg-khaana-dark/80 rounded-full flex items-center justify-center shadow"
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="#ADC178"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <button className="absolute top-4 right-4 w-9 h-9 bg-khaana-dark/80 rounded-full flex items-center justify-center shadow">
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="#ADC178"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Store info */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-3">
          <span
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: store.logoColor }}
          >
            {store.logo}
          </span>
          <div className="flex-1">
            <h1 className="font-bold text-lg">{store.name}</h1>
            <p className="text-sm text-khaana-muted">{store.category}</p>
          </div>
        </div>

        {/* Rating & Price */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1">
            <svg width="16" height="16" fill="#FFD700" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-semibold text-khaana-dark dark:text-khaana-light">
              {store.rating}
            </span>
            <span className="text-xs text-khaana-muted">
              ({store.reviewCount})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-khaana-muted line-through">
              Rs. {store.originalPrice}
            </span>
            <span className="text-lg font-bold text-khaana-dark dark:text-khaana-light">
              Rs. {store.discountedPrice}
            </span>
          </div>
        </div>

        {/* Pickup info */}
        <div className="flex items-center gap-2 mt-4 bg-khaana-cream rounded-xl px-4 py-3">
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="#1B512D"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          <span className="text-sm">
            Pick up: {store.pickupTime}
          </span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              store.pickupDay === "Today"
                ? "bg-khaana-dark text-white"
                : "bg-khaana-light text-khaana-dark"
            }`}
          >
            {store.pickupDay}
          </span>
        </div>

        {/* Address */}
        <div className="flex items-center gap-2 mt-3">
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="#1B512D"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm text-khaana-dark dark:text-khaana-light">{store.address}</span>
        </div>

        {/* Description */}
        <section className="mt-6">
          <h2 className="font-bold text-sm mb-2">What you could get</h2>
          <p className="text-sm text-khaana-muted leading-relaxed">
            {store.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {store.items.map((item) => (
              <span
                key={item}
                className="text-xs bg-khaana-cream text-khaana-dark px-3 py-1 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Reviews section */}
        <section className="mt-6">
          <h2 className="font-bold text-sm mb-3">Overall experience</h2>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-khaana-dark dark:text-khaana-light">
              {store.rating}
            </span>
            <div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="16"
                    height="16"
                    fill={star <= Math.round(store.rating) ? "#1B512D" : "#E5E5E0"}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-khaana-muted mt-0.5">
                Based on {store.reviewCount} recent reviews
              </p>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-khaana-muted">Food quality</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg
                    key={s}
                    width="12"
                    height="12"
                    fill={s <= Math.round(store.rating) ? "#ADC178" : "#E5E5E0"}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-khaana-muted">
                Pickup experience
              </span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg
                    key={s}
                    width="12"
                    height="12"
                    fill={
                      s <= Math.round(store.rating - 0.2)
                        ? "#ADC178"
                        : "#E5E5E0"
                    }
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Reserve button - sticky footer */}
      <div className="sticky bottom-0 bg-khaana-dark p-4 mt-6 shadow-[0_-2px_10px_rgba(0,0,0,0.15)]">
        <button
          onClick={() => setReserved(true)}
          className="w-full bg-khaana-light text-khaana-dark py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform hover:brightness-110"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clipRule="evenodd"
            />
          </svg>
          Reserve for Rs. {store.discountedPrice}
        </button>
      </div>
    </div>
  );
}
