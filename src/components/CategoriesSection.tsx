import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/picturesData';
import { CategoryType } from '../types';

interface CategoriesSectionProps {
  onSelectCategory: (category: CategoryType) => void;
  darkMode: boolean;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
  darkMode,
}) => {
  return (
    <section id="categories" className="w-full py-16 px-6 sm:px-8 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-1 block">
            Curated Horizons
          </span>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight ${
              darkMode ? 'text-stone-100' : 'text-stone-900'
            }`}
          >
            Explore 11 Photography Domains
          </h2>
        </div>
        <p
          className={`text-xs sm:text-sm max-w-md font-light ${
            darkMode ? 'text-stone-400' : 'text-stone-600'
          }`}
        >
          From the depths of cosmic nebulae and high-speed supercars to serene feline portraits 
          and alpine ridges. Click any domain to instantly filter the collection.
        </p>
      </div>

      {/* Categories Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {CATEGORIES_DATA.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`group relative h-56 sm:h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border ${
              darkMode ? 'border-stone-800' : 'border-stone-200'
            }`}
          >
            {/* Background image */}
            <img
              src={cat.coverImage}
              alt={cat.label}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/40 to-stone-950/15 group-hover:from-stone-950 transition-colors duration-300" />

            {/* Card Top Pill */}
            <div className="absolute top-3 right-3">
              <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-stone-950">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Card Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col justify-end text-white">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 mb-1">
                {cat.itemCount}+ Photographs
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-bold tracking-wide mb-1 group-hover:text-amber-200 transition-colors">
                {cat.label}
              </h3>
              <p className="text-[11px] text-stone-300 leading-snug font-light line-clamp-1 opacity-80 group-hover:opacity-100">
                {cat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
