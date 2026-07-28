import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { formatPrice, getDiscount } from "../../utils/helpers";

export default function ProductCard({ product }) {
  const { addItem, isInCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const discount = getDiscount(product.price, product.originalPrice);

  const prodId = product._id || product.id;
  const wishlisted = isWishlisted(prodId);
  const inCart = isInCart(prodId);

  const ratingVal = product.ratings !== undefined ? product.ratings : product.rating || 0;
  const reviewCountVal = product.numReviews !== undefined ? product.numReviews : product.reviewCount || 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
  };

  // Safe image display
  const imageUrl = product.image || (product.images && product.images[0]) || "";

  return (
    <Link to={`/products/${product.slug}`} className="group product-card block">
      {/* Image */}
      <div className="relative overflow-hidden bg-surface-2 aspect-square rounded-t-2xl">
        <img
          src={imageUrl}
          alt={product.name}
          loading="lazy"
          className="product-card-image w-full h-full object-cover"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && <span className="badge-new">New</span>}
          {product.isBestSeller && <span className="badge-bestseller">Best Seller</span>}
          {discount > 0 && <span className="badge-sale">{discount}% off</span>}
        </div>
        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            wishlisted ? "bg-ink text-surface" : "bg-surface/80 text-ink-3 opacity-0 group-hover:opacity-100"
          } glass`}
        >
          <Heart size={15} fill={wishlisted ? "currentColor" : "none"} />
        </button>
        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-surface/70 flex items-center justify-center">
            <span className="text-sm font-medium text-ink-3">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-ink-4 font-medium mb-1 uppercase tracking-wider">{product.brand}</p>
        <h3 className="text-sm font-semibold text-ink leading-snug mb-2 line-clamp-2 group-hover:text-ink-2 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(ratingVal) ? "text-amber-400 fill-amber-400" : "text-surface-4 fill-surface-4"}
              />
            ))}
          </div>
          <span className="text-xs text-ink-4">({reviewCountVal.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-ink">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-ink-4 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>

        {/* Add to Cart (appears on hover) */}
        <div className="product-card-actions mt-3">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
              inCart
                ? "bg-ink text-surface"
                : "bg-surface-2 text-ink hover:bg-ink hover:text-surface"
            } ${product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <ShoppingCart size={14} />
            {inCart ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
}
