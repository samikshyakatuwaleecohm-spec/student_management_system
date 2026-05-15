import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import SectionHeader from '../../components/SectionHeader';
import Modal from '../../components/Modal';

export default function AdminClasses() {
  const { classes, teachers, addClass } = useAppContext();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', teacherId: '', subjects: [] });

  const handleSubmit = (e) => {
    e.preventDefault();
    addClass(form);
    setOpen(false);
    setForm({ name: '', teacherId: '', subjects: [] });
  };

  return (
    <div>
      <SectionHeader title="Classes" subtitle="Manage school classes">
        <button onClick={() => setOpen(true)} className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition">
          + Add Class
        </button>
      </SectionHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((c) => {
          const teacher = teachers.find((t) => t.id === c.teacherId);
          return (
            <div key={c.id} className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
              <h3 className="font-semibold text-white">{c.name}</h3>
              <p className="mt-1 text-xs text-slate-400">Teacher: {teacher?.name ?? c.teacherId}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.subjects.map((s) => (
                  <span key={s} className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs text-indigo-400">{s}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Modal open={open} title="Add Class" onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs text-slate-400">Class Name</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-slate-800 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-400">Teacher</label>
            <select value={form.teacherId} onChange={(e) => setForm({ ...form, teacherId: e.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-slate-800 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">Select teacher</option>
              {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full rounded-2xl bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition">Add</button>
        </form>
      </Modal>
    </div>
  );
}
