import { useAppContext } from '../../context/AppContext';
import SectionHeader from '../../components/SectionHeader';

const tableWrap = 'rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm dark:border-white/10 dark:bg-slate-900/80';
const th = 'px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400';
const td = 'px-5 py-3 text-sm';

export default function StudentAssignments() {
  const { assignments } = useAppContext();
  return (
    <div>
      <SectionHeader title="Assignments" subtitle="Your pending and submitted assignments" />
      <div className={tableWrap}>
        <table className="w-full">
          <thead className="border-b border-slate-200 dark:border-white/10">
            <tr>
              <th className={th}>Title</th>
              <th className={th}>Class</th>
              <th className={th}>Due Date</th>
              <th className={th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.id} className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-white/5 dark:hover:bg-slate-800/40">
                <td className={`${td} font-medium text-slate-800 dark:text-white`}>{a.title}</td>
                <td className={`${td} text-slate-500 dark:text-slate-400`}>{a.className}</td>
                <td className={`${td} text-slate-500 dark:text-slate-400`}>{a.dueDate}</td>
                <td className={td}>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    a.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400'
                      : 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                  }`}>{a.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
