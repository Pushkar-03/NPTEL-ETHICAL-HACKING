import React, { useState } from 'react';
import { useSprint } from '../../context/SprintContext';
import { SPRINT_DAYS, OFFICIAL_NPTEL_URL, COURSE_INSTRUCTOR, OFFICIAL_COURSE_NAME } from '../../data/courseData';
import { ExperienceLevel, LearningGoal } from '../../types';
import {
  Settings,
  ExternalLink,
  ShieldAlert,
  Link,
  RotateCcw,
  User,
  CheckCircle2,
  Info,
} from 'lucide-react';

interface SettingsViewProps {
  onOpenDiagnostic: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onOpenDiagnostic }) => {
  const {
    progress,
    setExperienceLevel,
    setLearningGoal,
    setCustomLectureLink,
    resetProgress,
  } = useSprint();

  const [selectedTopicId, setSelectedTopicId] = useState<string>('d1-t1');
  const [customUrl, setCustomUrl] = useState<string>(
    progress.customLectureLinks['d1-t1'] || ''
  );
  const [savedStatus, setSavedStatus] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const handleSaveCustomLink = () => {
    setCustomLectureLink(selectedTopicId, customUrl);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const allTopics: { id: string; title: string; day: number }[] = [];
  SPRINT_DAYS.forEach((d) => {
    d.topics.forEach((t) => {
      allTopics.push({ id: t.id, title: t.title, day: d.dayNumber });
    });
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
        <h1 className="text-xl font-bold text-white">Settings & NPTEL Course Integration</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your personalized learning configuration, verified course sources, and custom links.
        </p>
      </div>

      {/* Official Course Integration Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
              Official Course Reference
            </span>
            <h2 className="text-base font-bold text-white mt-0.5">{OFFICIAL_COURSE_NAME}</h2>
          </div>
          <a
            href={OFFICIAL_NPTEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 font-semibold text-xs text-white transition-colors"
          >
            <span>Open NPTEL Course</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
          <p>
            • <strong>Course Code:</strong> noc26_cs157
          </p>
          <p>
            • <strong>Instructor:</strong> {COURSE_INSTRUCTOR}
          </p>
          <p>
            • <strong>Verification Policy:</strong> HackSprint treats the official NPTEL course as the authoritative source of truth. All course module references are verified against the published syllabus. Original practice exercises are explicitly designated as supplementary learning aids.
          </p>
        </div>
      </div>

      {/* Custom Lecture Link / Topic Link Manual Override */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
            Manual Lecture Link Override
          </span>
          <h3 className="text-sm font-bold text-white mt-0.5">
            Attach Custom Direct Lecture Links or Video URLs
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            If you have direct YouTube playlist links or private student bookmarks for specific lectures, you can map them directly to topics here.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">
              Select Topic:
            </label>
            <select
              value={selectedTopicId}
              onChange={(e) => {
                setSelectedTopicId(e.target.value);
                setCustomUrl(progress.customLectureLinks[e.target.value] || '');
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              {allTopics.map((t) => (
                <option key={t.id} value={t.id}>
                  Day {t.day}: {t.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">
              Custom Lecture URL:
            </label>
            <input
              type="url"
              placeholder="https://onlinecourses.nptel.ac.in/... or YouTube link"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {savedStatus && (
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-4 h-4" /> Custom link saved successfully!
            </span>
          )}
          <div className="ml-auto">
            <button
              onClick={handleSaveCustomLink}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-semibold text-xs text-white transition-colors"
            >
              Save Custom Link
            </button>
          </div>
        </div>
      </div>

      {/* Learning Profile Settings */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
            Learner Profile
          </span>
          <h3 className="text-sm font-bold text-white mt-0.5">
            Adaptive Path Configuration
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">
              Experience Level:
            </label>
            <select
              value={progress.experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="Beginner">Beginner (Foundations emphasis)</option>
              <option value="Intermediate">Intermediate (Standard sprint)</option>
              <option value="Familiar">Familiar (Fast track & deep dive)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">
              Primary Objective:
            </label>
            <select
              value={progress.learningGoal}
              onChange={(e) => setLearningGoal(e.target.value as LearningGoal)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="nptel_exam">NPTEL Examination Preparation</option>
              <option value="conceptual_fast">Fast Conceptual Understanding</option>
              <option value="practical_hacking">Practical Ethical Hacking Labs</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onOpenDiagnostic}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 font-mono"
          >
            Retake Diagnostic Assessment Check →
          </button>
        </div>
      </div>

      {/* Reset Progress Section */}
      <div className="rounded-2xl border border-rose-900/40 bg-slate-950 p-5 space-y-3">
        <h3 className="text-sm font-bold text-white">Reset Learning Progress</h3>
        <p className="text-xs text-slate-400">
          Reset all quiz scores, completed topics, streak counters, and personal annotations back to initial factory state.
        </p>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-rose-950 border border-rose-900 text-xs font-semibold text-rose-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset All Progress
          </button>
        ) : (
          <div className="flex items-center gap-3 p-3 bg-rose-950/40 rounded-xl border border-rose-800">
            <span className="text-xs text-rose-300 font-medium">Are you sure? This cannot be undone.</span>
            <button
              onClick={() => {
                resetProgress();
                setShowResetConfirm(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs"
            >
              Yes, Reset Everything
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
