import { useAppContext } from '../../context/AppContext';
import SectionHeader from '../../components/SectionHeader';
import StatCard from '../../components/StatCard';
import { FiUsers, FiDollarSign, FiFileText, FiCalendar } from 'react-icons/fi';

export default function AdminReports() {
  const { students, teachers, fees, exams, attendance } = useAppContext();
  const totalFees = fees.reduce((s, f) => s + f.amount, 0);
  const paidFees = fees.filter((f) => f.status === 'paid').reduce((s, f) => s + f.amount, 0);
  const activeStudents = students.filter((s) => s.status === 'active').length;
  const publishedResults = exams.filter((e) => e.resultPublished).length;

  return (
    <div>
      <SectionHeader title="Reports" subtitle="School-wide statistics and summaries" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Students" value={activeStudents} note={`of ${students.length} total`} icon={<FiUsers />} accent="indigo" />
        <StatCard title="Fee Collection" value={`$${paidFees}`} note={`of $${totalFees}`} icon={<FiDollarSign />} accent="green" />
        <StatCard title="Results Published" value={publishedResults} note={`of ${exams.length} exams`} icon={<FiFileText />} accent="blue" />
        <StatCard title="Attendance Records" value={attendance.length} icon={<FiCalendar />} accent="yellow" />
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/80 p-5">
        <h2 className="mb-4 text-sm font-semibold text-white">Fee Collection by Student</h2>
        <div className="space-y-3">
          {fees.map((f) => {
            const pct = f.status === 'paid' ? 100 : 0;
            return (
              <div key={f.id} className="flex items-center gap-4 text-sm">
                <span className="w-36 shrink-0 text-slate-300">{f.studentName}</span>
                <div className="flex-1 h-2 rounded-full bg-slate-700">
                  <div className={`h-2 rounded-full ${f.status === 'paid' ? 'bg-green-500' : f.status === 'overdue' ? 'bg-red-500' : 'bg-yellow-500'}`} style={{ width: `${pct}%` }} />
                </div>
                <span className="w-16 text-right text-xs text-slate-400">${f.amount}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
