import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'https://gurubackened.vercel.app';

export default function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAIResponse = async (message, subject, className) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, subject, className }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch AI response');

      return data.response;
    } catch (err) {
      console.error('Error:', err.message);
      setError(err.message || 'Something went wrong');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generateTimeline = async (subject, className) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/timeline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, className }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate timeline');

      return data.timeline || [];
    } catch (err) {
      console.error('Timeline Error:', err.message);
      setError(err.message || 'Something went wrong while generating timeline');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchAIResponse,
    generateTimeline,
    loading,
    error,
  };
}
