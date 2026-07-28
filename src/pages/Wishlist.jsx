import { Link } from "react-router-dom";
import { Heart, ShoppingCart, X } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/helpers";

export default function Wishlist() {
  const { items, removeItem, toggle } = useWishlist();
  const { addItem, isInCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-surface-2 rounded-full flex items-center justify-center mb-6">
          <Heart size={32} className="text-ink-4" />
        </div>
        <h2 className="font-display text-2xl font-bold text-ink mb-2">Your wishlist is empty</h2>
        <p className="text-ink-4 mb-8">Save items you love to revisit later.</p>
        <Link to="/products" className="btn-primary px-8 py-3 rounded-xl">Discover Products</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-2">
      <div className="container-base py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            Wishlist <span className="text-ink-4 font-normal text-lg ml-1">({items.length})</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((item) => (
            <div key={item.id} className="card-base overflow-hidden group">
              <div className="relative aspect-square bg-surface-2 overflow-hidden">
                <Link to={`/products/${item.slug}`}>
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </Link>
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-surface rounded-full flex items-center justify-center shadow-sm text-ink-3 hover:text-ink transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs text-ink-4 mb-1">{item.brand}</p>
                <Link to={`/products/${item.slug}`} className="font-semibold text-sm text-ink hover:text-ink-2 transition-colors line-clamp-2 block mb-3">
                  {item.name}
                </Link>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ink">{formatPrice(item.price)}</span>
                </div>
                <button
                  onClick={() => addItem(item)}
                  className={`mt-3 w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    isInCart(item.id) ? "bg-ink text-surface" : "bg-surface-2 text-ink hover:bg-ink hover:text-surface"
                  }`}
                >
                  <ShoppingCart size={13} />
                  {isInCart(item.id) ? "In Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
