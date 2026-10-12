import React from 'react';
import { useSprint, BADGES_LIST } from '../../context/SprintContext';
import { SPRINT_DAYS, COURSE_INSTRUCTOR, OFFICIAL_COURSE_NAME } from '../../data/courseData';
import {
  BarChart3,
  Award,
  Zap,
  Flame,
  CheckCircle2,
  Clock,
  Shield,
  FileCheck2,
  Trophy,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { progress } = useSprint();

  const totalTopics = SPRINT_DAYS.reduce((acc, d) => acc + d.topics.length, 0);
  const completedTopics = progress.completedTopicIds.length;
  const masteredTopics = progress.masteredTopicIds.length;
  const progressPct = Math.round((completedTopics / totalTopics) * 100);
  const masteryPct = Math.round((masteredTopics / totalTopics) * 100);

  // Calculate average quiz accuracy
  const quizAvg =
    progress.quizResults.length > 0
      ? Math.round(
          progress.quizResults.reduce((acc, r) => acc + r.scorePercentage, 0) /
            progress.quizResults.length
        )
      : 0;

  // Estimated hours
  const totalMinutes = SPRINT_DAYS.reduce((acc, d) => acc + d.estimatedTotalMinutes, 0);
  const spentMinutes = Math.round((progressPct / 100) * totalMinutes);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
        <h1 className="text-xl font-bold text-white">Learning Analytics & Sprint Mastery</h1>
        <p className="text-xs text-slate-400 mt-1">
          Objective performance metrics, demonstrated understanding benchmarks, and earned milestones.
        </p>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-1">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Syllabus Coverage
          </span>
          <div className="text-2xl font-bold font-mono text-white">{progressPct}%</div>
          <div className="text-[11px] text-slate-500 font-mono">
            {completedTopics} of {totalTopics} topics read
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-900/40 bg-slate-950 p-4 space-y-1">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-emerald-400" /> Demonstrated Mastery
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-400">{masteryPct}%</div>
          <div className="text-[11px] text-emerald-500 font-mono">
            {masteredTopics} topics verified (≥80%)
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-1">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-cyan-400" /> Assessment Accuracy
          </span>
          <div className="text-2xl font-bold font-mono text-cyan-300">{quizAvg}%</div>
          <div className="text-[11px] text-slate-500 font-mono">
            Across {progress.quizResults.length} quiz attempts
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-1">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" /> Active Learning Time
          </span>
          <div className="text-2xl font-bold font-mono text-amber-300">
            ~{Math.round(spentMinutes / 60)} hrs
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            {progress.streakDays}-day active streak
          </div>
        </div>
      </div>

      {/* Completion vs Demonstrated Mastery Distinction Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Content Completion vs Demonstrated Understanding
          </h3>
          <span className="text-xs text-slate-400 font-mono">Strict Rigor Benchmark</span>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Passive Syllabus Consumption (Read Topics):</span>
              <span className="font-mono text-cyan-400">{progressPct}%</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-cyan-500 h-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Demonstrated Conceptual Mastery (Score ≥ 80%):</span>
              <span className="font-mono text-emerald-400">{masteryPct}%</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${masteryPct}%` }}
              />
            </div>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed italic pt-1">
          HackSprint adheres to cognitive retention standards: reading a concept marks it as completed, but only rigorous assessment score verification classifies it as Mastered.
        </p>
      </div>

      {/* Badges & Gamification Milestones */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Earned Badges & Milestones
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Unlock recognition through deliberate practice, test scores, and day streaks.
            </p>
          </div>
          <span className="font-mono text-xs text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800">
            {progress.badges.length} / {BADGES_LIST.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {BADGES_LIST.map((b) => {
            const isUnlocked = progress.badges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-slate-900 border-cyan-500/50 text-white shadow-sm'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-600 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`p-2 rounded-lg border text-xs ${
                        isUnlocked
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                          : 'bg-slate-900 border-slate-800 text-slate-600'
                      }`}
                    >
                      <Trophy className="w-4 h-4" />
                    </span>
                    <span className="font-mono text-[10px]">
                      {isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{b.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion Report Preview */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              NPTEL 10-Day Sprint Completion Certificate
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Status: {progress.completedDays.length >= 10 ? 'QUALIFIED' : 'IN PROGRESS'}
          </span>
        </div>

        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 text-center space-y-3 relative overflow-hidden">
          <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            CERTIFICATE OF SPRINT COMPLETION
          </div>
          <h2 className="text-xl font-serif text-white tracking-wide">
            {OFFICIAL_COURSE_NAME}
          </h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            This digital certificate verifies completion of the intensive 10-day ethical hacking sprint covering network packet flows, asymmetric cryptography, penetration testing methodologies, OWASP web vulnerabilities, and incident log analysis.
          </p>
          <div className="pt-2 text-[11px] font-mono text-slate-400">
            Curriculum Reference: {COURSE_INSTRUCTOR} • Verified ID: NPTEL-{progress.totalXp}-2026
          </div>
        </div>
      </div>
    </div>
  );
};
