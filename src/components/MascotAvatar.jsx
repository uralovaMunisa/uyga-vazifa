import React, { useState } from 'react';

/**
 * Animated SVG Mascot Component supporting Barnaby Owl, Pip Bot, and Sparky Fox.
 * Handles states: idle, thinking, reading, cheering, talking.
 */
export default function MascotAvatar({ mascotId = 'barnaby', mood = 'idle', size = 'md', className = '' }) {
  const [isWinking, setIsWinking] = useState(false);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
    xl: 'w-36 h-36',
  }[size] || 'w-20 h-20';

  const handleClick = () => {
    setIsWinking(true);
    setTimeout(() => setIsWinking(false), 900);
  };

  return (
    <div
      onClick={handleClick}
      title="Click me for a wink!"
      className={`relative inline-flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 select-none ${sizeClasses} ${className}`}
    >
      {mascotId === 'pip' ? (
        <PipBotSvg mood={mood} isWinking={isWinking} />
      ) : mascotId === 'sparky' ? (
        <SparkyFoxSvg mood={mood} isWinking={isWinking} />
      ) : (
        <BarnabyOwlSvg mood={mood} isWinking={isWinking} />
      )}

      {/* Cheering stars badge when mood is cheering */}
      {mood === 'cheering' && (
        <span className="absolute -top-1 -right-1 text-lg animate-bounce">
          ✨
        </span>
      )}
    </div>
  );
}

function BarnabyOwlSvg({ mood, isWinking }) {
  const isThinking = mood === 'thinking' || mood === 'reading';
  const isCheering = mood === 'cheering';

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
      {/* Body Gradient */}
      <defs>
        <linearGradient id="owlBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="100%" stop-color="#0284c7" />
        </linearGradient>
        <linearGradient id="owlBelly" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#e0f2fe" />
        </linearGradient>
      </defs>

      {/* Ear Tufts */}
      <polygon points="22,35 15,15 38,25" fill="#0369a1" />
      <polygon points="78,35 85,15 62,25" fill="#0369a1" />

      {/* Main Body */}
      <ellipse cx="50" cy="54" rx="38" ry="40" fill="url(#owlBody)" />

      {/* Belly */}
      <ellipse cx="50" cy="62" rx="26" ry="26" fill="url(#owlBelly)" />

      {/* Belly feathers pattern */}
      <path d="M42,54 Q50,60 58,54" fill="none" stroke="#bae6fd" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40,64 Q50,70 60,64" fill="none" stroke="#bae6fd" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M44,74 Q50,79 56,74" fill="none" stroke="#bae6fd" strokeWidth="2.5" strokeLinecap="round" />

      {/* Big Eyes White */}
      <circle cx="34" cy="42" r="14" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
      <circle cx="66" cy="42" r="14" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />

      {/* Eyeballs / Pupils */}
      {isThinking ? (
        <>
          {/* Eyes looking up thinking */}
          <circle cx="34" cy="36" r="6" fill="#1e293b" />
          <circle cx="66" cy="36" r="6" fill="#1e293b" />
          <circle cx="36" cy="34" r="2" fill="#ffffff" />
          <circle cx="68" cy="34" r="2" fill="#ffffff" />
        </>
      ) : isWinking ? (
        <>
          {/* Winking left eye */}
          <path d="M26,42 Q34,48 42,42" fill="none" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="66" cy="42" r="7" fill="#1e293b" />
          <circle cx="68" cy="40" r="2.5" fill="#ffffff" />
        </>
      ) : isCheering ? (
        <>
          {/* Joyful squinting curved eyes */}
          <path d="M26,44 Q34,35 42,44" fill="none" stroke="#0369a1" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M58,44 Q66,35 74,44" fill="none" stroke="#0369a1" strokeWidth="3.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* Regular friendly big eyes */}
          <circle cx="34" cy="42" r="7" fill="#0f172a" />
          <circle cx="66" cy="42" r="7" fill="#0f172a" />
          <circle cx="36" cy="39" r="2.5" fill="#ffffff" />
          <circle cx="68" cy="39" r="2.5" fill="#ffffff" />
        </>
      )}

      {/* Glasses Frames (Wise Owl!) */}
      <circle cx="34" cy="42" r="15" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
      <circle cx="66" cy="42" r="15" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
      <line x1="49" y1="42" x2="51" y2="42" stroke="#f59e0b" strokeWidth="3" />

      {/* Orange Beak */}
      <polygon points="50,47 43,58 57,58" fill="#f97316" />

      {/* Graduation Cap / Scholar Hat */}
      <g transform="translate(50, 18)">
        <polygon points="0,-10 32,-2 0,6 -32,-2" fill="#1e293b" />
        <rect x="-14" y="2" width="28" height="6" rx="2" fill="#0f172a" />
        {/* Yellow tassel */}
        <line x1="0" y1="-2" x2="22" y2="8" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
        <circle cx="23" cy="9" r="2.5" fill="#facc15" />
      </g>

      {/* Feet */}
      <ellipse cx="40" cy="93" rx="6" ry="3" fill="#f97316" />
      <ellipse cx="60" cy="93" rx="6" ry="3" fill="#f97316" />
    </svg>
  );
}

