export type PriorityLevel = 'P1' | 'P2' | 'P3';

export type MasteryLevel = 'Novice' | 'Familiar' | 'Mastered';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Familiar';

export type LearningGoal = 'nptel_exam' | 'conceptual_fast' | 'practical_hacking';

export interface ConceptExplanation {
  simpleDefinition: string;
  conciseExplanation: string;
  technicalDeepDive: string;
  practicalAnalogy: string;
  diagramWorkflow?: string;
  importantTerminology: string[];
  commonMisconceptions: string[];
  officialNptelModule: string;
  officialNptelLectureTitle: string;
  officialNptelUrl: string;
  isVerified: boolean;
}

export interface QuickNotes {
  keyTakeaways: string[];
  comparisonTable?: {
    headers: string[];
    rows: string[][];
  };
  importantDistinctions: string[];
  commonMistakes: string[];
  summary: string;
}

export interface KnowledgeCheckQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Topic {
  id: string;
  day: number;
  title: string;
  priority: PriorityLevel;
  priorityRationale: string;
  estimatedMinutes: number;
  explanation: ConceptExplanation;
  quickNotes: QuickNotes;
  knowledgeChecks: KnowledgeCheckQuestion[];
  practicalLabId?: string;
  tags: string[];
}

export interface SprintDay {
  dayNumber: number;
  title: string;
  subtitle: string;
  estimatedTotalMinutes: number;
  learningObjectives: string[];
  topics: Topic[];
  labTitle?: string;
  labDescription?: string;
  labType?: 'packet' | 'crypto' | 'nmap' | 'web' | 'password' | 'firewall' | 'soc';
}

export interface QuizQuestion {
  id: string;
  day: number;
  topicId: string;
  type: 'mcq' | 'true_false' | 'scenario' | 'match';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  priority: PriorityLevel;
  isOfficialSyllabusAligned: boolean;
}

export interface QuizResult {
  id: string;
  quizType: 'daily' | 'topic' | 'diagnostic' | 'mock' | 'weak_revision';
  day?: number;
  timestamp: number;
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  incorrectQuestionIds: string[];
  topicBreakdown: Record<string, { total: number; correct: number }>;
}

export interface UserNote {
  id: string;
  topicId: string;
  day: number;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  tags: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  category: 'sprint' | 'mastery' | 'quiz' | 'streak';
}

export interface UserProgress {
  currentDay: number;
  completedDays: number[];
  completedTopicIds: string[];
  masteredTopicIds: string[];
  difficultTopicIds: string[];
  bookmarkedTopicIds: string[];
  streakDays: number;
  lastActiveDate: string;
  totalXp: number;
  experienceLevel: ExperienceLevel;
  learningGoal: LearningGoal;
  diagnosticCompleted: boolean;
  diagnosticScore?: number;
  quizResults: QuizResult[];
  notes: UserNote[];
  badges: string[];
  customLectureLinks: Record<string, string>;
  customTopicNotes: Record<string, string>;
}
