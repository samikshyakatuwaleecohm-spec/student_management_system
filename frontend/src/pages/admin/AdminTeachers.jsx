import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import SectionHeader from '../../components/SectionHeader';
import Modal from '../../components/Modal';

const empty = { name: '', email: '', subject: '', phone: '', classes: [], status: 'active' };

export default function AdminTeachers() {
  const { teachers, addTeacher, removeTeacher } = useAppContext();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTeacher(form);
    setOpen(false);
    setForm(empty);
  };

  return (
    <div>
      <SectionHeader title="Teachers" subtitle="Manage all teachers">
        <button onClick={() => setOpen(true)} className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition">
          + Add Teacher
        </button>
      </SectionHeader>

      <div className="rounded-2xl border border-white/10 bg-slate-900/80 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs text-slate-400">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Subject</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t.id} className="border-b border-white/5 hover:bg-slate-800/40 transition">
                <td className="px-5 py-3 text-white">{t.name}</td>
                <td className="px-5 py-3 text-slate-400">{t.email}</td>
                <td className="px-5 py-3 text-slate-400">{t.subject}</td>
                <td className="px-5 py-3 text-slate-400">{t.phone}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${t.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{t.status}</span>
                </td>
                <td className="px-5 py-3">
                  <button onClick={() => removeTeacher(t.id)} className="text-xs text-red-400 hover:text-red-300 transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} title="Add Teacher" onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { label: 'Name', key: 'name', type: 'text' },
            { label: 'Email', key: 'email', type: 'email' },
            { label: 'Subject', key: 'subject', type: 'text' },
            { label: 'Phone', key: 'phone', type: 'text' },
          ].map((f) => (
            <div key={f.key}>
              <label className="mb-1 block text-xs text-slate-400">{f.label}</label>
              <input type={f.type} required value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-800 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          ))}
          <button type="submit" className="w-full rounded-2xl bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition">Add</button>
        </form>
      </Modal>
    </div>
  );
}