function PipBotSvg({ mood, isWinking }) {
  const isThinking = mood === 'thinking' || mood === 'reading';
  const isCheering = mood === 'cheering';

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="botGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#c084fc" />
          <stop offset="100%" stop-color="#7e22ce" />
        </linearGradient>
      </defs>

      {/* Antenna */}
      <line x1="50" y1="18" x2="50" y2="6" stroke="#9333ea" strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="6" r="5" fill="#f43f5e" className={isThinking ? 'animate-ping' : ''} />
      <circle cx="50" cy="6" r="4" fill="#fb7185" />

      {/* Ears / Bolts */}
      <rect x="14" y="42" width="6" height="14" rx="2" fill="#9333ea" />
      <rect x="80" y="42" width="6" height="14" rx="2" fill="#9333ea" />

      {/* Head */}
      <rect x="18" y="22" width="64" height="54" rx="16" fill="url(#botGrad)" stroke="#6b21a8" strokeWidth="2.5" />

      {/* Screen Face */}
      <rect x="25" y="30" width="50" height="38" rx="10" fill="#0f172a" />

      {/* Digital Eyes */}
      {isThinking ? (
        <>
          {/* Swirling dots */}
          <circle cx="38" cy="46" r="4" fill="#38bdf8" />
          <circle cx="62" cy="46" r="4" fill="#38bdf8" />
        </>
      ) : isWinking ? (
        <>
          <line x1="32" y1="46" x2="44" y2="46" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
          <circle cx="62" cy="46" r="6" fill="#4ade80" />
        </>
      ) : isCheering ? (
        <>
          <path d="M32,48 Q38,40 44,48" fill="none" stroke="#facc15" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M56,48 Q62,40 68,48" fill="none" stroke="#facc15" strokeWidth="3.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="38" cy="46" r="5.5" fill="#38bdf8" />
          <circle cx="62" cy="46" r="5.5" fill="#38bdf8" />
        </>
      )}

      {/* Pixel Smile */}
      <path d="M42,58 Q50,65 58,58" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />

      {/* Neck */}
      <rect x="42" y="76" width="16" height="6" fill="#6b21a8" />

      {/* Cute Shoulders */}
      <rect x="28" y="82" width="44" height="14" rx="6" fill="url(#botGrad)" />
    </svg>
  );
}

function SparkyFoxSvg({ mood, isWinking }) {
  const isThinking = mood === 'thinking' || mood === 'reading';
  const isCheering = mood === 'cheering';

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="foxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fb923c" />
          <stop offset="100%" stop-color="#ea580c" />
        </linearGradient>
      </defs>

      {/* Big Fox Ears */}
      <polygon points="20,40 12,12 42,26" fill="url(#foxGrad)" />
      <polygon points="20,36 17,18 36,26" fill="#ffffff" />

      <polygon points="80,40 88,12 58,26" fill="url(#foxGrad)" />
      <polygon points="80,36 83,18 64,26" fill="#ffffff" />

      {/* Head */}
      <ellipse cx="50" cy="54" rx="36" ry="32" fill="url(#foxGrad)" />

      {/* White Cheeks */}
      <path d="M18,52 C26,74 46,78 50,74 C54,78 74,74 82,52 C74,64 58,68 50,64 C42,68 26,64 18,52 Z" fill="#ffffff" />

      {/* Eyes */}
      {isThinking ? (
        <>
          <circle cx="36" cy="48" r="5" fill="#1e293b" />
          <circle cx="64" cy="48" r="5" fill="#1e293b" />
          <circle cx="38" cy="46" r="1.5" fill="#ffffff" />
          <circle cx="66" cy="46" r="1.5" fill="#ffffff" />
        </>
      ) : isWinking ? (
        <>
          <path d="M30,48 Q36,54 42,48" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
          <circle cx="64" cy="48" r="5" fill="#1e293b" />
        </>
      ) : isCheering ? (
        <>
          <path d="M30,48 Q36,42 42,48" fill="none" stroke="#7c2d12" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M58,48 Q64,42 70,48" fill="none" stroke="#7c2d12" strokeWidth="3.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="36" cy="48" r="5.5" fill="#1e293b" />
          <circle cx="64" cy="48" r="5.5" fill="#1e293b" />
          <circle cx="38" cy="46" r="2" fill="#ffffff" />
          <circle cx="66" cy="46" r="2" fill="#ffffff" />
        </>
      )}

      {/* Nose */}
      <ellipse cx="50" cy="62" rx="4.5" ry="3.5" fill="#1e293b" />

      {/* Mouth */}
      <path d="M46,65 Q50,70 54,65" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

