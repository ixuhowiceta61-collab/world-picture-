import React, { useState } from 'react';
import { Camera, Send, Check, Heart, ArrowUp } from 'lucide-react';
import { CategoryType } from '../types';

interface FooterProps {
  onSelectCategory: (category: CategoryType) => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigate,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-stone-800">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950">
                <Camera className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                World Picture
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light max-w-sm mb-6">
              An open digital fine art gallery collecting the most inspiring photography of nature, 
              wildlife, oceans, and landscapes from master photographers worldwide.
            </p>

            <div className="flex items-center gap-3 text-xs text-stone-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Free High-Resolution Visual Gallery</span>
            </div>
          </div>

          {/* Quick Categories (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-amber-400 font-semibold mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => {
                    onNavigate('gallery');
                    onSelectCategory('nature');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Nature & Ancient Forests
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('gallery');
                    onSelectCategory('landscapes');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Landscapes & Horizons
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('gallery');
                    onSelectCategory('animals');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Wildlife & Faunas
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('gallery');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Ocean Swells & Coral Reefs
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('gallery');
                    onSelectCategory('mountains');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Alpine Ridges & Summits
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / The Daily Frame (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-amber-400 font-semibold mb-4">
              The Weekly Frame
            </h4>
            <p className="text-xs text-stone-400 font-light mb-4">
              Receive a weekly high-resolution featured photograph and photographer backstory directly to your inbox.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-emerald-300 text-xs">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subscribed! Welcome to the World Picture circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-stone-900 border border-stone-700 rounded-full text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Join</span>
                  <Send className="w-3 h-3" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 World Picture. All photography rights reserved to their respective creators.</p>
          
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
