import { useAppContext } from '../../context/AppContext';
import StatCard from '../../components/StatCard';
import SectionHeader from '../../components/SectionHeader';
import { FiCalendar, FiClipboard, FiFileText, FiDollarSign } from 'react-icons/fi';

const card = 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/80';
const cardTitle = 'mb-4 text-sm font-semibold text-slate-700 dark:text-white';
const rowText = 'text-slate-700 dark:text-slate-300';
const rowMuted = 'text-xs text-slate-400 dark:text-slate-500';

export default function StudentDashboard() {
  const { auth, assignments, exams, fees, attendance } = useAppContext();
  const user = auth.user;

  const pendingAssignments = assignments.filter((a) => a.status === 'pending').length;
  const upcomingExams = exams.filter((e) => e.status === 'upcoming').length;
  const unpaidFees = fees.filter((f) => f.status !== 'paid').length;
  const latestAttendance = attendance[attendance.length - 1];

  return (
    <div>
      <SectionHeader
        title={`Welcome, ${user?.name ?? 'Student'}`}
        subtitle="Here's your academic overview"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Attendance" value={`${latestAttendance?.present ?? 0}`} note="Present today" icon={<FiCalendar />} accent="green" />
        <StatCard title="Pending Assignments" value={pendingAssignments} note="Due soon" icon={<FiClipboard />} accent="yellow" />
        <StatCard title="Upcoming Exams" value={upcomingExams} note="Scheduled" icon={<FiFileText />} accent="blue" />
        <StatCard title="Unpaid Fees" value={unpaidFees} note="Records" icon={<FiDollarSign />} accent="red" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className={card}>
          <h2 className={cardTitle}>Recent Assignments</h2>
          <div className="space-y-3">
            {assignments.slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-center justify-between text-sm">
                <span className={rowText}>{a.title}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  a.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400'
                    : 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                }`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={card}>
          <h2 className={cardTitle}>Upcoming Exams</h2>
          <div className="space-y-3">
            {exams.filter((e) => e.status === 'upcoming').slice(0, 4).map((e) => (
              <div key={e.id} className="flex items-center justify-between text-sm">
                <span className={rowText}>{e.title}</span>
                <span className={rowMuted}>{e.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
