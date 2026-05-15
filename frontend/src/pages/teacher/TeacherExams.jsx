import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import SectionHeader from '../../components/SectionHeader';
import Modal from '../../components/Modal';

const inputCls = 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-800 dark:text-white';

export default function TeacherExams() {
  const { exams, classes, addExam, publishExamResult } = useAppContext();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', className: '', date: '', status: 'upcoming', resultPublished: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    addExam(form);
    setOpen(false);
    setForm({ title: '', className: '', date: '', status: 'upcoming', resultPublished: false });
  };

  return (
    <div>
      <SectionHeader title="Exams" subtitle="Schedule and manage exams">
        <button onClick={() => setOpen(true)} className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500">+ Schedule Exam</button>
      </SectionHeader>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm dark:border-white/10 dark:bg-slate-900/80">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 dark:border-white/10">
            <tr>
              {['Title', 'Class', 'Date', 'Status', 'Action'].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {exams.map((e) => (
              <tr key={e.id} className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-white/5 dark:hover:bg-slate-800/40">
                <td className="px-5 py-3 font-medium text-slate-800 dark:text-white">{e.title}</td>
                <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{e.className}</td>
                <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{e.date}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    e.status === 'upcoming'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                      : 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                  }`}>{e.status}</span>
                </td>
                <td className="px-5 py-3">
                  {!e.resultPublished ? (
                    <button onClick={() => publishExamResult(e.id)}
                      className="rounded-xl bg-indigo-100 px-3 py-1 text-xs text-indigo-700 transition hover:bg-indigo-200 dark:bg-indigo-600/20 dark:text-indigo-400 dark:hover:bg-indigo-600/40">
                      Publish Result
                    </button>
                  ) : (
                    <span className="text-xs text-green-600 dark:text-green-400">Published</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} title="Schedule Exam" onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs text-slate-500 dark:text-slate-400">Title</label>
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-500 dark:text-slate-400">Class</label>
            <select value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })} className={inputCls}>
              <option value="">Select class</option>
              {classes.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-500 dark:text-slate-400">Date</label>
            <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputCls} />
          </div>
          <button type="submit" className="w-full rounded-2xl bg-indigo-600 py-2 text-sm font-medium text-white transition hover:bg-indigo-500">Schedule</button>
        </form>
      </Modal>
    </div>
  );
}
