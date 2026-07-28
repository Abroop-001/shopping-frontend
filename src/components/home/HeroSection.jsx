import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] bg-dark overflow-hidden flex items-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80')",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent" />

      <div className="container-base relative z-10 py-24">
        <div className="max-w-2xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-dark-3 border border-dark-4 text-surface text-xs font-medium px-3 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            New Collection 2025
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-surface leading-none mb-6">
            Train
            <span className="block text-accent">Without</span>
            Limits.
          </h1>

          <p className="text-ink-4 text-lg leading-relaxed mb-10 max-w-lg">
            Premium fitness supplements, performance apparel, and professional equipment — everything an athlete needs, in one place.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="btn-accent px-7 py-3.5 text-base font-bold rounded-xl"
            >
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link
              to="/categories"
              className="btn px-7 py-3.5 text-base border border-dark-4 text-surface hover:bg-dark-3 rounded-xl transition-colors"
            >
              Browse Categories
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-14">
            {[
              { value: "80+", label: "Products" },
              { value: "8", label: "Categories" },
              { value: "50k+", label: "Happy Customers" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-surface">{stat.value}</p>
                <p className="text-ink-4 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-ink-4 animate-bounce">
        <span className="text-xs">Scroll</span>
        <ChevronDown size={16} />
      </div>
    </section>
  );
}
