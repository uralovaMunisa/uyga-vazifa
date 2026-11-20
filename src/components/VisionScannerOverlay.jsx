import React from 'react';
import MascotAvatar from './MascotAvatar';
import { Sparkles, Scan, Eye } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function VisionScannerOverlay({
  currentMascotId = 'barnaby',
  progress = { stage: 'scanning', percent: 30, message: '' },
  inputMode = 'image',
  imageSrc = null,
  language = 'uz',
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.uz;

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl border-2 border-sky-300 shadow-2xl p-6 sm:p-10 my-6 text-center overflow-hidden relative">
      
      {/* Decorative gradient background circles */}
      <div className="absolute -top-16 -left-16 w-40 h-40 bg-sky-200/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-purple-200/40 rounded-full blur-2xl pointer-events-none" />

      {/* Center Image Scanner Visual if image mode */}
      {inputMode === 'image' && imageSrc && (
        <div className="relative max-w-sm mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-sky-400 shadow-lg bg-slate-900 h-48 sm:h-56">
          <img
            src={imageSrc}
            alt="Scanning homework"
            className="w-full h-full object-cover opacity-80"
          />

          {/* Glowing Laser Scan Line */}
          <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scan-line" />

          {/* HUD Targeting Box */}
          <div className="absolute inset-4 border-2 border-dashed border-cyan-300/60 rounded-xl flex items-center justify-center">
            <span className="bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 shadow">
              <Scan className="w-3.5 h-3.5 animate-spin-slow" />
              <span>{t.scanner.hudActive}</span>
            </span>
          </div>

          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-700 shadow animate-bounce-slow">
            {t.scanner.readingBadge}
          </div>
        </div>
      )}

      {/* Mascot Animated Avatar */}
      <div className="relative inline-block mb-4">
        <MascotAvatar mascotId={currentMascotId} mood="reading" size="lg" />
        <span className="absolute -bottom-2 -right-2 bg-amber-400 text-amber-950 p-1.5 rounded-full shadow border-2 border-white animate-bounce">
          <Eye className="w-4 h-4" />
        </span>
      </div>

      {/* Status Title & Message */}
      <h3 className="font-bubble text-xl sm:text-2xl font-bold text-slate-800 mb-2">
        {progress.message || t.scanner.title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
        {t.scanner.desc}
      </p>

      {/* Progress Bar */}
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between text-xs font-bold text-sky-800 mb-1.5 px-1">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400 animate-spin" />
            <span>{t.scanner.aiProcessing}</span>
          </span>
          <span>{progress.percent || 45}%</span>
        </div>

        <div className="w-full h-3.5 bg-sky-100 rounded-full overflow-hidden p-0.5 border border-sky-200">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${progress.percent || 45}%` }}
          />
        </div>
      </div>

      {/* Sub-steps tags */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-6 max-w-lg mx-auto">
        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
          {t.scanner.sub1}
        </span>
        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
          {t.scanner.sub2}
        </span>
        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
          {t.scanner.sub3}
        </span>
      </div>

    </div>
  );
}
