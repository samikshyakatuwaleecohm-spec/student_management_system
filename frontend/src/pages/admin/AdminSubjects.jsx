import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import SectionHeader from '../../components/SectionHeader';
import Modal from '../../components/Modal';

export default function AdminSubjects() {
  const { classes, addSubject } = useAppContext();
  const [open, setOpen] = useState(false);
  const [classId, setClassId] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (classId && subject) {
      addSubject(classId, subject);
      setOpen(false);
      setClassId('');
      setSubject('');
    }
  };

  return (
    <div>
      <SectionHeader title="Subjects" subtitle="Subjects assigned to each class">
        <button onClick={() => setOpen(true)} className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition">
          + Add Subject
        </button>
      </SectionHeader>

      <div className="space-y-4">
        {classes.map((c) => (
          <div key={c.id} className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <h3 className="mb-3 font-semibold text-white">{c.name}</h3>
            <div className="flex flex-wrap gap-2">
              {c.subjects.map((s) => (
                <span key={s} className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-400">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} title="Add Subject to Class" onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs text-slate-400">Class</label>
            <select required value={classId} onChange={(e) => setClassId(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-800 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">Select class</option>
              {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-400">Subject Name</label>
            <input type="text" required value={subject} onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-800 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button type="submit" className="w-full rounded-2xl bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition">Add</button>
        </form>
      </Modal>
    </div>
  );
}
