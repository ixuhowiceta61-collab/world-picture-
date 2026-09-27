import React, { useState } from 'react';
import { Heart, Maximize2, Sparkles, Home, Image as ImageIcon } from 'lucide-react';
import { Artwork } from '../types/gallery';

interface ArtworkCardProps {
  artwork: Artwork;
  isFavorited: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onOpenLightbox: (artwork: Artwork) => void;
  onOpenRoomPreview: (artwork: Artwork, e: React.MouseEvent) => void;
  likesCount: number;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  isFavorited,
  onToggleFavorite,
  onOpenLightbox,
  onOpenRoomPreview,
  likesCount,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={() => onOpenLightbox(artwork)}
      className="group relative flex flex-col bg-white rounded-2xl border border-stone-200/70 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-stone-300"
    >
      {/* Visual Asset Container */}
      <div className="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden">
        {!imageError ? (
          <img
            src={artwork.imageSrc}
            alt={`${artwork.title} by ${artwork.artist}`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104"
            loading="lazy"
          />
        ) : (
          /* Zero-broken-image fallback container */
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200 text-stone-500 p-6 text-center">
            <ImageIcon className="w-8 h-8 mb-2 text-stone-400 stroke-1" />
            <span className="text-xs font-serif italic text-stone-600">{artwork.title}</span>
            <span className="text-[11px] text-stone-400 mt-1">{artwork.artist}</span>
          </div>
        )}

        {/* Ambient Overlay gradient on hover */}
        <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Top hover quick actions */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          {/* Wall Room View */}
          <button
            onClick={(e) => onOpenRoomPreview(artwork, e)}
            title="Preview hanging in a living room"
            className="p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 backdrop-blur-xs shadow-xs transition-transform active:scale-95 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
          </button>

          {/* Favorite button */}
          <button
            onClick={(e) => onToggleFavorite(artwork.id, e)}
            title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 backdrop-blur-xs shadow-xs transition-transform active:scale-95 cursor-pointer"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isFavorited ? 'fill-rose-500 text-rose-500' : 'text-stone-700'
              }`}
            />
          </button>
        </div>

        {/* Quick View Expand pill */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-white/90 text-stone-800 backdrop-blur-xs shadow-xs">
            <Maximize2 className="w-3 h-3 text-stone-500" />
            <span>Curator View</span>
          </span>
        </div>
      </div>

      {/* Card Content & Clean Unboxed Metadata */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed category and location kicker */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span>{artwork.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{artwork.location}</span>
          </div>

          {/* Primary Title */}
          <h3 className="text-base sm:text-lg font-serif font-semibold text-stone-900 group-hover:text-emerald-900 transition-colors line-clamp-1 mb-1.5">
            {artwork.title}
          </h3>

          {/* Brief curator poetic quote */}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4 font-light">
            {artwork.curatorStory}
          </p>
        </div>

        {/* Bottom Metadata bar: Artist, Medium, Year, Likes */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2 truncate">
            <span className="font-medium text-stone-800">{artwork.artist}</span>
            <span aria-hidden="true">·</span>
            <span>{artwork.year}</span>
          </div>

          {/* Palette preview dots & Likes */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex -space-x-1 items-center" title="Color harmony harmony">
              {artwork.palette.slice(0, 3).map((hex, i) => (
                <span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full ring-1 ring-white"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
            <span className="font-mono text-[11px] tabular-nums text-stone-500 flex items-center gap-1">
              <Heart className={`w-3 h-3 ${isFavorited ? 'fill-rose-400 text-rose-400' : 'text-stone-400'}`} />
              {likesCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
