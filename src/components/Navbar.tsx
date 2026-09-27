import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Heart, 
  Search, 
  Compass, 
  Camera, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  favoritesCount: number;
  onSelectFavoritesTab: () => void;
  onSearchClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  favoritesCount,
  onSelectFavoritesTab,
  onSearchClick,
  onNavigate,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? 'bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 shadow-md py-3.5'
            : 'bg-white/90 backdrop-blur-md border-b border-stone-200/80 shadow-sm py-3.5'
          : 'bg-gradient-to-b from-stone-950/80 via-stone-950/40 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Camera className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span
              className={`text-xl sm:text-2xl font-serif font-bold tracking-tight transition-colors ${
                scrolled
                  ? darkMode
                    ? 'text-stone-100 group-hover:text-amber-400'
                    : 'text-stone-900 group-hover:text-amber-600'
                  : 'text-white group-hover:text-amber-300'
              }`}
            >
              World Picture
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav
          className={`hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium transition-colors ${
            scrolled
              ? darkMode
                ? 'text-stone-300'
                : 'text-stone-600'
              : 'text-stone-200'
          }`}
        >
          <button
            onClick={() => handleNavClick('hero')}
            className={`hover:text-amber-500 transition-colors cursor-pointer ${
              scrolled && !darkMode ? 'hover:text-stone-950' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('gallery')}
            className={`hover:text-amber-500 transition-colors cursor-pointer ${
              scrolled && !darkMode ? 'hover:text-stone-950' : ''
            }`}
          >
            Gallery
          </button>
          <button
            onClick={() => handleNavClick('categories')}
            className={`hover:text-amber-500 transition-colors cursor-pointer ${
              scrolled && !darkMode ? 'hover:text-stone-950' : ''
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => {
              handleNavClick('gallery');
              onSelectFavoritesTab();
            }}
            className={`hover:text-amber-500 transition-colors cursor-pointer flex items-center gap-1.5 ${
              scrolled && !darkMode ? 'hover:text-stone-950' : ''
            }`}
          >
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-mono flex items-center justify-center font-bold">
                {favoritesCount}
              </span>
            )}
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`hover:text-amber-500 transition-colors cursor-pointer ${
              scrolled && !darkMode ? 'hover:text-stone-950' : ''
            }`}
          >
            About
          </button>
        </nav>

        {/* Right utility buttons: Search, Favorites, Theme Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search */}
          <button
            onClick={onSearchClick}
            title="Search pictures (Press to focus)"
            className={`p-2 rounded-full transition-all cursor-pointer ${
              scrolled
                ? darkMode
                  ? 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                : 'bg-white/15 hover:bg-white/25 text-stone-100 backdrop-blur-xs'
            }`}
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Favorites Button */}
          <button
            onClick={() => {
              handleNavClick('gallery');
              onSelectFavoritesTab();
            }}
            title="View saved favorites"
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              favoritesCount > 0
                ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30'
                : scrolled
                ? darkMode
                  ? 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                : 'bg-white/15 hover:bg-white/25 text-stone-100 backdrop-blur-xs'
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''
              }`}
            />
            <span className="hidden sm:inline">Favorites</span>
            {favoritesCount > 0 && (
              <span className="font-mono text-xs font-semibold">
                ({favoritesCount})
              </span>
            )}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`p-2 rounded-full transition-all cursor-pointer ${
              scrolled
                ? darkMode
                  ? 'bg-stone-800 hover:bg-stone-700 text-amber-300'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                : 'bg-white/15 hover:bg-white/25 text-amber-300 backdrop-blur-xs'
            }`}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-300 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-stone-700" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full transition-all cursor-pointer ${
              scrolled
                ? darkMode
                  ? 'bg-stone-800 text-stone-200'
                  : 'bg-stone-100 text-stone-700'
                : 'bg-white/15 text-white'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-6 py-6 border-b transition-all ${
            darkMode
              ? 'bg-stone-950/98 border-stone-800 text-stone-100'
              : 'bg-white/98 border-stone-200 text-stone-900'
          }`}
        >
          <div className="flex flex-col gap-4 text-sm font-medium uppercase tracking-wider">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-left py-2 hover:text-amber-500 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className="text-left py-2 hover:text-amber-500 transition-colors"
            >
              Gallery
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="text-left py-2 hover:text-amber-500 transition-colors"
            >
              Categories
            </button>
            <button
              onClick={() => {
                handleNavClick('gallery');
                onSelectFavoritesTab();
              }}
              className="text-left py-2 hover:text-amber-500 transition-colors flex items-center justify-between"
            >
              <span>Saved Favorites</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800">
                {favoritesCount}
              </span>
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 hover:text-amber-500 transition-colors"
            >
              About the Gallery
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
