import React from 'react';
import { Search, X, SlidersHorizontal, Grid3X3, Columns2 } from 'lucide-react';
import { CATEGORIES } from '../data/artworks';
import { Category } from '../types/gallery';

interface FilterBarProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'grid' | 'spacious';
  onToggleViewMode: (mode: 'grid' | 'spacious') => void;
  sortBy: 'curated' | 'likes' | 'title';
  onSortChange: (sort: 'curated' | 'likes' | 'title') => void;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  viewMode,
  onToggleViewMode,
  sortBy,
  onSortChange,
  totalResults,
}) => {
  return (
    <div className="w-full bg-[#FAF9F5] border-y border-stone-200/80 sticky top-[57px] md:top-[65px] z-30 py-3 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Category Tabs (Functional buttons with active background) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as Category)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium ${
                  isActive
                    ? 'bg-stone-900 text-stone-50 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`ml-1.5 text-[10px] font-mono ${
                    isActive ? 'text-stone-300' : 'text-stone-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search, Sort & View controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search Box */}
          <div className="relative flex-1 md:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search nature, artist..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-7 py-1.5 bg-stone-100 hover:bg-stone-200/60 focus:bg-white text-xs rounded-full border border-stone-200 focus:outline-none focus:ring-1 focus:ring-stone-400 text-stone-800 placeholder-stone-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'curated' | 'likes' | 'title')}
            className="text-xs bg-stone-100 border border-stone-200 text-stone-700 py-1.5 px-3 rounded-full focus:outline-none focus:ring-1 focus:ring-stone-400 cursor-pointer"
          >
            <option value="curated">Curated Order</option>
            <option value="likes">Most Admired</option>
            <option value="title">Alphabetical</option>
          </select>

          {/* Layout density toggle */}
          <div className="hidden sm:flex items-center bg-stone-100 p-0.5 rounded-full border border-stone-200">
            <button
              onClick={() => onToggleViewMode('grid')}
              title="Compact Bento Grid"
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onToggleViewMode('spacious')}
              title="Editorial Spacious Flow"
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                viewMode === 'spacious' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              <Columns2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
