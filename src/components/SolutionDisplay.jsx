import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Copy, 
  Check, 
  Printer, 
  Lightbulb,
  FileQuestion,
  Target
} from 'lucide-react';
import { speak, stopSpeech, sounds } from '../services/audioService';
import MascotAvatar from './MascotAvatar';
import { TRANSLATIONS } from '../data/translations';

export default function SolutionDisplay({
  solution,
  currentMascotId = 'barnaby',
  language = 'uz',
  onOpenPracticeChallenge,
  onEarnStars,
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.uz;
  const isUz = language === 'uz';

  const [activeSpeakingStep, setActiveSpeakingStep] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [hasClaimedStars, setHasClaimedStars] = useState(false);

  if (!solution) return null;

  const {
    extractedProblem,
    cheerTitle,
    encouragement,
    steps = [],
    finalAnswer = {},
    gradeLevel = '10-sinf / DTM',
    subject = 'math'
  } = solution;

  const handleReadStep = (stepNumber, text) => {
    sounds.playPop();
    if (activeSpeakingStep === stepNumber) {
      stopSpeech();
      setActiveSpeakingStep(null);
      return;
    }

    setActiveSpeakingStep(stepNumber);
    speak(
      text,
      () => setActiveSpeakingStep(stepNumber),
      () => setActiveSpeakingStep(null),
      () => setActiveSpeakingStep(null)
    );
  };

  const handleReadEntireSolution = () => {
    sounds.playPop();
    if (activeSpeakingStep === 'all') {
      stopSpeech();
      setActiveSpeakingStep(null);
      return;
    }

    const fullScript = [
      cheerTitle,
      encouragement,
      ...steps.map(s => `${s.title}. ${s.audioText || s.explanation}`),
      `Final answer: ${finalAnswer?.headline || ''}. ${finalAnswer?.summary || ''}`
    ].join('. ');

    setActiveSpeakingStep('all');
    speak(
      fullScript,
      () => setActiveSpeakingStep('all'),
      () => setActiveSpeakingStep(null),
      () => setActiveSpeakingStep(null)
    );
  };

  const handleClaimStars = () => {
    if (hasClaimedStars) return;
    sounds.playVictory();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setHasClaimedStars(true);
    onEarnStars(5);
  };

  const handleCopy = () => {
    sounds.playPop();
    const copyText = `StudyBuddy AI Yechimi\nSavol: ${extractedProblem}\n\nBosqichlar:\n${steps.map((s, i) => `${i + 1}. ${s.title}: ${s.explanation}`).join('\n\n')}\n\nXulosa: ${finalAnswer?.summary || ''}`;
    navigator.clipboard.writeText(copyText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrint = () => {
    sounds.playPop();
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header Card: Problem Extracted with AI Vision & Cheer Greeting */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border-2 border-sky-200 p-5 sm:p-6 shadow-md relative overflow-hidden">
        
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-sky-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">
              {gradeLevel} • {subject.toUpperCase()}
            </span>
            <span className="text-xs text-slate-400">• {t.solution.stepsHeader}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReadEntireSolution}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSpeakingStep === 'all'
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200'
              }`}
            >
              {activeSpeakingStep === 'all' ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{activeSpeakingStep === 'all' ? t.solution.stopListen : t.solution.listenFull}</span>
            </button>

            <button
              onClick={handleCopy}
              className="p-1.5 rounded-xl text-slate-500 hover:text-sky-600 hover:bg-sky-50 border border-slate-200"
              title={t.solution.copy}
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={handlePrint}
              className="p-1.5 rounded-xl text-slate-500 hover:text-sky-600 hover:bg-sky-50 border border-slate-200 hidden sm:inline-flex"
              title={t.solution.print}
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mascot Encouragement Banner */}
        <div className="flex items-start sm:items-center gap-3 bg-gradient-to-r from-amber-50 to-sky-50 p-3.5 rounded-2xl border border-amber-200/60 mb-5">
          <MascotAvatar mascotId={currentMascotId} mood="cheering" size="sm" className="flex-shrink-0" />
          <div>
            <h2 className="font-bubble text-base sm:text-lg font-bold text-slate-800 flex items-center gap-1.5">
              <span>{cheerTitle || (isUz ? "Hammasi oddiy! Keling birga yechamiz! 🎉" : "You've got this! Let's solve it! 🎉")}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {encouragement}
            </p>
          </div>
        </div>

        {/* Extracted Problem Display */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            <FileQuestion className="w-3.5 h-3.5 text-sky-600" />
            <span>{t.solution.extractedTitle}</span>
          </div>
          <p className="text-sm sm:text-base font-bold text-slate-800 whitespace-pre-line leading-relaxed">
            {extractedProblem}
          </p>
        </div>

      </div>

      {/* 2. Step-by-Step Breakdown Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-bubble text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
            <span>{t.solution.stepsHeader}</span>
            <span className="text-xs font-sans font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {steps.length} {t.solution.stepsCount}
            </span>
          </h3>
          <span className="text-xs text-slate-400">{t.solution.listenStepHint}</span>
        </div>

        {steps.map((step, index) => {
          const isStepSpeaking = activeSpeakingStep === step.stepNumber;
          return (
            <div
              key={index}
              className={`bg-white rounded-3xl border-2 p-5 sm:p-6 transition-all duration-200 shadow-2xs hover:shadow-md ${
                isStepSpeaking
                  ? 'border-sky-400 ring-2 ring-sky-200 bg-sky-50/30'
                  : 'border-slate-100 hover:border-sky-200'
              }`}
            >
              {/* Step Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-8 h-8 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-600 text-white font-bubble font-bold text-sm shadow-2xs">
                    {step.stepNumber}
                  </span>
                  <h4 className="font-bubble text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
                    <span>{step.emoji}</span>
                    <span>{step.title}</span>
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => handleReadStep(step.stepNumber, `${step.title}. ${step.audioText || step.explanation}`)}
                  title={t.solution.readAloud}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    isStepSpeaking
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isStepSpeaking ? t.solution.speaking : t.solution.readAloud}</span>
                </button>
              </div>

              {/* Step Explanation */}
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium whitespace-pre-line pl-1 sm:pl-10 mb-3">
                {step.explanation}
              </p>

              {/* Formula or Kid/Student Tip Pill if available */}
              {(step.formula || step.tip) && (
                <div className="pl-1 sm:pl-10 space-y-2">
                  {step.formula && (
                    <div className="inline-block bg-slate-900 text-cyan-300 font-mono text-xs sm:text-sm px-3.5 py-1.5 rounded-xl shadow-2xs border border-slate-700">
                      💡 {step.formula}
                    </div>
                  )}
                  {step.tip && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs px-3 py-2 rounded-xl flex items-start gap-1.5 font-medium">
                      <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{step.tip}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Highlighted Final Answer Box */}
      <div className="bg-gradient-to-br from-emerald-500 via-teal-600 to-green-600 rounded-3xl p-6 sm:p-7 text-white shadow-xl shadow-emerald-200/50 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex items-center gap-2 mb-3">
          <span className="p-2 rounded-2xl bg-white/20 backdrop-blur-sm text-yellow-300">
            <Award className="w-6 h-6 animate-bounce" />
          </span>
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-100 font-sans">
              {t.solution.finalHeadline}
            </span>
            <h3 className="font-bubble text-xl sm:text-2xl font-bold">
              {finalAnswer.headline || (isUz ? 'Yakuniy Xulosa 🏆' : 'Solution Summary 🏆')}
            </h3>
          </div>
        </div>

        {/* Bullets */}
        {finalAnswer.bullets?.length > 0 && (
          <div className="space-y-2 my-4 bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            {finalAnswer.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-2.5 font-bubble text-base sm:text-lg font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-200 flex-shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        )}

        {/* Summary note */}
        {finalAnswer.summary && (
          <p className="text-xs sm:text-sm text-emerald-50 font-medium leading-relaxed">
            {finalAnswer.summary}
          </p>
        )}

        {/* Celebratory bottom buttons */}
        <div className="mt-5 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleClaimStars}
            disabled={hasClaimedStars}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bubble text-sm font-bold shadow-md transition-all active:scale-95 ${
              hasClaimedStars
                ? 'bg-white/30 text-white cursor-default'
                : 'bg-amber-400 hover:bg-amber-300 text-amber-950 shadow-amber-900/20 hover:scale-105'
            }`}
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>{hasClaimedStars ? t.solution.starsClaimed : t.solution.iUnderstand}</span>
          </button>

          {solution.practiceChallenge && (
            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                onOpenPracticeChallenge();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-emerald-800 hover:bg-emerald-50 font-bubble text-sm font-bold shadow-md transition-all active:scale-95"
            >
              <Target className="w-4 h-4 text-emerald-600" />
              <span>{t.solution.tryPractice}</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
