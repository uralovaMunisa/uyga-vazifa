import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  MessageCircle, 
  Volume2, 
  Mic, 
  MicOff
} from 'lucide-react';
import MascotAvatar from './MascotAvatar';
import { speak, sounds } from '../services/audioService';
import { answerFollowUpQuestion } from '../services/solverService';
import { TRANSLATIONS } from '../data/translations';

export default function FollowUpChat({
  currentSolution,
  currentMascotId = 'barnaby',
  apiKeys = {},
  language = 'uz',
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.uz;
  const isUz = language === 'uz';

  const defaultGreeting = isUz 
    ? "Ushbu yechim bo‘yicha biron savolingiz bormi? \"Nima uchun?\" deb so‘rang yoki quyidagi tayyor savollardan birini tanlang! 🦉✨"
    : "Curious about anything in this solution? Ask me \"Why?\" or pick a quick question below! 🦉✨";

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'mascot',
      text: defaultGreeting,
      time: 'Hozir'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    t.chat.chip1,
    t.chat.chip2,
    t.chat.chip3,
    t.chat.chip4,
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (questionToSend) => {
    const text = (questionToSend || inputText).trim();
    if (!text || isTyping) return;

    sounds.playPop();
    setInputText('');

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const answer = await answerFollowUpQuestion({
        question: text,
        currentSolution,
        chatHistory: messages,
        apiKeys,
        language
      });

      sounds.playStar();
      const mascotReply = {
        id: `mascot-${Date.now()}`,
        sender: 'mascot',
        text: answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, mascotReply]);
    } catch {
      const fallbackReply = {
        id: `mascot-${Date.now()}`,
        sender: 'mascot',
        text: isUz 
          ? "Juda qiziqarli savol! Qadamma-qadam amaliyot qilish eng yaxshi natijaga olib keladi! ⭐"
          : "That's a super thoughtful question! Keep practicing and remember: taking it step-by-step is always the key! ⭐",
        time: 'Hozir'
      };
      setMessages(prev => [...prev, fallbackReply]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReadMessage = (text) => {
    sounds.playPop();
    speak(text);
  };

  const handleDictate = () => {
    sounds.playPop();
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(isUz ? 'Ovozli yozish qo‘llab-quvvatlanmadi.' : 'Speech recognition not available.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = isUz ? 'uz-UZ' : 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-sky-100 shadow-md p-5 sm:p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bubble text-lg font-bold text-slate-800">
              {t.chat.title}
            </h3>
            <p className="text-xs text-slate-500">{t.chat.desc}</p>
          </div>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
          AI Repetitor 24/7 ✨
        </span>
      </div>

      {/* Suggested Quick Question Pills */}
      <div className="mb-4">
        <p className="text-xs font-bold text-slate-500 mb-2">{isUz ? "Tezkor savolni bosing:" : "Tap a quick question to ask:"}</p>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(q)}
              className="text-xs font-medium bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-800 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-sky-300 transition-all active:scale-95"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Thread Container */}
      <div className="space-y-3 max-h-80 overflow-y-auto p-3 rounded-2xl bg-slate-50 border border-slate-100 mb-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {!isUser ? (
                <MascotAvatar mascotId={currentMascotId} mood="idle" size="sm" className="flex-shrink-0" />
              ) : (
                <div className="w-8 h-8 rounded-2xl bg-sky-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-2xs">
                  {isUz ? 'Men' : 'Me'}
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm font-medium leading-relaxed relative group ${
                  isUser
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs shadow-2xs'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                
                <div className={`flex items-center justify-between gap-3 mt-1.5 pt-1 border-t text-[10px] ${
                  isUser ? 'border-white/20 text-sky-100' : 'border-slate-100 text-slate-400'
                }`}>
                  <span>{msg.time}</span>
                  {!isUser && (
                    <button
                      type="button"
                      onClick={() => handleReadMessage(msg.text)}
                      title={t.chat.listen}
                      className="text-slate-400 hover:text-sky-600 flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{t.chat.listen}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2.5">
            <MascotAvatar mascotId={currentMascotId} mood="thinking" size="sm" />
            <div className="bg-white border border-slate-200 rounded-2xl p-3 text-xs text-slate-500 flex items-center gap-2">
              <span className="flex gap-1">
                <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </span>
              <span>{t.chat.typing}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.chat.inputPlaceholder}
            className="w-full pl-4 pr-10 py-3 rounded-2xl border-2 border-slate-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400"
          />

          <button
            type="button"
            onClick={handleDictate}
            title={isListening ? 'Eshitilmoqda...' : 'Ovoz bilan yozish'}
            className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-xl transition-all ${
              isListening ? 'bg-rose-500 text-white animate-pulse' : 'text-slate-400 hover:text-sky-600'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>

        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className={`p-3 rounded-2xl text-white font-bold transition-all shadow-md active:scale-95 ${
            !inputText.trim() || isTyping
              ? 'bg-slate-300 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 shadow-sky-200'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
