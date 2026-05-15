import { Link } from 'react-router-dom';
import { FiArrowRight, FiUsers, FiBookOpen, FiBarChart2 } from 'react-icons/fi';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <nav className="flex items-center justify-between border-b border-slate-200 px-8 py-5 dark:border-white/10">
        <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">SMS</span>
        <Link to="/auth/role" className="rounded-2xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-500">
          Get Started
        </Link>
      </nav>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-5xl font-bold leading-tight text-slate-900 dark:text-white">
          School Management <span className="text-indigo-600 dark:text-indigo-400">System</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
          A unified platform for students, teachers, and administrators to manage academics, attendance, fees, and more.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/auth/role" className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">
            Enter Portal <FiArrowRight />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          { icon: <FiUsers className="h-6 w-6" />, title: 'Students', desc: 'Track attendance, assignments, exams, fees, and results.' },
          { icon: <FiBookOpen className="h-6 w-6" />, title: 'Teachers', desc: 'Manage classes, mark attendance, and publish results.' },
          { icon: <FiBarChart2 className="h-6 w-6" />, title: 'Admins', desc: 'Oversee the entire school — students, staff, and finances.' },
        ].map((f) => (
          <div key={f.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-slate-900/80">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">{f.icon}</div>
            <h3 className="font-semibold text-slate-800 dark:text-white">{f.title}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
