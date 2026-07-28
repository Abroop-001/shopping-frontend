import React from 'react';
import { Shield, Sparkles, Heart, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="relative bg-dark py-24 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1600&q=80')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
        <div className="container-base relative z-10">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Our Story</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-surface mb-6">
            Engineered for <span className="text-accent">Elite</span> Performance
          </h1>
          <p className="text-ink-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            FitZone Pro was founded in 2024 with a simple mission: to provide athletes with premium, pure, and scientifically-backed fitness essentials that actually deliver results.
          </p>
        </div>
      </section>

      {/* Mission & Philosophy */}
      <section className="section-padding bg-surface-2">
        <div className="container-base grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-ink mb-6">We Refuse to Settle for Ordinary</h2>
            <p className="text-ink-3 mb-4 leading-relaxed">
              In an industry filled with overhyped marketing, proprietary blends, and low-quality fillers, we set out to build a brand rooted in truth. We believe that what you put into your body matters just as much as the effort you put into your workouts.
            </p>
            <p className="text-ink-3 mb-6 leading-relaxed">
              Whether you are a professional powerlifter, a dedicated runner, a weekend warrior, or someone just starting their wellness journey, we design every supplement, apparel piece, and accessory to exceed industry standards.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-display text-3xl font-bold text-ink">100%</p>
                <p className="text-xs text-ink-4 mt-1">Authentic Ingredients</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-ink">3rd-Party</p>
                <p className="text-xs text-ink-4 mt-1">Lab Tested & Certified</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
              <img src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80" alt="Athletes training" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-accent text-ink p-6 rounded-2xl shadow-card hidden sm:block max-w-xs">
              <p className="font-semibold text-sm">"Fueling the champions of today and the legends of tomorrow."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-surface">
        <div className="container-base">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-ink-4 uppercase tracking-widest mb-2">Our Values</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink">What Drives Us Forward</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Uncompromising Quality", desc: "No proprietary blends. Full transparency labels with ingredients sourced from world-class suppliers." },
              { icon: Sparkles, title: "Scientific Integrity", desc: "We design supplements based on clinically tested dosages and solid nutritional research." },
              { icon: Heart, title: "Customer First", desc: "From lightning-fast shipping to seamless returns, we support you through every step of your fitness journey." },
              { icon: Award, title: "Elite Durability", desc: "Our gym gear and equipment are field-tested to withstand the toughest workouts and daily abuse." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-base p-6 hover:shadow-card-hover transition-all duration-300">
                <div className="w-12 h-12 bg-surface-2 rounded-xl flex items-center justify-center mb-5 text-ink">
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-ink mb-3">{title}</h3>
                <p className="text-xs text-ink-4 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Certifications */}
      <section className="section-padding bg-surface-2 border-t border-surface-4">
        <div className="container-base text-center max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-ink mb-6">Our Quality Guarantee</h2>
          <p className="text-ink-3 mb-8">
            All our protein supplements, pre-workouts, and vitamins are manufactured in state-of-the-art, GMP-certified, and FDA-registered facilities. We publish third-party lab results for every batch to ensure you get exactly what you pay for.
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
            {["GMP CERTIFIED", "FDA REGISTERED FACILITY", "GLUTEN FREE", "NON GMO"].map((cert) => (
              <span key={cert} className="text-xs font-bold tracking-widest text-ink-3 border border-ink-5 rounded-md px-3 py-1">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
