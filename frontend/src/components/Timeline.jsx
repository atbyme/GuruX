import React, { useState, useEffect } from 'react';

export default function Timeline({ steps }) {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  useEffect(() => {
    let interval;
    if (isAutoPlay && steps.length > 0) {
      interval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % steps.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, steps.length]);

  const toggleComplete = (index) => {
    const updated = new Set(completedSteps);
    updated.has(index) ? updated.delete(index) : updated.add(index);
    setCompletedSteps(updated);
  };

  if (!steps || steps.length === 0) {
    return (
      <div className="text-white text-center py-6">
        ❌ No learning steps available.
      </div>
    );
  }

  const step = steps[activeStep];
  const progress = (completedSteps.size / steps.length) * 100;

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
      <div className="w-full max-w-2xl bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
        {/* Header Controls */}
        <div className="flex flex-wrap gap-3 justify-between">
          <button
            onClick={() => setActiveStep(0)}
            className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded transition"
          >
            ← Back to Start
          </button>
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded transition"
          >
            {isAutoPlay ? 'Pause AutoPlay' : 'Start AutoPlay'}
          </button>
          <button
            onClick={() => {
              setActiveStep(0);
              setCompletedSteps(new Set());
              setIsAutoPlay(false);
            }}
            className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded transition"
          >
            Reset
          </button>
        </div>

        {/* Step Info */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-pink-400">
            Step {activeStep + 1} of {steps.length}
          </h2>
          <h3 className="text-xl font-semibold">{step.title || 'Untitled Step'}</h3>
          <p className="text-slate-200 whitespace-pre-wrap">{step.description || 'No details available.'}</p>
          <p className="text-sm text-slate-400">
            <strong>Estimated Duration:</strong> {step.duration || 'N/A'}
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setActiveStep(i => Math.max(i - 1, 0))}
            disabled={activeStep === 0}
            className="px-5 py-2 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setActiveStep(i => Math.min(i + 1, steps.length - 1))}
            disabled={activeStep === steps.length - 1}
            className="px-5 py-2 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={() => toggleComplete(activeStep)}
            className={`px-5 py-2 rounded font-semibold ${
              completedSteps.has(activeStep)
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-slate-600 hover:bg-slate-700'
            }`}
          >
            {completedSteps.has(activeStep) ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-sm text-slate-400 mt-1">
            Progress: {progress.toFixed(0)}%
          </p>
        </div>
      </div>
    </div>
  );
}
