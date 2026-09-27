import React from 'react';
import { Search, X, Sparkles, Compass, ArrowDown } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onExploreClick: () => void;
  onCategoriesClick: () => void;
  darkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onExploreClick,
  onCategoriesClick,
  darkMode,
}) => {
  const quickSearches = [
    'Tiger',
    'Cat',
    'Dog',
    'Car',
    'Sunset',
    'Mountain',
    'Ocean',
    'Space',
    'Coffee',
    'Portrait',
  ];

  return (
    <section id="hero" className="relative w-full min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden select-none">
      {/* Background Hero Media with Unsplash Nature/Landscape */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=85"
          alt="Cathedral of El Capitan Yosemite at sunrise"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          loading="eager"
        />
        {/* Scrim overlays for pure high-contrast typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-stone-900/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-stone-950/30 to-stone-950/70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 w-full text-center flex flex-col items-center">
        
        {/* Subtle badge / kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-stone-200 border border-white/20 backdrop-blur-md text-xs tracking-widest uppercase font-medium mb-5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>The World's High-Resolution Visual Gallery</span>
        </div>

        {/* Large title: "World Picture" */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif text-white tracking-tight leading-[1.05] mb-4">
          World Picture
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-2xl font-serif italic text-amber-200/90 font-light mb-8 tracking-wide max-w-2xl text-balance">
          Explore the Most Beautiful Pictures from Around the World
        </p>

        {/* BIG BEAUTIFUL LIVE SEARCH BAR */}
        <div className="w-full max-w-2xl relative mb-6">
          <div className="relative flex items-center shadow-2xl rounded-full bg-stone-900/90 dark:bg-stone-900/95 border-2 border-amber-400/80 backdrop-blur-xl p-1.5 focus-within:border-amber-300 focus-within:shadow-[0_0_35px_rgba(245,158,11,0.35)] transition-all">
            <div className="pl-4 pr-2 text-amber-400">
              <Search className="w-5 h-5 stroke-[2.2]" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
              }}
              placeholder="Search anything: cat, car, tiger, sunset, ocean, space..."
              className="w-full py-3 pr-10 bg-transparent text-sm sm:text-base text-white placeholder-stone-400 focus:outline-none font-medium"
            />

            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="p-2 text-stone-400 hover:text-white transition-colors cursor-pointer mr-2"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onExploreClick}
              className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer shadow-md shrink-0 active:scale-98"
            >
              Search
            </button>
          </div>
        </div>

        {/* Quick Search Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-xl mb-8">
          <span className="text-[11px] font-mono text-stone-400 mr-1 uppercase">
            Trending:
          </span>
          {quickSearches.map((term) => (
            <button
              key={term}
              onClick={() => {
                onSearchChange(term);
                onExploreClick();
              }}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 hover:bg-amber-500 hover:text-stone-950 text-stone-200 border border-white/15 backdrop-blur-xs transition-all duration-150 cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-stone-100 hover:bg-white text-stone-950 transition-all duration-200 cursor-pointer shadow-md active:scale-98"
          >
            <span>Explore Full Gallery</span>
            <ArrowDown className="w-4 h-4 text-amber-600" />
          </button>

          <button
            onClick={onCategoriesClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-stone-200 bg-stone-900/70 hover:bg-stone-900 hover:text-white border border-stone-700/80 backdrop-blur-md transition-all duration-200 cursor-pointer active:scale-98"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Browse 11 Categories</span>
          </button>
        </div>

      </div>
    </section>
  );
};
