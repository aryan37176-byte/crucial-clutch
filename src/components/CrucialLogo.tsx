import React, { useState } from "react";

interface CrucialLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const CrucialLogo: React.FC<CrucialLogoProps> = ({ className = "", size = "md" }) => {
  const [imgError, setImgError] = useState(false);

  let dimensions = "w-16 h-16";
  if (size === "sm") dimensions = "w-10 h-10";
  if (size === "lg") dimensions = "w-28 h-28";
  if (size === "xl") dimensions = "w-40 h-40";

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`relative ${dimensions} rounded-full bg-gradient-to-br from-zinc-800 via-stone-900 to-black p-1 border-2 border-amber-500/80 shadow-lg shadow-amber-500/20 flex items-center justify-center overflow-hidden`}
      >
        {/* Double circular inner rings */}
        <div className="absolute inset-1 rounded-full border border-amber-600/30 z-10 pointer-events-none"></div>
        <div className="absolute inset-2 rounded-full border border-zinc-800 z-10 pointer-events-none"></div>
        
        {/* Logo Image with fallback to Spartan SVG */}
        {!imgError ? (
          <img 
            src="/logo.jpg" 
            alt="Crucial Clutch Logo" 
            className="w-full h-full object-cover rounded-full z-0"
            onError={() => setImgError(true)}
          />
        ) : (
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-amber-500 hover:text-amber-400 transition-colors drop-shadow-[0_2px_8px_rgba(245,158,11,0.2)] z-0">
            {/* Plumage Brush high-fidelity arched stroke */}
            <path 
              d="M 28,45 Q 26,22 48,15 Q 70,14 74,38" 
              fill="none" 
              stroke="crimson" 
              strokeWidth="7" 
              strokeLinecap="round" 
            />
            {/* Secondary plume design */}
            <path 
              d="M 33,42 Q 30,28 46,22 Q 62,20 68,36" 
              fill="none" 
              stroke="darkred" 
              strokeWidth="3.5" 
            />
            
            {/* Main helmet skull cap */}
            <path 
              d="M 35,46 C 35,32 65,32 65,46 L 68,54 C 69,57 65,55 64,59 L 55,75 C 54,77 52,65 52,62 C 52,59 48,59 48,62 C 48,65 46,77 45,75 L 36,59 C 35,55 31,57 32,54 Z" 
              fill="currentColor" 
              stroke="#1c1917" 
              strokeWidth="2" 
            />
            
            {/* Eye slots cutout / shading */}
            <path d="M 39,49 L 47,52 L 47,48 Z" fill="#030303" />
            <path d="M 61,49 L 53,52 L 53,48 Z" fill="#030303" />
            
            {/* Nose bridge guard */}
            <path d="M 48,46 L 52,46 L 50,60 Z" fill="#2d2a25" />
            
            {/* Cheek guard indentations */}
            <path d="M 35,54 L 43,58 L 37,62 Z" fill="#1c1917" opacity="0.6" />
            <path d="M 65,54 L 57,58 L 63,62 Z" fill="#1c1917" opacity="0.6" />
            
            {/* Gold highlights / engravings lines */}
            <path d="M 40,36 C 45,34 55,34 60,36" fill="none" stroke="gold" strokeWidth="1.5" />
            <path d="M 50,33 L 50,42" fill="none" stroke="gold" strokeWidth="2" />
          </svg>
        )}
      </div>
      <h1 className="font-serif text-amber-500 font-extrabold tracking-widest uppercase text-center mt-2" 
          style={{ fontSize: size === "sm" ? "0.9rem" : size === "md" ? "1.4rem" : size === "lg" ? "2.1rem" : "2.6rem" }}>
        Crucial Clutch
      </h1>
      <span className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase">
        — The Warrior's Directive —
      </span>
    </div>
  );
};
