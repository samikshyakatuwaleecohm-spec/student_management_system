import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const inputCls = 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500';
const labelCls = 'mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400';

export default function RegisterPage() {
  const { register } = useAppContext();
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const ok = await register(role, name, email, password);
    setLoading(false);
    if (ok) navigate(`/${role}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-white/10 dark:bg-slate-900">
        <h1 className="mb-1 text-2xl font-bold text-slate-800 dark:text-white">Create Account</h1>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-indigo-600 hover:underline dark:text-indigo-400">Sign in</Link>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelCls}>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className={inputCls}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {[
            { label: 'Full Name', value: name, set: setName, type: 'text', placeholder: 'John Doe' },
            { label: 'Email', value: email, set: setEmail, type: 'email', placeholder: 'you@example.com' },
            { label: 'Password', value: password, set: setPassword, type: 'password', placeholder: '••••••••' },
          ].map((f) => (
            <div key={f.label}>
              <label className={labelCls}>{f.label}</label>
              <input type={f.type} required value={f.value} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder} className={inputCls} />
            </div>
          ))}
          <button type="submit" disabled={loading}
            className="w-full rounded-2xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60">
            {loading ? 'Creating…' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
