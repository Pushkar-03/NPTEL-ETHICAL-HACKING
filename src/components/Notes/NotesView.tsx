import React, { useState } from 'react';
import { useSprint } from '../../context/SprintContext';
import { SPRINT_DAYS } from '../../data/courseData';
import { UserNote } from '../../types';
import {
  FileEdit,
  Plus,
  Trash2,
  Printer,
  Download,
  Search,
  Tag,
  Calendar,
  Check,
} from 'lucide-react';

export const NotesView: React.FC = () => {
  const { progress, saveNote, updateNote, deleteNote } = useSprint();

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [day, setDay] = useState<number>(1);
  const [topicId, setTopicId] = useState<string>('d1-t1');
  const [tagsInput, setTagsInput] = useState<string>('');

  const [search, setSearch] = useState<string>('');
  const [dayFilter, setDayFilter] = useState<string>('all');

  const handleStartCreate = () => {
    setTitle('');
    setContent('');
    setDay(1);
    setTopicId('d1-t1');
    setTagsInput('ExamTip, Review');
    setIsCreating(true);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingId) {
      updateNote(editingId, title, content, parsedTags);
      setEditingId(null);
    } else {
      saveNote({
        topicId,
        day,
        title,
        content,
        tags: parsedTags,
      });
      setIsCreating(false);
    }
  };

  const handleStartEdit = (note: UserNote) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setDay(note.day);
    setTopicId(note.topicId);
    setTagsInput(note.tags.join(', '));
    setIsCreating(true);
  };

  const handleExportMarkdown = () => {
    const mdContent = progress.notes
      .map(
        (n) =>
          `# ${n.title} (Day ${n.day})\nTags: ${n.tags.join(', ')}\nDate: ${new Date(
            n.updatedAt
          ).toLocaleDateString()}\n\n${n.content}\n\n---\n`
      )
      .join('\n');

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `HackSprint_NPTEL_Notes_${new Date().toISOString().split('T')[0]}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredNotes = progress.notes.filter((n) => {
    if (dayFilter !== 'all' && n.day !== parseInt(dayFilter)) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = n.title.toLowerCase().includes(q);
      const matchContent = n.content.toLowerCase().includes(q);
      const matchTags = n.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchContent && !matchTags) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-white">Study Notes & Knowledge Base</h1>
            <p className="text-xs text-slate-400 mt-1">
              Personalized annotations, exam cheat sheets, and highlighted takeaways.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
            >
              <Printer className="w-3.5 h-3.5" /> Print Notes
            </button>
            <button
              onClick={handleExportMarkdown}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" /> Export (.md)
            </button>
            <button
              onClick={handleStartCreate}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-semibold text-xs text-white transition-colors"
            >
              <Plus className="w-4 h-4" /> New Note
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search in personal notes and tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
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
        </div>
      </div>

      {/* Note Editor Form Modal / Drawer */}
      {isCreating && (
        <div className="rounded-2xl border border-cyan-500/40 bg-slate-950 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
              {editingId ? 'Edit Study Note' : 'Create New Personal Note (+15 XP)'}
            </span>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingId(null);
              }}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                Note Title / Heading:
              </label>
              <input
                type="text"
                placeholder="e.g. Nmap Scan Flags Summary"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                Associated Sprint Day:
              </label>
              <select
                value={day}
                onChange={(e) => setDay(parseInt(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
              >
                {SPRINT_DAYS.map((d) => (
                  <option key={d.dayNumber} value={d.dayNumber}>
                    Day {d.dayNumber}: {d.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">
              Note Content / Key Takeaways:
            </label>
            <textarea
              rows={4}
              placeholder="Write your personal explanation, command flags, or memory triggers..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">
              Tags (Comma-separated):
            </label>
            <input
              type="text"
              placeholder="Nmap, Firewalls, P1"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-semibold text-xs text-white transition-colors"
            >
              <Check className="w-4 h-4" /> Save Note
            </button>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                  Day {note.day}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {new Date(note.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">{note.title}</h3>
              <p className="text-xs text-slate-300 mt-2 whitespace-pre-wrap leading-relaxed">
                {note.content}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {note.tags.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end gap-2">
              <button
                onClick={() => handleStartEdit(note)}
                className="px-2.5 py-1 text-xs text-slate-300 hover:text-white rounded bg-slate-900 border border-slate-800"
              >
                Edit
              </button>
              <button
                onClick={() => deleteNote(note.id)}
                className="p-1 text-slate-500 hover:text-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
