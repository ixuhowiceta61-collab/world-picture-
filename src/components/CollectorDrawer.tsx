import React from 'react';
import { X, Heart, Trash2, Maximize2, Share2, Sparkles, ArrowRight } from 'lucide-react';
import { Artwork } from '../types/gallery';

interface CollectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoritedArtworks: Artwork[];
  onRemoveFavorite: (id: string) => void;
  onSelectArtwork: (artwork: Artwork) => void;
  onClearAll: () => void;
}

export const CollectorDrawer: React.FC<CollectorDrawerProps> = ({
  isOpen,
  onClose,
  favoritedArtworks,
  onRemoveFavorite,
  onSelectArtwork,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const handleExportList = () => {
    const list = favoritedArtworks.map(
      (a, i) => `${i + 1}. "${a.title}" by ${a.artist} (${a.year}) — ${a.location}`
    ).join('\n');
    const blob = new Blob([`Aura Gallery — Personal Curated Collection\n\n${list}\n\nExported from Aura Gallery online sanctuary.`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Aura_Gallery_Collection.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] shadow-2xl flex flex-col border-l border-stone-200">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-rose-600 font-semibold uppercase tracking-wider mb-0.5">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>Personal Collection</span>
              </div>
              <h3 className="text-lg font-serif font-semibold text-stone-900">
                Saved Curations ({favoritedArtworks.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-stone-200 hover:bg-stone-900 hover:text-stone-50 text-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {favoritedArtworks.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 text-stone-400">
                <Heart className="w-12 h-12 stroke-1 text-stone-300 mb-4" />
                <h4 className="font-serif text-stone-800 text-base mb-1">Your sanctuary collection is empty</h4>
                <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                  Browse the gallery and click the heart icon on any landscape, botanical, ocean, or wildlife artwork to curate your personal contemplative haven.
                </p>
              </div>
            ) : (
              favoritedArtworks.map((art) => (
                <div
                  key={art.id}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-stone-200/80 shadow-2xs hover:border-stone-300 transition-all group"
                >
                  <div
                    onClick={() => {
                      onSelectArtwork(art);
                      onClose();
                    }}
                    className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 shrink-0 cursor-pointer relative"
                  >
                    <img
                      src={art.imageSrc}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <h4
                        onClick={() => {
                          onSelectArtwork(art);
                          onClose();
                        }}
                        className="text-xs sm:text-sm font-serif font-semibold text-stone-900 truncate hover:text-emerald-800 cursor-pointer"
                      >
                        {art.title}
                      </h4>
                      <p className="text-xs text-stone-500 truncate mt-0.5">{art.artist}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-100">
                      <span>{art.year}</span>
                      <button
                        onClick={() => onRemoveFavorite(art.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Controls */}
          {favoritedArtworks.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-3">
              <button
                onClick={handleExportList}
                className="w-full py-2.5 rounded-full text-xs font-semibold bg-stone-900 text-stone-50 hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Export Personal Curated Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onClearAll}
                className="w-full text-center text-xs text-stone-400 hover:text-rose-600 transition-colors py-1 cursor-pointer"
              >
                Clear all saved pieces
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
