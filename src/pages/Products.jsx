import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { categories } from "../data/categories";
import ProductGrid from "../components/product/ProductGrid";
import api from "../utils/api";

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rated" },
  { value: "newest", label: "Newest First" },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [total, setTotal] = useState(0);

  const searchQuery = searchParams.get("search") || "";
  const filterParam = searchParams.get("filter") || "";

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        let endpoint = `/products?page=${page}&limit=12`;

        if (searchQuery) {
          endpoint += `&search=${encodeURIComponent(searchQuery)}`;
        }

        if (filterParam === "new") {
          endpoint += `&featured=true`;
        } else if (filterParam === "bestseller") {
          endpoint += `&sort=rating`;
        }

        if (selectedCategories.length > 0) {
          endpoint += `&category=${selectedCategories[0]}`;
        }

        if (priceRange[1] < 100000) {
          endpoint += `&maxPrice=${priceRange[1]}`;
        }

        if (sort !== "default") {
          endpoint += `&sort=${sort}`;
        }

        const res = await api.get(endpoint);
        if (res.success) {
          setProducts(res.products);
          setTotal(res.total || res.count);
          setPagesCount(res.pages || 1);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [searchQuery, filterParam, selectedCategories, priceRange, sort, page]);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? [] : [cat]
    );
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 100000]);
    setSort("default");
    setPage(1);
    setSearchParams({});
  };

  const hasFilters = selectedCategories.length > 0 || searchQuery || filterParam || priceRange[1] < 100000;

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="border-b border-surface-4 bg-surface sticky top-16 z-30">
        <div className="container-base py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl font-bold text-ink">
              {searchQuery ? `Results for "${searchQuery}"` : filterParam === "new" ? "New Arrivals" : filterParam === "bestseller" ? "Best Sellers" : "All Products"}
            </h1>
            <p className="text-xs text-ink-4 mt-0.5">{total} products</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value); setPage(1); }}
                className="appearance-none input-base pr-8 py-2 text-sm cursor-pointer bg-surface"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-4 pointer-events-none" />
            </div>
            {/* Filter toggle */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`btn-outline py-2 px-4 text-sm flex items-center gap-2 ${filtersOpen ? "bg-ink text-surface border-ink" : ""}`}
            >
              <SlidersHorizontal size={15} /> Filters
              {hasFilters && <span className="w-2 h-2 bg-accent rounded-full" />}
            </button>
          </div>
        </div>
      </div>

      <div className="container-base py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {filtersOpen && (
            <aside className="w-60 flex-shrink-0 animate-slideDown">
              <div className="sticky top-36 space-y-6">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm text-ink">Filters</p>
                  {hasFilters && (
                    <button onClick={clearFilters} className="text-xs text-ink-3 hover:text-ink flex items-center gap-1">
                      <X size={12} /> Clear all
                    </button>
                  )}
                </div>

                {/* Categories */}
                <div>
                  <p className="text-xs font-semibold text-ink-4 uppercase tracking-wider mb-3">Category</p>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.id)}
                          onChange={() => toggleCategory(cat.id)}
                          className="w-4 h-4 rounded border-surface-4 accent-ink"
                        />
                        <span className="text-sm text-ink-2 group-hover:text-ink transition-colors">
                          {cat.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <p className="text-xs font-semibold text-ink-4 uppercase tracking-wider mb-3">
                    Price Range
                  </p>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) => { setPriceRange([0, Number(e.target.value)]); setPage(1); }}
                      className="w-full accent-ink"
                    />
                    <div className="flex justify-between text-xs text-ink-4">
                      <span>₹0</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Products */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="py-24 text-center">
                <span className="w-8 h-8 border-4 border-ink/30 border-t-ink rounded-full animate-spin inline-block" />
              </div>
            ) : (
              <>
                <ProductGrid products={products} columns={filtersOpen ? 3 : 4} />

                {/* Pagination */}
                {pagesCount > 1 && (
                  <div className="mt-12 flex justify-center items-center gap-4">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                      className="btn-outline px-4 py-2 text-sm disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <span className="text-sm font-semibold text-ink">
                      Page {page} of {pagesCount}
                    </span>
                    <button
                      disabled={page === pagesCount}
                      onClick={() => setPage((prev) => Math.min(pagesCount, prev + 1))}
                      className="btn-outline px-4 py-2 text-sm disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
