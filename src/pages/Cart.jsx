import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/helpers";

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-surface-2 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={32} className="text-ink-4" />
        </div>
        <h2 className="font-display text-2xl font-bold text-ink mb-2">Your cart is empty</h2>
        <p className="text-ink-4 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn-primary px-8 py-3 rounded-xl">
          Browse Products <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-surface-2">
      <div className="container-base py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">Shopping Cart</h1>
          <button onClick={clearCart} className="text-sm text-ink-4 hover:text-ink transition-colors">
            Clear all
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card-base p-4 sm:p-5 flex gap-4">
                <Link to={`/products/${item.slug}`} className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-surface-2 rounded-xl overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-ink-4 mb-0.5">{item.brand}</p>
                      <Link to={`/products/${item.slug}`} className="font-semibold text-ink text-sm hover:text-ink-2 transition-colors line-clamp-2">
                        {item.name}
                      </Link>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-ink-4 hover:text-ink transition-colors flex-shrink-0 p-1">
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
                    <div className="flex items-center border border-surface-4 rounded-lg overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-ink-3 hover:bg-surface-2 transition-colors">
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-ink-3 hover:bg-surface-2 transition-colors">
                        <Plus size={13} />
                      </button>
                    </div>
                    <span className="font-bold text-ink">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-base p-6 sticky top-24">
              <h2 className="font-semibold text-ink text-base mb-5">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-ink-3">
                  <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-medium text-ink">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-ink-3">
                  <span>Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? "text-green-600" : "text-ink"}`}>
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                {subtotal < 999 && (
                  <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                    Add {formatPrice(999 - subtotal)} more for free shipping!
                  </p>
                )}
              </div>
              <div className="divider my-4" />
              <div className="flex justify-between font-bold text-ink">
                <span>Total</span>
                <span className="text-lg">{formatPrice(total)}</span>
              </div>

              {/* Coupon */}
              <div className="mt-4 flex gap-2">
                <input type="text" placeholder="Coupon code" className="input-base flex-1 text-sm" />
                <button className="btn-outline py-2 px-3 text-sm">Apply</button>
              </div>

              <Link to="/checkout" className="btn-primary w-full py-3.5 mt-5 rounded-xl justify-center text-sm font-semibold">
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
              <Link to="/products" className="btn-ghost w-full py-2.5 mt-2 text-sm text-center justify-center text-ink-3">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
