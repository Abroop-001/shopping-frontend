import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductGrid from "../product/ProductGrid";
import { useState, useEffect } from "react";
import api from "../../utils/api";

const TABS = [
  { id: "featured", label: "Featured" },
  { id: "bestsellers", label: "Best Sellers" },
  { id: "new", label: "New Arrivals" },
];

export default function ProductSection() {
  const [activeTab, setActiveTab] = useState("featured");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let endpoint = "/products?limit=8";
        if (activeTab === "featured") {
          endpoint = "/products?featured=true&limit=8";
        } else if (activeTab === "bestsellers") {
          endpoint = "/products?sort=rating&limit=8";
        } else if (activeTab === "new") {
          endpoint = "/products?sort=newest&limit=8";
        }
        const res = await api.get(endpoint);
        if (res.success) {
          setProducts(res.products);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeTab]);

  return (
    <section className="section-padding bg-surface-2">
      <div className="container-base">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold text-ink-4 uppercase tracking-widest mb-2">Products</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink">Our Selection</h2>
          </div>
          {/* Tabs */}
          <div className="flex bg-surface rounded-xl p-1 border border-surface-4 self-start sm:self-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-ink text-surface shadow-sm"
                    : "text-ink-3 hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <span className="w-8 h-8 border-4 border-ink/30 border-t-ink rounded-full animate-spin inline-block" />
          </div>
        ) : (
          <ProductGrid products={products} columns={4} />
        )}

        <div className="mt-10 text-center">
          <Link to="/products" className="btn-outline px-8 py-3 rounded-xl inline-flex items-center gap-2">
            View All Products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
