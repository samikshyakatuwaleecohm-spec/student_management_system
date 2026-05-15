import SectionHeader from '../../components/SectionHeader';

const messages = [
  { id: 1, from: 'Alex Johnson', role: 'Student', text: 'Can I get an extension on the assignment?', time: '9:15 AM' },
  { id: 2, from: 'Admin Office', role: 'Admin', text: 'Please submit your monthly report.', time: 'Yesterday' },
];

export default function TeacherMessages() {
  return (
    <div>
      <SectionHeader title="Messages" subtitle="Your inbox" />
      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-900/80 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 font-semibold">
              {m.from[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-white">{m.from}</span>
                <span className="text-xs text-slate-500">{m.time}</span>
              </div>
              <p className="text-xs text-slate-400">{m.role}</p>
              <p className="mt-1 text-sm text-slate-300">{m.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
