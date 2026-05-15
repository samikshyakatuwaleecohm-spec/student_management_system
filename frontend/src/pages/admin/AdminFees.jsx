import { useAppContext } from '../../context/AppContext';
import SectionHeader from '../../components/SectionHeader';

export default function AdminFees() {
  const { fees, payFee } = useAppContext();
  const statusStyle = { paid: 'bg-green-500/10 text-green-400', pending: 'bg-yellow-500/10 text-yellow-400', overdue: 'bg-red-500/10 text-red-400' };

  return (
    <div>
      <SectionHeader title="Fees" subtitle="Manage student fee records" />
      <div className="rounded-2xl border border-white/10 bg-slate-900/80 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs text-slate-400">
              <th className="px-5 py-3">Student</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Due Date</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((f) => (
              <tr key={f.id} className="border-b border-white/5 hover:bg-slate-800/40 transition">
                <td className="px-5 py-3 text-white">{f.studentName}</td>
                <td className="px-5 py-3 text-slate-300">${f.amount}</td>
                <td className="px-5 py-3 text-slate-400">{f.dueDate}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle[f.status] ?? ''}`}>{f.status}</span>
                </td>
                <td className="px-5 py-3">
                  {f.status !== 'paid' && (
                    <button onClick={() => payFee(f.id)} className="rounded-xl bg-green-600/20 px-3 py-1 text-xs text-green-400 hover:bg-green-600/40 transition">
                      Mark Paid
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
