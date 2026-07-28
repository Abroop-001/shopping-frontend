import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "../../data/categories";

export default function CategoryGrid() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-base">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-ink-4 uppercase tracking-widest mb-2">Collections</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink">Shop by Category</h2>
          </div>
          <Link to="/categories" className="btn-ghost text-ink-3 hidden sm:flex items-center gap-1.5">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/categories/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-dark"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xl mb-0.5">{cat.icon}</p>
                <h3 className="font-display font-bold text-surface text-sm leading-tight">{cat.name}</h3>
                <p className="text-ink-4 text-xs mt-0.5">{cat.productCount} products</p>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <ArrowRight size={14} className="text-ink" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
