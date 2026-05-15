import { useAppContext } from '../../context/AppContext';
import StatCard from '../../components/StatCard';
import SectionHeader from '../../components/SectionHeader';
import { FiUsers, FiClipboard, FiFileText, FiBell } from 'react-icons/fi';

const card = 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/80';
const cardTitle = 'mb-4 text-sm font-semibold text-slate-700 dark:text-white';
const rowText = 'text-slate-700 dark:text-slate-300';
const rowMuted = 'text-xs text-slate-400 dark:text-slate-500';

export default function TeacherDashboard() {
  const { auth, students, assignments, exams, notices } = useAppContext();

  return (
    <div>
      <SectionHeader title={`Welcome, ${auth.user?.name ?? 'Teacher'}`} subtitle="Your teaching overview" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Students" value={students.length} icon={<FiUsers />} accent="indigo" />
        <StatCard title="Assignments" value={assignments.length} icon={<FiClipboard />} accent="yellow" />
        <StatCard title="Exams" value={exams.length} icon={<FiFileText />} accent="blue" />
        <StatCard title="Notices" value={notices.length} icon={<FiBell />} accent="green" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className={card}>
          <h2 className={cardTitle}>Recent Students</h2>
          <div className="space-y-3">
            {students.slice(0, 5).map((s) => (
              <div key={s.id} className="flex items-center justify-between text-sm">
                <span className={rowText}>{s.name}</span>
                <span className={rowMuted}>{s.class}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={card}>
          <h2 className={cardTitle}>Upcoming Exams</h2>
          <div className="space-y-3">
            {exams.filter((e) => e.status === 'upcoming').map((e) => (
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
