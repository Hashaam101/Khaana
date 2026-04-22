"use client";

import { storefronts } from "@/lib/data";
import AdminNav from "@/components/AdminNav";

const statusStyles: Record<string, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  inactive: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
};

export default function AdminStorefrontsPage() {
  return (
    <>
      <AdminNav />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Storefronts</h1>
          <span className="text-sm text-khaana-muted">
            {storefronts.length} stores
          </span>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-khaana-card border border-khaana-border rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-khaana-dark dark:text-khaana-light">
              {storefronts.filter((s) => s.status === "active").length}
            </p>
            <p className="text-xs text-khaana-muted mt-0.5">Active</p>
          </div>
          <div className="bg-khaana-card border border-khaana-border rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-khaana-dark dark:text-khaana-light">
              {storefronts.filter((s) => s.status === "inactive").length}
            </p>
            <p className="text-xs text-khaana-muted mt-0.5">Inactive</p>
          </div>
          <div className="bg-khaana-card border border-khaana-border rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-khaana-dark dark:text-khaana-light">
              Rs. {storefronts.reduce((sum, s) => sum + s.revenue, 0).toLocaleString()}
            </p>
            <p className="text-xs text-khaana-muted mt-0.5">Total Revenue</p>
          </div>
        </div>

        {/* Store list */}
        <div className="space-y-3">
          {storefronts.map((store) => (
            <div
              key={store.id}
              className="bg-khaana-card border border-khaana-border rounded-2xl p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-khaana-cream flex items-center justify-center">
                    <span className="text-sm font-bold text-khaana-dark dark:text-khaana-light">
                      {store.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{store.name}</h3>
                    <p className="text-[11px] text-khaana-muted">
                      {store.category} &middot; {store.address}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusStyles[store.status]}`}
                >
                  {store.status}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <p className="text-[10px] text-khaana-muted">Owner</p>
                  <p className="text-xs font-medium">{store.owner}</p>
                </div>
                <div>
                  <p className="text-[10px] text-khaana-muted">Orders</p>
                  <p className="text-xs font-medium">{store.totalOrders}</p>
                </div>
                <div>
                  <p className="text-[10px] text-khaana-muted">Revenue</p>
                  <p className="text-xs font-medium">Rs. {store.revenue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-khaana-muted">Rating</p>
                  <p className="text-xs font-medium">{store.rating}</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-khaana-border flex items-center gap-4 text-[11px] text-khaana-muted">
                <span>{store.email}</span>
                <span>{store.phone}</span>
                <span>Joined {store.joinedDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
