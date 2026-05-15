import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import SectionHeader from '../../components/SectionHeader';
import Modal from '../../components/Modal';

const inputCls = 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-800 dark:text-white';

export default function TeacherAssignments() {
  const { assignments, classes, addAssignment } = useAppContext();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', className: '', dueDate: '', description: '', status: 'pending' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addAssignment(form);
    setOpen(false);
    setForm({ title: '', className: '', dueDate: '', description: '', status: 'pending' });
  };

  return (
    <div>
      <SectionHeader title="Assignments" subtitle="Manage class assignments">
        <button onClick={() => setOpen(true)} className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500">
          + New Assignment
        </button>
      </SectionHeader>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm dark:border-white/10 dark:bg-slate-900/80">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 dark:border-white/10">
            <tr>
              {['Title', 'Class', 'Due Date', 'Status'].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.id} className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-white/5 dark:hover:bg-slate-800/40">
                <td className="px-5 py-3 font-medium text-slate-800 dark:text-white">{a.title}</td>
                <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{a.className}</td>
                <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{a.dueDate}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    a.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400'
                      : 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                  }`}>{a.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} title="New Assignment" onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { label: 'Title', key: 'title', type: 'text' },
            { label: 'Due Date', key: 'dueDate', type: 'date' },
            { label: 'Description', key: 'description', type: 'text' },
          ].map((f) => (
            <div key={f.key}>
              <label className="mb-1 block text-xs text-slate-500 dark:text-slate-400">{f.label}</label>
              <input type={f.type} required value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className={inputCls} />
            </div>
          ))}
          <div>
            <label className="mb-1 block text-xs text-slate-500 dark:text-slate-400">Class</label>
            <select value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })} className={inputCls}>
              <option value="">Select class</option>
              {classes.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full rounded-2xl bg-indigo-600 py-2 text-sm font-medium text-white transition hover:bg-indigo-500">Create</button>
        </form>
      </Modal>
    </div>
  );
}
