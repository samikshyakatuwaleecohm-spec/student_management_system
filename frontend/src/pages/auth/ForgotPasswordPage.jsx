import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export default function ForgotPasswordPage() {
  const { sendToast } = useAppContext();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    sendToast('Password reset link sent (demo only).', 'info');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-white/10 dark:bg-slate-900">
        <h1 className="mb-1 text-2xl font-bold text-slate-800 dark:text-white">Forgot Password</h1>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
          <Link to="/auth/login" className="text-indigo-600 hover:underline dark:text-indigo-400">← Back to login</Link>
        </p>
        {sent ? (
          <p className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400">
            If that email exists, a reset link has been sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500" />
            </div>
            <button type="submit"
              className="w-full rounded-2xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500">
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
