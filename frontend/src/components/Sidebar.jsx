import { NavLink } from 'react-router-dom';
import { FiBarChart2, FiBookOpen, FiCalendar, FiClipboard, FiDollarSign, FiFileText, FiMessageCircle, FiSettings, FiUsers, FiHome, FiBell, FiLogOut, FiAward } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';

const menus = {
  student: [
    { label: 'Dashboard', to: '/student', icon: FiHome },
    { label: 'Courses', to: '/student/courses', icon: FiBookOpen },
    { label: 'Assignments', to: '/student/assignments', icon: FiClipboard },
    { label: 'Attendance', to: '/student/attendance', icon: FiCalendar },
    { label: 'Exams', to: '/student/exams', icon: FiFileText },
    { label: 'Results', to: '/student/results', icon: FiAward },
    { label: 'Fees', to: '/student/fees', icon: FiDollarSign },
    { label: 'Notices', to: '/student/notices', icon: FiBell },
    { label: 'Messages', to: '/student/messages', icon: FiMessageCircle },
    { label: 'Profile', to: '/student/profile', icon: FiUsers },
    { label: 'Settings', to: '/student/settings', icon: FiSettings },
  ],
  teacher: [
    { label: 'Dashboard', to: '/teacher', icon: FiHome },
    { label: 'Students', to: '/teacher/students', icon: FiUsers },
    { label: 'Attendance', to: '/teacher/attendance', icon: FiCalendar },
    { label: 'Assignments', to: '/teacher/assignments', icon: FiClipboard },
    { label: 'Exams', to: '/teacher/exams', icon: FiFileText },
    { label: 'Results', to: '/teacher/results', icon: FiAward },
    { label: 'Notices', to: '/teacher/notices', icon: FiBell },
    { label: 'Messages', to: '/teacher/messages', icon: FiMessageCircle },
    { label: 'Settings', to: '/teacher/settings', icon: FiSettings },
  ],
  admin: [
    { label: 'Dashboard', to: '/admin', icon: FiHome },
    { label: 'Students', to: '/admin/students', icon: FiUsers },
    { label: 'Teachers', to: '/admin/teachers', icon: FiUsers },
    { label: 'Classes', to: '/admin/classes', icon: FiBookOpen },
    { label: 'Subjects', to: '/admin/subjects', icon: FiBarChart2 },
    { label: 'Fees', to: '/admin/fees', icon: FiDollarSign },
    { label: 'Reports', to: '/admin/reports', icon: FiFileText },
    { label: 'Settings', to: '/admin/settings', icon: FiSettings },
  ],
};

export default function Sidebar({ role }) {
  const { auth, logout } = useAppContext();
  const items = menus[role] || [];

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white px-4 py-6 dark:border-white/10 dark:bg-slate-900">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white font-bold text-lg">
          {auth.user?.name?.[0] ?? '?'}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">{auth.user?.name}</p>
          <p className="text-xs capitalize text-slate-500 dark:text-slate-400">{auth.role} panel</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === `/${role}`}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={logout}
        className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-500 dark:border-white/10 dark:text-slate-300 dark:hover:bg-red-600/20 dark:hover:text-red-400"
      >
        <FiLogOut className="h-4 w-4" />
        Logout
      </button>
    </aside>
  );
}
