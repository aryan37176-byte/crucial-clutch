import React from "react";

interface WarriorArtProps {
  priority: number;
  className?: string;
}

export const WarriorArt: React.FC<WarriorArtProps> = ({ priority, className = "" }) => {
  switch (priority) {
    case 20:
    case 40:
      return (
        <div className={`flex flex-col items-center bg-zinc-950/80 p-6 rounded-xl border border-red-950/60 shadow-inner ${className}`}>
          {/* Warrior on knees with sword straight to ground */}
          <svg viewBox="0 0 100 100" className="w-40 h-40 text-rose-700 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2">
            {/* Ground line */}
            <line x1="10" y1="90" x2="90" y2="90" stroke="gray" strokeWidth="3" />
            <line x1="30" y1="90" x2="40" y2="60" stroke="gray" strokeWidth="2" strokeDasharray="2" />
            
            {/* Kneeling torso and thighs */}
            <path d="M 40,80 L 30,90 M 40,80 L 50,85 L 60,90" stroke="currentColor" strokeWidth="3" />
            <path d="M 45,55 L 40,80" stroke="currentColor" strokeWidth="3.5" />
            
            {/* Slumped head with Spartan plumaged helmet */}
            <circle cx="43" cy="42" r="6" fill="#18181b" stroke="currentColor" strokeWidth="2.5" />
            <path d="M 37,38 Q 43,30 45,35" stroke="red" strokeWidth="2.5" />
            <path d="M 40,42 L 35,46" stroke="gray" strokeWidth="2" />
            
            {/* Sword straight in the ground */}
            <line x1="65" y1="45" x2="65" y2="90" stroke="white" strokeWidth="3" />
            {/* Guard */}
            <line x1="58" y1="52" x2="72" y2="52" stroke="gold" strokeWidth="2" />
            {/* Hilt */}
            <line x1="65" y1="45" x2="65" y2="52" stroke="gold" strokeWidth="3" />
            
            {/* Slumped arm reaching to sword */}
            <path d="M 45,58 Q 55,56 65,52" stroke="currentColor" strokeWidth="2.5" strokeDasharray="1" />
            
            {/* Blood drops */}
            <circle cx="50" cy="90" r="1.5" fill="red" stroke="none" />
            <circle cx="58" cy="90" r="1" fill="red" stroke="none" />
          </svg>
          <p className="mt-3 text-xs font-mono text-red-500 uppercase tracking-widest text-center">
            A Warrior on His Knees — Sword Fixed in the Dust
          </p>
          <span className="text-[10px] text-zinc-500 text-center">
            The sword strikes the ground. Self-respect lies shattered.
          </span>
        </div>
      );
      
    case 60:
      return (
        <div className={`flex flex-col items-center bg-zinc-950/80 p-6 rounded-xl border border-red-950/60 shadow-inner ${className}`}>
          {/* Feared on the ground, other king pointing sword */}
          <svg viewBox="0 0 120 100" className="w-48 h-40 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2">
            {/* Battlefield Ground */}
            <line x1="10" y1="90" x2="110" y2="90" stroke="gray" strokeWidth="3" />
            
            {/* Defeated warrior on ground recoiling/cowering */}
            <path d="M 30,90 L 40,82 L 55,87 L 65,90" stroke="gray" strokeWidth="3" />
            <path d="M 40,82 L 32,68 L 22,78" stroke="gray" strokeWidth="2" />
            <circle cx="28" cy="62" r="5" stroke="gray" strokeWidth="2.5" fill="#18181b" />
            {/* Defensive raised hand */}
            <path d="M 32,68 L 45,60" stroke="gray" strokeWidth="2" />
            
            {/* Towering Victorious King */}
            <path d="M 85,90 L 85,60 L 80,40" stroke="currentColor" strokeWidth="3.5" />
            <circle cx="80" cy="34" r="6" stroke="gold" strokeWidth="2.5" fill="#18181b" />
            {/* King's crown */}
            <path d="M 75,30 L 78,24 L 81,28 L 84,24 L 87,30 Z" fill="gold" />
            
            {/* Threatening sword pointed right at cowering warrior's throat */}
            {/* Sword blade */}
            <path d="M 80,48 L 40,58" stroke="red" strokeWidth="2.5" />
            {/* Hilt and guard */}
            <line x1="77" y1="44" x2="83" y2="52" stroke="gold" strokeWidth="3" />
            
            {/* Blood drops */}
            <circle cx="45" cy="59" r="1.5" fill="red" stroke="none" />
          </svg>
          <p className="mt-3 text-xs font-mono text-red-500 uppercase tracking-widest text-center">
            threatened to the throat — feared by other kings
          </p>
          <span className="text-[10px] text-zinc-500 text-center">
            Hovered by the victor, you suffer the threat of ultimate subjugation.
          </span>
        </div>
      );
      
    case 80:
      return (
        <div className={`flex flex-col items-center bg-zinc-950/80 p-6 rounded-xl border border-red-950/60 shadow-inner ${className}`}>
          {/* Bowed down fully begging for life */}
          <svg viewBox="0 0 120 100" className="w-48 h-40 text-amber-600/80" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="10" y1="90" x2="115" y2="90" stroke="gray" strokeWidth="3" />
            
            {/* Bowing defeated warrior begging */}
            <path d="M 25,90 L 35,80 L 50,75 M 35,80 L 30,90" stroke="currentColor" strokeWidth="3" />
            <path d="M 50,75 L 55,85" stroke="currentColor" strokeWidth="3" />
            {/* Hands joined begging on the ground */}
            <path d="M 55,85 Q 65,85 70,89" stroke="currentColor" strokeWidth="2" />
            {/* Head pressed to dust */}
            <circle cx="58" cy="70" r="5.5" stroke="currentColor" strokeWidth="2" fill="#18181b" />
            
            {/* Imperial King standing on throne representation */}
            <path d="M 98,90 L 98,45" stroke="gray" strokeWidth="3" />
            <path d="M 92,45 L 104,45" stroke="gold" strokeWidth="3" />
            <circle cx="98" cy="38" r="7" stroke="gold" strokeWidth="2" />
            {/* Imperial staff of absolute rule */}
            <line x1="88" y1="40" x2="88" y2="90" stroke="gold" strokeWidth="2" />
            <circle cx="88" cy="37" r="3" fill="gold" />
          </svg>
          <p className="mt-3 text-xs font-mono text-amber-500 uppercase tracking-widest text-center">
            prostrated begging for life — covenant broken
          </p>
          <span className="text-[10px] text-zinc-500 text-center">
            You bow low to other kings, offering your submission in exchange for your neglected hours.
          </span>
        </div>
      );
      
    case 100:
      return (
        <div className={`flex flex-col items-center bg-zinc-950/80 p-6 rounded-xl border border-red-950/60 shadow-inner ${className}`}>
          {/* Bhishma Pitamah on bed of arrows */}
          <div className="relative w-full flex justify-center">
            <svg viewBox="0 0 140 90" className="w-56 h-40 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.5">
              {/* Sky backdrop / blood sun */}
              <circle cx="70" cy="25" r="16" fill="#ef4444" opacity="0.15" stroke="none" />
              
              {/* Ground support block */}
              <line x1="10" y1="80" x2="130" y2="80" stroke="#333" strokeWidth="3" />
              
              {/* Arrows forming the bed (pointing up into the warrior's body) */}
              <line x1="25" y1="80" x2="25" y2="55" stroke="gray" strokeWidth="1" />
              <line x1="35" y1="80" x2="35" y2="50" stroke="gray" strokeWidth="1" />
              <line x1="45" y1="80" x2="45" y2="52" stroke="gray" strokeWidth="1" />
              <line x1="55" y1="80" x2="55" y2="50" stroke="gray" strokeWidth="1" />
              <line x1="65" y1="80" x2="65" y2="53" stroke="gray" strokeWidth="1" />
              <line x1="75" y1="80" x2="75" y2="51" stroke="gray" strokeWidth="1" />
              <line x1="85" y1="80" x2="85" y2="52" stroke="gray" strokeWidth="1" />
              <line x1="95" y1="80" x2="95" y2="50" stroke="gray" strokeWidth="1" />
              <line x1="105" y1="80" x2="105" y2="54" stroke="gray" strokeWidth="1" />
              <line x1="115" y1="80" x2="115" y2="55" stroke="gray" strokeWidth="1" />
              
              {/* Feathers on arrows on the bottom ground */}
              <path d="M 23,80 L 27,80" stroke="gray" />
              <path d="M 33,80 L 37,80" stroke="gray" />
              <path d="M 53,80 L 57,80" stroke="gray" />
              <path d="M 73,80 L 77,80" stroke="gray" />
              <path d="M 93,80 L 97,80" stroke="gray" />
              <path d="M 113,80 L 117,80" stroke="gray" />
              
              {/* Dying Warrior resting horizontally in mid-air on the arrow shafts */}
              {/* Torso & Head */}
              <path d="M 20,50 L 120,53" stroke="white" strokeWidth="4" strokeLinecap="round" />
              <circle cx="20" cy="46" r="6.5" stroke="gold" strokeWidth="1.5" fill="#18181b" />
              {/* Helmet lying nearby or on head */}
              <path d="M 14,42 Q 20,34 24,38" stroke="red" strokeWidth="1.5" />
              
              {/* Legs horizontal */}
              <path d="M 120,53 L 130,55" stroke="gray" strokeWidth="3" />
              
              {/* Hand resting on chest holding failed banner */}
              <path d="M 45,51 L 70,30" stroke="currentColor" strokeWidth="1.5" />
              <path d="M 70,30 L 85,25 L 75,35 Z" fill="red" opacity="0.4" />
              
              {/* Arrows sticking through the body */}
              <line x1="38" y1="44" x2="48" y2="60" stroke="#f43f5e" strokeWidth="1.5" />
              <line x1="62" y1="42" x2="68" y2="58" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="1" />
              <line x1="88" y1="43" x2="94" y2="61" stroke="#f43f5e" strokeWidth="1.5" />
              
              {/* Ground debris */}
              <circle cx="5" cy="80" r="2" fill="dimgray" />
              <circle cx="135" cy="80" r="1.5" fill="dimgray" />
            </svg>
          </div>
          <p className="mt-3 text-xs font-mono text-rose-500 uppercase tracking-widest text-center">
            DEAD IN COMBAT — LAYING ON THE BED OF ARROWS
          </p>
          <span className="text-[10px] text-zinc-500 text-center">
            Like Pitamaha Bhishma in Mahabharata, you lie pinned by absolute failure. 100% duty was forsaken.
          </span>
        </div>
      );
      
    default:
      return null;
  }
};
