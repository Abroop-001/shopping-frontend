import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, ChevronRight, Truck, Check, Clock, X } from "lucide-react";
import { formatPrice } from "../utils/helpers";
import api from "../utils/api";

const statusConfig = {
  delivered: { color: "bg-green-100 text-green-700", icon: Check, label: "Delivered" },
  shipped: { color: "bg-blue-100 text-blue-700", icon: Truck, label: "Shipped" },
  processing: { color: "bg-amber-100 text-amber-700", icon: Clock, label: "Processing" },
  cancelled: { color: "bg-red-100 text-red-700", icon: X, label: "Cancelled" },
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await api.get("/orders/my");
        if (res.success) {
          setOrders(res.orders);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="container-base py-24 text-center">
        <span className="w-8 h-8 border-4 border-ink/30 border-t-ink rounded-full animate-spin inline-block" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-2">
      <div className="container-base py-10">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Package size={48} className="text-ink-4 mb-4" />
            <h3 className="font-semibold text-ink mb-2">No orders yet</h3>
            <p className="text-ink-4 text-sm mb-6">Start shopping to place your first order.</p>
            <Link to="/products" className="btn-primary inline-block px-8 py-3 rounded-xl">Shop Now</Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => {
              const statusKey = (order.orderStatus || "processing").toLowerCase();
              const cfg = statusConfig[statusKey] || statusConfig.processing;
              const Icon = cfg.icon;
              return (
                <div key={order._id} className="card-base overflow-hidden bg-surface">
                  {/* Header */}
                  <div className="bg-surface-2 px-6 py-4 flex flex-wrap items-center gap-4 border-b border-surface-4">
                    <div>
                      <p className="text-xs text-ink-4">Order ID</p>
                      <p className="text-sm font-semibold text-ink">{order._id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-ink-4">Date</p>
                      <p className="text-sm font-medium text-ink">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                    </div>
                    <div>
                      <p className="text-xs text-ink-4">Total</p>
                      <p className="text-sm font-bold text-ink">{formatPrice(order.totalAmount)}</p>
                    </div>
                    <div className="ml-auto">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${cfg.color}`}>
                        <Icon size={12} />{cfg.label}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="px-6 py-4 space-y-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-ink-5 rounded-full flex-shrink-0" />
                          <span className="text-ink-2">{item.name}</span>
                          <span className="text-ink-4">×{item.quantity || item.qty}</span>
                        </div>
                        <span className="font-medium text-ink">{formatPrice(item.price * (item.quantity || item.qty))}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-3 border-t border-surface-4 flex flex-wrap gap-3">
                    <button className="text-xs font-medium text-ink-3 hover:text-ink transition-colors">Track Order</button>
                    <button className="text-xs font-medium text-ink-3 hover:text-ink transition-colors">Download Invoice</button>
                    {order.orderStatus === "delivered" && (
                      <button className="text-xs font-medium text-ink-3 hover:text-ink transition-colors">Request Return</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
