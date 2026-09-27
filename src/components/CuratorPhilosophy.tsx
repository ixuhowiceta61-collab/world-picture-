import React from 'react';
import { Feather, HeartHandshake, Compass, Trees } from 'lucide-react';

export const CuratorPhilosophy: React.FC = () => {
  return (
    <section id="philosophy" className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-20">
      <div className="border-t border-stone-200/80 pt-16">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold mb-2 block">
            Sanctuary Notes
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight mb-4">
            Art as Sanctuary: The Healing Cadence of the Earth
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed font-light">
            In an era of relentless algorithmic velocity and visual clamor, Aura Gallery exists
            as an intentional haven. We cultivate a restorative dialogue between the wild majesty
            of nature and the human impulse toward beauty.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="p-8 rounded-2xl bg-[#F6F4ED] border border-stone-200/60 transition-transform duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 mb-6">
              <Trees className="w-5 h-5 stroke-1.5" />
            </div>
            <h3 className="text-lg font-serif font-semibold text-stone-900 mb-2">
              Biophilic Restoration
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Cognitive neuroscience confirms that visual immersion in natural fractals—canopies,
              ocean swells, alpine ridges—downregulates the nervous system and fosters an enduring sense of calm.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#F6F4ED] border border-stone-200/60 transition-transform duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-800 mb-6">
              <Compass className="w-5 h-5 stroke-1.5" />
            </div>
            <h3 className="text-lg font-serif font-semibold text-stone-900 mb-2">
              Unrushed Contemplation
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Every piece in our permanent curation is chosen for its ability to hold quiet attention.
              No ephemeral trends or manufactured urgency—only timeless encounters with light and silence.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#F6F4ED] border border-stone-200/60 transition-transform duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-900 mb-6">
              <Feather className="w-5 h-5 stroke-1.5" />
            </div>
            <h3 className="text-lg font-serif font-semibold text-stone-900 mb-2">
              Artisan Craft & Light
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              From platinum palladium and handmade Japanese washi prints to pure earth pigments, our
              artists prioritize organic tactile resonance that honors the living world.
            </p>
          </div>

        </div>

        {/* Curatorial Quote Box */}
        <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-full bg-emerald-900 text-stone-100 flex items-center justify-center font-serif text-2xl font-bold shrink-0">
            AG
          </div>
          <div className="flex-1 text-center md:text-left">
            <blockquote className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed mb-3">
              &ldquo;May every visitor who crosses this threshold carry away a renewed sense of peace,
              a reverence for the silent living earth, and a quiet joy in the heart.&rdquo;
            </blockquote>
            <div className="text-xs text-stone-500">
              <span className="font-semibold text-stone-800">The Curatorial Board</span>
              <span aria-hidden="true" className="mx-2">·</span>
              <span>Aura Gallery Foundation</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
