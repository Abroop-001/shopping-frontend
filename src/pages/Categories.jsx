import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "../data/categories";

export default function Categories() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-dark py-16 text-center">
        <p className="text-xs font-semibold text-ink-4 uppercase tracking-widest mb-3">Shop</p>
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-surface">All Categories</h1>
        <p className="text-ink-4 mt-4 max-w-md mx-auto">
          Everything you need for peak performance — supplements, gear, apparel, and equipment.
        </p>
      </div>

      <div className="container-base py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/categories/${cat.slug}`}
              className="group card-base overflow-hidden hover:shadow-card-hover"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-2xl">{cat.icon}</span>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-lg font-bold text-ink mb-1">{cat.name}</h2>
                  <p className="text-xs text-ink-4">{cat.description}</p>
                  <p className="text-xs font-medium text-ink-3 mt-2">{cat.productCount} products</p>
                </div>
                <div className="w-9 h-9 rounded-full border border-surface-4 flex items-center justify-center group-hover:bg-ink group-hover:border-ink group-hover:text-surface transition-all duration-200 text-ink-3">
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
