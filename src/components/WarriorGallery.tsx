import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sword, Shield, Flame, Award, Sparkles, Check, User, Quote, BookOpen } from "lucide-react";

export interface Warrior {
  id: string;
  name: string;
  type: string;
  image: string;
  quote: string;
  bio: string;
  stats: {
    willpower: number;
    discipline: number;
    honor: number;
    focus: number;
  };
}

export const WARRIORS_DATA: Warrior[] = [
  {
    id: "spartan_cliff",
    name: "Leonidas of the Sunset",
    type: "Spartan Commander",
    image: "/src/assets/images/spartan_cliff_sunset_1782274848517.jpg",
    quote: "He who conquers himself is the mightiest warrior.",
    bio: "Standing on the sheer edge of the Spartan cliffs, Leonidas peers into the fiery sunset, resolving to never let down his shield of commitments.",
    stats: { willpower: 98, discipline: 95, honor: 99, focus: 90 }
  },
  {
    id: "arjuna_archer",
    name: "Arjuna of Kurukshetra",
    type: "Mahabharat Archer",
    image: "/src/assets/images/indian_archer_mahabharat_1782274871068.jpg",
    quote: "Focus on the eye of the bird; let everything else fade into dust.",
    bio: "In the center of the world's greatest battle, Arjuna stands upon his dynamic golden chariot, raising his divine bow Gandiva. He strikes down laziness and doubt with thunderous commitments.",
    stats: { willpower: 99, discipline: 98, honor: 97, focus: 100 }
  },
  {
    id: "meditating_yogi",
    name: "Sage of the Sacred Peak",
    type: "Yogi Ascetic",
    image: "/src/assets/images/meditating_yogi_armor_1782274886427.jpg",
    quote: "The soul's absolute weapon is perfect stillness.",
    bio: "He sits in serene meditation on the highest mountain peak. Beside him lies empty gold armor, indicating that true victory is won on the inner battlefield of self-restraint.",
    stats: { willpower: 100, discipline: 99, honor: 95, focus: 98 }
  },
  {
    id: "viking_peaks",
    name: "Ragnar of the Frost",
    type: "Norse Warlord",
    image: "/src/assets/images/viking_snow_storm_1782274899206.jpg",
    quote: "Fear is a temporary shadow. Discipline is an eternal shield.",
    bio: "Charging through the heavy snowstorms of the northern valleys, Ragnar wields his heavy battle-axe, greeting tempestuous deadlines as training grounds.",
    stats: { willpower: 96, discipline: 94, honor: 96, focus: 92 }
  },
  {
    id: "centurion_gate",
    name: "Decimus the Guard",
    type: "Roman Centurion",
    image: "/src/assets/images/centurion_stone_gate_1782274915989.jpg",
    quote: "Let your shield be your duty, and your sword your unwavering focus.",
    bio: "Decimus stands sentinel at the massive ancient stone gateway under a glowing crescent moon, maintaining strict watch over the flow of hours.",
    stats: { willpower: 95, discipline: 100, honor: 98, focus: 96 }
  },
  {
    id: "gladiator_colosseum",
    name: "Maximus of the Arena",
    type: "Gladiator Champion",
    image: "https://images.unsplash.com/photo-1599733589046-9b8308b5b50d?auto=format&fit=crop&q=80&w=600",
    quote: "What we do in life echoes in the chambers of eternity.",
    bio: "Forged in the blood and dust of the Colosseum arena, his ultimate focus is on immediate clutch survival against waves of procrastination.",
    stats: { willpower: 97, discipline: 93, honor: 96, focus: 95 }
  },
  {
    id: "samurai_shogun",
    name: "Musashi of the Blade",
    type: "Zen Samurai",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600",
    quote: "There is nothing outside of yourself that can ever enable you to get better.",
    bio: "Wielding his katanas under lightning-charged stormy skies, Musashi follows the Bushido code of strict action and zero empty excuses.",
    stats: { willpower: 99, discipline: 97, honor: 98, focus: 99 }
  },
  {
    id: "gilded_paladin",
    name: "Sir Galahad the Pure",
    type: "Medieval Paladin",
    image: "https://images.unsplash.com/photo-1615555198950-8b1b11ca0e65?auto=format&fit=crop&q=80&w=600",
    quote: "Honor is the golden harness that keeps the spirit aligned with virtue.",
    bio: "Standing firm in golden steel armor at the castle threshold, Galahad's iron resolve guards his sacred covenants against external temptations.",
    stats: { willpower: 94, discipline: 98, honor: 100, focus: 92 }
  },
  {
    id: "kyudo_archer",
    name: "Master Kenzo",
    type: "Zen Archery Master",
    image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&q=80&w=600",
    quote: "The shot is already hit if the mind is perfectly composed.",
    bio: "A master of Kyudo, Kenzo fires his arrow with absolute calm, viewing each daily chore not as a burden, but as a path to spiritual perfection.",
    stats: { willpower: 92, discipline: 99, honor: 94, focus: 97 }
  },
  {
    id: "coliseum_sentinel",
    name: "Sentinel of Rome",
    type: "Imperial Centurion",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=600",
    quote: "No general ever won a battle by ignoring his scouts' alarms.",
    bio: "He guides the legionaries through the ancient city, ensuring that no dispatch is lost and no command is left unexecuted.",
    stats: { willpower: 93, discipline: 97, honor: 98, focus: 94 }
  },
  {
    id: "stone_blade",
    name: "The Sovereign Claymore",
    type: "Legendary Relic",
    image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=600",
    quote: "Only the hand that commands itself can pull the blade of destiny.",
    bio: "Fixed deep into the sacred granite rock, this epic golden sword awaits the true warrior who has conquered his inner sluggishness.",
    stats: { willpower: 100, discipline: 96, honor: 95, focus: 95 }
  },
  {
    id: "fortress_will",
    name: "Citadel of Obsidian",
    type: "Fortress of Resolve",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600",
    quote: "Build your citadel on the solid rock of daily habits.",
    bio: "A massive, impregnable dark fortress that stands firm against storms, symbolizing a mind that has completed its daily duties.",
    stats: { willpower: 98, discipline: 100, honor: 92, focus: 91 }
  },
  {
    id: "vanguard_shields",
    name: "Shields of Sparta",
    type: "Phalanx Defensive Line",
    image: "https://images.unsplash.com/photo-1601987177651-8edfe6c20009?auto=format&fit=crop&q=80&w=600",
    quote: "Come back with your shield, or upon it.",
    bio: "A wall of overlapping heavy bronze shields, protecting the warrior's life goals from the devastating arrows of neglected deadlines.",
    stats: { willpower: 97, discipline: 99, honor: 99, focus: 93 }
  },
  {
    id: "shadow_stallion",
    name: "The Charger of Resolve",
    type: "War Steed",
    image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&q=80&w=600",
    quote: "Speed in execution is the ultimate weapon against procrastination.",
    bio: "A swift and powerful black stallion charging through the morning mist, representing instant, unhesitating movement towards commitments.",
    stats: { willpower: 95, discipline: 92, honor: 94, focus: 98 }
  },
  {
    id: "athens_pillars",
    name: "Acropolis of Wisdom",
    type: "Temple of Knowledge",
    image: "https://images.unsplash.com/photo-1503152394-c571994fd383?auto=format&fit=crop&q=80&w=600",
    quote: "We are what we repeatedly do. Excellence is not an act, but a habit.",
    bio: "The ruins of the ancient Athenian academy, honoring centuries of philosophers and commanders who achieved greatness through absolute code.",
    stats: { willpower: 96, discipline: 98, honor: 96, focus: 95 }
  }
];

