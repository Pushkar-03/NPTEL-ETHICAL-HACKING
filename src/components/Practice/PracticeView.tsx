import React, { useState, useEffect } from 'react';
import { useSprint } from '../../context/SprintContext';
import { ALL_QUIZ_QUESTIONS } from '../../data/quizData';
import { SPRINT_DAYS } from '../../data/courseData';
import { QuizQuestion, QuizResult } from '../../types';
import {
  Timer,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Award,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PracticeViewProps {
  onStudyTopic: (day: number, topicId: string) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({ onStudyTopic }) => {
  const { progress, saveQuizResult, weakTopicIds } = useSprint();

  // Mode: menu vs active quiz vs result screen
  const [viewState, setViewState] = useState<'menu' | 'running' | 'report'>('menu');
  const [quizTitle, setQuizTitle] = useState<string>('');
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [instantFeedback, setInstantFeedback] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(600); // 10 mins default
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [latestReport, setLatestReport] = useState<QuizResult | null>(null);

  // Timer effect
  useEffect(() => {
    let timer: any;
    if (viewState === 'running') {
      timer = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [viewState]);

  const startQuiz = (
    questions: QuizQuestion[],
    title: string,
    durationSeconds: number = 600
  ) => {
    setActiveQuestions(questions);
    setQuizTitle(title);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setFlagged({});
    setTimeRemaining(durationSeconds);
    setTimeSpent(0);
    setViewState('running');
  };

  const handleStartDailyAssessment = (dayNumber: number) => {
    const dayQuestions = ALL_QUIZ_QUESTIONS.filter((q) => q.day === dayNumber);
    const questions = dayQuestions.length > 0 ? dayQuestions : ALL_QUIZ_QUESTIONS.slice(0, 5);
    startQuiz(questions, `Day ${dayNumber} Knowledge Assessment`, 600);
  };

  const handleStartMixedQuiz = () => {
    const shuffled = [...ALL_QUIZ_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 10);
    startQuiz(shuffled, 'Mixed-Topic Comprehensive Quiz (10 Questions)', 600);
  };

  const handleStartWeakDrill = () => {
    const weakQuestions = ALL_QUIZ_QUESTIONS.filter((q) => weakTopicIds.includes(q.topicId));
    const questions = weakQuestions.length > 0 ? weakQuestions : ALL_QUIZ_QUESTIONS.slice(0, 6);
    startQuiz(questions, 'Targeted Weak Areas Revision Drill', 600);
  };

  const handleStartMockExam = () => {
    // 25 to 50 questions
    const mockPool = [...ALL_QUIZ_QUESTIONS, ...ALL_QUIZ_QUESTIONS].slice(0, 25);
    startQuiz(mockPool, 'Full NPTEL Ethical Hacking Mock Examination (Timed)', 1800);
  };

  const handleFinishQuiz = () => {
    let correctCount = 0;
    const incorrectIds: string[] = [];
    const topicBreakdown: Record<string, { total: number; correct: number }> = {};

    activeQuestions.forEach((q, idx) => {
      const isCorrect = selectedAnswers[idx] === q.correctAnswer;
      if (isCorrect) {
        correctCount++;
      } else {
        incorrectIds.push(q.id);
      }

      if (!topicBreakdown[q.topicId]) {
        topicBreakdown[q.topicId] = { total: 0, correct: 0 };
      }
      topicBreakdown[q.topicId].total += 1;
      if (isCorrect) {
        topicBreakdown[q.topicId].correct += 1;
      }
    });

    const scorePct = Math.round((correctCount / activeQuestions.length) * 100);

    const result: QuizResult = {
      id: `res-${Date.now()}`,
      quizType: quizTitle.includes('Mock') ? 'mock' : 'daily',
      timestamp: Date.now(),
      totalQuestions: activeQuestions.length,
      correctCount,
      scorePercentage: scorePct,
      timeSpentSeconds: timeSpent,
      incorrectQuestionIds: incorrectIds,
      topicBreakdown,
    };

    saveQuizResult(result);
    setLatestReport(result);
    setViewState('report');

    if (scorePct >= 80) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* View: Menu */}
      {viewState === 'menu' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-white">Quiz & Practice Center</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Sharpen your understanding with scenario-based MCQs, daily assessments, and timed mock exams.
                </p>
              </div>
              <button
                onClick={handleStartMockExam}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 font-semibold text-xs text-white shadow-lg shadow-cyan-900/30 transition-all"
              >
                <Award className="w-4 h-4" /> Start Full Mock Examination
              </button>
            </div>
          </div>

          {/* Practice Modes Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
                  Adaptive Drill
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  Mixed-Topic Practice
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  10 randomized questions from across all 10 sprint days to test comprehensive recall.
                </p>
              </div>
              <button
                onClick={handleStartMixedQuiz}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                Launch Mixed Quiz
              </button>
            </div>

            <div className="rounded-2xl border border-amber-900/40 bg-amber-950/20 p-5 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-mono text-amber-400 font-semibold uppercase">
                  Spaced Repetition
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  Revise Weak Areas Drill
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Focus specifically on concepts you flagged as difficult or answered incorrectly.
                </p>
              </div>
              <button
                onClick={handleStartWeakDrill}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-semibold text-white transition-colors"
              >
                Start Weak Topic Quiz ({weakTopicIds.length} flagged)
              </button>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">
                  Exam Simulation
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  Final Timed Mock Test
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Simulated proctored examination covering the complete NPTEL ethical hacking syllabus.
                </p>
              </div>
              <button
                onClick={handleStartMockExam}
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white transition-colors"
              >
                Take Mock Exam (30m)
              </button>
            </div>
          </div>

          {/* Daily Assessments Grid */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Day-by-Day Assessments
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {SPRINT_DAYS.map((day) => {
                const pastResult = progress.quizResults.find(
                  (r) => r.day === day.dayNumber
                );
                return (
                  <button
                    key={day.dayNumber}
                    onClick={() => handleStartDailyAssessment(day.dayNumber)}
                    className="text-left p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/60 transition-all flex flex-col justify-between min-h-[95px]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono font-bold text-cyan-400">
                          Day {day.dayNumber}
                        </span>
                        {pastResult && (
                          <span
                            className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                              pastResult.scorePercentage >= 80
                                ? 'bg-emerald-950 text-emerald-300'
                                : 'bg-amber-950 text-amber-300'
                            }`}
                          >
                            {pastResult.scorePercentage}%
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-slate-200 line-clamp-1">
                        {day.title.split('&')[0]}
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-2">
                      Start Quiz →
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* View: Active Quiz Runner */}
      {viewState === 'running' && activeQuestions.length > 0 && (
        <div className="space-y-6">
          {/* Top Bar with Timer and Progress */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-semibold">{quizTitle}</span>
              <div className="text-sm font-bold text-white">
                Question {currentIdx + 1} of {activeQuestions.length}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={instantFeedback}
                  onChange={(e) => setInstantFeedback(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-600 focus:ring-0"
                />
                Instant Feedback
              </label>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-400">
                <Timer className="w-3.5 h-3.5" />
                <span>{formatTimer(timeRemaining)}</span>
              </div>

              <button
                onClick={handleFinishQuiz}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-semibold text-xs text-white transition-colors"
              >
                Submit Exam
              </button>
            </div>
          </div>

          {/* Question Box */}
          {(() => {
            const q = activeQuestions[currentIdx];
            const chosen = selectedAnswers[currentIdx];
            const isCorrect = chosen === q.correctAnswer;

            return (
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        q.priority === 'P1'
                          ? 'bg-rose-950 text-rose-300'
                          : 'bg-amber-950 text-amber-300'
                      }`}
                    >
                      {q.priority}
                    </span>
                    <span className="text-xs font-mono text-slate-400 uppercase">
                      {q.type.replace('_', ' ')}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      setFlagged({ ...flagged, [currentIdx]: !flagged[currentIdx] })
                    }
                    className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition-colors ${
                      flagged[currentIdx]
                        ? 'bg-amber-950 border-amber-600 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {flagged[currentIdx] ? '★ Flagged' : '☆ Flag for Review'}
                  </button>
                </div>

                <div className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                  {q.question}
                </div>

                {/* Options */}
                <div className="space-y-2.5">
                  {q.options.map((option, optIdx) => {
                    const isSelected = chosen === optIdx;
                    let optStyle =
                      'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (instantFeedback && chosen !== undefined) {
                      if (optIdx === q.correctAnswer) {
                        optStyle =
                          'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold';
                      } else if (isSelected) {
                        optStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
                      }
                    } else if (isSelected) {
                      optStyle = 'bg-cyan-950/70 border-cyan-500 text-cyan-200 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() =>
                          setSelectedAnswers({ ...selectedAnswers, [currentIdx]: optIdx })
                        }
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${optStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-slate-500 text-xs">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span>{option}</span>
                        </div>
                        {instantFeedback && chosen !== undefined && optIdx === q.correctAnswer && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Feedback Explanation */}
                {instantFeedback && chosen !== undefined && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed mt-4 space-y-1">
                    <div
                      className={`font-semibold ${
                        isCorrect ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isCorrect ? 'Correct!' : 'Incorrect Choice'}
                    </div>
                    <p>{q.explanation}</p>
                  </div>
                )}

                {/* Navigation Footer */}
                <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                  <button
                    onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                    disabled={currentIdx === 0}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 text-xs text-slate-300 hover:text-white"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {currentIdx < activeQuestions.length - 1 ? (
                      <button
                        onClick={() => setCurrentIdx(currentIdx + 1)}
                        className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 font-semibold text-xs text-white"
                      >
                        Next Question <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={handleFinishQuiz}
                        className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-semibold text-xs text-white"
                      >
                        Finish & View Report
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Question Grid Navigator */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
              Question Navigator ({Object.keys(selectedAnswers).length}/{activeQuestions.length} answered)
            </span>
            <div className="flex flex-wrap gap-2">
              {activeQuestions.map((_, i) => {
                const isAnswered = selectedAnswers[i] !== undefined;
                const isCurrent = currentIdx === i;
                const isFlagged = flagged[i];

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`h-8 w-8 rounded-lg font-mono text-xs font-semibold flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-cyan-500 text-black ring-2 ring-cyan-300'
                        : isFlagged
                        ? 'bg-amber-950 text-amber-300 border border-amber-600'
                        : isAnswered
                        ? 'bg-slate-800 text-cyan-300 border border-cyan-800'
                        : 'bg-slate-900 text-slate-500 border border-slate-800 hover:text-slate-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* View: Post-Quiz Report */}
      {viewState === 'report' && latestReport && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-950 border border-cyan-800 text-cyan-400">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Assessment Completed
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Your Score: {latestReport.scorePercentage}%
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {latestReport.correctCount} correct out of {latestReport.totalQuestions} questions • Time: {formatTimer(latestReport.timeSpentSeconds)}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => setViewState('menu')}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:bg-slate-800"
              >
                Back to Practice Menu
              </button>
              <button
                onClick={handleStartMixedQuiz}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white shadow-lg shadow-cyan-900/40"
              >
                Retake Another Quiz
              </button>
            </div>
          </div>

          {/* Question Review Breakdown */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Detailed Question Review & Explanations
            </h3>

            <div className="space-y-4">
              {activeQuestions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border space-y-2.5 ${
                      isCorrect
                        ? 'bg-emerald-950/20 border-emerald-900/50'
                        : 'bg-rose-950/20 border-rose-900/50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">Question {idx + 1}</span>
                      <span
                        className={`font-semibold flex items-center gap-1 ${
                          isCorrect ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" /> Incorrect
                          </>
                        )}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-white leading-relaxed">
                      {q.question}
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="text-slate-300">
                        <strong className="text-slate-500">Your Answer:</strong>{' '}
                        {userAns !== undefined ? q.options[userAns] : 'Left Blank'}
                      </div>
                      {!isCorrect && (
                        <div className="text-emerald-400">
                          <strong className="text-slate-500">Correct Answer:</strong>{' '}
                          {q.options[q.correctAnswer]}
                        </div>
                      )}
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <strong className="text-cyan-400 block mb-0.5">Explanation:</strong>
                      {q.explanation}
                    </div>

                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => onStudyTopic(q.day, q.topicId)}
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
                      >
                        <BookOpen className="w-3.5 h-3.5" /> Review Associated Lesson →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
