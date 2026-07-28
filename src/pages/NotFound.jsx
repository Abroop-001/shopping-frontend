import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-surface">
      <div className="mb-6 relative">
        <h1 className="font-display text-8xl sm:text-9xl font-bold text-ink-5 opacity-40 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl sm:text-6xl animate-bounce">🏋️‍♂️</span>
        </div>
      </div>
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-3">
        Page Lost Its Gains
      </h2>
      <p className="text-ink-4 text-sm sm:text-base mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/" className="btn-primary px-8 py-3 rounded-xl font-semibold flex items-center gap-2">
          <ArrowLeft size={16} /> Return Home
        </Link>
        <Link to="/products" className="btn-outline px-8 py-3 rounded-xl font-semibold flex items-center gap-2">
          <RefreshCw size={16} /> Browse Products
        </Link>
      </div>

      {/* Suggested categories links */}
      <div className="mt-12 pt-8 border-t border-surface-4 w-full max-w-lg">
        <p className="text-xs font-semibold text-ink-4 uppercase tracking-widest mb-4">Popular Links</p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { name: "Proteins", to: "/categories/protein" },
            { name: "Pre-Workouts", to: "/categories/pre-workout" },
            { name: "Creatine", to: "/categories/creatine" },
            { name: "Gym Accessories", to: "/categories/accessories" },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="text-xs font-medium text-ink-3 hover:text-ink bg-surface-2 border border-surface-4 rounded-lg px-3.5 py-1.5 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
