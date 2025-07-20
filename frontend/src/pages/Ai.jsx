import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HologramScene from '../components/Ai/Scene.jsx';
import useAI from '../components/Ai/useAI';

export default function Ai() {
  const navigate = useNavigate();
  const [userQuestion, setUserQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const { askQuestion } = useAI({
    onResult: (text) => {
      setAiAnswer(text);
      setIsThinking(false);
      setShowChat(true);
    },
    onThinkingStart: () => setIsThinking(true),
    onThinkingEnd: () => setIsThinking(false),
  });

  const handleSubmit = () => {
    if (userQuestion.trim()) {
      askQuestion(userQuestion.trim());
      setUserQuestion('');
      setShowChat(true);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="relative w-full h-screen bg-black text-cyan-400 font-inter overflow-hidden">
      <header className="fixed top-4 w-full z-30 px-6 flex justify-between items-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-white transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-3xl md:text-4xl font-bold mx-auto bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
          GuruX
        </h1>
        <div className="w-16" /> {/* Spacer to balance Back button */}
      </header>

      <main className="flex justify-center items-center w-full h-full relative">
        <HologramScene thinking={isThinking} rotateSpeed={0.0045} />

        {showChat && (
          <div className="absolute top-1/2 left-1/2 w-[90vw] max-w-md max-h-[60vh] -translate-x-1/2 -translate-y-1/2 bg-black/70 border border-cyan-400 text-cyan-300 rounded-xl shadow-2xl backdrop-blur-md flex flex-col z-10">
            <div className="px-4 py-3 text-sm font-semibold border-b border-cyan-500 bg-cyan-500/10">
              GuruX Terminal
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 text-sm tracking-wide">
              {isThinking ? (
                <p className="animate-pulse text-cyan-300">Thinking...</p>
              ) : (
                <p>{aiAnswer}</p>
              )}
            </div>
          </div>
        )}
      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-20 flex items-center gap-2">
        <input
          type="text"
          value={userQuestion}
          placeholder={inputFocused ? '' : 'Ask GuruX...'}
          onFocus={() => setInputFocused(true)}
          onBlur={() => {
            if (userQuestion.length === 0) setInputFocused(false);
          }}
          onChange={(e) => setUserQuestion(e.target.value)}
          onKeyDown={handleKey}
          className="flex-1 py-3 px-5 pr-16 bg-white/10 border border-white/20 rounded-full text-cyan-300 placeholder-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 backdrop-blur-md"
        />
        <button
          onClick={handleSubmit}
          className="absolute right-4 py-1.5 px-4 text-sm font-medium rounded-full border border-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/20 transition text-cyan-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}
