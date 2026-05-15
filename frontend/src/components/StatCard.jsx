export default function StatCard({ title, value, note, icon, accent = 'indigo' }) {
  const colors = {
    indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
    green:  'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400',
    yellow: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400',
    red:    'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
    blue:   'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  };
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl ${colors[accent] ?? colors.indigo}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</p>
        <p className="mt-0.5 text-2xl font-bold text-slate-800 dark:text-white">{value}</p>
        {note && <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{note}</p>}
      </div>
    </div>
  );
}
