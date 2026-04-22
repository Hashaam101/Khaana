"use client";

import { adminStats, recentOrders } from "@/lib/data";
import AdminNav from "@/components/AdminNav";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  picked_up: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export default function AdminStatsPage() {
  const stats = [
    { label: "Total Orders", value: adminStats.totalOrders.toLocaleString(), icon: "orders" },
    { label: "Deliveries", value: adminStats.totalDeliveries.toLocaleString(), icon: "deliveries" },
    { label: "Revenue", value: `Rs. ${adminStats.totalRevenue.toLocaleString()}`, icon: "revenue" },
    { label: "Customers", value: adminStats.totalCustomers.toLocaleString(), icon: "customers" },
    { label: "Meals Saved", value: adminStats.mealsSaved.toLocaleString(), icon: "meals" },
    { label: "Active Stores", value: adminStats.activeStores.toString(), icon: "stores" },
  ];

  const weekStats = [
    { label: "Orders This Week", value: adminStats.ordersThisWeek.toLocaleString() },
    { label: "Revenue This Week", value: `Rs. ${adminStats.revenueThisWeek.toLocaleString()}` },
  ];

  return (
    <>
      <AdminNav />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold mb-6">Dashboard</h1>

        {/* Main stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-khaana-card border border-khaana-border rounded-2xl p-4"
            >
              <p className="text-xs text-khaana-muted">{stat.label}</p>
              <p className="text-xl font-bold text-khaana-dark dark:text-khaana-light mt-1">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Weekly highlight */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {weekStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-khaana-dark rounded-2xl p-4"
            >
              <p className="text-xs text-white/60">{stat.label}</p>
              <p className="text-xl font-bold text-khaana-light mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Monthly trend */}
        <section className="mb-6">
          <h2 className="font-bold text-base mb-3">Monthly Trend</h2>
          <div className="bg-khaana-card border border-khaana-border rounded-2xl p-4">
            <div className="flex items-end gap-2 h-36">
              {adminStats.monthlyOrders.map((m) => {
                const maxOrders = Math.max(...adminStats.monthlyOrders.map((o) => o.orders));
                const height = (m.orders / maxOrders) * 100;
                return (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-khaana-muted font-medium">
                      {m.orders}
                    </span>
                    <div
                      className="w-full bg-khaana-dark dark:bg-khaana-light rounded-t-lg transition-all"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[10px] text-khaana-muted">{m.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Top stores */}
        <section className="mb-6">
          <h2 className="font-bold text-base mb-3">Top Stores</h2>
          <div className="bg-khaana-card border border-khaana-border rounded-2xl divide-y divide-khaana-border">
            {adminStats.topStores.map((store, i) => (
              <div key={store.name} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-khaana-cream flex items-center justify-center text-xs font-bold text-khaana-dark dark:text-khaana-light">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{store.name}</p>
                    <p className="text-[11px] text-khaana-muted">{store.orders} orders</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-khaana-dark dark:text-khaana-light">
                  Rs. {store.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent orders */}
        <section className="mb-6">
          <h2 className="font-bold text-base mb-3">Recent Orders</h2>
          <div className="bg-khaana-card border border-khaana-border rounded-2xl divide-y divide-khaana-border overflow-hidden">
            {recentOrders.map((order) => (
              <div key={order.id} className="px-4 py-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{order.id}</span>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[order.status]}`}
                    >
                      {order.status.replace("_", " ")}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-khaana-dark dark:text-khaana-light">
                    Rs. {order.total}
                  </span>
                </div>
                <p className="text-xs text-khaana-muted">
                  {order.customer} &middot; {order.storeName} &middot; {order.date}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
