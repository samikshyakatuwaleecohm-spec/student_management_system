import { useAppContext } from '../../context/AppContext';
import StatCard from '../../components/StatCard';
import SectionHeader from '../../components/SectionHeader';
import { FiUsers, FiBookOpen, FiDollarSign, FiFileText } from 'react-icons/fi';

const card = 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/80';
const cardTitle = 'mb-4 text-sm font-semibold text-slate-700 dark:text-white';
const rowText = 'text-slate-700 dark:text-slate-300';

export default function AdminDashboard() {
  const { students, teachers, fees, exams } = useAppContext();
  const totalFees = fees.reduce((sum, f) => sum + f.amount, 0);
  const paidFees = fees.filter((f) => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);

  return (
    <div>
      <SectionHeader title="Admin Dashboard" subtitle="School-wide overview" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Students" value={students.length} icon={<FiUsers />} accent="indigo" />
        <StatCard title="Total Teachers" value={teachers.length} icon={<FiBookOpen />} accent="green" />
        <StatCard title="Fee Collected" value={`$${paidFees}`} note={`of $${totalFees}`} icon={<FiDollarSign />} accent="yellow" />
        <StatCard title="Total Exams" value={exams.length} icon={<FiFileText />} accent="blue" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className={card}>
          <h2 className={cardTitle}>Recent Students</h2>
          <div className="space-y-3">
            {students.slice(0, 5).map((s) => (
              <div key={s.id} className="flex items-center justify-between text-sm">
                <span className={rowText}>{s.name}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  s.status === 'active'
                    ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                }`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={card}>
          <h2 className={cardTitle}>Fee Summary</h2>
          <div className="space-y-3">
            {fees.map((f) => (
              <div key={f.id} className="flex items-center justify-between text-sm">
                <span className={rowText}>{f.studentName}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  f.status === 'paid'
                    ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                    : f.status === 'overdue'
                    ? 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400'
                }`}>
                  {f.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
