import { brands } from "../../data/categories";

export default function BrandsSection() {
  const brandLogos = [
    { name: "Optimum Nutrition", abbr: "ON" },
    { name: "Myprotein", abbr: "MP" },
    { name: "Gymshark", abbr: "GS" },
    { name: "Cellucor", abbr: "C4" },
    { name: "Dymatize", abbr: "DY" },
    { name: "Nike", abbr: "NK" },
    { name: "Lululemon", abbr: "LL" },
    { name: "Rogue", abbr: "RG" },
    { name: "MuscleTech", abbr: "MT" },
    { name: "BSN", abbr: "BSN" },
  ];

  return (
    <section className="py-12 bg-dark border-y border-dark-4">
      <div className="container-base">
        <p className="text-center text-xs font-semibold text-ink-4 uppercase tracking-widest mb-8">
          Official Partner Brands
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
          {brandLogos.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-200"
            >
              <div className="w-8 h-8 rounded-lg bg-dark-3 border border-dark-4 flex items-center justify-center">
                <span className="text-surface font-display font-bold text-xs">{brand.abbr}</span>
              </div>
              <span className="text-surface font-medium text-sm hidden sm:block">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
