import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProgress,
  ExperienceLevel,
  LearningGoal,
  QuizResult,
  UserNote,
  Badge,
} from '../types';
import { ALL_QUIZ_QUESTIONS } from '../data/quizData';
import { SPRINT_DAYS } from '../data/courseData';

const STORAGE_KEY = 'hacksprint_nptel_progress_v2';

export const BADGES_LIST: Badge[] = [
  {
    id: 'sprint_starter',
    title: 'Recruit Hacker',
    description: 'Began the 10-day NPTEL Ethical Hacking Sprint and completed onboarding.',
    icon: 'Shield',
    category: 'sprint',
  },
  {
    id: 'packet_inspector',
    title: 'Packet Inspector',
    description: 'Mastered Day 1 TCP/IP Handshake & Networking Foundations.',
    icon: 'Network',
    category: 'mastery',
  },
  {
    id: 'crypto_cipher',
    title: 'Cryptographic Sentinel',
    description: 'Completed Day 2 Cryptography & Hash Functions lab.',
    icon: 'Key',
    category: 'mastery',
  },
  {
    id: 'recon_master',
    title: 'OSINT Scout',
    description: 'Completed Day 3 Reconnaissance & Footprinting.',
    icon: 'Eye',
    category: 'mastery',
  },
  {
    id: 'web_guardian',
    title: 'Web Application Shield',
    description: 'Mastered Day 6 SQLi & XSS Defense.',
    icon: 'Globe',
    category: 'mastery',
  },
  {
    id: 'streak_fire',
    title: '3-Day Fire Streak',
    description: 'Maintained a 3-day consecutive study streak.',
    icon: 'Flame',
    category: 'streak',
  },
  {
    id: 'quiz_ace',
    title: 'Assessment Ace',
    description: 'Scored 90% or higher on any practice assessment or mock exam.',
    icon: 'Award',
    category: 'quiz',
  },
  {
    id: 'sprint_finisher',
    title: 'Sprint Graduate',
    description: 'Completed all 10 days of the intensive NPTEL Ethical Hacking Sprint.',
    icon: 'Trophy',
    category: 'sprint',
  },
];

const INITIAL_PROGRESS: UserProgress = {
  currentDay: 1,
  completedDays: [],
  completedTopicIds: [],
  masteredTopicIds: [],
  difficultTopicIds: [],
  bookmarkedTopicIds: [],
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  totalXp: 150,
  experienceLevel: 'Intermediate',
  learningGoal: 'nptel_exam',
  diagnosticCompleted: false,
  diagnosticScore: undefined,
  quizResults: [],
  notes: [
    {
      id: 'default-note-1',
      topicId: 'd1-t2',
      day: 1,
      title: 'TCP Flags Quick Note',
      content: 'Remember: SYN, SYN-ACK, ACK. Server returns RST if the port is closed. Half-open scan sends RST before final ACK.',
      createdAt: Date.now() - 3600000,
      updatedAt: Date.now() - 3600000,
      tags: ['TCP', 'Handshake', 'Nmap'],
    },
    {
      id: 'default-note-2',
      topicId: 'd6-t1',
      day: 6,
      title: 'SQLi Defense Rule',
      content: 'Never rely on blacklists for SQLi. Use Parameterized Queries (Prepared Statements) as the primary defense.',
      createdAt: Date.now() - 1800000,
      updatedAt: Date.now() - 1800000,
      tags: ['SQLi', 'Defense', 'P1'],
    },
  ],
  badges: ['sprint_starter'],
  customLectureLinks: {},
  customTopicNotes: {},
};

