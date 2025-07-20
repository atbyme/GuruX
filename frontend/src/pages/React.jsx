import React, { useState, useEffect } from 'react';
import {
  ChevronRight, BookOpen, CheckCircle2, GraduationCap, Target
} from 'lucide-react';
import { useTransition, animated } from '@react-spring/web';
import useAI from '../components/Hooks/useAI';

const subjectSubtopics = {
  Physics: ['Mechanics', 'Magnetism', 'Optics', 'Thermodynamics'],
  Mathematics: ['Algebra', 'Geometry', 'Trigonometry', 'Calculus'],
  Chemistry: ['Atomic Structure', 'Periodic Table', 'Chemical Reactions'],
};

export default function ReactPage() {
  const [step, setStep] = useState('subject');
  const [subject, setSubject] = useState('');
  const [className, setClassName] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [learningSteps, setLearningSteps] = useState([]);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  const { generateTimeline, loading } = useAI();

  const transitions = useTransition(activeStep, {
    key: activeStep,
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(-20px)' },
    config: { tension: 220, friction: 30 },
  });

  const pageTransition = useTransition(step, {
    key: step,
    from: { opacity: 0, transform: 'scale(0.98)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.98)' },
    config: { tension: 180, friction: 20 },
  });

  const handleSubjectSubmit = () => {
    if (subject.trim()) setStep('class');
  };

  const handleClassSubmit = async () => {
    if (className.trim()) {
      const aiTimeline = await generateTimeline(subject, className);
      setLearningSteps(aiTimeline.map((step, i) => ({ ...step, id: i })));
      setStep('timeline');
      setActiveStep(0);
      setCompletedSteps(new Set());
      setSelectedSubtopic(null);
    }
  };

  const resetForm = () => {
    setStep('subject');
    setSubject('');
    setClassName('');
    setActiveStep(0);
    setCompletedSteps(new Set());
    setIsAutoPlay(false);
    setLearningSteps([]);
    setSelectedSubtopic(null);
  };

  useEffect(() => {
    let interval;
    if (isAutoPlay && learningSteps.length > 0) {
      interval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % learningSteps.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, learningSteps.length]);

  const handleStepClick = (index) => {
    setActiveStep(index);
    setIsAutoPlay(false);
    setSelectedSubtopic(null);
  };

  const toggleComplete = (index) => {
    const updated = new Set(completedSteps);
    updated.has(index) ? updated.delete(index) : updated.add(index);
    setCompletedSteps(updated);
  };

  const progress = learningSteps.length ? (completedSteps.size / learningSteps.length) * 100 : 0;

  const handleSubtopicClick = (topic) => setSelectedSubtopic(topic);

  return (
    <>
      {pageTransition((style, item) => {
        if (item === 'subject') {
          return (
            <animated.div style={style} className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
              <div className="w-full max-w-md space-y-6 text-center">
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  KnowledgeFlow
                </h1>
                <p className="text-lg text-slate-300">Create your personalized learning timeline</p>
                <div className="space-y-5 rounded-xl bg-slate-800 p-6 shadow-lg">
                  <div className="flex items-center gap-2">
                    <BookOpen className="text-purple-400" />
                    <h2 className="text-xl font-semibold text-white">Enter Subject</h2>
                  </div>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubjectSubmit()}
                    placeholder="e.g., Mathematics, Physics"
                    className="w-full rounded-lg bg-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={handleSubjectSubmit}
                    disabled={!subject.trim()}
                    className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-3 text-white font-semibold hover:scale-105 transition disabled:opacity-50"
                  >
                    Continue <ChevronRight className="inline ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            </animated.div>
          );
        }

        if (item === 'class') {
          return (
            <animated.div style={style} className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
              <div className="w-full max-w-md space-y-6 text-center">
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  KnowledgeFlow
                </h1>
                <p className="text-lg text-slate-300">Subject: <span className="text-purple-400">{subject}</span></p>
                <div className="space-y-5 rounded-xl bg-slate-800 p-6 shadow-lg">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="text-purple-400" />
                    <h2 className="text-xl font-semibold text-white">Enter Class/Level</h2>
                  </div>
                  <input
                    type="text"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleClassSubmit()}
                    placeholder="e.g., Class 9, Beginner"
                    className="w-full rounded-lg bg-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setStep('subject')}
                      className="rounded-lg bg-slate-700 py-3 text-white hover:bg-slate-600 transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleClassSubmit}
                      disabled={!className.trim() || loading}
                      className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-3 text-white font-semibold hover:scale-105 transition disabled:opacity-50"
                    >
                      {loading ? 'Generating...' : 'Generate'} <Target className="inline ml-1 w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </animated.div>
          );
        }

        if (item === 'timeline') {
          return (
            <animated.div style={style} className="min-h-screen px-4 py-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
              <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {subject} - {className} Timeline
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button onClick={() => { setStep('class'); setSelectedSubtopic(null); }} className="rounded-lg bg-slate-700 py-2 hover:bg-slate-600">
                    ← Back
                  </button>
                  <button onClick={() => setIsAutoPlay(!isAutoPlay)} className="rounded-lg bg-purple-700 py-2 hover:bg-purple-600">
                    {isAutoPlay ? 'Pause AutoPlay' : 'Start AutoPlay'}
                  </button>
                  <button onClick={resetForm} className="rounded-lg bg-red-600 py-2 hover:bg-red-500">
                    Reset
                  </button>
                </div>

                <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all" style={{ width: `${progress}%` }} />
                </div>

                {subjectSubtopics[subject] && !selectedSubtopic && (
                  <div className="rounded-lg bg-slate-700 p-4">
                    <h2 className="text-lg font-semibold mb-3">Subtopics in {subject}:</h2>
                    <div className="flex flex-wrap gap-2">
                      {subjectSubtopics[subject].map(topic => (
                        <button key={topic} onClick={() => handleSubtopicClick(topic)} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition">
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSubtopic && (
                  <div className="rounded-lg bg-slate-600 p-4">
                    <h3 className="text-xl font-bold mb-2">{selectedSubtopic}</h3>
                    <p className="mb-4">Detailed information about <strong>{selectedSubtopic}</strong> will appear here.</p>
                    <button onClick={() => setSelectedSubtopic(null)} className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded text-white transition">
                      Back to Subtopics
                    </button>
                  </div>
                )}

                {!selectedSubtopic && (
                  <>
                    <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory scroll-smooth py-2">
                      {learningSteps.map((stepItem, index) => (
                        <button
                          key={stepItem.id}
                          onClick={() => handleStepClick(index)}
                          className={`snap-start flex-shrink-0 px-4 py-2 rounded-lg min-w-[120px] text-sm transition ${
                            index === activeStep
                              ? 'bg-pink-600 text-white ring-2 ring-pink-400'
                              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          } ${completedSteps.has(index) ? 'line-through text-green-400' : ''}`}
                        >
                          Step {index + 1}
                          {completedSteps.has(index) && <CheckCircle2 className="inline ml-1 w-4 h-4" />}
                        </button>
                      ))}
                    </div>

                    {transitions((style, i) => (
                      <animated.div key={i} style={style} className="rounded-lg bg-slate-700 p-4">
                        <h3 className="text-xl font-bold mb-2">
                          {learningSteps[i]?.title || `Step ${i + 1}`}
                        </h3>
                        <p className="whitespace-pre-wrap">{learningSteps[i]?.description || 'No details available.'}</p>
                      </animated.div>
                    ))}

                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                      <button
                        onClick={() => toggleComplete(activeStep)}
                        className={`px-6 py-2 rounded-lg font-semibold ${
                          completedSteps.has(activeStep)
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-slate-600 hover:bg-slate-700'
                        }`}
                      >
                        {completedSteps.has(activeStep) ? 'Mark Incomplete' : 'Mark Complete'}
                      </button>
                      <button
                        onClick={() => setActiveStep((activeStep - 1 + learningSteps.length) % learningSteps.length)}
                        className="px-6 py-2 rounded-lg bg-slate-600 hover:bg-slate-700"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setActiveStep((activeStep + 1) % learningSteps.length)}
                        className="px-6 py-2 rounded-lg bg-slate-600 hover:bg-slate-700"
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
              </div>
            </animated.div>
          );
        }

        return null;
      })}
    </>
  );
}
