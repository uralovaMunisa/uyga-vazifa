import React, { useState } from 'react';
import { X, Key, Sparkles, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';
import { sounds } from '../services/audioService';
import { TRANSLATIONS } from '../data/translations';

export default function ApiKeySettingsModal({
  isOpen,
  onClose,
  apiKeys,
  onSaveApiKeys,
  language = 'uz',
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.uz;

  const [geminiKey, setGeminiKey] = useState(apiKeys.geminiApiKey || '');
  const [openaiKey, setOpenaiKey] = useState(apiKeys.openaiApiKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    sounds.playVictory();
    onSaveApiKeys({
      geminiApiKey: geminiKey.trim(),
      openaiApiKey: openaiKey.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClearKeys = () => {
    sounds.playPop();
    setGeminiKey('');
    setOpenaiKey('');
    onSaveApiKeys({
      geminiApiKey: '',
      openaiApiKey: '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border-2 border-purple-300 dark:border-purple-800 relative animate-in fade-in zoom-in-95 duration-200 transition-colors">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-purple-200 dark:shadow-purple-950">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              {t.apiModal.sub}
            </span>
            <h3 className="font-bubble text-2xl font-bold text-slate-800 dark:text-slate-100">
              {t.apiModal.title}
            </h3>
          </div>
        </div>

        {/* Built-in Solver Info Card */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 mb-5 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed text-emerald-900 dark:text-emerald-200">
            <p className="font-bold text-sm text-emerald-950 dark:text-emerald-100 mb-0.5 flex items-center gap-1.5">
              <span>{t.apiModal.builtInTitle}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 font-bold">{t.apiModal.freeBadge}</span>
            </p>
            {t.apiModal.builtInDesc}
          </div>
        </div>

        {/* Optional Live Cloud API Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>{t.apiModal.geminiLabel}</span>
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-bold flex items-center gap-0.5 underline"
              >
                <span>{t.apiModal.getKey}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-950/50 outline-none text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-800/90"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {t.apiModal.openaiLabel}
            </label>
            <input
              type="password"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              placeholder="sk-proj-..."
              className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-950/50 outline-none text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-800/90"
            />
          </div>

          {savedSuccess && (
            <div className="p-3 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.apiModal.saved}</span>
            </div>
          )}

          {/* Footer Controls */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleClearKeys}
              className="text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400"
            >
              {t.apiModal.resetBtn}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                {t.apiModal.cancel}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bubble text-sm font-bold shadow-md shadow-purple-200 dark:shadow-purple-950 hover:opacity-95 active:scale-95 transition-all"
              >
                {t.apiModal.save}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
