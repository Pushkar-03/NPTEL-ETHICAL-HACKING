import React, { useState } from 'react';
import { useSprint } from '../../context/SprintContext';
import { SPRINT_DAYS } from '../../data/courseData';
import { Topic, PriorityLevel } from '../../types';
import {
  Search,
  CheckCircle2,
  Bookmark,
  AlertTriangle,
  ArrowRight,
  Filter,
  ExternalLink,
} from 'lucide-react';

interface TopicLibraryViewProps {
  onSelectTopic: (day: number, topicId: string) => void;
}

export const TopicLibraryView: React.FC<TopicLibraryViewProps> = ({ onSelectTopic }) => {
  const { progress, toggleBookmark, toggleDifficult } = useSprint();

  const [search, setSearch] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [dayFilter, setDayFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Collect all topics
  const allTopics: { topic: Topic; dayNumber: number }[] = [];
  SPRINT_DAYS.forEach((d) => {
    d.topics.forEach((t) => {
      allTopics.push({ topic: t, dayNumber: d.dayNumber });
    });
  });

  const filtered = allTopics.filter(({ topic, dayNumber }) => {
    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = topic.title.toLowerCase().includes(q);
      const matchDef = topic.explanation.simpleDefinition.toLowerCase().includes(q);
      const matchTags = topic.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDef && !matchTags) return false;
    }

    // Priority
    if (priorityFilter !== 'all' && topic.priority !== priorityFilter) {
      return false;
    }

    // Day
    if (dayFilter !== 'all' && dayNumber !== parseInt(dayFilter)) {
      return false;
    }

    // Status
    if (statusFilter === 'completed' && !progress.completedTopicIds.includes(topic.id)) return false;
    if (statusFilter === 'bookmarked' && !progress.bookmarkedTopicIds.includes(topic.id)) return false;
    if (statusFilter === 'difficult' && !progress.difficultTopicIds.includes(topic.id)) return false;
    if (statusFilter === 'mastered' && !progress.masteredTopicIds.includes(topic.id)) return false;

    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-white">Ethical Hacking Topic Library</h1>
            <p className="text-xs text-slate-400 mt-1">
              Browse, search, and filter all 35+ granular topics across the complete 10-day NPTEL syllabus.
            </p>
          </div>
          <span className="font-mono text-xs text-cyan-400 bg-cyan-950/60 px-3 py-1.5 rounded-lg border border-cyan-800">
            Showing {filtered.length} of {allTopics.length} Topics
          </span>
        </div>

        {/* Filters and Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search concepts, ports, attacks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
            >
              <option value="all">All Priorities (P1, P2, P3)</option>
              <option value="P1">P1 — Essential (Foundations)</option>
              <option value="P2">P2 — High Value</option>
              <option value="P3">P3 — Supplementary</option>
            </select>
          </div>

          <div>
            <select
              value={dayFilter}
              onChange={(e) => setDayFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
            >
              <option value="all">All Days (1 – 10)</option>
              {SPRINT_DAYS.map((d) => (
                <option key={d.dayNumber} value={d.dayNumber}>
                  Day {d.dayNumber}: {d.title.split('&')[0]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
            >
              <option value="all">All Progress Statuses</option>
              <option value="completed">Completed Topics</option>
              <option value="mastered">Mastered (Quiz ≥ 80%)</option>
              <option value="difficult">Flagged Difficult</option>
              <option value="bookmarked">Bookmarked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(({ topic, dayNumber }) => {
          const isDone = progress.completedTopicIds.includes(topic.id);
          const isBookmarked = progress.bookmarkedTopicIds.includes(topic.id);
          const isDifficult = progress.difficultTopicIds.includes(topic.id);
          const isMastered = progress.masteredTopicIds.includes(topic.id);

          return (
            <div
              key={topic.id}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-4 flex flex-col justify-between hover:border-slate-700 transition-all space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      Day {dayNumber}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        topic.priority === 'P1'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : topic.priority === 'P2'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {topic.priority}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleBookmark(topic.id)}
                      className={`p-1 rounded text-xs ${
                        isBookmarked ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleDifficult(topic.id)}
                      className={`p-1 rounded text-xs ${
                        isDifficult ? 'text-rose-400' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-3 leading-relaxed">
                  {topic.explanation.simpleDefinition}
                </p>

                <div className="flex flex-wrap gap-1 mt-2.5">
                  {topic.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px]">
                  {isMastered ? (
                    <span className="text-emerald-400 font-medium">Mastered</span>
                  ) : isDone ? (
                    <span className="text-cyan-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                  ) : (
                    <span className="text-slate-500">Not studied</span>
                  )}
                </div>

                <button
                  onClick={() => onSelectTopic(dayNumber, topic.id)}
                  className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  Study Lesson <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
