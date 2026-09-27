import React from 'react';
import { Camera, Eye, Award, Globe, ShieldCheck, HeartHandshake } from 'lucide-react';

interface AboutSectionProps {
  darkMode: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ darkMode }) => {
  const values = [
    {
      icon: Award,
      title: 'Museum-Grade Quality',
      description: 'Every photo is vetted for tonal clarity, dynamic range, and authentic natural composition without synthetic noise.',
    },
    {
      icon: Globe,
      title: 'Global Expeditions',
      description: 'Capturing remote peaks in Patagonia, glacial fjords in Norway, and tranquil temple gardens in Kyoto.',
    },
    {
      icon: ShieldCheck,
      title: 'Original High-Resolution',
      description: 'Instant lossless downloads formatted for ultra-high-definition wallpapers, displays, and fine art prints.',
    },
    {
      icon: HeartHandshake,
      title: 'Photographer Respect',
      description: 'Honoring independent visual naturalists and maritime documentarians worldwide with full attribution.',
    },
  ];

  return (
    <section id="about" className="w-full py-20 px-6 sm:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div
        className={`rounded-3xl p-8 sm:p-14 border transition-colors ${
          darkMode
            ? 'bg-stone-900/60 border-stone-800 text-stone-100'
            : 'bg-[#F9F7F1] border-stone-200 text-stone-900'
        }`}
      >
        <div className="max-w-3xl mb-14">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-2 block">
            The Vision of World Picture
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight mb-6">
            Curated Visual Solace for the Mind
          </h2>
          <p
            className={`text-sm sm:text-base leading-relaxed font-light ${
              darkMode ? 'text-stone-300' : 'text-stone-600'
            }`}
          >
            World Picture was established as a high-end open gallery to counter visual exhaustion. 
            We believe that pausing to study the unhurried elegance of an ocean crest, the symmetry of a flower, 
            or the majesty of a snow leopard restores peace and wonder to everyday life.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <h3 className="text-base font-serif font-bold mb-2">{v.title}</h3>
                <p
                  className={`text-xs leading-relaxed font-light ${
                    darkMode ? 'text-stone-400' : 'text-stone-600'
                  }`}
                >
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Highlight quote */}
        <div className="mt-14 pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <blockquote className="font-serif italic text-sm sm:text-base text-amber-600 dark:text-amber-400">
            &ldquo;Photography is the pause button of the universe.&rdquo;
          </blockquote>
          <span className="text-xs font-mono text-stone-500">
            World Picture · Est. 2026
          </span>
        </div>
      </div>
    </section>
  );
};
