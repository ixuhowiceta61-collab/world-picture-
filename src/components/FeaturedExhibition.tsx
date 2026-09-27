import React from 'react';
import { Sparkles, Calendar, UserCheck, ArrowRight, Home } from 'lucide-react';
import { Artwork } from '../types/gallery';

interface FeaturedExhibitionProps {
  artwork: Artwork;
  onOpenLightbox: (artwork: Artwork) => void;
  onOpenRoomPreview: (artwork: Artwork, e: React.MouseEvent) => void;
}

export const FeaturedExhibition: React.FC<FeaturedExhibitionProps> = ({
  artwork,
  onOpenLightbox,
  onOpenRoomPreview,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-16">
      <div className="bg-[#F5F2EB] rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-xs">
        
        {/* Section lead-in */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-300/60">
          <div>
            <div className="text-xs uppercase tracking-widest text-emerald-800 font-semibold mb-1">
              Curator’s Spotlight
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 tracking-tight">
              Quiet Horizons: The Art of Biophilic Solace
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              Autumn – Spring Season
            </span>
            <span aria-hidden="true">·</span>
            <span>Curated by Dr. Maren Voss</span>
          </div>
        </div>

        {/* Split presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Visual container (Left 7 cols) */}
          <div
            onClick={() => onOpenLightbox(artwork)}
            className="lg:col-span-7 group relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer shadow-md bg-stone-200"
          >
            <img
              src={artwork.imageSrc}
              alt={artwork.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Quick living room preview button */}
            <button
              onClick={(e) => onOpenRoomPreview(artwork, e)}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 text-stone-800 backdrop-blur-xs shadow-xs hover:bg-white transition-all flex items-center gap-1.5 cursor-pointer z-10"
            >
              <Home className="w-3.5 h-3.5 text-stone-600" />
              <span>Living Room View</span>
            </button>

            {/* Bottom floating caption */}
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/85 backdrop-blur-md rounded-xl text-xs text-stone-800 flex items-center justify-between border border-white/40">
              <div className="truncate pr-2">
                <span className="font-serif font-semibold">{artwork.title}</span>
                <span className="text-stone-500 ml-2">by {artwork.artist}</span>
              </div>
              <span className="text-emerald-800 font-medium shrink-0">Click to Inspect</span>
            </div>
          </div>

          {/* Editorial Column (Right 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-wider text-stone-500 mb-2">
              Featured Exhibition Piece
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-stone-900 mb-4 leading-snug">
              {artwork.title}
            </h3>

            <blockquote className="font-serif italic text-sm text-stone-700 border-l-2 border-emerald-700/60 pl-4 py-1 mb-6 leading-relaxed">
              &ldquo;When modern life accelerates into continuous noise, contemplating
              the unhurried perfection of water, rock, and flora gently restores cognitive clarity.&rdquo;
            </blockquote>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light mb-6">
              {artwork.curatorStory}
            </p>

            {/* Harmonic Palette Swatches with hex copy info */}
            <div className="mb-8">
              <div className="text-[11px] uppercase tracking-wider text-stone-500 mb-2 font-medium">
                Extracted Organic Color Palette
              </div>
              <div className="flex items-center gap-2">
                {artwork.palette.map((hex, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      className="w-8 h-8 rounded-lg shadow-2xs border border-stone-200"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                    <span className="text-[10px] font-mono text-stone-500 mt-1 uppercase">
                      {hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curatorial actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenLightbox(artwork)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-stone-900 text-stone-50 hover:bg-stone-800 transition-colors cursor-pointer shadow-xs"
              >
                <span>Read Curatorial Critique</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