interface SprintContextType {
  progress: UserProgress;
  setCurrentDay: (day: number) => void;
  completeTopic: (topicId: string, day: number) => void;
  toggleBookmark: (topicId: string) => void;
  toggleDifficult: (topicId: string) => void;
  saveNote: (note: { topicId: string; day: number; title: string; content: string; tags: string[] }) => void;
  updateNote: (id: string, title: string, content: string, tags: string[]) => void;
  deleteNote: (id: string) => void;
  saveQuizResult: (result: Omit<QuizResult, 'id' | 'timestamp'>) => void;
  setExperienceLevel: (level: ExperienceLevel) => void;
  setLearningGoal: (goal: LearningGoal) => void;
  completeDiagnostic: (score: number) => void;
  setCustomLectureLink: (topicId: string, url: string) => void;
  resetProgress: () => void;
  weakTopicIds: string[];
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const SprintContext = createContext<SprintContextType | undefined>(undefined);

export const SprintProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // calculate streak
        const today = new Date().toISOString().split('T')[0];
        const lastDate = parsed.lastActiveDate;
        let streak = parsed.streakDays || 1;
        if (lastDate && lastDate !== today) {
          const diffDays = Math.round(
            (new Date(today).getTime() - new Date(lastDate).getTime()) / (1000 * 3600 * 24)
          );
          if (diffDays === 1) {
            streak += 1;
          } else if (diffDays > 1) {
            streak = 1;
          }
        }
        return {
          ...parsed,
          streakDays: streak,
          lastActiveDate: today,
        };
      }
    } catch {
      // fallback
    }
    return INITIAL_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage errors
    }
  }, [progress]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const checkBadges = (newProgress: UserProgress) => {
    const currentBadges = new Set(newProgress.badges);
    let updated = false;

    if (!currentBadges.has('sprint_starter')) {
      currentBadges.add('sprint_starter');
      updated = true;
    }
    if (!currentBadges.has('packet_inspector') && newProgress.completedDays.includes(1)) {
      currentBadges.add('packet_inspector');
      updated = true;
    }
    if (!currentBadges.has('crypto_cipher') && newProgress.completedDays.includes(2)) {
      currentBadges.add('crypto_cipher');
      updated = true;
    }
    if (!currentBadges.has('recon_master') && newProgress.completedDays.includes(3)) {
      currentBadges.add('recon_master');
      updated = true;
    }
    if (!currentBadges.has('web_guardian') && newProgress.completedDays.includes(6)) {
      currentBadges.add('web_guardian');
      updated = true;
    }
    if (!currentBadges.has('streak_fire') && newProgress.streakDays >= 3) {
      currentBadges.add('streak_fire');
      updated = true;
    }
    if (!currentBadges.has('sprint_finisher') && newProgress.completedDays.length >= 10) {
      currentBadges.add('sprint_finisher');
      updated = true;
    }

    if (updated) {
      return Array.from(currentBadges);
    }
    return newProgress.badges;
  };

  const setCurrentDay = (day: number) => {
    setProgress((prev) => ({
      ...prev,
      currentDay: Math.max(1, Math.min(10, day)),
    }));
  };

  const completeTopic = (topicId: string, day: number) => {
    setProgress((prev) => {
      const completedTopics = prev.completedTopicIds.includes(topicId)
        ? prev.completedTopicIds
        : [...prev.completedTopicIds, topicId];

      const dayObj = SPRINT_DAYS.find((d) => d.dayNumber === day);
      let completedDays = [...prev.completedDays];
      if (dayObj && !completedDays.includes(day)) {
        const allDayTopicsDone = dayObj.topics.every((t) =>
          completedTopics.includes(t.id)
        );
        if (allDayTopicsDone) {
          completedDays.push(day);
        }
      }

      const updatedProgress: UserProgress = {
        ...prev,
        completedTopicIds: completedTopics,
        completedDays,
        totalXp: prev.totalXp + 25,
      };

      updatedProgress.badges = checkBadges(updatedProgress);
      return updatedProgress;
    });
  };

  const toggleBookmark = (topicId: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarkedTopicIds.includes(topicId);
      return {
        ...prev,
        bookmarkedTopicIds: exists
          ? prev.bookmarkedTopicIds.filter((id) => id !== topicId)
          : [...prev.bookmarkedTopicIds, topicId],
      };
    });
  };

  const toggleDifficult = (topicId: string) => {
    setProgress((prev) => {
      const exists = prev.difficultTopicIds.includes(topicId);
      return {
        ...prev,
        difficultTopicIds: exists
          ? prev.difficultTopicIds.filter((id) => id !== topicId)
          : [...prev.difficultTopicIds, topicId],
      };
    });
  };

  const saveNote = (noteData: {
    topicId: string;
    day: number;
    title: string;
    content: string;
    tags: string[];
  }) => {
    const newNote: UserNote = {
      id: `note-${Date.now()}`,
      ...noteData,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setProgress((prev) => ({
      ...prev,
      notes: [newNote, ...prev.notes],
      totalXp: prev.totalXp + 15,
    }));
  };

  const updateNote = (id: string, title: string, content: string, tags: string[]) => {
    setProgress((prev) => ({
      ...prev,
      notes: prev.notes.map((n) =>
        n.id === id ? { ...n, title, content, tags, updatedAt: Date.now() } : n
      ),
    }));
  };

  const deleteNote = (id: string) => {
    setProgress((prev) => ({
      ...prev,
      notes: prev.notes.filter((n) => n.id !== id),
    }));
  };

  const saveQuizResult = (result: Omit<QuizResult, 'id' | 'timestamp'>) => {
    const newResult: QuizResult = {
      ...result,
      id: `quiz-res-${Date.now()}`,
      timestamp: Date.now(),
    };

    setProgress((prev) => {
      const newResults = [newResult, ...prev.quizResults];
      const badges = new Set(prev.badges);

      if (newResult.scorePercentage >= 90) {
        badges.add('quiz_ace');
      }

      // Update mastered and difficult topics based on performance
      const mastered = new Set(prev.masteredTopicIds);
      const difficult = new Set(prev.difficultTopicIds);

      Object.entries(newResult.topicBreakdown).forEach(([topicId, stats]) => {
        const accuracy = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
        if (accuracy >= 80) {
          mastered.add(topicId);
          difficult.delete(topicId);
        } else if (accuracy < 60) {
          difficult.add(topicId);
          mastered.delete(topicId);
        }
      });

      const updated: UserProgress = {
        ...prev,
        quizResults: newResults,
        masteredTopicIds: Array.from(mastered),
        difficultTopicIds: Array.from(difficult),
        totalXp: prev.totalXp + Math.round(newResult.scorePercentage * 1.5),
        badges: Array.from(badges),
      };

      return updated;
    });
  };

  const setExperienceLevel = (level: ExperienceLevel) => {
    setProgress((prev) => ({ ...prev, experienceLevel: level }));
  };

  const setLearningGoal = (goal: LearningGoal) => {
    setProgress((prev) => ({ ...prev, learningGoal: goal }));
  };

  const completeDiagnostic = (score: number) => {
    setProgress((prev) => {
      const updated: UserProgress = {
        ...prev,
        diagnosticCompleted: true,
        diagnosticScore: score,
        totalXp: prev.totalXp + 50,
      };
      return updated;
    });
  };

  const setCustomLectureLink = (topicId: string, url: string) => {
    setProgress((prev) => ({
      ...prev,
      customLectureLinks: {
        ...prev.customLectureLinks,
        [topicId]: url,
      },
    }));
  };

  const resetProgress = () => {
    setProgress(INITIAL_PROGRESS);
  };

  // Compute weak topics (either marked difficult, or scored <60% in quizzes, or have incorrect answers)
  const weakTopicIds = Array.from(
    new Set([
      ...progress.difficultTopicIds,
      ...progress.quizResults
        .flatMap((r) => r.incorrectQuestionIds)
        .map((qid) => ALL_QUIZ_QUESTIONS.find((q) => q.id === qid)?.topicId)
        .filter((tid): tid is string => !!tid),
    ])
  );

  return (
    <SprintContext.Provider
      value={{
        progress,
        setCurrentDay,
        completeTopic,
        toggleBookmark,
        toggleDifficult,
        saveNote,
        updateNote,
        deleteNote,
        saveQuizResult,
        setExperienceLevel,
        setLearningGoal,
        completeDiagnostic,
        setCustomLectureLink,
        resetProgress,
        weakTopicIds,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </SprintContext.Provider>
  );
};

export const useSprint = () => {
  const context = useContext(SprintContext);
  if (!context) {
    throw new Error('useSprint must be used within a SprintProvider');
  }
  return context;
};
