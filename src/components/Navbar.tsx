import React from 'react';
import { useSprint } from '../context/SprintContext';
import { OFFICIAL_NPTEL_URL } from '../data/courseData';
import { Shield, Flame, Zap, ExternalLink, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onOpenDiagnostic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDiagnostic }) => {
  const { progress, theme, toggleTheme } = useSprint();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 text-white">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold tracking-tight text-white">
                HackSprint
              </span>
              <span className="rounded bg-cyan-950/80 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-cyan-400 border border-cyan-800/80">
                noc26_cs157
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              NPTEL Ethical Hacking 10-Day Sprint
            </p>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Day Tracker Pill */}
          <div className="hidden md:flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 px-3 py-1 font-mono text-xs text-slate-300">
            <span className="text-cyan-400 font-bold">Sprint Day {progress.currentDay}</span>
            <span className="text-slate-500">/ 10</span>
          </div>

          {/* Streak Counter */}
          <div className="flex items-center gap-1 rounded-full bg-amber-950/40 border border-amber-900/60 px-2.5 py-1 text-xs font-semibold text-amber-300">
            <Flame className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{progress.streakDays}d</span>
          </div>

          {/* XP Badge */}
          <div className="flex items-center gap-1 rounded-full bg-cyan-950/40 border border-cyan-800/60 px-2.5 py-1 text-xs font-semibold text-cyan-300">
            <Zap className="h-3.5 w-3.5 text-cyan-400 fill-cyan-400" />
            <span>{progress.totalXp} XP</span>
          </div>

          {/* Diagnostic status / Retake */}
          {!progress.diagnosticCompleted ? (
            <button
              onClick={onOpenDiagnostic}
              className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition-colors shadow-sm"
            >
              Start Diagnostic
            </button>
          ) : (
            <button
              onClick={onOpenDiagnostic}
              title="View or retake diagnostic test"
              className="hidden xl:flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400 hover:text-slate-200"
            >
              Diagnostic: {progress.diagnosticScore}%
            </button>
          )}

          {/* Official Course Link */}
          <a
            href={OFFICIAL_NPTEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-colors"
          >
            <span className="hidden sm:inline">Official Course</span>
            <ExternalLink className="h-3.5 w-3.5 text-cyan-400" />
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
