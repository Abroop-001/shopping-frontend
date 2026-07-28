import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { categories } from "../data/categories";
import ProductGrid from "../components/product/ProductGrid";
import api from "../utils/api";

export default function CategoryDetail() {
  const { slug } = useParams();
  const cat = categories.find((c) => c.slug === slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products?category=${slug}`);
        if (res.success) {
          setProducts(res.products);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCategoryProducts();
  }, [slug]);

  if (!cat) {
    return (
      <div className="container-base py-24 text-center">
        <h2 className="font-display text-2xl font-bold mb-4">Category not found</h2>
        <Link to="/categories" className="btn-primary inline-block px-6 py-2.5 rounded-lg">Browse Categories</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Banner */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-base pb-8">
          <p className="text-ink-4 text-xs mb-2">
            <Link to="/categories" className="hover:text-surface transition-colors">Categories</Link>
            {" / "}
            <span className="text-surface">{cat.name}</span>
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-surface">{cat.name}</h1>
          <p className="text-ink-4 mt-2 text-sm">{cat.description}</p>
        </div>
      </div>

      <div className="container-base py-10">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-ink-4">{products.length} products</p>
        </div>
        {loading ? (
          <div className="py-12 text-center">
            <span className="w-8 h-8 border-4 border-ink/30 border-t-ink rounded-full animate-spin inline-block" />
          </div>
        ) : (
          <ProductGrid products={products} columns={4} />
        )}
      </div>
    </div>
  );
}
