import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import SectionHeader from '../../components/SectionHeader';
import { FiCheck, FiX, FiClock } from 'react-icons/fi';

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const statusStyle = {
  present: 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400',
  absent:  'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
  late:    'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400',
};
const statusIcon = {
  present: <FiCheck className="h-3 w-3" />,
  absent:  <FiX className="h-3 w-3" />,
  late:    <FiClock className="h-3 w-3" />,
};

function getWeekStart(dateStr) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() - d.getDay());
  return d.toISOString().slice(0, 10);
}

function groupByWeek(records) {
  const weeks = {};
  records.forEach((r) => {
    const ws = getWeekStart(r.date);
    if (!weeks[ws]) weeks[ws] = {};
    const day = new Date(r.date).toLocaleDateString('en-US', { weekday: 'short' });
    weeks[ws][day] = r;
  });
  return Object.entries(weeks).sort(([a], [b]) => a.localeCompare(b));
}

function weekLabel(ws) {
  const s = new Date(ws);
  const e = new Date(ws);
  e.setDate(e.getDate() + 5);
  return `${s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${e.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
}

// Collect all unique dates across all students
function getAllDates(dailyAttendance) {
  const set = new Set();
  dailyAttendance.forEach((s) => s.records.forEach((r) => set.add(r.date)));
  return [...set].sort();
}

export default function TeacherAttendance() {
  const { dailyAttendance } = useAppContext();
  const [view, setView] = useState('weekly'); // 'weekly' | 'byday'
  const allDates = getAllDates(dailyAttendance);
  const [selectedDate, setSelectedDate] = useState(allDates[allDates.length - 1] ?? '');

  const getStatus = (student, date) =>
    student.records.find((r) => r.date === date)?.status ?? null;

  const getDayStats = (date) => {
    let present = 0, absent = 0, late = 0;
    dailyAttendance.forEach((s) => {
      const r = s.records.find((r) => r.date === date);
      if (r?.status === 'present') present++;
      else if (r?.status === 'absent') absent++;
      else if (r?.status === 'late') late++;
    });
    return { present, absent, late };
  };

  // Group all dates by week
  const weekMap = {};
  allDates.forEach((date) => {
    const ws = getWeekStart(date);
    if (!weekMap[ws]) weekMap[ws] = [];
    weekMap[ws].push(date);
  });
  const weeks = Object.entries(weekMap).sort(([a], [b]) => a.localeCompare(b));

  return (
    <div>
      <SectionHeader title="Attendance" subtitle="Weekly student attendance records">
        <div className="flex overflow-hidden rounded-2xl border border-slate-200 text-xs dark:border-white/10">
          {['weekly', 'byday'].map((v) => (
            <button key={v} onClick={() => setView(v)}
              className={`px-4 py-2 font-medium capitalize transition ${view === v ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}>
              {v === 'weekly' ? 'By Week' : 'By Day'}
            </button>
          ))}
        </div>
      </SectionHeader>

      {view === 'weekly' ? (
        <div className="space-y-6">
          {weeks.map(([ws, dates]) => (
            <div key={ws} className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80">
              {/* Week header */}
              <div className="border-b border-slate-200 px-5 py-3 dark:border-white/10">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Week of {weekLabel(ws)}
                </p>
              </div>

              {/* Table: students × days of this week */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-slate-100 dark:border-white/5">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Student</th>
                      {WEEK_DAYS.map((day) => {
                        const dateForDay = dates.find((d) => new Date(d).toLocaleDateString('en-US', { weekday: 'short' }) === day);
                        return (
                          <th key={day} className="px-3 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 min-w-[80px]">
                            <span className="block">{day}</span>
                            {dateForDay && (
                              <span className="block text-slate-400 dark:text-slate-500">{new Date(dateForDay).getDate()}</span>
                            )}
                          </th>
                        );
                      })}
                      <th className="px-5 py-3 text-center text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyAttendance.map((student) => {
                      const presentAll = student.records.filter((r) => r.status === 'present').length;
                      const rate = student.records.length ? Math.round((presentAll / student.records.length) * 100) : 0;
                      return (
                        <tr key={student.studentId} className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-white/5 dark:hover:bg-slate-800/40">
                          <td className="px-5 py-3">
                            <p className="font-medium text-slate-800 dark:text-white">{student.studentName}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500">{student.class}</p>
                          </td>
                          {WEEK_DAYS.map((day) => {
                            const dateForDay = dates.find((d) => new Date(d).toLocaleDateString('en-US', { weekday: 'short' }) === day);
                            const status = dateForDay ? getStatus(student, dateForDay) : null;
                            return (
                              <td key={day} className="px-3 py-3 text-center">
                                {status ? (
                                  <span className={`inline-flex items-center justify-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle[status]}`}>
                                    {statusIcon[status]}
                                    <span className="capitalize hidden sm:inline">{status}</span>
                                  </span>
                                ) : (
                                  <span className="text-xs text-slate-300 dark:text-slate-600">—</span>
                                )}
                              </td>
                            );
                          })}
                          <td className="px-5 py-3 text-center">
                            <span className={`text-sm font-bold ${rate >= 80 ? 'text-green-600 dark:text-green-400' : rate >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                              {rate}%
                            </span>
                            <div className="mx-auto mt-1 h-1 w-10 rounded-full bg-slate-200 dark:bg-slate-700">
                              <div className={`h-1 rounded-full ${rate >= 80 ? 'bg-green-500' : rate >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${rate}%` }} />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Day selector grouped by week */}
          <div className="mb-5 space-y-3">
            {weeks.map(([ws, dates]) => (
              <div key={ws}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  {weekLabel(ws)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {WEEK_DAYS.map((day) => {
                    const date = dates.find((d) => new Date(d).toLocaleDateString('en-US', { weekday: 'short' }) === day);
                    if (!date) return null;
                    const num = new Date(date).getDate();
                    return (
                      <button key={date} onClick={() => setSelectedDate(date)}
                        className={`flex flex-col items-center rounded-2xl border px-4 py-2 text-xs font-medium transition ${
                          selectedDate === date
                            ? 'border-indigo-500 bg-indigo-600 text-white'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-400 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300'
                        }`}>
                        <span className="opacity-70">{day}</span>
                        <span className="text-base font-bold">{num}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Stats for selected day */}
          {selectedDate && (() => {
            const stats = getDayStats(selectedDate);
            const d = new Date(selectedDate);
            return (
              <>
                <p className="mb-3 text-sm font-semibold text-slate-700 dark:text-white">
                  {d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <div className="mb-4 grid grid-cols-3 gap-3">
                  {[
                    { label: 'Present', value: stats.present, cls: 'bg-green-50 border-green-200 text-green-700 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-400' },
                    { label: 'Absent',  value: stats.absent,  cls: 'bg-red-50 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' },
                    { label: 'Late',    value: stats.late,    cls: 'bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-500/10 dark:border-yellow-500/20 dark:text-yellow-400' },
                  ].map((s) => (
                    <div key={s.label} className={`rounded-2xl border p-4 ${s.cls}`}>
                      <p className="text-xs font-medium uppercase">{s.label}</p>
                      <p className="mt-1 text-2xl font-bold">{s.value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm dark:border-white/10 dark:bg-slate-900/80">
                  <table className="w-full text-sm">
                    <thead className="border-b border-slate-200 dark:border-white/10">
                      <tr>
                        {['Student', 'Class', 'Status'].map((h) => (
                          <th key={h} className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dailyAttendance.map((student) => {
                        const status = getStatus(student, selectedDate);
                        return (
                          <tr key={student.studentId} className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-white/5 dark:hover:bg-slate-800/40">
                            <td className="px-5 py-3 font-medium text-slate-800 dark:text-white">{student.studentName}</td>
                            <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{student.class}</td>
                            <td className="px-5 py-3">
                              {status ? (
                                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle[status]}`}>
                                  {statusIcon[status]}
                                  <span className="capitalize">{status}</span>
                                </span>
                              ) : (
                                <span className="text-xs text-slate-400 dark:text-slate-500">No record</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            );
          })()}
        </>
      )}
    </div>
  );
}
