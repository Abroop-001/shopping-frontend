import { Star, Quote } from "lucide-react";
import { testimonials } from "../../data/testimonials";

export default function Testimonials() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-base">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-ink-4 uppercase tracking-widest mb-2">Reviews</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink">What Athletes Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="card-base p-6 flex flex-col gap-4 hover:shadow-card-hover transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < t.rating ? "text-amber-400 fill-amber-400" : "text-surface-4 fill-surface-4"} />
                  ))}
                </div>
                <Quote size={20} className="text-surface-4" />
              </div>
              <p className="text-sm text-ink-3 leading-relaxed flex-1 italic">"{t.review}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-surface-4">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-ink-4">{t.role}</p>
                </div>
                {t.verified && (
                  <span className="ml-auto badge bg-surface-2 text-ink-4">Verified</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
