import { useAppContext } from '../../context/AppContext';
import SectionHeader from '../../components/SectionHeader';

export default function StudentCourses() {
  const { classes } = useAppContext();
  return (
    <div>
      <SectionHeader title="Courses" subtitle="Your enrolled classes and subjects" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((c) => (
          <div key={c.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
            <h3 className="font-semibold text-slate-800 dark:text-white">{c.name}</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Teacher ID: {c.teacherId}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.subjects.map((s) => (
                <span key={s} className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
