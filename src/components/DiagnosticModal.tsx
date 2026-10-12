import React, { useState } from 'react';
import { useSprint } from '../context/SprintContext';
import { DIAGNOSTIC_QUESTIONS } from '../data/quizData';
import { ExperienceLevel, LearningGoal } from '../types';
import { ShieldCheck, Target, ArrowRight, CheckCircle2, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({ isOpen, onClose }) => {
  const { progress, setExperienceLevel, setLearningGoal, completeDiagnostic } = useSprint();

  const [step, setStep] = useState<'profile' | 'test' | 'summary'>('profile');
  const [level, setLevel] = useState<ExperienceLevel>(progress.experienceLevel);
  const [goal, setGoal] = useState<LearningGoal>(progress.learningGoal);

  // Diagnostic quiz state
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number>(0);

  if (!isOpen) return null;

  const handleStartQuiz = () => {
    setExperienceLevel(level);
    setLearningGoal(goal);
    setStep('test');
  };

  const handleSelectOption = (optIndex: number) => {
    setUserAnswers({ ...userAnswers, [currentQIndex]: optIndex });
  };

  const handleNextQuestion = () => {
    if (currentQIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // Calculate score
      let correct = 0;
      DIAGNOSTIC_QUESTIONS.forEach((q, idx) => {
        if (userAnswers[idx] === q.correctAnswer) {
          correct++;
        }
      });
      const pct = Math.round((correct / DIAGNOSTIC_QUESTIONS.length) * 100);
      setScore(pct);
      completeDiagnostic(pct);
      setStep('summary');

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // ignore
      }
    }
  };

  const currentQ = DIAGNOSTIC_QUESTIONS[currentQIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6 text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'profile' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Personalize Your 10-Day Sprint</h3>
                <p className="text-xs text-slate-400">
                  Select your background and primary objective for an adaptive learning path.
                </p>
              </div>
            </div>

            {/* Experience level */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Current Cybersecurity Experience:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'Beginner' as ExperienceLevel, title: 'Beginner', desc: 'New to networking and cybersecurity concepts' },
                  { id: 'Intermediate' as ExperienceLevel, title: 'Intermediate', desc: 'Familiar with basic networking & OS principles' },
                  { id: 'Familiar' as ExperienceLevel, title: 'Fundamentals', desc: 'Experienced; preparing specifically for exam' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setLevel(item.id)}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      level === item.id
                        ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{item.title}</div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-tight">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Goal */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Primary Learning Goal:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'nptel_exam' as LearningGoal, title: 'NPTEL Exam Prep', desc: 'Prioritize high-yield exam distinctions and MCQ practice' },
                  { id: 'conceptual_fast' as LearningGoal, title: 'Conceptual Speed', desc: 'Understand principles quickly through analogies & diagrams' },
                  { id: 'practical_hacking' as LearningGoal, title: 'Practical Labs', desc: 'Deep dive into virtual terminal simulations and defense tools' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setGoal(item.id)}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      goal === item.id
                        ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{item.title}</div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-tight">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleStartQuiz}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-semibold text-xs text-white transition-colors shadow-lg shadow-cyan-900/40"
              >
                Proceed to Diagnostic Check (5 Questions)
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 'test' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="text-xs font-mono text-cyan-400">
                Diagnostic Assessment: Question {currentQIndex + 1} of {DIAGNOSTIC_QUESTIONS.length}
              </div>
              <div className="text-xs font-mono text-slate-400">
                Score: {Math.round((Object.keys(userAnswers).length / DIAGNOSTIC_QUESTIONS.length) * 100)}% Answered
              </div>
            </div>

            <div className="text-sm font-semibold text-white leading-relaxed">
              {currentQ.question}
            </div>

            <div className="space-y-2">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                    userAnswers[currentQIndex] === idx
                      ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-mono text-slate-500 mr-2">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-slate-800">
              <span className="text-xs text-slate-500">
                Select your answer to unlock custom lesson depth.
              </span>
              <button
                onClick={handleNextQuestion}
                disabled={userAnswers[currentQIndex] === undefined}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-xs font-semibold text-white transition-colors"
              >
                {currentQIndex === DIAGNOSTIC_QUESTIONS.length - 1 ? 'Finish Assessment' : 'Next Question'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 'summary' && (
          <div className="space-y-6 text-center py-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-400">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Diagnostic Completed!</h3>
              <p className="text-xs text-slate-400 mt-1">
                Baseline assessment score: <span className="font-mono text-cyan-400 font-bold">{score}%</span>
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left space-y-2 text-xs">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Adaptive Path Customized:
              </div>
              <ul className="space-y-1.5 text-slate-400 list-disc list-inside">
                <li>
                  Experience Profile: <strong className="text-white">{level}</strong>
                </li>
                <li>
                  Priority Track: <strong className="text-white">{goal.replace('_', ' ').toUpperCase()}</strong>
                </li>
                <li>
                  Recommended Start: <strong className="text-cyan-400">Day 1: Cybersecurity Foundations</strong>
                </li>
                {score < 60 && (
                  <li className="text-amber-400">
                    Recommended: Review Day 1 & Day 2 foundational concepts before advancing to port scanning.
                  </li>
                )}
              </ul>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-cyan-900/50"
              >
                Go to Learning Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
