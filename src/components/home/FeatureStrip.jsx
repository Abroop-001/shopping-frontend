import { Link } from "react-router-dom";
import { ArrowRight, Shield, Truck, RotateCcw, Headphones } from "lucide-react";

const perks = [
  { icon: Truck, title: "Free Delivery", desc: "On orders over ₹999" },
  { icon: Shield, title: "100% Authentic", desc: "Genuine products guaranteed" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day hassle-free returns" },
  { icon: Headphones, title: "Expert Support", desc: "7 days a week, 9am–9pm" },
];

export default function FeatureStrip() {
  return (
    <section className="bg-surface-2 border-y border-surface-4">
      <div className="container-base py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {perks.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-10 h-10 bg-ink rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{title}</p>
                <p className="text-xs text-ink-4 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
