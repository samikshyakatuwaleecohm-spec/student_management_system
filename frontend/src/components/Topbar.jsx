import { useLocation } from 'react-router-dom';
import { FiBell, FiMoon, FiSun } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';

export default function Topbar() {
  const { auth, theme, toggleTheme } = useAppContext();
  const location = useLocation();
  const section = location.pathname.split('/')[2] || 'dashboard';

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-white/10 dark:bg-slate-900/80 dark:backdrop-blur">
      <div>
        <p className="text-xs capitalize text-slate-400">Current section</p>
        <p className="text-sm font-semibold capitalize text-slate-800 dark:text-white">{section.replace(/-/g, ' ')}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
          Welcome back, <span className="font-medium text-slate-800 dark:text-white">{auth.user?.name}</span>
        </span>
        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
        </button>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Alerts"
        >
          <FiBell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
