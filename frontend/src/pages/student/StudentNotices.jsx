import { useAppContext } from '../../context/AppContext';
import SectionHeader from '../../components/SectionHeader';

export default function StudentNotices() {
  const { notices } = useAppContext();
  return (
    <div>
      <SectionHeader title="Notices" subtitle="School announcements and notices" />
      <div className="space-y-4">
        {notices.map((n) => (
          <div key={n.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-semibold text-slate-800 dark:text-white">{n.title}</h3>
              <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">{n.category}</span>
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{n.message}</p>
            <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{n.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
