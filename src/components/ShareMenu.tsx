import React from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  X, 
  Send,
  ExternalLink
} from 'lucide-react';
import { PictureItem } from '../types';

interface ShareMenuProps {
  picture: PictureItem;
  isOpen: boolean;
  onClose: () => void;
  onCopyLink: (link: string) => void;
  darkMode: boolean;
}

export const ShareMenu: React.FC<ShareMenuProps> = ({
  picture,
  isOpen,
  onClose,
  onCopyLink,
  darkMode,
}) => {
  if (!isOpen) return null;

  const currentUrl = window.location.href;
  const pageTitle = encodeURIComponent(`${picture.title} — World Picture Gallery`);
  const encodedUrl = encodeURIComponent(currentUrl);
  const mediaUrl = encodeURIComponent(picture.imageUrl);
  const textSummary = encodeURIComponent(`Admire this breathtaking photo: "${picture.title}" by ${picture.photographer} on World Picture.`);

  const shareLinks = [
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-600 hover:text-white',
    },
    {
      name: 'Twitter / X',
      url: `https://twitter.com/intent/tweet?text=${textSummary}&url=${encodedUrl}`,
      color: 'hover:bg-black hover:text-white',
    },
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${textSummary}%20${encodedUrl}`,
      color: 'hover:bg-emerald-600 hover:text-white',
    },
    {
      name: 'Pinterest',
      url: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${mediaUrl}&description=${pageTitle}`,
      color: 'hover:bg-red-600 hover:text-white',
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${textSummary}`,
      color: 'hover:bg-sky-500 hover:text-white',
    },
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: picture.title,
          text: `"${picture.title}" by ${picture.photographer} on World Picture`,
          url: currentUrl,
        });
        onClose();
      } catch {
        // User cancelled or failed
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-sm rounded-2xl p-6 shadow-2xl border transition-all ${
          darkMode
            ? 'bg-stone-900 border-stone-800 text-stone-100'
            : 'bg-white border-stone-200 text-stone-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 mb-5">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-amber-500" />
            <h4 className="font-serif font-semibold text-base">Share Photography</h4>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Picture Thumbnail Context */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-100 dark:bg-stone-800/60 mb-5">
          <img
            src={picture.thumbUrl}
            alt={picture.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold truncate">{picture.title}</p>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
              by {picture.photographer}
            </p>
          </div>
        </div>

        {/* Social Share Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {shareLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium border border-stone-200 dark:border-stone-800 transition-all cursor-pointer bg-stone-50 dark:bg-stone-800/40 ${item.color}`}
            >
              <span>{item.name}</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          ))}
        </div>

        {/* Native Mobile Share if available */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="w-full mb-4 py-2.5 rounded-xl text-xs font-semibold bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>More Device Options (AirDrop, Messages)</span>
          </button>
        )}

        {/* Copy Direct Link */}
        <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
          <button
            onClick={() => {
              onCopyLink(picture.imageUrl);
              onClose();
            }}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-medium border border-stone-300 dark:border-stone-700 hover:border-amber-500 flex items-center justify-center gap-2 transition-colors cursor-pointer bg-stone-50 dark:bg-stone-800/80"
          >
            <Copy className="w-3.5 h-3.5 text-amber-500" />
            <span>Copy Direct High-Res Image Link</span>
          </button>
        </div>
      </div>
    </div>
  );
};
