import React, { useState } from 'react';
import { useSprint } from '../../context/SprintContext';
import { SPRINT_DAYS, OFFICIAL_NPTEL_URL } from '../../data/courseData';
import { Topic, PriorityLevel } from '../../types';
import {
  CheckCircle2,
  Bookmark,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  HelpCircle,
  FlaskConical,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  FileEdit,
  Sparkles,
} from 'lucide-react';
import { PacketAnalyzerLab } from '../Labs/PacketAnalyzerLab';
import { CryptoHasherLab } from '../Labs/CryptoHasherLab';
import { PortScannerLab } from '../Labs/PortScannerLab';
import { WebSecuritySandbox } from '../Labs/WebSecuritySandbox';
import { PasswordEntropyLab } from '../Labs/PasswordEntropyLab';
import { SocLogAnalysisLab } from '../Labs/SocLogAnalysisLab';
import confetti from 'canvas-confetti';

interface SprintViewProps {
  selectedDayNumber?: number;
  onSelectDayNumber: (day: number) => void;
  onOpenPractice: () => void;
  onOpenNotesForTopic: (topic: Topic) => void;
}

export const SprintView: React.FC<SprintViewProps> = ({
  selectedDayNumber = 1,
  onSelectDayNumber,
  onOpenPractice,
  onOpenNotesForTopic,
}) => {
  const {
    progress,
    completeTopic,
    toggleBookmark,
    toggleDifficult,
    setCurrentDay,
  } = useSprint();

  const dayData = SPRINT_DAYS.find((d) => d.dayNumber === selectedDayNumber) || SPRINT_DAYS[0];
  const [selectedTopicId, setSelectedTopicId] = useState<string>(dayData.topics[0]?.id || '');
  const [expandedTechnical, setExpandedTechnical] = useState<Record<string, boolean>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [selectedKcOptions, setSelectedKcOptions] = useState<Record<string, number>>({});
  const [showCustomLinkModal, setShowCustomLinkModal] = useState<boolean>(false);
  const [customLinkInput, setCustomLinkInput] = useState<string>('');

  const currentTopic = dayData.topics.find((t) => t.id === selectedTopicId) || dayData.topics[0];

  const isCompleted = progress.completedTopicIds.includes(currentTopic.id);
  const isBookmarked = progress.bookmarkedTopicIds.includes(currentTopic.id);
  const isDifficult = progress.difficultTopicIds.includes(currentTopic.id);

  const toggleTechnical = (id: string) => {
    setExpandedTechnical((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCompleteTopic = () => {
    completeTopic(currentTopic.id, dayData.dayNumber);
    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.8 },
      });
    } catch {
      // ignore
    }
  };

  const renderEmbeddedLab = () => {
    if (!dayData.labType) return null;
    switch (dayData.labType) {
      case 'packet':
        return <PacketAnalyzerLab />;
      case 'crypto':
        return <CryptoHasherLab />;
      case 'nmap':
        return <PortScannerLab />;
      case 'web':
        return <WebSecuritySandbox />;
      case 'password':
        return <PasswordEntropyLab />;
      case 'soc':
        return <SocLogAnalysisLab />;
      default:
        return <PacketAnalyzerLab />;
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Day Selector Header Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
              10-Day Sprint Curriculum
            </span>
            <h1 className="text-lg font-bold text-white">
              Day {dayData.dayNumber}: {dayData.title}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">{dayData.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (selectedDayNumber > 1) {
                  onSelectDayNumber(selectedDayNumber - 1);
                  setCurrentDay(selectedDayNumber - 1);
                }
              }}
              disabled={selectedDayNumber <= 1}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 disabled:opacity-40 hover:bg-slate-800"
            >
              <ArrowLeft className="w-3.5 h-3.5 inline mr-1" /> Prev Day
            </button>
            <button
              onClick={() => {
                if (selectedDayNumber < 10) {
                  onSelectDayNumber(selectedDayNumber + 1);
                  setCurrentDay(selectedDayNumber + 1);
                }
              }}
              disabled={selectedDayNumber >= 10}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 disabled:opacity-40 hover:bg-slate-800"
            >
              Next Day <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
            </button>
          </div>
        </div>

        {/* Day Pills Carousel */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {SPRINT_DAYS.map((d) => {
            const isDayDone = progress.completedDays.includes(d.dayNumber);
            const isDayActive = d.dayNumber === selectedDayNumber;
            return (
              <button
                key={d.dayNumber}
                onClick={() => {
                  onSelectDayNumber(d.dayNumber);
                  setCurrentDay(d.dayNumber);
                  setSelectedTopicId(d.topics[0]?.id || '');
                }}
                className={`shrink-0 px-3 py-1.5 rounded-lg font-mono text-xs transition-all flex items-center gap-1.5 ${
                  isDayActive
                    ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-900/30'
                    : isDayDone
                    ? 'bg-emerald-950/40 border border-emerald-800 text-emerald-300'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Day {d.dayNumber}</span>
                {isDayDone && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Layout: Topic Nav on Left, Rich Content on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Topics in this day */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Day {dayData.dayNumber} Topics
            </div>
            <div className="space-y-2">
              {dayData.topics.map((t) => {
                const isSelected = t.id === currentTopic.id;
                const isTopicDone = progress.completedTopicIds.includes(t.id);
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTopicId(t.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200 shadow-sm'
                        : 'bg-slate-900 border-slate-800/90 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          t.priority === 'P1'
                            ? 'bg-rose-950 text-rose-300'
                            : t.priority === 'P2'
                            ? 'bg-amber-950 text-amber-300'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {t.priority}
                      </span>
                      {isTopicDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <div className="text-xs font-semibold text-white leading-tight line-clamp-2">
                      {t.title}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-1">
                      ~{t.estimatedMinutes} mins
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Study Objectives Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 space-y-2">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Session Goals
            </span>
            <ul className="text-xs text-slate-400 space-y-1.5">
              {dayData.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Detailed Topic View */}
        <div className="lg:col-span-3 space-y-6">
          {/* Topic Header Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                    currentTopic.priority === 'P1'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : currentTopic.priority === 'P2'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {currentTopic.priority} — {currentTopic.priority === 'P1' ? 'Essential' : currentTopic.priority === 'P2' ? 'High Value' : 'Supplementary'}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Estimated: {currentTopic.estimatedMinutes} mins
                </span>
              </div>

              {/* Action Buttons: Bookmark, Difficult, Notes */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(currentTopic.id)}
                  title="Bookmark Topic"
                  className={`p-2 rounded-lg border text-xs transition-colors ${
                    isBookmarked
                      ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleDifficult(currentTopic.id)}
                  title="Mark as Difficult"
                  className={`p-2 rounded-lg border text-xs transition-colors ${
                    isDifficult
                      ? 'bg-rose-950 border-rose-600 text-rose-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenNotesForTopic(currentTopic)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white"
                >
                  <FileEdit className="w-3.5 h-3.5 text-cyan-400" /> Notes
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">{currentTopic.title}</h2>
              <p className="text-xs text-slate-400 mt-1 italic">
                Why this priority: {currentTopic.priorityRationale}
              </p>
            </div>

            {/* Official NPTEL lecture bar */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] font-mono font-bold">
                  NPTEL SOURCE
                </span>
                <span className="text-slate-300">
                  {currentTopic.explanation.officialNptelModule} • {currentTopic.explanation.officialNptelLectureTitle}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={currentTopic.explanation.officialNptelUrl || OFFICIAL_NPTEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-medium transition-colors"
                >
                  <span>Open Official NPTEL Lecture</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Section B: Concept Explanations */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-1">
                B. Concept Explanation
              </span>
              <div className="p-3.5 rounded-xl bg-slate-900 border-l-4 border-cyan-500 text-xs leading-relaxed text-slate-200">
                <strong className="text-white block mb-1">Simple Definition:</strong>
                {currentTopic.explanation.simpleDefinition}
              </div>
            </div>

            {/* Concise explanation */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                Concise Explanation:
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentTopic.explanation.conciseExplanation}
              </p>
            </div>

            {/* Practical Analogy */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Real-World Analogy:
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentTopic.explanation.practicalAnalogy}
              </p>
            </div>

            {/* Diagram / Workflow if present */}
            {currentTopic.explanation.diagramWorkflow && (
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Technical Workflow / Topology:
                </h4>
                <pre className="p-4 rounded-xl bg-slate-900 font-mono text-xs text-cyan-300 overflow-x-auto border border-slate-800 leading-snug">
                  {currentTopic.explanation.diagramWorkflow}
                </pre>
              </div>
            )}

            {/* Expandable Technical Deep Dive */}
            <div className="pt-2 border-t border-slate-800/80">
              <button
                onClick={() => toggleTechnical(currentTopic.id)}
                className="flex items-center justify-between w-full text-xs font-semibold text-cyan-400 hover:text-cyan-300 py-1"
              >
                <span>Technical Deep Dive & Architecture</span>
                {expandedTechnical[currentTopic.id] ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {expandedTechnical[currentTopic.id] && (
                <div className="mt-3 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
                  <p>{currentTopic.explanation.technicalDeepDive}</p>
                </div>
              )}
            </div>

            {/* Important Terminology */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Key Terminology:
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentTopic.explanation.importantTerminology.map((term, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>

            {/* Common Misconceptions */}
            {currentTopic.explanation.commonMisconceptions.length > 0 && (
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Common Exam Misconceptions:
                </span>
                <ul className="text-xs text-rose-200/90 space-y-1.5">
                  {currentTopic.explanation.commonMisconceptions.map((misc, i) => (
                    <li key={i} className="leading-relaxed">
                      {misc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Section C: Quick Notes & Comparison Tables */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
              C. Quick Notes & Revision Takeaways
            </span>

            {/* Key takeaways */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Key Takeaways:
              </h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {currentTopic.quickNotes.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Comparison Table if present */}
            {currentTopic.quickNotes.comparisonTable && (
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
                  <thead className="bg-slate-900 text-slate-300 font-mono">
                    <tr>
                      {currentTopic.quickNotes.comparisonTable.headers.map((h, i) => (
                        <th key={i} className="p-2.5 border-b border-slate-800">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-slate-950">
                    {currentTopic.quickNotes.comparisonTable.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-900/40">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-2.5 text-slate-300">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Section D: In-Lesson Knowledge Checks */}
          {currentTopic.knowledgeChecks.length > 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
                D. In-Lesson Knowledge Check
              </span>

              {currentTopic.knowledgeChecks.map((kc) => {
                const isAnswerRevealed = revealedAnswers[kc.id];
                const selectedOpt = selectedKcOptions[kc.id];

                return (
                  <div key={kc.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="text-xs font-semibold text-white leading-relaxed">
                      {kc.question}
                    </div>

                    <div className="space-y-2">
                      {kc.options.map((opt, oIdx) => {
                        const isChosen = selectedOpt === oIdx;
                        const isCorrect = oIdx === kc.correctAnswer;

                        let optClass = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
                        if (isAnswerRevealed) {
                          if (isCorrect) {
                            optClass = 'bg-emerald-950/60 border-emerald-600 text-emerald-200 font-semibold';
                          } else if (isChosen) {
                            optClass = 'bg-rose-950/60 border-rose-600 text-rose-200';
                          }
                        } else if (isChosen) {
                          optClass = 'bg-cyan-950/60 border-cyan-500 text-cyan-200 font-medium';
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => {
                              if (!isAnswerRevealed) {
                                setSelectedKcOptions({ ...selectedKcOptions, [kc.id]: oIdx });
                              }
                            }}
                            className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors flex items-center justify-between ${optClass}`}
                          >
                            <span>
                              <span className="font-mono text-slate-500 mr-2">
                                {String.fromCharCode(65 + oIdx)}.
                              </span>
                              {opt}
                            </span>
                            {isAnswerRevealed && isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() =>
                          setRevealedAnswers({ ...revealedAnswers, [kc.id]: !isAnswerRevealed })
                        }
                        disabled={selectedOpt === undefined}
                        className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-xs font-semibold text-white transition-colors"
                      >
                        {isAnswerRevealed ? 'Hide Explanation' : 'Check Answer'}
                      </button>

                      {isAnswerRevealed && (
                        <span
                          className={`text-xs font-semibold ${
                            selectedOpt === kc.correctAnswer ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {selectedOpt === kc.correctAnswer ? 'Correct!' : 'Incorrect Choice'}
                        </span>
                      )}
                    </div>

                    {isAnswerRevealed && (
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed mt-2">
                        <strong className="text-cyan-400 block mb-0.5">Explanation:</strong>
                        {kc.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Section E: Embedded Interactive Lab */}
          {dayData.labTitle && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  E. Safe Guided Cybersecurity Lab ({dayData.labTitle})
                </span>
              </div>
              {renderEmbeddedLab()}
            </div>
          )}

          {/* Section F: Session Completion Action Bar */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                  isCompleted
                    ? 'bg-emerald-950/60 border-emerald-600 text-emerald-400'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">
                  {isCompleted ? 'Topic Completed (+25 XP Earned)' : 'Ready to mark this topic complete?'}
                </div>
                <div className="text-[11px] text-slate-400">
                  Completing topics updates your progress and sprint timeline.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {!isCompleted ? (
                <button
                  onClick={handleCompleteTopic}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-semibold text-white shadow-lg shadow-emerald-900/30 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" /> Mark Topic Complete (+25 XP)
                </button>
              ) : (
                <button
                  onClick={onOpenPractice}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white transition-colors"
                >
                  Take Day {dayData.dayNumber} Assessment <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
