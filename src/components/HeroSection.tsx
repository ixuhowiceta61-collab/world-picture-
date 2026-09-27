import React from 'react';
import { ArrowDown, Sparkles, Compass } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onExhibitionClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onExhibitionClick,
}) => {
  return (
    <section className="relative w-full min-h-[92vh] flex items-end pb-20 md:pb-24 overflow-hidden">
      {/* Background Media with Zero-Broken fallback */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_serene_landscape_1790534169506.jpg"
          alt="Serene alpine mountain mist at sunrise"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Measured scrim overlay for legible contrast across all luminance */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/45 to-stone-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-transparent to-stone-950/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="max-w-3xl">
          {/* Natural human editorial kicker */}
          <div className="inline-flex items-center gap-2 text-stone-300 text-xs sm:text-sm tracking-widest uppercase font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Online Sanctuary for Contemplative Art</span>
            <span aria-hidden="true">·</span>
            <span>Curated Edition 2025–2026</span>
          </div>

          {/* Large elegant title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.08] mb-6 text-balance">
            Aura Gallery
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-stone-200 font-light mb-6 tracking-wide">
            Discover the Beauty of Art & Nature
          </p>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light max-w-2xl mb-9">
            An open digital haven honoring the tranquil rhythm of ancient forests,
            emerald ocean swells, silent mountain ridges, and harmonious organic forms.
            Step into peace.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium bg-stone-100 text-stone-900 hover:bg-white hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-98"
            >
              <span>Explore Gallery</span>
              <ArrowDown className="w-4 h-4 text-stone-600" />
            </button>

            <button
              onClick={onExhibitionClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-stone-200 bg-stone-900/60 hover:bg-stone-900/80 hover:text-white border border-stone-700/60 backdrop-blur-xs transition-all duration-200 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Quiet Horizons Exhibition</span>
            </button>
          </div>
        </div>

        {/* Quiet corner credit */}
        <div className="mt-12 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between text-xs text-stone-400 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-stone-300 font-medium">Hero Artwork:</span>
            <span>Serenity at Dawn: Alpine Mist</span>
            <span aria-hidden="true">·</span>
            <span>Elena Rostova</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Valais Alps, Switzerland</span>
            <span aria-hidden="true">·</span>
            <span>100MP Pigment Print</span>
          </div>
        </div>
      </div>
    </section>
  );
};
