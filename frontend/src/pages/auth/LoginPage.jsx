import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const inputCls = 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500';
const labelCls = 'mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400';

export default function LoginPage() {
  const [params] = useSearchParams();
  const { login } = useAppContext();
  const navigate = useNavigate();
  const [role, setRole] = useState(params.get('role') || 'student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const ok = await login(role, email, password, remember);
    setLoading(false);
    if (ok) navigate(`/${role}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-white/10 dark:bg-slate-900">
        <h1 className="mb-1 text-2xl font-bold text-slate-800 dark:text-white">Sign In</h1>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-indigo-600 hover:underline dark:text-indigo-400">Register</Link>
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
          <div>
            <label className={labelCls}>Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={inputCls} />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-indigo-500" />
              Remember me
            </label>
            <Link to="/auth/forgot-password" className="text-xs text-indigo-600 hover:underline dark:text-indigo-400">Forgot password?</Link>
          </div>
          <button type="submit" disabled={loading}
            className="w-full rounded-2xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-slate-400">
          Demo — student@sms.com / teacher@sms.com / admin@sms.com — password: <span className="text-slate-600 dark:text-slate-300">password</span>
        </p>
      </div>
    </div>
  );
}
