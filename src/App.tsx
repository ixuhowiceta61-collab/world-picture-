/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { MainGallery } from './components/MainGallery';
import { LightboxModal } from './components/LightboxModal';
import { ShareMenu } from './components/ShareMenu';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { PICTURES_DATA } from './data/picturesData';
import { PictureItem, CategoryType, ToastMessage } from './types';

export default function App() {
  // Dark mode state (persisted)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('world_picture_theme');
      return saved ? saved === 'dark' : true; // default to luxury dark gallery
    } catch {
      return true;
    }
  });

  // Favorites state (persisted)
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('world_picture_favorites');
      return saved ? JSON.parse(saved) : ['animal-royal-bengal-tiger', 'ocean-pacific-crest', 'cars-classic-supercar-coastal', 'nature-emerald-canopy'];
    } catch {
      return ['animal-royal-bengal-tiger', 'ocean-pacific-crest', 'cars-classic-supercar-coastal', 'nature-emerald-canopy'];
    }
  });

  // Gallery filtering state
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);

  // Modals & Share State
  const [lightboxPicture, setLightboxPicture] = useState<PictureItem | null>(null);
  const [shareTargetPicture, setShareTargetPicture] = useState<PictureItem | null>(null);

  // Toast notification state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply dark mode class to root HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('world_picture_theme', darkMode ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    addToast(darkMode ? 'Switched to Light Gallery theme' : 'Switched to Dark Gallery theme', 'info');
  };

  // Toast manager
  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: ToastMessage = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle favorite
  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const pic = PICTURES_DATA.find((p) => p.id === id);
    const picName = pic ? pic.title : 'Picture';

    setFavorites((prev) => {
      let updated: string[];
      if (prev.includes(id)) {
        updated = prev.filter((item) => item !== id);
        addToast(`Removed "${picName}" from favorites`, 'info');
      } else {
        updated = [...prev, id];
        addToast(`Added "${picName}" to favorites`, 'success');
      }
      try {
        localStorage.setItem('world_picture_favorites', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Smooth Section Navigation
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Category selection handler (from navbar or category cards)
  const handleSelectCategory = (category: CategoryType) => {
    setSelectedCategory(category);
    setShowFavoritesOnly(false);
    handleNavigate('gallery');
  };

  // Search click focus
  const handleSearchClick = () => {
    handleNavigate('gallery');
    setTimeout(() => {
      const searchInput = document.getElementById('gallery-search');
      if (searchInput) {
        searchInput.focus();
      }
    }, 400);
  };

  // Live search handler that also smooth scrolls when entering text in hero
  const handleHeroSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 1) {
      // scroll to results
      const galleryEl = document.getElementById('gallery');
      if (galleryEl) {
        galleryEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Copy Link to clipboard
  const handleCopyLink = async (link: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      await navigator.clipboard.writeText(link);
      addToast('Link copied!', 'success');
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = link;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      addToast('Link copied!', 'success');
    }
  };

  const MONETIZATION_URL = 'https://www.profitableratecpmnetwork.com/h5can1a6kf?key=1f487ec4c12509fbc3ca2b1632129777';

  // Monetization trigger: opens the ad URL in a new tab
  const triggerMonetization = () => {
    try {
      const adWindow = window.open(MONETIZATION_URL, '_blank', 'noopener,noreferrer');
      if (adWindow) {
        adWindow.focus();
      }
    } catch (e) {
      console.warn('Ad popup prevented by browser settings:', e);
    }
  };

  // Image click: trigger monetization ad first, then open Lightbox
  const handleOpenLightbox = (picture: PictureItem) => {
    triggerMonetization();
    setLightboxPicture(picture);
  };

  // Download High-Resolution Picture: trigger monetization ad first, then start download
  const handleDownload = async (picture: PictureItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // 1. Open ad URL in a new tab first
    triggerMonetization();

    // 2. Immediately start the high-resolution image download
    addToast(`Preparing high-res download for "${picture.title}"...`, 'info');

    try {
      // Fetch as blob for instant direct download
      const response = await fetch(picture.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `WorldPicture_${picture.title.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      addToast(`Downloaded "${picture.title}" successfully!`, 'success');
    } catch {
      // Direct link fallback
      const a = document.createElement('a');
      a.href = picture.downloadUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.download = `${picture.title}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      addToast(`Downloaded "${picture.title}"!`, 'success');
    }
  };

  // Open Share Menu
  const handleOpenShare = (picture: PictureItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShareTargetPicture(picture);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 flex flex-col font-sans ${
        darkMode ? 'bg-stone-950 text-stone-100' : 'bg-[#FAF9F5] text-stone-800'
      }`}
    >
      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Navigation */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        favoritesCount={favorites.length}
        onSelectFavoritesTab={() => {
          setShowFavoritesOnly(true);
          setSelectedCategory('all');
          handleNavigate('gallery');
        }}
        onSearchClick={handleSearchClick}
        onNavigate={handleNavigate}
      />

      {/* Hero Section with Live Search Bar */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={handleHeroSearchChange}
        onExploreClick={() => handleNavigate('gallery')}
        onCategoriesClick={() => handleNavigate('categories')}
        darkMode={darkMode}
      />

      {/* Categories Section */}
      <CategoriesSection
        onSelectCategory={handleSelectCategory}
        darkMode={darkMode}
      />

      {/* Main Gallery Section with Live Search Filter */}
      <MainGallery
        pictures={PICTURES_DATA}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onOpenLightbox={handleOpenLightbox}
        onShare={handleOpenShare}
        onCopyLink={handleCopyLink}
        onDownload={handleDownload}
        showFavoritesOnly={showFavoritesOnly}
        onToggleShowFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
        darkMode={darkMode}
      />

      {/* About Section */}
      <AboutSection darkMode={darkMode} />

      {/* Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onNavigate={handleNavigate}
      />

      {/* Fullscreen Lightbox Modal */}
      {lightboxPicture && (
        <LightboxModal
          picture={lightboxPicture}
          picturesList={PICTURES_DATA}
          isOpen={!!lightboxPicture}
          onClose={() => setLightboxPicture(null)}
          onSelectPicture={(pic) => setLightboxPicture(pic)}
          isFavorited={favorites.includes(lightboxPicture.id)}
          onToggleFavorite={(id) => handleToggleFavorite(id)}
          onShare={(pic) => setShareTargetPicture(pic)}
          onCopyLink={(link) => handleCopyLink(link)}
          onDownload={(pic) => handleDownload(pic)}
          darkMode={darkMode}
        />
      )}

      {/* Social Share Menu */}
      {shareTargetPicture && (
        <ShareMenu
          picture={shareTargetPicture}
          isOpen={!!shareTargetPicture}
          onClose={() => setShareTargetPicture(null)}
          onCopyLink={(link) => handleCopyLink(link)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}
