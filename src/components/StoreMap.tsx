"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Store } from "@/lib/data";

export default function StoreMap({
  stores,
  center,
  zoom = 12,
}: {
  stores: Store[];
  center: [number, number];
  zoom?: number;
}) {
  const [MapComponents, setMapComponents] = useState<{
    MapContainer: React.ComponentType<Record<string, unknown>>;
    TileLayer: React.ComponentType<Record<string, unknown>>;
    Marker: React.ComponentType<Record<string, unknown>>;
    Popup: React.ComponentType<Record<string, unknown>>;
    icon: unknown;
  } | null>(null);
  const [selected, setSelected] = useState<Store | null>(null);

  useEffect(() => {
    (async () => {
      const L = await import("leaflet");
      const RL = await import("react-leaflet");
      await import("leaflet/dist/leaflet.css");

      const icon = L.divIcon({
        className: "khaana-marker",
        html: `<div style="
          width: 32px; height: 32px;
          background: #1B512D;
          border: 2px solid #ADC178;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
          <svg width="16" height="16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 34 C14 46 22 52 32 52 C42 52 50 46 50 34" stroke="#ADC178" stroke-width="4" stroke-linecap="round" fill="none"/>
            <path d="M32 32 C32 22 38 14 46 13 C42 18 36 26 32 32Z" fill="#ADC178"/>
            <path d="M30 30 C28 22 22 17 16 17 C19 22 24 27 30 30Z" fill="#ADC178" opacity="0.7"/>
          </svg>
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      setMapComponents({
        MapContainer: RL.MapContainer as unknown as React.ComponentType<Record<string, unknown>>,
        TileLayer: RL.TileLayer as unknown as React.ComponentType<Record<string, unknown>>,
        Marker: RL.Marker as unknown as React.ComponentType<Record<string, unknown>>,
        Popup: RL.Popup as unknown as React.ComponentType<Record<string, unknown>>,
        icon,
      });
    })();
  }, []);

  if (!MapComponents) {
    return (
      <div className="h-full flex items-center justify-center bg-khaana-cream">
        <div className="text-center text-khaana-muted">
          <div className="w-8 h-8 border-2 border-khaana-dark border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = MapComponents;

  return (
    <div className="relative h-full">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", borderRadius: "1rem" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stores.map((store) => (
          <Marker
            key={store.id}
            position={[store.lat, store.lng]}
            icon={MapComponents.icon}
            eventHandlers={{
              click: () => setSelected(store),
            }}
          >
            <Popup>
              <div className="font-sans min-w-[180px]">
                <p className="font-bold text-sm">{store.name}</p>
                <p className="text-xs text-gray-500">{store.category}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Bottom card for selected store */}
      {selected && (
        <div className="absolute bottom-3 left-3 right-3 z-[1000]">
          <div className="bg-khaana-card border border-khaana-border rounded-2xl shadow-lg p-3">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-khaana-cream flex items-center justify-center text-khaana-muted text-xs"
            >
              x
            </button>
            <div className="flex items-center gap-2">
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ backgroundColor: selected.logoColor }}
              >
                {selected.logo}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">
                  {selected.name}
                </p>
                <p className="text-xs text-khaana-muted">
                  {selected.distance} - {selected.address}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-khaana-border">
              <div>
                <p className="text-[11px] text-khaana-muted">
                  {selected.pickupDay} {selected.pickupTime}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs text-khaana-muted line-through">
                    Rs. {selected.originalPrice}
                  </span>
                  <span className="text-sm font-bold text-khaana-dark dark:text-khaana-light">
                    Rs. {selected.discountedPrice}
                  </span>
                </div>
              </div>
              <Link
                href={`/store/${selected.id}`}
                className="bg-khaana-dark text-white text-xs font-semibold px-4 py-2 rounded-lg"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
