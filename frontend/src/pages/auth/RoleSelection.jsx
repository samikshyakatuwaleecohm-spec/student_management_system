import { useNavigate } from 'react-router-dom';
import { FiUsers, FiBookOpen, FiSettings } from 'react-icons/fi';

const roles = [
  { id: 'student', label: 'Student', icon: <FiUsers className="h-8 w-8" />, desc: 'Access your courses, assignments, and results.' },
  { id: 'teacher', label: 'Teacher', icon: <FiBookOpen className="h-8 w-8" />, desc: 'Manage classes, attendance, and exams.' },
  { id: 'admin', label: 'Admin', icon: <FiSettings className="h-8 w-8" />, desc: 'Oversee the entire school system.' },
];

export default function RoleSelection() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-slate-950">
      <div className="w-full max-w-2xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-slate-800 dark:text-white">Select Your Role</h1>
        <p className="mb-10 text-center text-slate-500 dark:text-slate-400">Choose how you want to sign in</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => navigate(`/auth/login?role=${r.id}`)}
              className="flex flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center transition hover:border-indigo-500 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/80 dark:hover:bg-slate-800"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">{r.icon}</div>
              <span className="text-lg font-semibold text-slate-800 dark:text-white">{r.label}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{r.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
