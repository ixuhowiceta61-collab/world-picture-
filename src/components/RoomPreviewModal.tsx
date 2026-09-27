import React, { useState } from 'react';
import { X, Check, Sparkles, Sliders } from 'lucide-react';
import { Artwork, FrameStyle } from '../types/gallery';

interface RoomPreviewModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export const RoomPreviewModal: React.FC<RoomPreviewModalProps> = ({
  artwork,
  onClose,
}) => {
  const [frameStyle, setFrameStyle] = useState<FrameStyle>('oak');
  const [wallColor, setWallColor] = useState<'cream' | 'sage' | 'charcoal'>('cream');

  if (!artwork) return null;

  const frameClasses: Record<FrameStyle, string> = {
    oak: 'border-[14px] sm:border-[20px] border-[#C8A279] shadow-2xl ring-2 ring-[#96724E]/40',
    black: 'border-[12px] sm:border-[18px] border-[#1A1A1A] shadow-2xl ring-1 ring-black/80',
    brass: 'border-[10px] sm:border-[16px] border-[#C5A059] shadow-2xl ring-2 ring-[#8D6B28]/40',
    frameless: 'shadow-2xl ring-1 ring-stone-900/10',
  };

  const wallBackgrounds: Record<'cream' | 'sage' | 'charcoal', string> = {
    cream: 'bg-[#F2EDE4]',
    sage: 'bg-[#DFE5DC]',
    charcoal: 'bg-[#2B302E]',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/90 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div
        className="relative w-full max-w-5xl bg-[#FAF9F5] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-stone-800/40 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/80 bg-stone-50">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-emerald-800 font-semibold block">
              Virtual Living Space Preview
            </span>
            <h3 className="text-base font-serif font-semibold text-stone-900">
              {artwork.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-200 hover:bg-stone-900 hover:text-stone-50 text-stone-700 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Interior Wall Mockup Stage */}
        <div
          className={`relative w-full h-[420px] sm:h-[500px] flex flex-col items-center justify-center transition-colors duration-500 overflow-hidden select-none ${wallBackgrounds[wallColor]}`}
        >
          {/* Subtle Ambient Sunlight Angle Shadow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-white/20 pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-72 h-full bg-white/10 -skew-x-12 blur-2xl pointer-events-none" />

          {/* Wall Lamp / Light Cast */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-radial from-amber-100/30 to-transparent blur-xl pointer-events-none" />

          {/* Hanging Artwork with Selected Frame */}
          <div className="relative z-10 transition-all duration-300 flex flex-col items-center max-w-[80%] max-h-[65%]">
            <div className={`overflow-hidden rounded-xs bg-white ${frameClasses[frameStyle]}`}>
              <img
                src={artwork.imageSrc}
                alt={artwork.title}
                referrerPolicy="no-referrer"
                className="max-h-[220px] sm:max-h-[300px] w-auto object-cover"
              />
            </div>
            {/* Gallery Placard */}
            <div className="mt-4 px-2 py-1 bg-white/70 backdrop-blur-xs text-[9px] font-serif text-stone-600 rounded shadow-2xs tracking-wide">
              {artwork.title} · {artwork.artist}
            </div>
          </div>

          {/* Furniture Silhouette / Minimalist Credenza Surface */}
          <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-stone-900/30 backdrop-blur-xs border-t border-stone-700/20 flex items-center justify-between px-12">
            {/* Minimalist ceramic vase shadow */}
            <div className="w-6 h-12 bg-stone-800/40 rounded-t-full shadow-inner" />
            <div className="text-[11px] tracking-widest text-stone-500 uppercase font-light">
              Scale: 1:1 Interior Perspective
            </div>
            <div className="w-10 h-8 bg-stone-800/30 rounded-xs shadow-inner" />
          </div>
        </div>

        {/* Framing & Customization Controls */}
        <div className="p-6 bg-[#FAF9F5] border-t border-stone-200 flex flex-wrap items-center justify-between gap-6">
          
          {/* Frame Style Options */}
          <div>
            <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block mb-2">
              Bespoke Gallery Framing
            </span>
            <div className="flex items-center gap-2">
              {[
                { id: 'oak', label: 'Solid White Oak' },
                { id: 'black', label: 'Matte Obsidian' },
                { id: 'brass', label: 'Museum Brass' },
                { id: 'frameless', label: 'Floating Linen' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFrameStyle(f.id as FrameStyle)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    frameStyle === f.id
                      ? 'bg-stone-900 text-stone-50 shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Wall Tone */}
          <div>
            <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block mb-2">
              Wall Tone
            </span>
            <div className="flex items-center gap-2">
              {[
                { id: 'cream', label: 'Warm Plaster', bg: '#F2EDE4' },
                { id: 'sage', label: 'Muted Sage', bg: '#DFE5DC' },
                { id: 'charcoal', label: 'Architectural Charcoal', bg: '#2B302E' },
              ].map((w) => (
                <button
                  key={w.id}
                  onClick={() => setWallColor(w.id as 'cream' | 'sage' | 'charcoal')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    wallColor === w.id
                      ? 'bg-stone-900 text-stone-50 shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-stone-300"
                    style={{ backgroundColor: w.bg }}
                  />
                  <span>{w.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
