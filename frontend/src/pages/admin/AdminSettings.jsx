import { useAppContext } from '../../context/AppContext';
import SectionHeader from '../../components/SectionHeader';

export default function AdminSettings() {
  const { theme, toggleTheme, auth, logout } = useAppContext();
  return (
    <div>
      <SectionHeader title="Settings" subtitle="System and account settings" />
      <div className="max-w-lg space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-4">
          <div>
            <p className="text-sm font-medium text-white">Theme</p>
            <p className="text-xs text-slate-400">Currently: {theme}</p>
          </div>
          <button onClick={toggleTheme}
            className="rounded-2xl bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-500 transition">
            Switch to {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-4">
          <div>
            <p className="text-sm font-medium text-white">Account</p>
            <p className="text-xs text-slate-400">{auth.user?.email}</p>
          </div>
          <button onClick={logout}
            className="rounded-2xl bg-red-600/20 px-4 py-2 text-xs font-medium text-red-400 hover:bg-red-600/40 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
