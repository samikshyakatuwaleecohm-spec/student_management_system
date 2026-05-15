import { useAppContext } from '../../context/AppContext';
import SectionHeader from '../../components/SectionHeader';

export default function StudentResults() {
  const { exams } = useAppContext();
  const published = exams.filter((e) => e.resultPublished);
  return (
    <div>
      <SectionHeader title="Results" subtitle="Published exam results" />
      {published.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">No results published yet.</p>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 dark:border-white/10">
              <tr>
                {['Exam', 'Class', 'Date', 'Result'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {published.map((e) => (
                <tr key={e.id} className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-white/5 dark:hover:bg-slate-800/40">
                  <td className="px-5 py-3 font-medium text-slate-800 dark:text-white">{e.title}</td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{e.className}</td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{e.date}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700 dark:bg-green-500/10 dark:text-green-400">Published</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
