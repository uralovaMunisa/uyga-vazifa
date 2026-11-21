import React from 'react';
import { X, Flame, Star, Award, Trophy, Lock, Sparkles } from 'lucide-react';
import { BADGES } from '../data/mascotData';
import { TRANSLATIONS } from '../data/translations';

const WEEKDAYS_UZ = [
  { day: 'Dush', completed: true },
  { day: 'Sesh', completed: true },
  { day: 'Chor', completed: true },
  { day: 'Pay', completed: false, isToday: true },
  { day: 'Jum', completed: false },
  { day: 'Shan', completed: false },
  { day: 'Yak', completed: false },
];

const WEEKDAYS_EN = [
  { day: 'Mon', completed: true },
  { day: 'Tue', completed: true },
  { day: 'Wed', completed: true },
  { day: 'Thu', completed: false, isToday: true },
  { day: 'Fri', completed: false },
  { day: 'Sat', completed: false },
  { day: 'Sun', completed: false },
];

export default function StreakAndRewardsModal({
  isOpen,
  onClose,
  stars = 45,
  streak = 3,
  level = 3,
  language = 'uz',
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.uz;
  const isUz = language === 'uz';

  if (!isOpen) return null;

  const nextLevelStars = level * 20;
  const currentLevelBase = (level - 1) * 20;
  const progressInLevel = Math.min(Math.max(stars - currentLevelBase, 0), 20);
  const percentProgress = Math.round((progressInLevel / 20) * 100);
  const weekdays = isUz ? WEEKDAYS_UZ : WEEKDAYS_EN;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border-2 border-amber-300 dark:border-amber-700/80 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 transition-colors">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-200 dark:shadow-orange-950">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              StudyBuddy
            </span>
            <h3 className="font-bubble text-2xl font-bold text-slate-800 dark:text-slate-100">
              {t.rewards.title}
            </h3>
          </div>
        </div>

        {/* Top 3 Stat Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">

          <div className="bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 rounded-2xl p-3 text-center">
            <Flame className="w-6 h-6 text-orange-500 mx-auto mb-1 animate-pulse" />
            <div className="font-bubble text-xl font-bold text-orange-600 dark:text-orange-400">{streak} {isUz ? 'Kun' : 'Days'}</div>
            <div className="text-[11px] font-semibold text-orange-400 dark:text-orange-300">{t.rewards.streakDays}</div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-3 text-center">
            <Star className="w-6 h-6 text-amber-500 fill-amber-400 mx-auto mb-1 animate-spin-slow" />
            <div className="font-bubble text-xl font-bold text-amber-600 dark:text-amber-400">{stars}</div>
            <div className="text-[11px] font-semibold text-amber-500 dark:text-amber-300">{t.rewards.totalStars}</div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-2xl p-3 text-center">
            <Award className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
            <div className="font-bubble text-xl font-bold text-purple-700 dark:text-purple-300">{level}-{isUz ? 'Daraja' : 'Level'}</div>
            <div className="text-[11px] font-semibold text-purple-400 dark:text-purple-400">{t.rewards.rank}</div>
          </div>

        </div>

        {/* Level Progress Bar */}
        <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>{t.rewards.nextRank} {level + 1}-{isUz ? 'Daraja Akademik' : 'Level Master'}</span>
            </span>
            <span className="text-purple-700 dark:text-purple-300">{stars} / {nextLevelStars} {t.header.stars}</span>
          </div>

          <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${percentProgress}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 text-right">
            {nextLevelStars - stars} {t.rewards.starsNeeded}
          </p>
        </div>

        {/* Weekly Streak Calendar */}
        <div className="mb-6">
          <h4 className="font-bubble text-sm font-bold text-slate-800 dark:text-slate-100 mb-2.5 flex items-center justify-between">
            <span>{t.rewards.weekActivity}</span>
            <span className="text-xs font-sans text-orange-600 dark:text-orange-400 font-semibold">{isUz ? '7 kundan 3 kuni faol' : '3 of 7 days completed'}</span>
          </h4>
          <div className="grid grid-cols-7 gap-2">
            {weekdays.map((w, i) => (
              <div
                key={i}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl border text-center ${w.completed
                    ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-300 dark:border-orange-800 text-orange-700 dark:text-orange-300 font-bold'
                    : w.isToday
                      ? 'bg-sky-50 dark:bg-sky-950/50 border-sky-400 dark:border-sky-700 text-sky-800 dark:text-sky-300 ring-2 ring-sky-200 dark:ring-sky-950 font-bold'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                  }`}
              >
                <span className="text-[11px] mb-1">{w.day}</span>
                {w.completed ? (
                  <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs">
                    ✓
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-[10px]">
                    {w.isToday ? '★' : '·'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Badges Collection Grid */}
        <div className="mb-6">
          <h4 className="font-bubble text-sm font-bold text-slate-800 dark:text-slate-100 mb-2.5">
            {t.rewards.badgesTitle}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {BADGES.map((b) => (
              <div
                key={b.id}
                className={`p-3 rounded-2xl border flex items-start gap-2.5 ${b.unlocked
                  ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/80 shadow-2xs'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 opacity-60'
                  }`}
              >
                <span className="text-2xl flex-shrink-0">{b.emoji}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bubble font-bold text-slate-800 dark:text-slate-100 truncate">
                      {isUz ? b.title : b.titleEn}
                    </span>
                    {!b.unlocked && <Lock className="w-3 h-3 text-slate-400 dark:text-slate-500 flex-shrink-0" />}
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    {isUz ? b.description : b.descriptionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bubble text-sm font-bold shadow-md shadow-orange-200 dark:shadow-orange-950 hover:opacity-95 active:scale-95 transition-all"
          >
            {t.rewards.close}
          </button>
        </div>

      </div>
    </div>
  );
}
