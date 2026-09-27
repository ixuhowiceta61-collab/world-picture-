import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Heart, 
  Download, 
  Share2, 
  Copy, 
  Maximize2, 
  SlidersHorizontal,
  Layers,
  ArrowDown,
  Sparkles,
  Camera,
  Compass,
  Check
} from 'lucide-react';
import { PictureItem, CategoryType } from '../types';

interface MainGalleryProps {
  pictures: PictureItem[];
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  onOpenLightbox: (picture: PictureItem) => void;
  onShare: (picture: PictureItem, e: React.MouseEvent) => void;
  onCopyLink: (link: string, e: React.MouseEvent) => void;
  onDownload: (picture: PictureItem, e: React.MouseEvent) => void;
  showFavoritesOnly: boolean;
  onToggleShowFavoritesOnly: () => void;
  darkMode: boolean;
}

export const MainGallery: React.FC<MainGalleryProps> = ({
  pictures,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  favorites,
  onToggleFavorite,
  onOpenLightbox,
  onShare,
  onCopyLink,
  onDownload,
  showFavoritesOnly,
  onToggleShowFavoritesOnly,
  darkMode,
}) => {
  const [visibleCount, setVisibleCount] = useState<number>(15);

  const categoriesList: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'All Pictures' },
    { id: 'nature', label: 'Nature' },
    { id: 'animals', label: 'Animals' },
    { id: 'people', label: 'People' },
    { id: 'cars', label: 'Cars' },
    { id: 'art', label: 'Art' },
    { id: 'abstract', label: 'Abstract' },
    { id: 'ocean', label: 'Ocean' },
    { id: 'mountains', label: 'Mountains' },
    { id: 'food', label: 'Food' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'space', label: 'Space' },
  ];

  // Live filter & search algorithm
  const filteredPictures = useMemo(() => {
    const cleanQ = searchQuery.trim().toLowerCase();

    return pictures.filter((item) => {
      // Favorites filter
      if (showFavoritesOnly && !favorites.includes(item.id)) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search keyword filter
      if (cleanQ) {
        const matchesTitle = item.title.toLowerCase().includes(cleanQ);
        const matchesPhotographer = item.photographer.toLowerCase().includes(cleanQ);
        const matchesLocation = item.location.toLowerCase().includes(cleanQ);
        const matchesCategory = item.categoryLabel.toLowerCase().includes(cleanQ);
        const matchesDescription = item.description.toLowerCase().includes(cleanQ);
        const matchesTags = item.tags.some(
          (t) => t.toLowerCase().includes(cleanQ) || cleanQ.includes(t.toLowerCase())
        );
        return matchesTitle || matchesPhotographer || matchesLocation || matchesCategory || matchesDescription || matchesTags;
      }
      return true;
    });
  }, [pictures, selectedCategory, searchQuery, showFavoritesOnly, favorites]);

  const displayedPictures = filteredPictures.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPictures.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section id="gallery" className="w-full py-16 px-6 sm:px-8 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Top Filter and Search Bar Section */}
      <div className="flex flex-col gap-6 mb-8">
        
        {/* Gallery Title & Live Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-1 block">
              {showFavoritesOnly ? 'Personal Collection' : 'Live Searchable Gallery'}
            </span>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight ${
                darkMode ? 'text-stone-100' : 'text-stone-900'
              }`}
            >
              {showFavoritesOnly ? 'Saved Favorites' : 'The Global Picture Collection'}
            </h2>
          </div>

          {/* Secondary Live Search Input in Gallery */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              id="gallery-search"
              placeholder="Live filter by keyword..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`w-full pl-10 pr-9 py-2.5 rounded-full text-xs transition-all border outline-none font-medium ${
                darkMode
                  ? 'bg-stone-900 border-stone-800 text-stone-100 placeholder-stone-500 focus:border-amber-400'
                  : 'bg-stone-100 border-stone-200 text-stone-900 placeholder-stone-400 focus:border-stone-400 focus:bg-white'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
                title="Clear filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-y py-3.5 border-stone-200 dark:border-stone-800">
          
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categoriesList.map((cat) => {
              const isActive = !showFavoritesOnly && selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (showFavoritesOnly) onToggleShowFavoritesOnly();
                    onSelectCategory(cat.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-semibold shadow-xs'
                      : darkMode
                      ? 'bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-950'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Show Favorites Only Switch */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleShowFavoritesOnly}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                showFavoritesOnly
                  ? 'bg-rose-500 text-white shadow-xs'
                  : darkMode
                  ? 'bg-stone-900 border border-stone-800 text-stone-300 hover:text-white'
                  : 'bg-stone-100 border border-stone-200 text-stone-700 hover:text-stone-950'
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  showFavoritesOnly ? 'fill-white text-white' : 'text-rose-500'
                }`}
              />
              <span>Favorites</span>
              <span className="font-mono text-[11px] opacity-80">
                ({favorites.length})
              </span>
            </button>
          </div>
        </div>

        {/* Active Filter Status Bar */}
        {(searchQuery || selectedCategory !== 'all' || showFavoritesOnly) && (
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 -mt-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span>Showing <strong>{filteredPictures.length}</strong> photographs</span>
              {searchQuery && (
                <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-500 font-medium">
                  Keyword: &quot;{searchQuery}&quot;
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                  Category: {selectedCategory}
                </span>
              )}
            </div>

            <button
              onClick={() => {
                onSearchChange('');
                onSelectCategory('all');
                if (showFavoritesOnly) onToggleShowFavoritesOnly();
              }}
              className="text-amber-500 hover:underline cursor-pointer font-medium"
            >
              Reset all filters
            </button>
          </div>
        )}

      </div>

      {/* Gallery Empty State */}
      {displayedPictures.length === 0 ? (
        <div
          className={`w-full py-24 text-center rounded-3xl border ${
            darkMode ? 'bg-stone-900/50 border-stone-800' : 'bg-stone-50 border-stone-200'
          }`}
        >
          <Layers className="w-12 h-12 text-stone-400 mx-auto mb-4 stroke-1" />
          <h3 className="text-xl font-serif text-stone-800 dark:text-stone-200 mb-2">
            No photographs found for &quot;{searchQuery}&quot;
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto mb-6">
            Try searching for terms like <strong>tiger</strong>, <strong>cat</strong>, <strong>dog</strong>, <strong>car</strong>, <strong>mountain</strong>, <strong>sunset</strong>, or <strong>ocean</strong>.
          </p>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => {
                onSearchChange('');
                onSelectCategory('all');
                if (showFavoritesOnly) onToggleShowFavoritesOnly();
              }}
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Clear Search & Show All
            </button>
          </div>
        </div>
      ) : (
        /* Responsive Masonry Grid (CSS Columns / Grid for natural photo variations) */
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {displayedPictures.map((picture) => {
            const isFav = favorites.includes(picture.id);

            return (
              <div
                key={picture.id}
                onClick={() => onOpenLightbox(picture)}
                className={`group relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer shadow-sm transition-all duration-300 hover:shadow-2xl border ${
                  darkMode ? 'bg-stone-900 border-stone-800/80' : 'bg-white border-stone-200/80'
                }`}
              >
                {/* Visual Asset */}
                <div className="relative overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img
                    src={picture.imageUrl}
                    alt={picture.title}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Soft Vignette Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-stone-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Top quick actions */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => onToggleFavorite(picture.id, e)}
                      title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                      className="p-2 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white backdrop-blur-md shadow-sm transition-transform active:scale-95 cursor-pointer border border-white/20"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-colors ${
                          isFav ? 'fill-rose-500 text-rose-500' : 'text-white'
                        }`}
                      />
                    </button>

                    {/* Copy Link Button */}
                    <button
                      onClick={(e) => onCopyLink(picture.imageUrl, e)}
                      title="Copy link"
                      className="p-2 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white backdrop-blur-md shadow-sm transition-transform active:scale-95 cursor-pointer border border-white/20"
                    >
                      <Copy className="w-3.5 h-3.5 text-stone-200 hover:text-amber-400" />
                    </button>

                    {/* Share Button */}
                    <button
                      onClick={(e) => onShare(picture, e)}
                      title="Share picture"
                      className="p-2 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white backdrop-blur-md shadow-sm transition-transform active:scale-95 cursor-pointer border border-white/20"
                    >
                      <Share2 className="w-3.5 h-3.5 text-stone-200 hover:text-amber-400" />
                    </button>

                    {/* Download Button */}
                    <button
                      onClick={(e) => onDownload(picture, e)}
                      title="Download high-resolution image"
                      className="p-2 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 backdrop-blur-md shadow-sm transition-transform active:scale-95 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 stroke-[2.2]" />
                    </button>
                  </div>

                  {/* Hover Bottom Preview Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-stone-950/80 text-amber-300 backdrop-blur-md border border-white/20">
                      <Maximize2 className="w-3 h-3 text-amber-400" />
                      <span>Open High-Resolution Lightbox</span>
                    </span>
                  </div>
                </div>

                {/* Card Content Footer */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 mb-1.5 font-mono">
                    <span className="uppercase text-amber-600 dark:text-amber-400 font-semibold">
                      {picture.categoryLabel}
                    </span>
                    <span>{picture.resolution}</span>
                  </div>

                  <h3
                    className={`text-base font-serif font-semibold tracking-tight transition-colors line-clamp-1 mb-1 ${
                      darkMode
                        ? 'text-stone-100 group-hover:text-amber-400'
                        : 'text-stone-900 group-hover:text-amber-600'
                    }`}
                  >
                    {picture.title}
                  </h3>

                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed mb-3 font-light">
                    {picture.description}
                  </p>

                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 truncate text-stone-700 dark:text-stone-300">
                      <Camera className="w-3 h-3 text-stone-400 shrink-0" />
                      <span className="truncate">{picture.photographer}</span>
                    </div>

                    <button
                      onClick={(e) => onDownload(picture, e)}
                      className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-medium shrink-0 cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && displayedPictures.length > 0 && (
        <div className="mt-14 text-center">
          <button
            onClick={handleLoadMore}
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md ${
              darkMode
                ? 'bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 hover:border-amber-400/50'
                : 'bg-stone-100 hover:bg-white text-stone-900 border border-stone-300 hover:border-stone-400'
            }`}
          >
            <span>Load More Photography</span>
            <ArrowDown className="w-4 h-4 text-amber-500" />
          </button>
        </div>
      )}

    </section>
  );
};
