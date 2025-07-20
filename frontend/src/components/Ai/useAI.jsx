import { useState } from 'react';

export default function useAI({ onResult, onThinkingStart, onThinkingEnd }) {
  const [isThinking, setIsThinking] = useState(false);

  async function askQuestion(question) {
    if (!question.trim()) return;
    onThinkingStart?.();
    setIsThinking(true);

    try {
      const res = await fetch('https://gurux-backened.onrender.com/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      onResult(data.reply);
    } catch (err) {
      console.error(err);
      onResult("AI is unavailable right now.");
    }

    setIsThinking(false);
    onThinkingEnd?.();
  }

  return { askQuestion, isThinking };
}
