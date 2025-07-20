// src/components/Ask.jsx
import React, { useState, useEffect } from 'react';
import Timeline from './Timeline';

export default function Ask() {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Example: hardcoded subject and class, can be dynamic later
  const subject = 'Physics';
  const className = '12';

  useEffect(() => {
    async function fetchTimeline() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('https://your-backend-url/api/timeline', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subject, className }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Failed to fetch timeline');
          setSteps([]);
        } else {
          setSteps(data.timeline || []);
        }
      } catch (err) {
        setError('Network error: ' + err.message);
        setSteps([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTimeline();
  }, [subject, className]);

  if (loading) return <p className="text-white p-4">Loading timeline...</p>;
  if (error) return <p className="text-red-500 p-4">Error: {error}</p>;

  return <Timeline steps={steps} />;
}
