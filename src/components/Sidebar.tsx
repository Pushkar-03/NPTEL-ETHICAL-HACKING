import React from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  ClipboardCheck,
  RefreshCw,
  BookmarkCheck,
  BarChart3,
  Settings,
  ChevronRight,
  Flame,
  Award,
} from 'lucide-react';

export type NavTab =
  | 'dashboard'
  | 'sprint'
  | 'library'
  | 'practice'
  | 'revision'
  | 'notes'
  | 'analytics'
  | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  weakCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab, weakCount }) => {
  const navItems = [
    { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sprint' as NavTab, label: '10-Day Sprint', icon: CalendarDays },
    { id: 'library' as NavTab, label: 'Topic Library', icon: BookOpen },
    { id: 'practice' as NavTab, label: 'Practice & Quizzes', icon: ClipboardCheck },
    {
      id: 'revision' as NavTab,
      label: 'Revision Center',
      icon: RefreshCw,
      badge: weakCount > 0 ? weakCount : undefined,
    },
    { id: 'notes' as NavTab, label: 'Notes & Bookmarks', icon: BookmarkCheck },
    { id: 'analytics' as NavTab, label: 'Progress & Analytics', icon: BarChart3 },
    { id: 'settings' as NavTab, label: 'Settings & Reference', icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-slate-800 bg-slate-950/70 p-4 hidden md:flex md:flex-col justify-between">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-cyan-600/15 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`h-4 w-4 transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.badge !== undefined && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-950 text-[10px] font-bold text-rose-300 border border-rose-800">
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="h-3.5 w-3.5 text-cyan-400" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Course Source badge card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3.5 mt-6">
        <div className="flex items-center gap-2 mb-1.5">
          <Award className="h-4 w-4 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-200">Verified Course</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Aligned with NPTEL Ethical Hacking syllabus by IIT Kharagpur.
        </p>
      </div>
    </aside>
  );
};
