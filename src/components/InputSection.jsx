import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Camera, 
  Sparkles, 
  Mic, 
  MicOff, 
  Lightbulb, 
  Eraser
} from 'lucide-react';
import ImageUploader from './ImageUploader';
import { EXERCISE_TYPES, SUBJECTS } from '../data/gradesAndSubjects';
import { sounds } from '../services/audioService';
import { TRANSLATIONS } from '../data/translations';

export default function InputSection({
  inputMode = 'text',
  onInputModeChange,
  textPrompt = '',
  onTextPromptChange,
  imageSrc = null,
  onImageChange,
  presetId = null,
  onPresetSelect,
  selectedExerciseType = 'all',
  onExerciseTypeChange,
  selectedSubject = 'math',
  selectedGrade = 'g10',
  language = 'uz',
  onSubmit,
  isSolving = false,
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.uz;
  const isUz = language === 'uz';

  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setSpeechSupported(true);
    }
  }, []);

  const toggleSpeechRecognition = () => {
    sounds.playPop();
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(isUz ? 'Ushbu brauzerda ovoz bilan yozish qo‘llab-quvvatlanmaydi.' : 'Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = isUz ? 'uz-UZ' : 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTextPromptChange(textPrompt ? `${textPrompt} ${transcript}` : transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const currentSubjectObj = SUBJECTS.find(s => s.id === selectedSubject) || SUBJECTS[0];

  const handleQuickQuestionClick = (prompt, type) => {
    sounds.playPop();
    onTextPromptChange(prompt);
    if (type) onExerciseTypeChange(type);
  };

  const handleClear = () => {
    sounds.playPop();
    onTextPromptChange('');
    onImageChange(null, null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sounds.playPop();
    onSubmit();
  };

  const isSubmitDisabled = isSolving || (inputMode === 'text' && !textPrompt.trim()) || (inputMode === 'image' && !imageSrc);

  return (
    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-3xl border border-sky-100 dark:border-slate-800 shadow-md p-4 sm:p-6 transition-colors">
      
      {/* Top Header: Input Mode Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <span className="flex items-center gap-1.5 font-bubble text-lg font-bold text-slate-800 dark:text-slate-100">
            <span className="flex items-center justify-center w-8 h-8 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-sm">
              {t.step3.num}
            </span>
            {t.step3.title}
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t.step3.desc}</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl self-start sm:self-auto border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => {
              sounds.playPop();
              onInputModeChange('text');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bubble font-bold transition-all ${
              inputMode === 'text'
                ? 'bg-white dark:bg-slate-700 text-sky-700 dark:text-sky-300 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-sky-500 dark:text-sky-400" />
            <span>{t.step3.tabText}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playPop();
              onInputModeChange('image');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bubble font-bold transition-all ${
              inputMode === 'image'
                ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Camera className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span>{t.step3.tabImage}</span>
          </button>
        </div>
      </div>

      {/* Exercise Type Filter Chips */}
      <div className="mb-4">
        <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">
          {t.step3.exerciseTypeLabel}
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {EXERCISE_TYPES.map((type) => {
            const isSelected = selectedExerciseType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => {
                  sounds.playPop();
                  onExerciseTypeChange(type.id);
                }}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border-2 border-sky-400 dark:border-sky-500 font-bold'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>{type.emoji}</span>
                <span>{isUz ? type.label : type.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Text Input Mode */}
      {inputMode === 'text' && (
        <div className="space-y-4">
          <div className="relative">
            <textarea
              rows={4}
              value={textPrompt}
              onChange={(e) => onTextPromptChange(e.target.value)}
              placeholder={t.step3.textareaPlaceholder}
              className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 focus:border-sky-400 dark:focus:border-sky-500 focus:ring-4 focus:ring-sky-100 dark:focus:ring-sky-950/50 outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-800/80 font-medium text-sm sm:text-base leading-relaxed transition-all resize-none"
            />

            {/* Bottom-right controls inside textarea */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              {speechSupported && (
                <button
                  type="button"
                  onClick={toggleSpeechRecognition}
                  title={isListening ? t.step3.voiceListening : t.step3.voiceDictate}
                  className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-sky-50 dark:bg-slate-700 text-sky-600 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-slate-600 border border-sky-200 dark:border-slate-600'
                  }`}
                >
                  {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{isListening ? t.step3.voiceListening : t.step3.voiceDictate}</span>
                </button>
              )}

              {textPrompt && (
                <button
                  type="button"
                  onClick={handleClear}
                  title={t.step3.clear}
                  className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <Eraser className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Quick sample question chips for active subject */}
          {currentSubjectObj?.sampleQuestions?.length > 0 && (
            <div className="bg-sky-50/50 dark:bg-slate-800/50 p-3 rounded-2xl border border-sky-100 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-800 dark:text-sky-300 mb-2">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>{isUz ? currentSubjectObj.name : currentSubjectObj.nameEn} {t.step3.samplesTitle}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentSubjectObj.sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickQuestionClick(q.prompt, q.type)}
                    className="text-left text-xs bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-sky-800 dark:hover:text-sky-300 px-3 py-1.5 rounded-xl border border-sky-200 dark:border-slate-700 shadow-2xs transition-all active:scale-95"
                  >
                    <span className="font-bold text-sky-600 dark:text-sky-400 mr-1.5">⚡ {q.title}:</span>
                    <span className="text-slate-500 dark:text-slate-400 line-clamp-1">{q.prompt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Image / Camera Input Mode */}
      {inputMode === 'image' && (
        <ImageUploader
          imageSrc={imageSrc}
          onImageChange={onImageChange}
          onPresetSelect={onPresetSelect}
          selectedPresetId={presetId}
          language={language}
        />
      )}

      {/* Primary Submit Action Button */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          {t.step3.tailoredNote}
        </p>

        <button
          type="button"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
          className={`flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl font-bubble text-base sm:text-lg font-bold text-white shadow-lg transition-all active:scale-95 ${
            isSubmitDisabled
              ? 'bg-slate-300 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 shadow-sky-200 dark:shadow-purple-950 hover:shadow-xl hover:scale-[1.02] animate-pulse-subtle'
          }`}
        >
          <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300 animate-spin-slow" />
          <span>{isSolving ? t.step3.solvingButton : t.step3.solveButton}</span>
        </button>
      </div>

    </div>
  );
}