interface WarriorGalleryProps {
  onSelectMascot: (warrior: Warrior) => void;
  selectedMascotId?: string;
  themeColor?: string;
}

export const WarriorGallery: React.FC<WarriorGalleryProps> = ({
  onSelectMascot,
  selectedMascotId = "spartan_cliff",
  themeColor = "#f59e0b"
}) => {
  const [selectedWarrior, setSelectedWarrior] = useState<Warrior | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 via-rose-700 to-amber-500 opacity-60"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Divine Pantheon Registry</span>
            </div>
            <h2 className="text-xl font-serif text-amber-400 uppercase tracking-wider mt-1">
              Pantheon of Legends
            </h2>
            <p className="text-xs text-zinc-400 max-w-2xl mt-1">
              Browse these 15 legendary warrior archetypes, representing peak willpower and discipline. Click any warrior card to study their attributes, review their biography, and elect them as your active Chamber Mascot!
            </p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-lg flex items-center gap-3 shrink-0">
            <User className="w-4 h-4 text-amber-500" />
            <div className="text-left">
              <p className="text-[9px] text-zinc-500 font-mono uppercase leading-none">Chamber Mascot</p>
              <p className="text-xs font-bold text-zinc-100 font-serif mt-0.5">
                {WARRIORS_DATA.find(w => w.id === selectedMascotId)?.name || "Leonidas"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of 15 Warriors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {WARRIORS_DATA.map((warrior, index) => {
          const isSelected = warrior.id === selectedMascotId;
          return (
            <motion.div
              key={warrior.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.4 }}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setSelectedWarrior(warrior)}
              className={`cursor-pointer bg-zinc-950 border-2 rounded-xl overflow-hidden shadow-lg transition-all duration-300 relative group flex flex-col justify-between ${
                isSelected
                  ? "border-amber-500 shadow-amber-500/10"
                  : "border-zinc-900 hover:border-zinc-700 hover:shadow-black/60"
              }`}
            >
              <div>
                {/* Image Section */}
                <div className="relative aspect-square overflow-hidden bg-zinc-900">
                  <img
                    src={warrior.image}
                    alt={warrior.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                  
                  {/* Badge */}
                  <span className="absolute top-2.5 left-2.5 bg-black/85 text-[8px] font-mono tracking-wider font-extrabold text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded uppercase">
                    {warrior.type}
                  </span>

                  {isSelected && (
                    <span className="absolute top-2.5 right-2.5 bg-amber-500 text-black rounded-full p-1 shadow-md shadow-amber-500/20">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-3.5 space-y-2">
                  <h3 className="font-serif text-sm text-zinc-100 group-hover:text-amber-400 transition-colors font-bold tracking-wide">
                    {warrior.name}
                  </h3>
                  <p className="text-[11px] text-zinc-400 italic line-clamp-2 leading-relaxed">
                    "{warrior.quote}"
                  </p>
                </div>
              </div>

              {/* Stats & Footer */}
              <div className="p-3 pt-0 border-t border-zinc-900/60 flex items-center justify-between text-[10px] font-mono text-zinc-500 bg-zinc-900/10">
                <div className="flex items-center gap-1">
                  <Flame className="w-3 h-3 text-red-500" />
                  <span>Will: {warrior.stats.willpower}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-500" />
                  <span>Focus: {warrior.stats.focus}%</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal View for Selected Warrior */}
      <AnimatePresence>
        {selectedWarrior && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-4xl bg-zinc-950 border-2 border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row shadow-black"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedWarrior(null)}
                className="absolute top-4 right-4 bg-black/80 hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-full p-2 border border-zinc-800 transition-colors z-10"
              >
                ✕
              </button>

              {/* Image Column */}
              <div className="w-full md:w-1/2 relative bg-zinc-900">
                <img
                  src={selectedWarrior.image}
                  alt={selectedWarrior.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover min-h-[300px] md:min-h-[480px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/35"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 border border-zinc-900/80 p-3 rounded-lg backdrop-blur-sm">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-amber-500 font-bold block mb-1">
                    {selectedWarrior.type}
                  </span>
                  <p className="font-serif text-sm font-semibold text-zinc-100 italic">
                    "{selectedWarrior.quote}"
                  </p>
                </div>
              </div>

              {/* Stats & Biography Column */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-serif font-extrabold text-amber-400 tracking-wider">
                      {selectedWarrior.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5 uppercase tracking-widest">
                      Legendary Avatar Profile
                    </p>
                  </div>

                  <div className="border-t border-zinc-900 pt-4 space-y-2.5">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                      Biography & History
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {selectedWarrior.bio}
                    </p>
                  </div>

                  {/* Attributes and Skills */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Sword className="w-3.5 h-3.5 text-amber-500" />
                      Attributes Matrix
                    </span>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {/* Willpower */}
                      <div className="space-y-1 bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-900">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-zinc-450">Willpower</span>
                          <span className="text-red-400 font-bold">{selectedWarrior.stats.willpower}%</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-red-500 h-full" style={{ width: `${selectedWarrior.stats.willpower}%` }}></div>
                        </div>
                      </div>

                      {/* Discipline */}
                      <div className="space-y-1 bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-900">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-zinc-450">Discipline</span>
                          <span className="text-amber-400 font-bold">{selectedWarrior.stats.discipline}%</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full" style={{ width: `${selectedWarrior.stats.discipline}%` }}></div>
                        </div>
                      </div>

                      {/* Honor */}
                      <div className="space-y-1 bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-900">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-zinc-450">Honor</span>
                          <span className="text-emerald-400 font-bold">{selectedWarrior.stats.honor}%</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full" style={{ width: `${selectedWarrior.stats.honor}%` }}></div>
                        </div>
                      </div>

                      {/* Focus */}
                      <div className="space-y-1 bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-900">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-zinc-450">Focus Mastery</span>
                          <span className="text-blue-400 font-bold">{selectedWarrior.stats.focus}%</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full" style={{ width: `${selectedWarrior.stats.focus}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      onSelectMascot(selectedWarrior);
                      setSelectedWarrior(null);
                    }}
                    className={`flex-1 font-serif text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 ${
                      selectedWarrior.id === selectedMascotId
                        ? "bg-zinc-800 text-zinc-400 border border-zinc-750 cursor-default"
                        : "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-black border border-amber-400/35 hover:shadow-lg hover:shadow-amber-500/10"
                    }`}
                    disabled={selectedWarrior.id === selectedMascotId}
                  >
                    <Shield className="w-4 h-4" />
                    {selectedWarrior.id === selectedMascotId
                      ? "Currently Selected Mascot"
                      : "Erect as Chamber Mascot"}
                  </button>
                  <button
                    onClick={() => setSelectedWarrior(null)}
                    className="px-5 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 font-serif text-xs font-bold py-2.5 rounded-lg border border-zinc-800 transition-colors uppercase tracking-wider"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
