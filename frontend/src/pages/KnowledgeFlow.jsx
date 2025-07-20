import React, { useState } from 'react';
import useAI from '../Hooks/useAI';

export default function KnowledgeFlow() {
  const [input, setInput] = useState('');
  const [subject, setSubject] = useState('');
  const [className, setClassName] = useState('');
  const [response, setResponse] = useState('');
  const { fetchAIResponse, loading, error } = useAI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    let prompt = input.trim();
    if (subject) prompt += `\nSubject: ${subject}`;
    if (className) prompt += `\nClass: ${className}`;

    try {
      const aiReply = await fetchAIResponse(prompt, subject, className);
      setResponse(aiReply || '⚠️ AI did not return a response.');
    } catch (err) {
      setResponse('');
      console.error('Error fetching AI response:', err);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
      <div className="w-full max-w-2xl bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          KnowledgeFlow AI Learning Assistant
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Ask your question or enter a topic/skill"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            required
            className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Subject (optional)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Class (optional)"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Ask AI'}
          </button>
        </form>

        {error && (
          <p className="text-red-400 font-semibold mt-4">❌ Error: {error}</p>
        )}

        {response && (
          <div className="mt-6 bg-slate-700 p-4 rounded-xl shadow-inner">
            <h2 className="text-xl font-bold mb-2 text-pink-400">AI Response:</h2>
            <p className="whitespace-pre-wrap text-slate-100">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
