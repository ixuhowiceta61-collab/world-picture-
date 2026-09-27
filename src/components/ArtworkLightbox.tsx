import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Download,
  Home,
  ZoomIn,
  ZoomOut,
  Check,
  Camera,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Artwork } from '../types/gallery';

interface ArtworkLightboxProps {
  artwork: Artwork | null;
  artworksList: Artwork[];
  onClose: () => void;
  onSelectArtwork: (artwork: Artwork) => void;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
  likesCount: number;
  onOpenRoomPreview: (artwork: Artwork) => void;
}

export const ArtworkLightbox: React.FC<ArtworkLightboxProps> = ({
  artwork,
  artworksList,
  onClose,
  onSelectArtwork,
  isFavorited,
  onToggleFavorite,
  likesCount,
  onOpenRoomPreview,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!artwork) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [artwork, artworksList]);

  // Reset zoom when artwork changes
  useEffect(() => {
    setIsZoomed(false);
  }, [artwork?.id]);

  if (!artwork) return null;

  const currentIndex = artworksList.findIndex((item) => item.id === artwork.id);

  const handleNext = () => {
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % artworksList.length;
    onSelectArtwork(artworksList[nextIndex]);
  };

  const handlePrev = () => {
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + artworksList.length) % artworksList.length;
    onSelectArtwork(artworksList[prevIndex]);
  };

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = artwork.imageSrc;
    link.download = `AuraGallery_${artwork.title.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Related artworks (same category or nearby)
  const relatedArtworks = artworksList
    .filter((item) => item.id !== artwork.id)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/92 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      {/* Container Card */}
      <div
        className="relative w-full max-w-6xl bg-[#FAF9F5] rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[95vh] border border-stone-800/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/80 bg-stone-50/80">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <span>{artwork.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>Edition {currentIndex + 1} of {artworksList.length}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Wall View button */}
            <button
              onClick={() => onOpenRoomPreview(artwork)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-stone-200/80 hover:bg-stone-300 text-stone-800 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden sm:inline">Living Space View</span>
            </button>

            {/* Close button with high contrast */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-stone-200 hover:bg-stone-900 hover:text-stone-50 text-stone-700 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split Media + Editorial Sheet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* Left: Media Stage (7 cols) */}
          <div className="lg:col-span-7 bg-stone-900/95 flex flex-col items-center justify-center p-4 sm:p-8 relative min-h-[350px] lg:min-h-[550px] select-none">
            {/* Image container */}
            <div
              className={`relative max-w-full max-h-[68vh] overflow-hidden transition-all duration-300 cursor-${
                isZoomed ? 'zoom-out' : 'zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={artwork.imageSrc}
                alt={artwork.title}
                referrerPolicy="no-referrer"
                className={`max-h-[65vh] w-auto object-contain mx-auto transition-transform duration-500 rounded-sm shadow-2xl ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
              />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-900/80 hover:bg-white hover:text-stone-900 text-white backdrop-blur-xs transition-colors cursor-pointer"
              aria-label="Previous artwork"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-900/80 hover:bg-white hover:text-stone-900 text-white backdrop-blur-xs transition-colors cursor-pointer"
              aria-label="Next artwork"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Zoom indicator chip */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-stone-950/70 text-stone-300 backdrop-blur-xs hover:text-white transition-colors cursor-pointer"
              >
                {isZoomed ? <ZoomOut className="w-3 h-3" /> : <ZoomIn className="w-3 h-3" />}
                <span>{isZoomed ? 'Reset Scale' : 'Inspect Detail'}</span>
              </button>
            </div>
          </div>

          {/* Right: Editorial Sheet (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#FAF9F5] border-l border-stone-200">
            <div>
              {/* Natural editorial heading & artist */}
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>{artwork.location}</span>
                <span aria-hidden="true">·</span>
                <span>{artwork.year}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-900 mb-2 leading-tight">
                {artwork.title}
              </h2>

              <p className="text-sm font-medium text-emerald-900 mb-5">
                {artwork.artist}
              </p>

              {/* Curatorial Story */}
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                  Curatorial Contemplation
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
                  {artwork.curatorStory}
                </p>
              </div>

              {/* Medium & Dimensions */}
              <div className="space-y-2 py-4 border-y border-stone-200/80 text-xs text-stone-600 mb-6">
                <div className="flex justify-between">
                  <span className="text-stone-400">Medium</span>
                  <span className="font-medium text-stone-800 text-right max-w-[200px]">{artwork.medium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Dimensions</span>
                  <span className="font-mono text-stone-800">{artwork.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Optical Capture</span>
                  <span className="font-mono text-stone-800 text-right">{artwork.exif.camera || 'Digital Synthesis'}</span>
                </div>
                {artwork.exif.aperture && (
                  <div className="flex justify-between">
                    <span className="text-stone-400">Settings</span>
                    <span className="font-mono text-stone-800">
                      {artwork.exif.focalLength} · {artwork.exif.aperture} · ISO {artwork.exif.iso} · {artwork.exif.shutter}
                    </span>
                  </div>
                )}
              </div>

              {/* Color Harmony Palette */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span className="uppercase tracking-wider text-[11px] font-medium">Harmonic Color Palette</span>
                  {copiedHex && (
                    <span className="text-emerald-700 text-[11px] font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" /> Copied {copiedHex}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {artwork.palette.map((hex, i) => (
                    <button
                      key={i}
                      onClick={() => handleCopyHex(hex)}
                      className="group/palette relative flex-1 h-8 rounded-lg transition-transform hover:scale-105 border border-stone-200 cursor-pointer shadow-2xs"
                      style={{ backgroundColor: hex }}
                      title={`Click to copy ${hex}`}
                    >
                      <span className="opacity-0 group-hover/palette:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] font-mono px-1.5 py-0.5 rounded shadow-xs whitespace-nowrap pointer-events-none">
                        {hex}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between gap-3">
                {/* Favorite */}
                <button
                  onClick={() => onToggleFavorite(artwork.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isFavorited
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-stone-100 hover:bg-stone-200/80 text-stone-800 border border-stone-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isFavorited ? 'Saved in Collection' : 'Save to Favorites'}</span>
                  <span className="font-mono tabular-nums text-stone-400">({likesCount})</span>
                </button>

                {/* Share Link */}
                <button
                  onClick={handleShare}
                  title="Share artwork link"
                  className="p-2.5 rounded-xl border border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer relative"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>

                {/* High Res Wallpaper / Download */}
                <button
                  onClick={handleDownload}
                  title="Download artwork for personal wallpaper"
                  className="p-2.5 rounded-xl border border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

              {/* Related Curations */}
              <div className="mt-6 pt-4 border-t border-stone-200">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block mb-2.5">
                  Complementary Curations
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {relatedArtworks.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onSelectArtwork(item)}
                      className="group/rel cursor-pointer relative aspect-[4/3] rounded-lg overflow-hidden border border-stone-200 bg-stone-100"
                    >
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform group-hover/rel:scale-105"
                      />
                      <div className="absolute inset-0 bg-stone-950/30 opacity-0 group-hover/rel:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
