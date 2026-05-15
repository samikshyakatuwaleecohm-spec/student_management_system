import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import SectionHeader from '../../components/SectionHeader';

const inputCls = 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-800 dark:text-white';
const labelCls = 'mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400';

export default function StudentProfile() {
  const { auth, updateProfile } = useAppContext();
  const [name, setName] = useState(auth.user?.name ?? '');
  const [email, setEmail] = useState(auth.user?.email ?? '');

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({ name, email });
  };

  return (
    <div>
      <SectionHeader title="Profile" subtitle="Manage your personal information" />
      <div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
        <div className="mb-6 flex items-center gap-4">
          <img src={auth.user?.avatar} alt="avatar" className="h-16 w-16 rounded-full bg-slate-200 object-cover dark:bg-slate-700" />
          <div>
            <p className="font-semibold text-slate-800 dark:text-white">{auth.user?.name}</p>
            <p className="text-xs capitalize text-slate-500 dark:text-slate-400">{auth.user?.role}</p>
          </div>
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          {[
            { label: 'Full Name', value: name, set: setName, type: 'text' },
            { label: 'Email', value: email, set: setEmail, type: 'email' },
          ].map((f) => (
            <div key={f.label}>
              <label className={labelCls}>{f.label}</label>
              <input type={f.type} value={f.value} onChange={(e) => f.set(e.target.value)} className={inputCls} />
            </div>
          ))}
          <button type="submit" className="rounded-2xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-500">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
