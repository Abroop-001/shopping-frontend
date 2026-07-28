import HeroSection from "../components/home/HeroSection";
import CategoryGrid from "../components/home/CategoryGrid";
import ProductSection from "../components/home/ProductSection";
import Testimonials from "../components/home/Testimonials";
import BrandsSection from "../components/home/BrandsSection";
import FeatureStrip from "../components/home/FeatureStrip";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureStrip />
      <CategoryGrid />
      <ProductSection />
      <BrandsSection />

      {/* Promo Banner */}
      <section className="section-padding bg-ink">
        <div className="container-base">
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=1600&q=80"
              alt="Fitness Banner"
              className="w-full h-72 sm:h-96 object-cover opacity-40"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <span className="badge-new mb-4">Limited Time Offer</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-surface mb-4 max-w-lg">
                Up to 30% off on Protein Supplements
              </h2>
              <p className="text-ink-4 mb-8 max-w-md">
                Shop our premium protein range and save big. Offer valid for a limited time only.
              </p>
              <Link to="/categories/protein" className="btn-accent px-8 py-3.5 rounded-xl font-bold">
                Shop Protein <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA Newsletter (already in footer, but here's an inline version) */}
      <section className="py-20 bg-surface-2">
        <div className="container-base text-center">
          <p className="text-xs font-semibold text-ink-4 uppercase tracking-widest mb-3">Stay Updated</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-4">
            Get Expert Fitness Tips
          </h2>
          <p className="text-ink-4 mb-8 max-w-md mx-auto">
            Join 50,000+ athletes getting weekly training guides, supplement science, and exclusive deals.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="input-base flex-1"
            />
            <button type="submit" className="btn-primary rounded-lg whitespace-nowrap">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-ink-4 mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  );
}
