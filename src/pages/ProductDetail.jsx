import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, Heart, ShoppingCart, Minus, Plus, Package, Shield, Truck, RotateCcw, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatPrice, getDiscount } from "../utils/helpers";
import ProductGrid from "../components/product/ProductGrid";
import api from "../utils/api";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem, isInCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProductAndRelated = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/slug/${slug}`);
        if (res.success && res.product) {
          setProduct(res.product);
          const relRes = await api.get(`/products/${res.product._id}/related`);
          if (relRes.success) {
            setRelated(relRes.products);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProductAndRelated();
  }, [slug]);

  if (loading) {
    return (
      <div className="container-base py-24 text-center">
        <span className="w-8 h-8 border-4 border-ink/30 border-t-ink rounded-full animate-spin inline-block" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-base py-24 text-center">
        <h2 className="font-display text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/products" className="btn-primary inline-block px-6 py-2.5 rounded-lg">Browse Products</Link>
      </div>
    );
  }

  const prodId = product._id;
  const discount = getDiscount(product.price, product.originalPrice);

  const handleAddToCart = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const ratingVal = product.ratings !== undefined ? product.ratings : product.rating || 0;
  const reviewCountVal = product.numReviews !== undefined ? product.numReviews : product.reviewCount || 0;
  const mainImage = product.image || (product.images && product.images[activeImg]) || "";

  return (
    <div className="min-h-screen bg-surface">
      {/* Breadcrumb */}
      <div className="border-b border-surface-4">
        <div className="container-base py-3 flex items-center gap-2 text-xs text-ink-4">
          <Link to="/" className="hover:text-ink transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/products" className="hover:text-ink transition-colors">Products</Link>
          <ChevronRight size={12} />
          <span className="text-ink truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="container-base py-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-surface-2 rounded-2xl overflow-hidden">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImg === i ? "border-ink" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-4">{product.brand}</span>
              {product.isNew && <span className="badge-new">New</span>}
              {product.isBestSeller && <span className="badge-bestseller">Best Seller</span>}
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(ratingVal) ? "text-amber-400 fill-amber-400" : "text-surface-4 fill-surface-4"} />
                ))}
              </div>
              <span className="text-sm font-semibold text-ink">{ratingVal}</span>
              <span className="text-sm text-ink-4">({reviewCountVal.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-surface-4">
              <span className="font-display text-3xl font-bold text-ink">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-ink-4 line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="badge-sale">{discount}% off</span>
                </>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? "bg-green-500" : product.stock > 0 ? "bg-amber-500" : "bg-red-500"}`} />
              <span className="text-sm text-ink-2">
                {product.stock === 0 ? "Out of Stock" : product.stock <= 10 ? `Only ${product.stock} left in stock` : "In Stock"}
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <p className="text-sm font-medium text-ink">Quantity</p>
              <div className="flex items-center border border-surface-4 rounded-xl overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-ink-3 hover:bg-surface-2 transition-colors">
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center text-sm font-semibold text-ink">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="w-10 h-10 flex items-center justify-center text-ink-3 hover:bg-surface-2 transition-colors">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 btn py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-1.5 ${
                  added ? "bg-green-600 text-white" : "bg-ink text-surface hover:bg-ink-2"
                } ${product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <ShoppingCart size={18} />
                {added ? "Added to Cart!" : isInCart(prodId) ? "In Cart" : "Add to Cart"}
              </button>
              <button
                onClick={() => toggle(product)}
                className={`btn-icon w-12 h-12 border rounded-xl flex items-center justify-center transition-all ${
                  isWishlisted(prodId) ? "bg-ink text-surface border-ink" : "border-surface-4 hover:border-ink"
                }`}
              >
                <Heart size={18} fill={isWishlisted(prodId) ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Delivery perks */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: Truck, text: "Free delivery over ₹999" },
                { icon: Shield, text: "100% authentic" },
                { icon: RotateCcw, text: "30-day returns" },
                { icon: Package, text: "Secure packaging" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-ink-3">
                  <Icon size={13} className="text-ink-4 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16 border-b border-surface-4">
          <div className="flex gap-0">
            {[
              { id: "description", label: "Description" },
              { id: "specs", label: "Specifications" },
              { id: "reviews", label: "Reviews" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-ink text-ink"
                    : "border-transparent text-ink-4 hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="py-8 max-w-2xl">
          {activeTab === "description" && (
            <div className="prose prose-sm text-ink-2 leading-relaxed">
              <p className="text-base">{product.description}</p>
              {product.tags && product.tags.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {product.tags.map((tag) => (
                    <li key={tag} className="flex items-center gap-2 text-sm text-ink-3">
                      <span className="w-1.5 h-1.5 bg-ink rounded-full flex-shrink-0" />
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {activeTab === "specs" && product.specs && (
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specs).map(([key, val]) => (
                  <tr key={key} className="border-b border-surface-4">
                    <td className="py-3 pr-6 text-ink-4 capitalize w-40">{key.replace(/([A-Z])/g, " $1")}</td>
                    <td className="py-3 text-ink font-medium">{Array.isArray(val) ? val.join(", ") : String(val)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              {[4.9, 4.5, 5.0].map((r, i) => (
                <div key={i} className="pb-6 border-b border-surface-4 last:border-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-surface-3 rounded-full flex items-center justify-center text-xs font-semibold text-ink">
                      {["AR", "SK", "PM"][i]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{["Arjun R.", "Sahil K.", "Priya M."][i]}</p>
                      <div className="flex gap-0.5 mt-0.5">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} size={11} className={s < Math.floor(r) ? "text-amber-400 fill-amber-400" : "text-surface-4 fill-surface-4"} />
                        ))}
                      </div>
                    </div>
                    <span className="ml-auto text-xs text-ink-4">Verified Purchase</span>
                  </div>
                  <p className="text-sm text-ink-3 leading-relaxed">
                    {["Great product! Excellent quality, mixes well, and tastes amazing. Will definitely buy again.", "Been using this for 3 months now. Noticeable difference in performance. Highly recommend!", "Best purchase I've made this year. Fast delivery, genuine product, great results."][i]}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-ink mb-8">Related Products</h2>
            <ProductGrid products={related} columns={4} />
          </div>
        )}
      </div>
    </div>
  );
}
