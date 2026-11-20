import React from 'react';
import { Flame, Star, Sparkles, Key, Award, Volume2, VolumeX, RefreshCw, Languages, GraduationCap } from 'lucide-react';
import MascotAvatar from './MascotAvatar';
import { MASCOTS } from '../data/mascotData';
import { sounds } from '../services/audioService';
import { TRANSLATIONS } from '../data/translations';

export default function MascotHeader({
  currentMascotId = 'barnaby',
  onSelectMascot,
  mascotMood = 'idle',
  speechBubbleText = '',
  stars = 45,
  streak = 3,
  level = 3,
  soundEnabled = true,
  onToggleSound,
  language = 'uz',
  onToggleLanguage,
  mode = 'pro',
  onToggleMode,
  onOpenStreakModal,
  onOpenApiModal,
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.uz;
  const currentMascot = MASCOTS.find(m => m.id === currentMascotId) || MASCOTS[0];

  const handleCycleMascot = () => {
    sounds.playPop();
    const currentIndex = MASCOTS.findIndex(m => m.id === currentMascotId);
    const nextIndex = (currentIndex + 1) % MASCOTS.length;
    onSelectMascot(MASCOTS[nextIndex].id);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs transition-all">
      <div className="max-w-6xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
        
        {/* Left: Brand & Mascot Hero */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div 
            onClick={handleCycleMascot}
            title={t.header.changeTutor}
            className="group relative cursor-pointer flex-shrink-0"
          >
            <MascotAvatar mascotId={currentMascotId} mood={mascotMood} size="sm" className="sm:hidden" />
            <MascotAvatar mascotId={currentMascotId} mood={mascotMood} size="md" className="hidden sm:inline-flex" />
            <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-slate-200 text-[10px] group-hover:rotate-180 transition-transform">
              <RefreshCw className="w-2.5 h-2.5 text-sky-600" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="font-bubble text-xl sm:text-2xl font-bold bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                StudyBuddy<span className="text-amber-500 font-extrabold">.AI</span>
              </h1>
              
              {/* Audience Mode Toggle */}
              <button
                type="button"
                onClick={() => {
                  sounds.playPop();
                  onToggleMode();
                }}
                className={`hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold transition-all ${
                  mode === 'pro'
                    ? 'bg-purple-100 text-purple-800 border border-purple-300 shadow-2xs'
                    : 'bg-amber-100 text-amber-800 border border-amber-300 shadow-2xs'
                }`}
                title="Rejimni almashtirish"
              >
                {mode === 'pro' ? (
                  <>
                    <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                    <span>{t.modes.pro}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t.modes.kid}</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
              <span>{t.header.tutor}</span>
              <button 
                onClick={handleCycleMascot}
                className="font-bold text-sky-600 hover:text-sky-700 underline decoration-dotted decoration-sky-300"
              >
                {language === 'uz' ? currentMascot.name : currentMascot.nameEn}
              </button>
              <span className="hidden sm:inline text-slate-400">• {language === 'uz' ? currentMascot.tagline : currentMascot.taglineEn}</span>
            </p>
          </div>
        </div>

        {/* Center / Mascot Speech bubble on Desktop */}
        {speechBubbleText && (
          <div className="hidden lg:flex items-center flex-1 max-w-sm mx-3 bg-sky-50 border border-sky-200 rounded-2xl px-3.5 py-1.5 shadow-2xs text-xs font-semibold text-sky-900 animate-float-y">
            <span className="mr-1.5 text-base">💬</span>
            <span className="truncate">{speechBubbleText}</span>
          </div>
        )}

        {/* Right: Gamification Badges, Language Switcher & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          
          {/* Language Switcher Button (UZ / EN) */}
          <button
            onClick={() => {
              sounds.playPop();
              onToggleLanguage();
            }}
            title="Tilni o'zgartirish / Change Language"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-slate-100 hover:bg-sky-50 border border-slate-200 text-slate-700 hover:text-sky-700 font-bold text-xs transition-all active:scale-95"
          >
            <Languages className="w-3.5 h-3.5 text-sky-600" />
            <span className="font-bubble">{language === 'uz' ? 'O‘zbekcha 🇺🇿' : 'English 🇬🇧'}</span>
          </button>

          {/* Mode toggle button on mobile */}
          <button
            onClick={() => {
              sounds.playPop();
              onToggleMode();
            }}
            className="md:hidden p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold"
            title="Rejimni almashtirish"
          >
            {mode === 'pro' ? '🎓' : '🧸'}
          </button>

          {/* Streak Counter */}
          <button
            onClick={() => {
              sounds.playPop();
              onOpenStreakModal();
            }}
            title={t.header.streakDays}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 hover:border-orange-300 hover:shadow-xs transition-all active:scale-95"
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
            <span className="font-bubble text-sm font-bold text-orange-600">
              {streak}
            </span>
          </button>

          {/* Stars Earned */}
          <button
            onClick={() => {
              sounds.playStar();
              onOpenStreakModal();
            }}
            title={t.header.stars}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 hover:border-yellow-300 hover:shadow-xs transition-all active:scale-95"
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-400 animate-spin-slow" />
            <span className="font-bubble text-sm font-bold text-amber-600">
              {stars}
            </span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={() => {
              sounds.playPop();
              onToggleSound();
            }}
            title={soundEnabled ? t.header.soundOn : t.header.soundOff}
            className="p-1.5 sm:p-2 rounded-xl text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition-colors"
            aria-label="Toggle Sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-sky-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* API Key Modal Button */}
          <button
            onClick={() => {
              sounds.playPop();
              onOpenApiModal();
            }}
            title={t.header.apiSettings}
            className="p-1.5 sm:p-2 rounded-xl text-slate-500 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            aria-label="API Settings"
          >
            <Key className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
