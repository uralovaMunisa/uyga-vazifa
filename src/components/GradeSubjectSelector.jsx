import React from 'react';
import { 
  Calculator, 
  FlaskConical, 
  PenTool, 
  Hourglass, 
  BookOpen, 
  Globe, 
  Code,
  Zap,
  TestTube,
  Binary,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { GRADES, SUBJECTS } from '../data/gradesAndSubjects';
import { sounds } from '../services/audioService';
import { TRANSLATIONS } from '../data/translations';

const ICON_MAP = {
  Calculator,
  FlaskConical,
  PenTool,
  Hourglass,
  BookOpen,
  Globe,
  Code,
  Zap,
  TestTube,
  Binary
};

export default function GradeSubjectSelector({
  selectedGrade = 'g10',
  onSelectGrade,
  selectedSubject = 'math',
  onSelectSubject,
  language = 'uz',
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.uz;
  const isUz = language === 'uz';

  const currentGradeObj = GRADES.find(g => g.id === selectedGrade) || GRADES[9];
  const currentSubjectObj = SUBJECTS.find(s => s.id === selectedSubject) || SUBJECTS[0];

  const handleGradeClick = (gradeId) => {
    sounds.playPop();
    onSelectGrade(gradeId);
  };

  const handleSubjectClick = (subjId) => {
    sounds.playPop();
    onSelectSubject(subjId);
  };

  return (
    <div className="space-y-5">
      
      {/* 1. Grade / Education Level Selection Section */}
      <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-5 rounded-3xl border border-sky-100 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-2xl bg-sky-100 text-sky-600 font-bold text-sm">
              {t.step1.num}
            </span>
            <div>
              <h2 className="font-bubble text-lg font-bold text-slate-800 flex items-center gap-2">
                <span>{t.step1.title}</span>
                <span className="text-xl">{currentGradeObj.emoji}</span>
              </h2>
              <p className="text-xs text-slate-500">{t.step1.desc}</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-2xl bg-sky-50 border border-sky-200 text-xs font-bold text-sky-800 self-start sm:self-auto">
            <GraduationCap className="w-4 h-4 text-sky-600" />
            <span>{t.step1.current} {isUz ? currentGradeObj.label : currentGradeObj.labelEn} ({isUz ? currentGradeObj.age : currentGradeObj.ageEn})</span>
          </div>
        </div>

        {/* Scrollable / Responsive Grade Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
          {GRADES.map((g) => {
            const isSelected = g.id === selectedGrade;
            const isAdult = g.category === 'adult';
            return (
              <button
                key={g.id}
                onClick={() => handleGradeClick(g.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-bubble text-xs sm:text-sm transition-all duration-200 select-none ${
                  isSelected
                    ? isAdult
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md shadow-purple-200 scale-105'
                      : 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold shadow-md shadow-sky-200 scale-105'
                    : isAdult
                    ? 'bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200'
                    : 'bg-slate-50 hover:bg-sky-50 text-slate-600 hover:text-sky-700 border border-slate-200 hover:border-sky-300'
                }`}
              >
                <span>{g.emoji}</span>
                <span>{isUz ? g.label : g.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Subject Selection Section */}
      <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-5 rounded-3xl border border-sky-100 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-2xl bg-amber-100 text-amber-700 font-bold text-sm">
              {t.step2.num}
            </span>
            <div>
              <h2 className="font-bubble text-lg font-bold text-slate-800 flex items-center gap-2">
                <span>{t.step2.title}</span>
                <span className="text-xl">{currentSubjectObj.emoji}</span>
              </h2>
              <p className="text-xs text-slate-500">{t.step2.desc}</p>
            </div>
          </div>

          <div className="text-xs font-semibold text-slate-500 self-start sm:self-auto">
            {t.step2.selected} <span className="text-sky-600 font-bold">{isUz ? currentSubjectObj.name : currentSubjectObj.nameEn}</span>
          </div>
        </div>

        {/* Large, Colorful, Icon-Based Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {SUBJECTS.map((subject) => {
            const isSelected = subject.id === selectedSubject;
            const IconComponent = ICON_MAP[subject.icon] || Calculator;

            return (
              <button
                key={subject.id}
                onClick={() => handleSubjectClick(subject.id)}
                className={`relative flex flex-col items-start text-left p-3.5 rounded-2xl border-2 transition-all duration-300 group ${
                  isSelected
                    ? `${subject.borderColor} ${subject.lightBg} shadow-md ring-2 ring-offset-2 ring-sky-400 scale-[1.02]`
                    : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/70 shadow-2xs hover:shadow-xs'
                }`}
              >
                {/* Top: Icon & Emoji & Checkmark */}
                <div className="flex items-center justify-between w-full mb-2">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-2xs bg-gradient-to-br ${subject.bgGradient} group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  {isSelected ? (
                    <CheckCircle2 className="w-4 h-4 text-sky-600 fill-sky-100" />
                  ) : (
                    <span className="text-lg opacity-75 group-hover:scale-125 transition-transform">
                      {subject.emoji}
                    </span>
                  )}
                </div>

                {/* Name */}
                <h3 className="font-bubble text-sm sm:text-base font-bold text-slate-800 leading-tight">
                  {isUz ? subject.name : subject.nameEn}
                </h3>

                {/* Short Description */}
                <p className="text-[10px] sm:text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                  {isUz ? subject.description : subject.descriptionEn}
                </p>

                {/* Pill Accent */}
                {isSelected && (
                  <span className="mt-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-white shadow-2xs text-sky-700 border border-sky-200">
                    {t.step2.active}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
