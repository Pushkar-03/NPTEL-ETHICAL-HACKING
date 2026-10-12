import React, { useState } from 'react';
import { useSprint } from '../../context/SprintContext';
import { SPRINT_DAYS } from '../../data/courseData';
import { ALL_QUIZ_QUESTIONS } from '../../data/quizData';
import { Topic, QuizQuestion } from '../../types';
import {
  RefreshCw,
  AlertTriangle,
  Bookmark,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  RotateCw,
  Sparkles,
} from 'lucide-react';

interface RevisionCenterViewProps {
  onStudyTopic: (day: number, topicId: string) => void;
  onStartQuizWithQuestions: (questions: QuizQuestion[], title: string) => void;
}

export const RevisionCenterView: React.FC<RevisionCenterViewProps> = ({
  onStudyTopic,
  onStartQuizWithQuestions,
}) => {
  const { progress, weakTopicIds, toggleDifficult, toggleBookmark } = useSprint();

  const [activeTab, setActiveTab] = useState<'weak' | 'flashcards' | 'bookmarks' | 'mistakes'>('weak');
  const [currentFlashcardIdx, setCurrentFlashcardIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // All topics flat
  const allTopics: { topic: Topic; day: number }[] = [];
  SPRINT_DAYS.forEach((d) => {
    d.topics.forEach((t) => {
      allTopics.push({ topic: t, day: d.dayNumber });
    });
  });

  // Weak topics objects
  const weakTopics = allTopics.filter(({ topic }) => weakTopicIds.includes(topic.id));

  // Bookmarked topics
  const bookmarkedTopics = allTopics.filter(({ topic }) =>
    progress.bookmarkedTopicIds.includes(topic.id)
  );

  // Incorrect questions
  const missedQuestionIds = Array.from(
    new Set(progress.quizResults.flatMap((r) => r.incorrectQuestionIds))
  );
  const missedQuestions = ALL_QUIZ_QUESTIONS.filter((q) => missedQuestionIds.includes(q.id));

  // Flashcards bank (Definitions from P1 and P2 topics)
  const flashcards = allTopics
    .filter(({ topic }) => topic.priority === 'P1' || topic.priority === 'P2')
    .map(({ topic, day }) => ({
      title: topic.title,
      definition: topic.explanation.simpleDefinition,
      analogy: topic.explanation.practicalAnalogy,
      day,
      topicId: topic.id,
      priority: topic.priority,
    }));

  const handleStartWeakSession = () => {
    const questionsToRevise = ALL_QUIZ_QUESTIONS.filter((q) => weakTopicIds.includes(q.topicId));
    onStartQuizWithQuestions(
      questionsToRevise.length > 0 ? questionsToRevise : ALL_QUIZ_QUESTIONS.slice(0, 5),
      'Targeted Weak Areas Revision Session'
    );
  };

  const handleStartMistakesQuiz = () => {
    if (missedQuestions.length > 0) {
      onStartQuizWithQuestions(missedQuestions, 'Mistakes Retake Quiz');
    }
  };

  const currentCard = flashcards[currentFlashcardIdx] || flashcards[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-cyan-400" />
              <h1 className="text-xl font-bold text-white">Revision & Mastery Center</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Reinforce difficult topics through spaced repetition, flashcard drills, and mistake analysis.
            </p>
          </div>

          <button
            onClick={handleStartWeakSession}
            disabled={weakTopics.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 disabled:opacity-40 font-semibold text-xs text-white shadow-lg shadow-amber-900/30 transition-all"
          >
            <AlertTriangle className="w-4 h-4" /> Revise My Weak Areas ({weakTopicIds.length})
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('weak')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'weak'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Weak Topics ({weakTopics.length})
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'flashcards'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Rapid Flashcards ({flashcards.length})
          </button>
          <button
            onClick={() => setActiveTab('mistakes')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'mistakes'
                ? 'bg-rose-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <span>Mistakes Bank ({missedQuestions.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'bookmarks'
                ? 'bg-slate-800 text-cyan-300'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" /> Bookmarked Topics ({bookmarkedTopics.length})
          </button>
        </div>
      </div>

      {/* Tab Content: Weak Topics */}
      {activeTab === 'weak' && (
        <div className="space-y-4">
          {weakTopics.length === 0 ? (
            <div className="rounded-2xl border border-emerald-900/40 bg-emerald-950/20 p-8 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">No Weak Topics Flagged!</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                You have demonstrated solid accuracy across all practiced modules. As you take more quizzes or flag difficult lessons, they will queue here automatically.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weakTopics.map(({ topic, day }) => (
                <div
                  key={topic.id}
                  className="rounded-2xl border border-amber-900/50 bg-slate-950 p-4 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                        Day {day} • Priority {topic.priority}
                      </span>
                      <button
                        onClick={() => toggleDifficult(topic.id)}
                        className="text-xs text-amber-400 hover:text-amber-300 font-mono"
                      >
                        Unflag
                      </button>
                    </div>
                    <h3 className="text-sm font-bold text-white">{topic.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {topic.explanation.simpleDefinition}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-amber-400">Needs review</span>
                    <button
                      onClick={() => onStudyTopic(day, topic.id)}
                      className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                    >
                      Open Lesson <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Rapid Flashcards */}
      {activeTab === 'flashcards' && flashcards.length > 0 && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>
              Card {currentFlashcardIdx + 1} of {flashcards.length}
            </span>
            <span>Click card to flip definition</span>
          </div>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[220px] rounded-2xl border border-slate-700 bg-slate-900 p-6 flex flex-col justify-between hover:border-cyan-500 transition-all shadow-xl select-none"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold">
                  Day {currentCard.day} • {currentCard.priority}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <RotateCw className="w-3 h-3" /> Flip
                </span>
              </div>

              {!isFlipped ? (
                <div className="space-y-2 mt-4">
                  <h3 className="text-lg font-bold text-white">{currentCard.title}</h3>
                  <p className="text-xs text-slate-400">
                    What is the core definition and mechanism of this cybersecurity concept?
                  </p>
                </div>
              ) : (
                <div className="space-y-3 mt-2 animate-fadeIn">
                  <div className="text-xs font-semibold text-cyan-300 leading-relaxed">
                    {currentCard.definition}
                  </div>
                  <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 italic">
                    Analogy: {currentCard.analogy}
                  </div>
                </div>
              )}
            </div>

            <div className="text-[10px] text-slate-500 font-mono text-center pt-2">
              {isFlipped ? 'Showing Answer' : 'Showing Term'}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentFlashcardIdx((prev) => (prev > 0 ? prev - 1 : flashcards.length - 1));
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white font-medium"
            >
              Previous Card
            </button>
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentFlashcardIdx((prev) => (prev < flashcards.length - 1 ? prev + 1 : 0));
              }}
              className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs text-white font-semibold shadow-md shadow-cyan-900/30"
            >
              Next Card →
            </button>
          </div>
        </div>
      )}

      {/* Tab Content: Mistakes Bank */}
      {activeTab === 'mistakes' && (
        <div className="space-y-4">
          {missedQuestions.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">No Missed Questions Recorded</h3>
              <p className="text-xs text-slate-400">
                Any questions you miss during daily assessments or mock tests will automatically collect here for targeted retake.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-end">
                <button
                  onClick={handleStartMistakesQuiz}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white transition-colors"
                >
                  Retake All Missed Questions Now ({missedQuestions.length})
                </button>
              </div>

              {missedQuestions.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-xl border border-rose-900/40 bg-slate-950 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Mistake #{idx + 1} • Day {q.day}</span>
                    <span className="text-rose-400 font-semibold">{q.priority}</span>
                  </div>
                  <div className="text-xs font-semibold text-white">{q.question}</div>
                  <div className="p-2.5 rounded bg-slate-900 text-xs text-emerald-300 border border-slate-800">
                    <strong className="text-slate-400 block text-[11px]">Correct Answer:</strong>{' '}
                    {q.options[q.correctAnswer]}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{q.explanation}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Bookmarks */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          {bookmarkedTopics.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 text-center space-y-2">
              <Bookmark className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Bookmarks Saved Yet</h3>
              <p className="text-xs text-slate-400">
                Click the bookmark icon on any lesson to save it for quick revision.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedTopics.map(({ topic, day }) => (
                <div
                  key={topic.id}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-4 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                        Day {day} • {topic.priority}
                      </span>
                      <button
                        onClick={() => toggleBookmark(topic.id)}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                    <h3 className="text-sm font-bold text-white">{topic.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {topic.explanation.simpleDefinition}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-end">
                    <button
                      onClick={() => onStudyTopic(day, topic.id)}
                      className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                    >
                      Open Lesson <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
