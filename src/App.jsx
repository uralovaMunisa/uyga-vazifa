import React, { useState, useEffect } from 'react';
import MascotHeader from './components/MascotHeader';
import GradeSubjectSelector from './components/GradeSubjectSelector';
import InputSection from './components/InputSection';
import VisionScannerOverlay from './components/VisionScannerOverlay';
import SolutionDisplay from './components/SolutionDisplay';
import FollowUpChat from './components/FollowUpChat';
import PracticeChallengeModal from './components/PracticeChallengeModal';
import StreakAndRewardsModal from './components/StreakAndRewardsModal';
import ApiKeySettingsModal from './components/ApiKeySettingsModal';
import { MASCOTS } from './data/mascotData';
import { SUBJECTS, GRADES } from './data/gradesAndSubjects';
import { solveHomework } from './services/solverService';
import { sounds } from './services/audioService';
import { TRANSLATIONS } from './data/translations';

export default function App() {
  // Language & Mode State (Saved to localStorage)
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('studybuddy_lang') || 'uz';
  });

  const [mode, setMode] = useState(() => {
    return localStorage.getItem('studybuddy_mode') || 'pro'; // 'pro' for older students/adults/high school, 'kid' for young kids
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('studybuddy_theme');
    if (saved) return saved;
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  });

  const t = TRANSLATIONS[language] || TRANSLATIONS.uz;
  const isUz = language === 'uz';

  // App Selection state
  const [selectedGrade, setSelectedGrade] = useState('g10'); // 10-sinf / DTM by default for high school & older students
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [inputMode, setInputMode] = useState('text');
  const [textPrompt, setTextPrompt] = useState(
    '2x² - 8x + 6 = 0 kvadrat tenglamani diskriminant yordamida qadamma-qadam yechib bering.'
  );
  const [imageSrc, setImageSrc] = useState(null);
  const [presetId, setPresetId] = useState(null);
  const [selectedExerciseType, setSelectedExerciseType] = useState('equation');

  // Mascot & Tutor State
  const [currentMascotId, setCurrentMascotId] = useState('professor'); // Professor Dono / Barnaby
  const [mascotMood, setMascotMood] = useState('idle');
  const [speechBubbleText, setSpeechBubbleText] = useState(
    "Assalomu alaykum! Maktab, litsey, DTM va universitet darslarini birgalikda oson o‘rganamiz! 🎓"
  );

  // Gamification State (saved to localStorage)
  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem('studybuddy_stars');
    return saved ? parseInt(saved, 10) : 55;
  });
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('studybuddy_streak');
    return saved ? parseInt(saved, 10) : 4;
  });
  const [level, setLevel] = useState(() => {
    const saved = localStorage.getItem('studybuddy_level');
    return saved ? parseInt(saved, 10) : 3;
  });
  const [soundEnabled, setSoundEnabled] = useState(true);

  // API Keys (saved to localStorage)
  const [apiKeys, setApiKeys] = useState(() => {
    try {
      const saved = localStorage.getItem('studybuddy_apikeys');
      return saved ? JSON.parse(saved) : { geminiApiKey: '', openaiApiKey: '' };
    } catch {
      return { geminiApiKey: '', openaiApiKey: '' };
    }
  });

  // Solver & Results State
  const [isSolving, setIsSolving] = useState(false);
  const [scanProgress, setScanProgress] = useState({ stage: 'scanning', percent: 0, message: '' });
  const [solution, setSolution] = useState(null);

  // Modals
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState(false);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  // Persist language and mode
  useEffect(() => {
    localStorage.setItem('studybuddy_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('studybuddy_mode', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('studybuddy_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('studybuddy_stars', stars.toString());
    const calculatedLevel = Math.max(1, Math.floor(stars / 20) + 1);
    setLevel(calculatedLevel);
    localStorage.setItem('studybuddy_level', calculatedLevel.toString());
  }, [stars]);

  useEffect(() => {
    localStorage.setItem('studybuddy_streak', streak.toString());
  }, [streak]);

  // Mascot changes reaction
  const handleSelectMascot = (newMascotId) => {
    setCurrentMascotId(newMascotId);
    const m = MASCOTS.find(item => item.id === newMascotId);
    if (m) {
      setSpeechBubbleText(isUz ? m.dialogue.welcome : m.dialogue.welcomeEn);
    }
  };

  // Toggle Language (Uzbek <-> English)
  const handleToggleLanguage = () => {
    const newLang = language === 'uz' ? 'en' : 'uz';
    setLanguage(newLang);
    const m = MASCOTS.find(item => item.id === currentMascotId) || MASCOTS[0];
    setSpeechBubbleText(newLang === 'uz' ? m.dialogue.welcome : m.dialogue.welcomeEn);
  };

  // Toggle Audience Mode (Bolalar <-> Kattalar & Talabalar)
  const handleToggleMode = () => {
    const newMode = mode === 'kid' ? 'pro' : 'kid';
    setMode(newMode);
    if (newMode === 'pro') {
      setCurrentMascotId('professor');
      setSpeechBubbleText(isUz ? "Kattalar va abituriyentlar rejimi faollashdi! 🎓" : "Pro & Student Mode activated! 🎓");
    } else {
      setCurrentMascotId('barnaby');
      setSpeechBubbleText(isUz ? "Bolalar rejimi faollashdi! 🧸" : "Kids Mode activated! 🧸");
    }
  };

  // Toggle Theme (Dark / Qora fon <-> Light / Oq fon)
  const handleToggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    sounds.playPop();
    setSpeechBubbleText(newTheme === 'dark' 
      ? (isUz ? "Qora fon (Tungi rejim) yoqildi! 🌙 Ko‘zlarga qulay va yoqimli!" : "Dark mode activated! 🌙 Easy on the eyes!")
      : (isUz ? "Oq fon (Kunduzgi rejim) yoqildi! ☀️ Yorqin va tiniq ko‘rinish!" : "Light mode activated! ☀️ Bright and clear!")
    );
  };

  // Subject changes reaction
  const handleSelectSubject = (subjId) => {
    setSelectedSubject(subjId);
    const s = SUBJECTS.find(item => item.id === subjId);
    if (s) {
      setSpeechBubbleText(isUz 
        ? `${s.name} fani tanlandi! ${s.emoji} Savolingizni kutmoqdaman!` 
        : `Selected ${s.nameEn}! ${s.emoji} Ready for your questions!`
      );
    }
  };

  // Grade changes reaction
  const handleSelectGrade = (gradeId) => {
    setSelectedGrade(gradeId);
    const g = GRADES.find(item => item.id === gradeId);
    if (g) {
      setSpeechBubbleText(isUz 
        ? `${g.label} (${g.age}) darajasi tanlandi! ${g.emoji}` 
        : `Selected ${g.labelEn}! ${g.emoji}`
      );
    }
  };

  // Preset sample photo selection
  const handlePresetSelect = (sample) => {
    setImageSrc(sample.thumbnail);
    setPresetId(sample.id);
    setSelectedSubject(sample.subject);
    setSelectedGrade(sample.grade);
    setTextPrompt(sample.ocrText);
    setInputMode('image');
    setSpeechBubbleText(isUz ? `Namuna tanlandi: "${sample.title}"! Yechishni bosing 📸` : `Sample selected: "${sample.title}"!`);
  };

  const handleImageChange = (newSrc, newPresetId = null) => {
    setImageSrc(newSrc);
    setPresetId(newPresetId);
    if (newSrc) {
      setSpeechBubbleText(isUz ? "Rasm yuklandi! \"Yechimni ko‘rsat\" tugmasini bosing!" : "Photo loaded! Click 'Solve My Homework'!");
    }
  };

  // Solve Homework Handler
  const handleSolveHomework = async () => {
    setIsSolving(true);
    setSolution(null);
    setMascotMood(inputMode === 'image' ? 'reading' : 'thinking');
    setSpeechBubbleText(isUz 
      ? "Vazifani o‘rganib, qadamma-qadam eng aniq yechimni tayyorlayapman... 🔍" 
      : "Examining your question with my thinking cap... 🔍"
    );

    try {
      const result = await solveHomework({
        inputMode,
        textPrompt,
        imageData: imageSrc,
        presetId,
        subject: selectedSubject,
        grade: selectedGrade,
        exerciseType: selectedExerciseType,
        language,
        mode,
        apiKeys,
        onProgress: (prog) => {
          setScanProgress(prog);
          if (prog.message) {
            setSpeechBubbleText(prog.message);
          }
        }
      });

      setSolution(result);
      setMascotMood('cheering');
      setSpeechBubbleText(result.cheerTitle || (isUz ? "Yechim tayyor! Har bir qadamni ko‘rib chiqing! ⭐" : "We solved it! Check each step below! ⭐"));
      sounds.playVictory();

      // Scroll smoothly to solution
      setTimeout(() => {
        const solEl = document.getElementById('solution-section');
        if (solEl) {
          solEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);

    } catch (err) {
      console.error('Solve error:', err);
      setSpeechBubbleText(isUz ? "Kechirasiz, qaytadan urinib ko‘raylikchi!" : "Let's try that again!");
      setMascotMood('idle');
    } finally {
      setIsSolving(false);
    }
  };

  const handleEarnStars = (amount = 5) => {
    setStars(prev => prev + amount);
  };

  const handleSaveApiKeys = (keys) => {
    setApiKeys(keys);
    localStorage.setItem('studybuddy_apikeys', JSON.stringify(keys));
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* 1. Header & Mascot Bar */}
      <MascotHeader
        currentMascotId={currentMascotId}
        onSelectMascot={handleSelectMascot}
        mascotMood={mascotMood}
        speechBubbleText={speechBubbleText}
        stars={stars}
        streak={streak}
        level={level}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(prev => !prev)}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        mode={mode}
        onToggleMode={handleToggleMode}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenStreakModal={() => setIsStreakModalOpen(true)}
        onOpenApiModal={() => setIsApiModalOpen(true)}
      />

      {/* 2. Main Content Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-5 sm:py-7 space-y-6">
        
        {/* Welcome Hero Banner */}
        <div className={`relative rounded-3xl p-5 sm:p-7 text-white shadow-lg overflow-hidden transition-all duration-300 ${
          mode === 'pro'
            ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-slate-800'
            : 'bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500'
        }`}>
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold font-bubble uppercase tracking-wider mb-2">
              {t.hero.badge}
            </span>
            <h2 className="font-bubble text-2xl sm:text-3xl font-extrabold leading-tight mb-2">
              {t.hero.title}
            </h2>
            <p className="text-xs sm:text-sm text-sky-100 font-medium leading-relaxed">
              {t.hero.desc}
            </p>
          </div>

          <div className="absolute right-4 bottom-2 sm:right-8 sm:bottom-4 text-4xl sm:text-6xl opacity-30 select-none animate-float-y pointer-events-none">
            {mode === 'pro' ? '🎓📐⚡' : '🦉✨🧮'}
          </div>
        </div>

        {/* Education Level & Subject Selector */}
        <GradeSubjectSelector
          selectedGrade={selectedGrade}
          onSelectGrade={handleSelectGrade}
          selectedSubject={selectedSubject}
          onSelectSubject={handleSelectSubject}
          language={language}
        />

        {/* Dual Input Section (Text & Photo) */}
        <InputSection
          inputMode={inputMode}
          onInputModeChange={setInputMode}
          textPrompt={textPrompt}
          onTextPromptChange={setTextPrompt}
          imageSrc={imageSrc}
          onImageChange={handleImageChange}
          presetId={presetId}
          onPresetSelect={handlePresetSelect}
          selectedExerciseType={selectedExerciseType}
          onExerciseTypeChange={setSelectedExerciseType}
          selectedSubject={selectedSubject}
          selectedGrade={selectedGrade}
          language={language}
          onSubmit={handleSolveHomework}
          isSolving={isSolving}
        />

        {/* AI Vision Scanning Overlay while processing */}
        {isSolving && (
          <VisionScannerOverlay
            currentMascotId={currentMascotId}
            progress={scanProgress}
            inputMode={inputMode}
            imageSrc={imageSrc}
            language={language}
          />
        )}

        {/* Solution Display Area */}
        {solution && !isSolving && (
          <div id="solution-section" className="space-y-6 pt-2">
            <SolutionDisplay
              solution={solution}
              currentMascotId={currentMascotId}
              language={language}
              onOpenPracticeChallenge={() => setIsPracticeModalOpen(true)}
              onEarnStars={handleEarnStars}
            />

            {/* Follow-up Question Chat */}
            <FollowUpChat
              currentSolution={solution}
              currentMascotId={currentMascotId}
              apiKeys={apiKeys}
              language={language}
            />
          </div>
        )}

      </main>

      {/* 3. Footer */}
      <footer className="mt-12 border-t border-sky-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/80 backdrop-blur-xs py-6 text-center text-xs text-slate-400 dark:text-slate-500 transition-colors">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-medium text-slate-500 dark:text-slate-400">
            {t.footer.text}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsStreakModalOpen(true)}
              className="hover:text-sky-600 dark:hover:text-sky-400 underline font-semibold transition-colors"
            >
              {t.footer.rewards}
            </button>
            <button
              onClick={() => setIsApiModalOpen(true)}
              className="hover:text-purple-600 dark:hover:text-purple-400 underline font-semibold transition-colors"
            >
              {t.footer.settings}
            </button>
          </div>
        </div>
      </footer>

      {/* Practice Challenge Modal */}
      {solution?.practiceChallenge && (
        <PracticeChallengeModal
          isOpen={isPracticeModalOpen}
          onClose={() => setIsPracticeModalOpen(false)}
          challenge={solution.practiceChallenge}
          onEarnStars={handleEarnStars}
          language={language}
        />
      )}

      {/* Streak & Rewards Modal */}
      <StreakAndRewardsModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
        stars={stars}
        streak={streak}
        level={level}
        language={language}
      />

      {/* API Key Modal */}
      <ApiKeySettingsModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        apiKeys={apiKeys}
        onSaveApiKeys={handleSaveApiKeys}
        language={language}
      />

    </div>
  );
}
