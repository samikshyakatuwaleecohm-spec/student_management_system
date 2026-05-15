import { useAppContext } from '../../context/AppContext';
import SectionHeader from '../../components/SectionHeader';

export default function StudentSettings() {
  const { theme, toggleTheme } = useAppContext();
  return (
    <div>
      <SectionHeader title="Settings" subtitle="Preferences and account settings" />
      <div className="max-w-lg space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div>
            <p className="text-sm font-medium text-slate-800 dark:text-white">Theme</p>
            <p className="text-xs capitalize text-slate-500 dark:text-slate-400">Currently: {theme}</p>
          </div>
          <button onClick={toggleTheme}
            className="rounded-2xl bg-indigo-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-indigo-500">
            Switch to {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </div>
  );
}
