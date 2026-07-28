import React from 'react';
import { DollarSign, ShoppingBag, Users, Package, ArrowUpRight, TrendingUp, Star } from 'lucide-react';
import { formatPrice } from '../../utils/helpers';
import { products } from '../../data/products';
import { mockOrders } from '../../data/testimonials';

export default function Dashboard() {
  const stats = [
    { label: "Total Revenue", value: "₹4,89,500", icon: DollarSign, change: "+12.5%", isPositive: true },
    { label: "Total Orders", value: "1,248", icon: ShoppingBag, change: "+8.2%", isPositive: true },
    { label: "Active Users", value: "3,142", icon: Users, change: "+15.1%", isPositive: true },
    { label: "Products Catalog", value: products.length.toString(), icon: Package, change: "+4 new", isPositive: true },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Dashboard Overview</h1>
        <p className="text-xs text-ink-4 mt-0.5">Welcome back, Administrator. Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(({ label, value, icon: Icon, change, isPositive }) => (
          <div key={label} className="card-base p-6 bg-surface hover:shadow-sm transition-all border border-surface-4">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="w-10 h-10 bg-surface-2 rounded-xl flex items-center justify-center text-ink-3">
                <Icon size={18} />
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                isPositive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              }`}>
                {change}
              </span>
            </div>
            <p className="text-xs text-ink-4 font-medium uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold text-ink mt-1">{value}</p>
          </div>
        ))}
      </div>

      {/* Charts / Performance section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* CSS Chart */}
        <div className="lg:col-span-2 card-base p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-ink">Monthly Sales Analytics</h2>
              <p className="text-xs text-ink-4">Visual presentation of storefront revenue</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-md">
              <TrendingUp size={14} /> +12% target
            </div>
          </div>
          {/* Simple CSS-only bar chart */}
          <div className="h-56 flex items-end justify-between gap-4 pt-6 border-b border-surface-4 px-2">
            {[
              { month: "Jan", val: 40 },
              { month: "Feb", val: 55 },
              { month: "Mar", val: 75 },
              { month: "Apr", val: 60 },
              { month: "May", val: 90 },
              { month: "Jun", val: 80 },
              { month: "Jul", val: 100 },
            ].map(({ month, val }) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <div
                  className="w-full bg-ink group-hover:bg-accent rounded-t-md transition-colors relative"
                  style={{ height: `${val}%` }}
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-ink text-surface text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {val}%
                  </div>
                </div>
                <span className="text-[10px] text-ink-4 font-medium uppercase">{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top selling products list */}
        <div className="lg:col-span-1 card-base p-6">
          <h2 className="font-semibold text-ink mb-5">Top Sellers</h2>
          <div className="space-y-4">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-surface-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-ink truncate">{p.name}</p>
                  <p className="text-[10px] text-ink-4">{p.brand} • {p.category}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-bold text-ink">{formatPrice(p.price)}</p>
                  <div className="flex items-center gap-0.5 justify-end mt-0.5 text-amber-400">
                    <Star size={8} className="fill-current" />
                    <span className="text-[9px] font-bold text-ink-3">{p.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="card-base">
        <div className="p-6 border-b border-surface-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-ink">Recent Orders</h2>
            <p className="text-xs text-ink-4">Overview of the latest user transactions</p>
          </div>
          <button className="text-xs font-semibold text-ink hover:underline flex items-center gap-1">
            View all orders <ArrowUpRight size={13} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-2 border-b border-surface-4 text-xs font-semibold text-ink-4 uppercase">
                <th className="py-3.5 px-6">Order ID</th>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Total</th>
                <th className="py-3.5 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-4 text-ink-2">
              {mockOrders.map((o) => (
                <tr key={o.id} className="hover:bg-surface-2/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-ink">{o.id}</td>
                  <td className="py-4 px-6">Abroop Singh</td>
                  <td className="py-4 px-6">{new Date(o.date).toLocaleDateString()}</td>
                  <td className="py-4 px-6 font-medium text-ink">{formatPrice(o.total)}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      o.status === "Delivered" ? "bg-green-50 text-green-700" :
                      o.status === "Shipped" ? "bg-blue-50 text-blue-700" :
                      "bg-amber-50 text-amber-700"
                    }`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
