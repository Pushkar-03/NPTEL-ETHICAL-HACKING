import React from 'react';
import { useSprint, BADGES_LIST } from '../../context/SprintContext';
import { SPRINT_DAYS, OFFICIAL_NPTEL_URL, COURSE_INSTRUCTOR } from '../../data/courseData';
import {
  Play,
  Flame,
  CheckCircle2,
  Clock,
  ExternalLink,
  Target,
  Award,
  Zap,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface DashboardViewProps {
  onStartDay: (dayNumber: number) => void;
  onOpenRevision: () => void;
  onOpenPractice: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onStartDay,
  onOpenRevision,
  onOpenPractice,
}) => {
  const { progress, weakTopicIds } = useSprint();

  const currentDayData =
    SPRINT_DAYS.find((d) => d.dayNumber === progress.currentDay) || SPRINT_DAYS[0];

  const totalTopicsCount = SPRINT_DAYS.reduce((acc, d) => acc + d.topics.length, 0);
  const completedTopicsCount = progress.completedTopicIds.length;
  const overallPct = Math.round((completedTopicsCount / totalTopicsCount) * 100);

  const latestQuiz = progress.quizResults[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Banner with Generated High-Tech Asset */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
        <div className="relative h-56 sm:h-64 w-full overflow-hidden">
          <img
            src="/src/assets/images/hero_ethical_hacking_1791779592941.jpg"
            alt="Ethical Hacking Operations"
            className="h-full w-full object-cover object-center filter brightness-[0.65]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />

          {/* Banner Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="rounded-md bg-cyan-950/90 border border-cyan-500/50 px-2.5 py-0.5 font-mono text-xs font-semibold text-cyan-300">
                10-DAY NPTEL SPRINT
              </span>
              <span className="rounded-md bg-slate-900/80 px-2.5 py-0.5 font-mono text-xs text-slate-300 border border-slate-700">
                Course: noc26_cs157
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              HackSprint Command Center
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl line-clamp-2">
              Structured accelerated curriculum for the NPTEL Ethical Hacking course by {COURSE_INSTRUCTOR}.
            </p>
          </div>
        </div>

        {/* Quick Actions & Continue Button */}
        <div className="p-4 sm:p-6 bg-slate-950/90 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 font-mono">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Day {progress.currentDay} of 10</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>~{currentDayData.estimatedTotalMinutes} mins today</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{completedTopicsCount}/{totalTopicsCount} topics done</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onStartDay(progress.currentDay)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 font-semibold text-xs text-white shadow-lg shadow-cyan-900/30 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Continue Learning Day {progress.currentDay}
            </button>
          </div>
        </div>
      </div>

      {/* 10-Day Visual Timeline */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              10-Day Sprint Roadmap
            </h3>
            <p className="text-xs text-slate-400">
              Interactive progression timeline across the complete NPTEL syllabus
            </p>
          </div>
          <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800">
            {overallPct}% Completed
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {SPRINT_DAYS.map((day) => {
            const isCompleted = progress.completedDays.includes(day.dayNumber);
            const isCurrent = progress.currentDay === day.dayNumber;

            return (
              <button
                key={day.dayNumber}
                onClick={() => onStartDay(day.dayNumber)}
                className={`relative group rounded-xl p-3 text-left border transition-all flex flex-col justify-between min-h-[90px] ${
                  isCompleted
                    ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-300 hover:border-emerald-600'
                    : isCurrent
                    ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200 ring-2 ring-cyan-500/20 shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-xs font-bold">
                    D{day.dayNumber}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                  ) : null}
                </div>
                <div className="mt-2">
                  <div className="text-[11px] font-semibold text-white line-clamp-1 group-hover:text-cyan-300">
                    {day.title.split('&')[0]}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {day.topics.length} topics
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid: Today's Session & Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Learning Objectives & Session details */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
                Recommended Study Session
              </span>
              <h2 className="text-base font-bold text-white mt-0.5">
                Day {currentDayData.dayNumber}: {currentDayData.title}
              </h2>
            </div>
            <button
              onClick={() => onStartDay(currentDayData.dayNumber)}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 font-mono"
            >
              Open Session <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Today's Core Objectives:
            </h3>
            <ul className="space-y-2">
              {currentDayData.learningObjectives.map((obj, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics in this session */}
          <div className="pt-2">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Session Breakdown ({currentDayData.topics.length} Topics):
            </h3>
            <div className="space-y-2">
              {currentDayData.topics.map((t) => {
                const isDone = progress.completedTopicIds.includes(t.id);
                return (
                  <div
                    key={t.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`px-1.5 py-0.5 rounded font-mono text-[10px] font-bold ${
                          t.priority === 'P1'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : t.priority === 'P2'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {t.priority}
                      </span>
                      <span className="font-medium text-slate-200">{t.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 font-mono">
                        {t.estimatedMinutes}m
                      </span>
                      {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Mini Stats, Weak Areas, NPTEL Card */}
        <div className="space-y-4">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> Current Streak
              </div>
              <div className="text-xl font-bold font-mono text-white">
                {progress.streakDays} Days
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Target className="w-3.5 h-3.5 text-cyan-400" /> Latest Quiz
              </div>
              <div className="text-xl font-bold font-mono text-cyan-400">
                {latestQuiz ? `${latestQuiz.scorePercentage}%` : 'Not Taken'}
              </div>
            </div>
          </div>

          {/* Weak Topics Alert */}
          {weakTopicIds.length > 0 ? (
            <div className="rounded-xl border border-amber-900/50 bg-amber-950/20 p-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  Weak Topics Requiring Revision ({weakTopicIds.length})
                </span>
              </div>
              <p className="text-[11px] text-amber-200/80 leading-relaxed mb-3">
                Identified based on difficulty marks or quiz mistakes.
              </p>
              <button
                onClick={onOpenRevision}
                className="w-full flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 font-semibold text-xs text-white transition-colors"
              >
                Revise Weak Topics Now
              </button>
            </div>
          ) : (
            <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-4 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Great mastery! No unresolved weak topics currently flagged.</span>
            </div>
          )}

          {/* Official Course Reference Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-cyan-400" /> Primary Source of Truth
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">
                NPTEL
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Official Course Reference: <strong>noc26_cs157</strong>. Access video lectures, transcripts, and official discussion forum directly on NPTEL.
            </p>
            <a
              href={OFFICIAL_NPTEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-mono pt-1"
            >
              Open NPTEL Portal <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Quick Practice shortcut */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-white">Daily Assessments</div>
              <div className="text-[11px] text-slate-400">Test concepts with scenario MCQs</div>
            </div>
            <button
              onClick={onOpenPractice}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors"
            >
              Take Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
