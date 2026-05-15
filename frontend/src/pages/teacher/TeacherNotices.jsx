import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import SectionHeader from '../../components/SectionHeader';
import Modal from '../../components/Modal';

export default function TeacherNotices() {
  const { notices, addNotice } = useAppContext();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', message: '', category: 'general', date: new Date().toISOString().slice(0, 10) });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNotice(form);
    setOpen(false);
    setForm({ title: '', message: '', category: 'general', date: new Date().toISOString().slice(0, 10) });
  };

  return (
    <div>
      <SectionHeader title="Notices" subtitle="Post and view school notices">
        <button onClick={() => setOpen(true)} className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition">
          + Post Notice
        </button>
      </SectionHeader>
      <div className="space-y-4">
        {notices.map((n) => (
          <div key={n.id} className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-semibold text-white">{n.title}</h3>
              <span className="shrink-0 rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs text-indigo-400">{n.category}</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">{n.message}</p>
            <p className="mt-3 text-xs text-slate-500">{n.date}</p>
          </div>
        ))}
      </div>
      <Modal open={open} title="Post Notice" onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs text-slate-400">Title</label>
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-slate-800 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-400">Message</label>
            <textarea required rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-slate-800 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-400">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-slate-800 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="general">General</option>
              <option value="fees">Fees</option>
              <option value="event">Event</option>
              <option value="exam">Exam</option>
            </select>
          </div>
          <button type="submit" className="w-full rounded-2xl bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition">
            Post
          </button>
        </form>
      </Modal>
    </div>
  );
}
