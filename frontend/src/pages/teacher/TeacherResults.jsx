import { useAppContext } from '../../context/AppContext';
import SectionHeader from '../../components/SectionHeader';

export default function TeacherResults() {
  const { exams, publishExamResult } = useAppContext();
  return (
    <div>
      <SectionHeader title="Results" subtitle="Manage and publish exam results" />
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm dark:border-white/10 dark:bg-slate-900/80">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 dark:border-white/10">
            <tr>
              {['Exam', 'Class', 'Date', 'Result Status', 'Action'].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {exams.map((e) => (
              <tr key={e.id} className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-white/5 dark:hover:bg-slate-800/40">
                <td className="px-5 py-3 font-medium text-slate-800 dark:text-white">{e.title}</td>
                <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{e.className}</td>
                <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{e.date}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    e.resultPublished
                      ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-700/40 dark:text-slate-400'
                  }`}>{e.resultPublished ? 'Published' : 'Unpublished'}</span>
                </td>
                <td className="px-5 py-3">
                  {!e.resultPublished && (
                    <button onClick={() => publishExamResult(e.id)}
                      className="rounded-xl bg-indigo-100 px-3 py-1 text-xs text-indigo-700 transition hover:bg-indigo-200 dark:bg-indigo-600/20 dark:text-indigo-400 dark:hover:bg-indigo-600/40">
                      Publish
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
