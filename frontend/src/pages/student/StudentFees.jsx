import { useAppContext } from '../../context/AppContext';
import SectionHeader from '../../components/SectionHeader';

export default function StudentFees() {
  const { fees } = useAppContext();
  const badge = {
    paid:    'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400',
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400',
    overdue: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
  };
  return (
    <div>
      <SectionHeader title="Fees" subtitle="Your fee payment records" />
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm dark:border-white/10 dark:bg-slate-900/80">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 dark:border-white/10">
            <tr>
              {['Student', 'Amount', 'Due Date', 'Status'].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fees.map((f) => (
              <tr key={f.id} className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-white/5 dark:hover:bg-slate-800/40">
                <td className="px-5 py-3 font-medium text-slate-800 dark:text-white">{f.studentName}</td>
                <td className="px-5 py-3 text-slate-600 dark:text-slate-300">${f.amount}</td>
                <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{f.dueDate}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${badge[f.status] ?? ''}`}>{f.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
