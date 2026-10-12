/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SprintProvider, useSprint } from './context/SprintContext';
import { Navbar } from './components/Navbar';
import { Sidebar, NavTab } from './components/Sidebar';
import { DashboardView } from './components/Dashboard/DashboardView';
import { SprintView } from './components/Sprint/SprintView';
import { TopicLibraryView } from './components/TopicLibrary/TopicLibraryView';
import { PracticeView } from './components/Practice/PracticeView';
import { RevisionCenterView } from './components/RevisionCenter/RevisionCenterView';
import { NotesView } from './components/Notes/NotesView';
import { AnalyticsView } from './components/Analytics/AnalyticsView';
import { SettingsView } from './components/Settings/SettingsView';
import { DiagnosticModal } from './components/DiagnosticModal';
import { Topic, QuizQuestion } from './types';
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  ClipboardCheck,
  RefreshCw,
  BookmarkCheck,
  BarChart3,
  Settings,
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { progress, weakTopicIds, setCurrentDay } = useSprint();

  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(progress.currentDay || 1);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState<boolean>(false);

  // Cross-navigation handlers
  const handleStartDay = (dayNumber: number) => {
    setSelectedDayNumber(dayNumber);
    setCurrentDay(dayNumber);
    setActiveTab('sprint');
  };

  const handleStudyTopic = (dayNumber: number, topicId: string) => {
    setSelectedDayNumber(dayNumber);
    setCurrentDay(dayNumber);
    setActiveTab('sprint');
  };

  const handleOpenPractice = () => {
    setActiveTab('practice');
  };

  const handleOpenRevision = () => {
    setActiveTab('revision');
  };

  const handleOpenNotesForTopic = (topic: Topic) => {
    setActiveTab('notes');
  };

  const handleStartQuizWithQuestions = (questions: QuizQuestion[], title: string) => {
    setActiveTab('practice');
  };

  const mobileNavItems = [
    { id: 'dashboard' as NavTab, label: 'Home', icon: LayoutDashboard },
    { id: 'sprint' as NavTab, label: 'Sprint', icon: CalendarDays },
    { id: 'practice' as NavTab, label: 'Practice', icon: ClipboardCheck },
    { id: 'revision' as NavTab, label: 'Revision', icon: RefreshCw },
    { id: 'analytics' as NavTab, label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar */}
      <Navbar onOpenDiagnostic={() => setIsDiagnosticOpen(true)} />

      {/* Main Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          weakCount={weakTopicIds.length}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 max-w-full">
          {activeTab === 'dashboard' && (
            <DashboardView
              onStartDay={handleStartDay}
              onOpenRevision={handleOpenRevision}
              onOpenPractice={handleOpenPractice}
            />
          )}

          {activeTab === 'sprint' && (
            <SprintView
              selectedDayNumber={selectedDayNumber}
              onSelectDayNumber={setSelectedDayNumber}
              onOpenPractice={handleOpenPractice}
              onOpenNotesForTopic={handleOpenNotesForTopic}
            />
          )}

          {activeTab === 'library' && (
            <TopicLibraryView onSelectTopic={handleStudyTopic} />
          )}

          {activeTab === 'practice' && (
            <PracticeView onStudyTopic={handleStudyTopic} />
          )}

          {activeTab === 'revision' && (
            <RevisionCenterView
              onStudyTopic={handleStudyTopic}
              onStartQuizWithQuestions={handleStartQuizWithQuestions}
            />
          )}

          {activeTab === 'notes' && <NotesView />}

          {activeTab === 'analytics' && <AnalyticsView />}

          {activeTab === 'settings' && (
            <SettingsView onOpenDiagnostic={() => setIsDiagnosticOpen(true)} />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden sticky bottom-0 z-40 bg-slate-950/95 border-t border-slate-800 backdrop-blur-md px-2 py-2 flex items-center justify-around">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 p-1.5 rounded-lg text-[10px] font-medium transition-colors ${
                isActive ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Diagnostic Onboarding Modal */}
      <DiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <SprintProvider>
      <MainAppContent />
    </SprintProvider>
  );
}
