import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Target, CheckCircle2, AlertCircle } from 'lucide-react';
import { sounds } from '../services/audioService';
import { TRANSLATIONS } from '../data/translations';

export default function PracticeChallengeModal({
  challenge,
  isOpen,
  onClose,
  onEarnStars,
  language = 'uz',
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.uz;

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!isOpen || !challenge) return null;

  const handleSelectOption = (index) => {
    if (isAnswered && isCorrect) return;

    setSelectedIndex(index);
    setIsAnswered(true);

    if (index === challenge.correctIndex) {
      setIsCorrect(true);
      sounds.playVictory();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
      onEarnStars(5);
    } else {
      setIsCorrect(false);
      sounds.playPop();
    }
  };

  const handleReset = () => {
    setSelectedIndex(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border-2 border-emerald-300 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-200">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
              {t.challenge.reinforce}
            </span>
            <h3 className="font-bubble text-xl font-bold text-slate-800">
              {t.challenge.title}
            </h3>
          </div>
        </div>

        {/* Question Prompt */}
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 mb-5">
          <p className="font-bubble text-base sm:text-lg font-bold text-slate-800 leading-snug">
            {challenge.question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2.5 mb-5">
          {challenge.options.map((option, idx) => {
            const isSelected = selectedIndex === idx;
            let btnClass = 'border-slate-200 hover:border-emerald-300 bg-white hover:bg-emerald-50/40 text-slate-700';

            if (isAnswered && isSelected) {
              if (isCorrect) {
                btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300 font-bold';
              } else {
                btnClass = 'border-rose-400 bg-rose-50 text-rose-800 font-medium';
              }
            } else if (isAnswered && idx === challenge.correctIndex && !isCorrect) {
              btnClass = 'border-emerald-500 bg-emerald-50/50 text-emerald-800';
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-3.5 rounded-2xl border-2 font-medium text-sm flex items-center justify-between transition-all active:scale-[0.99] ${btnClass}`}
              >
                <span>{option}</span>
                {isAnswered && isSelected && (
                  isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  )
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback / Result Banner */}
        {isAnswered && (
          <div className={`p-4 rounded-2xl mb-4 border ${
            isCorrect ? 'bg-emerald-100/70 border-emerald-300 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-start gap-2">
              <span className="text-xl">{isCorrect ? '🎉' : '💡'}</span>
              <div>
                <p className="font-bubble font-bold text-sm">
                  {isCorrect ? t.challenge.congrats : t.challenge.tryAgain}
                </p>
                <p className="text-xs mt-1 leading-relaxed">
                  {challenge.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          {!isCorrect && isAnswered && (
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
            >
              {t.challenge.tryAgainBtn}
            </button>
          )}

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bubble text-sm font-bold shadow-md shadow-emerald-200 hover:opacity-95 active:scale-95 transition-all"
          >
            {t.challenge.closeBtn}
          </button>
        </div>

      </div>
    </div>
  );
}
