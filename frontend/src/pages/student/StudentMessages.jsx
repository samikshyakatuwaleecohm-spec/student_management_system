import SectionHeader from '../../components/SectionHeader';

const messages = [
  { id: 1, from: 'Sarah Williams', role: 'Teacher', text: 'Please submit your assignment by Friday.', time: '10:30 AM' },
  { id: 2, from: 'Admin Office', role: 'Admin', text: 'Fee payment reminder for this month.', time: 'Yesterday' },
];

export default function StudentMessages() {
  return (
    <div>
      <SectionHeader title="Messages" subtitle="Your inbox" />
      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-semibold dark:bg-indigo-500/10 dark:text-indigo-400">
              {m.from[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-slate-800 dark:text-white">{m.from}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500">{m.time}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{m.role}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{m.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
