import React, { useState } from 'react';
import { Search, Eye, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockOrders } from '../../data/testimonials';
import { formatPrice } from '../../utils/helpers';

export default function AdminOrders() {
  const [orders, setOrders] = useState([
    ...mockOrders,
    { id: "ORD-2024-004", date: "2024-12-22", status: "Processing", total: 1999, items: [{ name: "Pulse Pre-Workout", qty: 1, price: 1999 }] },
    { id: "ORD-2024-005", date: "2024-12-23", status: "Delivered", total: 4299, items: [{ name: "Casein Protein – Micellar", qty: 1, price: 4299 }] },
    { id: "ORD-2024-006", date: "2024-12-24", status: "Shipped", total: 2999, items: [{ name: "Gym Shorts – Flex Mesh", qty: 1, price: 2999 }] },
  ]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    alert(`Order status updated to ${newStatus} (Simulated)`);
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Manage Orders</h1>
        <p className="text-xs text-ink-4 mt-0.5">Track shipping statuses, update order state, and review transactions.</p>
      </div>

      {/* Tabs and search controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Filters */}
        <div className="flex bg-surface rounded-xl p-1 border border-surface-4 self-start">
          {['All', 'Processing', 'Shipped', 'Delivered'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === status
                  ? "bg-ink text-surface shadow-sm"
                  : "text-ink-4 hover:text-ink"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Order ID..."
            className="input-base pl-9 py-2 text-xs"
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-4" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="card-base">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-2 border-b border-surface-4 text-xs font-semibold text-ink-4 uppercase">
                <th className="py-3.5 px-6">Order ID</th>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Total Amount</th>
                <th className="py-3.5 px-6">Items Summary</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-4 text-ink-2">
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-surface-2/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-ink">{o.id}</td>
                  <td className="py-4 px-6">Abroop Singh</td>
                  <td className="py-4 px-6">{new Date(o.date).toLocaleDateString()}</td>
                  <td className="py-4 px-6 font-semibold text-ink">{formatPrice(o.total)}</td>
                  <td className="py-4 px-6 text-xs text-ink-3">
                    {o.items.map(item => `${item.name} (${item.qty})`).join(', ')}
                  </td>
                  {/* Status Badge */}
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      o.status === "Delivered" ? "bg-green-50 text-green-700" :
                      o.status === "Shipped" ? "bg-blue-50 text-blue-700" :
                      "bg-amber-50 text-amber-700"
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        className="text-xs bg-surface-2 border border-surface-4 rounded-lg px-2 py-1 focus:outline-none focus:border-ink"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-xs text-ink-4">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
