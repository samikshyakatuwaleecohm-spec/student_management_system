import { useAppContext } from '../../context/AppContext';
import SectionHeader from '../../components/SectionHeader';
import { FiCheck, FiX, FiClock } from 'react-icons/fi';

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const statusCfg = {
  present: {
    cell: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20',
    icon: <FiCheck className="h-3 w-3" />,
  },
  absent: {
    cell: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
    icon: <FiX className="h-3 w-3" />,
  },
  late: {
    cell: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20',
    icon: <FiClock className="h-3 w-3" />,
  },
};

function getWeekStart(dateStr) {
  const d = new Date(dateStr);
  const day = d.getDay(); // 0=Sun
  const diff = d.getDate() - day;
  const start = new Date(d.setDate(diff));
  return start.toISOString().slice(0, 10);
}

function groupByWeek(records) {
  const weeks = {};
  records.forEach((r) => {
    const ws = getWeekStart(r.date);
    if (!weeks[ws]) weeks[ws] = {};
    const dayName = new Date(r.date).toLocaleDateString('en-US', { weekday: 'short' });
    weeks[ws][dayName] = r;
  });
  return Object.entries(weeks).sort(([a], [b]) => a.localeCompare(b));
}

function weekLabel(weekStart) {
  const start = new Date(weekStart);
  const end = new Date(weekStart);
  end.setDate(end.getDate() + 5); // Sun to Fri
  return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
}

export default function StudentAttendance() {
  const { auth, dailyAttendance } = useAppContext();
  const myAttendance = dailyAttendance.find((a) => a.studentName === auth.user?.name);

  if (!myAttendance) {
    return (
      <div>
        <SectionHeader title="Attendance" subtitle="Your weekly attendance records" />
        <p className="text-sm text-slate-500 dark:text-slate-400">No attendance records found.</p>
      </div>
    );
  }

  const presentCount = myAttendance.records.filter((r) => r.status === 'present').length;
  const absentCount  = myAttendance.records.filter((r) => r.status === 'absent').length;
  const lateCount    = myAttendance.records.filter((r) => r.status === 'late').length;
  const total = myAttendance.records.length;
  const rate  = total ? Math.round((presentCount / total) * 100) : 0;

  const weeks = groupByWeek(myAttendance.records);

  return (
    <div>
      <SectionHeader title="Attendance" subtitle="Your weekly attendance records" />

      {/* Summary */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Days', value: total, cls: 'border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900/80', val: 'text-slate-800 dark:text-white' },
          { label: 'Present', value: presentCount, cls: 'border-green-200 bg-green-50 dark:border-green-500/20 dark:bg-green-500/10', val: 'text-green-700 dark:text-green-400' },
          { label: 'Absent',  value: absentCount,  cls: 'border-red-200 bg-red-50 dark:border-red-500/20 dark:bg-red-500/10',     val: 'text-red-700 dark:text-red-400' },
          { label: 'Late',    value: lateCount,    cls: 'border-yellow-200 bg-yellow-50 dark:border-yellow-500/20 dark:bg-yellow-500/10', val: 'text-yellow-700 dark:text-yellow-400' },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl border p-4 shadow-sm ${s.cls}`}>
            <p className={`text-xs font-medium uppercase tracking-wide ${s.val} opacity-70`}>{s.label}</p>
            <p className={`mt-1 text-2xl font-bold ${s.val}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Rate bar */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-white">Overall Attendance Rate</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Based on {total} school days</p>
          </div>
          <p className={`text-3xl font-bold ${rate >= 80 ? 'text-green-600 dark:text-green-400' : rate >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
            {rate}%
          </p>
        </div>
        <div className="mt-4 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
          <div className={`h-2 rounded-full transition-all ${rate >= 80 ? 'bg-green-500' : rate >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${rate}%` }} />
        </div>
      </div>

      {/* Week-by-week */}
      <div className="space-y-5">
        {weeks.map(([weekStart, dayMap]) => (
          <div key={weekStart} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Week of {weekLabel(weekStart)}
            </p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {WEEK_DAYS.map((day) => {
                const record = dayMap[day];
                const cfg = record ? statusCfg[record.status] : null;
                const dateNum = record ? new Date(record.date).getDate() : null;
                return (
                  <div key={day} className={`flex flex-col items-center rounded-xl border p-3 text-center ${cfg ? cfg.cell : 'border-slate-100 bg-slate-50 dark:border-white/5 dark:bg-slate-800/30'}`}>
                    <span className={`text-xs font-semibold ${cfg ? '' : 'text-slate-400 dark:text-slate-600'}`}>{day}</span>
                    {record ? (
                      <>
                        <span className="mt-1 text-lg font-bold">{dateNum}</span>
                        <span className="mt-1">{cfg.icon}</span>
                        <span className="mt-0.5 text-xs capitalize font-medium">{record.status}</span>
                      </>
                    ) : (
                      <span className="mt-2 text-xs text-slate-300 dark:text-slate-600">—</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
