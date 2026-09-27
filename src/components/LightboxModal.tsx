import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Share2,
  Copy,
  Heart,
  Maximize,
  Minimize,
  Check,
  Camera,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { PictureItem } from '../types';

interface LightboxModalProps {
  picture: PictureItem | null;
  picturesList: PictureItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPicture: (picture: PictureItem) => void;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
  onShare: (picture: PictureItem) => void;
  onCopyLink: (link: string) => void;
  onDownload: (picture: PictureItem) => void;
  darkMode: boolean;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  picture,
  picturesList,
  isOpen,
  onClose,
  onSelectPicture,
  isFavorited,
  onToggleFavorite,
  onShare,
  onCopyLink,
  onDownload,
  darkMode,
}) => {
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showInfoPanel, setShowInfoPanel] = useState<boolean>(true);
  const [initialPinchDist, setInitialPinchDist] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Reset zoom & pan when image changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [picture?.id]);

  // Keyboard navigation & Esc listener
  const currentIndex = picturesList.findIndex((p) => p.id === picture?.id);

  const handleNext = useCallback(() => {
    if (currentIndex === -1 || picturesList.length === 0) return;
    const nextIdx = (currentIndex + 1) % picturesList.length;
    onSelectPicture(picturesList[nextIdx]);
  }, [currentIndex, picturesList, onSelectPicture]);

  const handlePrev = useCallback(() => {
    if (currentIndex === -1 || picturesList.length === 0) return;
    const prevIdx = (currentIndex - 1 + picturesList.length) % picturesList.length;
    onSelectPicture(picturesList[prevIdx]);
  }, [currentIndex, picturesList, onSelectPicture]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      } else if (e.key === '0') {
        handleResetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  // Zoom helpers
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.35, 4));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.35, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(prev + 0.2, 4));
    } else {
      setScale((prev) => {
        const next = Math.max(prev - 0.2, 1);
        if (next === 1) setPosition({ x: 0, y: 0 });
        return next;
      });
    }
  };

  // Dragging / Pan when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Mobile Pinch-to-zoom & touch drag
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setInitialPinchDist(dist);
    } else if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDist !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / initialPinchDist;
      setScale((prev) => Math.min(Math.max(prev * factor, 1), 4));
      setInitialPinchDist(dist);
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setInitialPinchDist(null);
    setIsDragging(false);
    if (scale <= 1) setPosition({ x: 0, y: 0 });
  };

  if (!isOpen || !picture) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col bg-stone-950/98 backdrop-blur-xl text-stone-100 select-none animate-in fade-in duration-200"
    >
      {/* Top Floating Control Bar */}
      <div className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-stone-950/80 border-b border-stone-800/80 backdrop-blur-md">
        
        {/* Title and Counter */}
        <div className="flex items-center gap-3 truncate max-w-md">
          <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
          <div className="truncate">
            <h3 className="text-sm font-serif font-semibold text-white truncate">
              {picture.title}
            </h3>
            <p className="text-[11px] text-stone-400 font-mono">
              {currentIndex + 1} of {picturesList.length} · {picture.categoryLabel}
            </p>
          </div>
        </div>

        {/* Action Controls Group */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center bg-stone-900/90 border border-stone-800 rounded-full px-1 py-0.5 mr-2">
            <button
              onClick={handleZoomOut}
              disabled={scale <= 1}
              title="Zoom Out (-)"
              className="p-1.5 rounded-full hover:bg-stone-800 disabled:opacity-30 disabled:hover:bg-transparent text-stone-300 hover:text-white cursor-pointer transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-mono px-2 text-stone-400 min-w-10 text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={scale >= 4}
              title="Zoom In (+)"
              className="p-1.5 rounded-full hover:bg-stone-800 disabled:opacity-30 disabled:hover:bg-transparent text-stone-300 hover:text-white cursor-pointer transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {scale > 1 && (
              <button
                onClick={handleResetZoom}
                title="Reset Zoom (0)"
                className="p-1.5 rounded-full hover:bg-stone-800 text-amber-400 cursor-pointer transition-colors ml-1 border-l border-stone-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => onToggleFavorite(picture.id)}
            title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isFavorited
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-500'
                : 'bg-stone-900/80 border-stone-800 hover:bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          {/* Share Button */}
          <button
            onClick={() => onShare(picture)}
            title="Share picture"
            className="p-2 rounded-full bg-stone-900/80 border border-stone-800 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Copy Link Button */}
          <button
            onClick={() => onCopyLink(picture.imageUrl)}
            title="Copy direct picture link"
            className="p-2 rounded-full bg-stone-900/80 border border-stone-800 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <Copy className="w-4 h-4" />
          </button>

          {/* Download Button */}
          <button
            onClick={() => onDownload(picture)}
            title="Download original high-resolution picture"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs transition-colors cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.2]" />
            <span className="hidden sm:inline">Download</span>
          </button>

          {/* Info toggle */}
          <button
            onClick={() => setShowInfoPanel(!showInfoPanel)}
            title="Toggle Details"
            className={`p-2 rounded-full border transition-colors cursor-pointer ${
              showInfoPanel
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                : 'bg-stone-900/80 border-stone-800 hover:bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            className="p-2 rounded-full bg-stone-900/80 border border-stone-800 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            title="Close Lightbox (Esc)"
            className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors cursor-pointer ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Image Stage & Info Panel */}
      <div className="relative flex-1 flex overflow-hidden">
        
        {/* Left Navigation Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-stone-900/70 hover:bg-stone-900 text-stone-300 hover:text-white border border-stone-800 backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-110"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Center Canvas / Media Viewport */}
        <div
          className={`flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden cursor-${
            scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
          }`}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="relative flex items-center justify-center max-w-full max-h-full transition-transform duration-75 ease-out"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            }}
          >
            <img
              ref={imageRef}
              src={picture.imageUrl}
              alt={picture.title}
              className="max-h-[80vh] w-auto max-w-[90vw] object-contain rounded-md shadow-2xl pointer-events-none select-none"
              draggable={false}
            />
          </div>
        </div>

        {/* Right Navigation Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-stone-900/70 hover:bg-stone-900 text-stone-300 hover:text-white border border-stone-800 backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-110"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bottom Floating Info Drawer / Side Sheet */}
        {showInfoPanel && (
          <aside className="absolute bottom-0 left-0 right-0 sm:left-auto sm:top-0 sm:bottom-0 sm:w-80 sm:border-l border-t sm:border-t-0 border-stone-800 bg-stone-950/92 backdrop-blur-lg z-20 flex flex-col justify-between p-6 overflow-y-auto max-h-[45vh] sm:max-h-full animate-in slide-in-from-right-4">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
                <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold font-mono">
                  Photographic Details
                </span>
                <button
                  onClick={() => setShowInfoPanel(false)}
                  className="p-1 text-stone-500 hover:text-stone-300 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Title & Description */}
              <h2 className="text-xl font-serif font-bold text-white mb-2 leading-tight">
                {picture.title}
              </h2>
              <p className="text-xs text-stone-300 leading-relaxed font-light mb-6">
                {picture.description}
              </p>

              {/* Metadata Key-Value Grid */}
              <div className="space-y-3 py-3 border-y border-stone-800/80 text-xs">
                
                <div className="flex items-start justify-between gap-2">
                  <span className="text-stone-500 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-stone-400" />
                    Photographer
                  </span>
                  <span className="font-medium text-stone-200 text-right">
                    {picture.photographer} ({picture.photographerHandle})
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <span className="text-stone-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    Location
                  </span>
                  <span className="font-medium text-stone-200 text-right">
                    {picture.location}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-stone-500 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-stone-400" />
                    Resolution
                  </span>
                  <span className="font-mono text-stone-200 font-medium">
                    {picture.resolution} Ultra HD
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <span className="text-stone-500">Camera</span>
                  <span className="font-mono text-stone-200 text-right text-[11px]">
                    {picture.camera}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-stone-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    Date
                  </span>
                  <span className="text-stone-200">
                    {picture.date}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 block mb-2">
                  Keywords
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {picture.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-[11px] bg-stone-900 border border-stone-800 text-stone-300 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Quick Download / Share CTAs */}
            <div className="pt-6 border-t border-stone-800 space-y-2.5">
              <button
                onClick={() => onDownload(picture)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4 stroke-[2.2]" />
                <span>Download High-Resolution Original</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => onCopyLink(picture.imageUrl)}
                  className="flex-1 py-2 px-3 rounded-xl bg-stone-900 border border-stone-800 hover:bg-stone-800 text-stone-200 text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Copy Link</span>
                </button>
                <button
                  onClick={() => onShare(picture)}
                  className="flex-1 py-2 px-3 rounded-xl bg-stone-900 border border-stone-800 hover:bg-stone-800 text-stone-200 text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Lightbox Footer Helper hints */}
      <div className="hidden sm:flex items-center justify-between px-8 py-2 bg-stone-950 border-t border-stone-800 text-[11px] text-stone-500 font-mono">
        <div className="flex items-center gap-4">
          <span>← / → Keyboard Arrows Navigate</span>
          <span>·</span>
          <span>Mouse Wheel / Pinch to Zoom</span>
          <span>·</span>
          <span>Click & Drag to Pan</span>
        </div>
        <div>
          <span>World Picture Gallery · Verified Unsplash License</span>
        </div>
      </div>
    </div>
  );
};
