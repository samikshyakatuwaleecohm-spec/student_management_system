import { writeFileSync } from 'fs';
import { resolve } from 'path';

const root = process.cwd();
const files = {
  'src/main.jsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AppProvider } from './context/AppContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
`,
  'src/components/ProtectedRoute.jsx': `import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export function ProtectedRoute({ role, children }) {
  const { auth } = useAppContext();

  if (auth.loading) return null;
  if (!auth.user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (role && auth.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
`,
  'src/components/Sidebar.jsx': `import { NavLink } from 'react-router-dom';
import { FiBookOpen, FiCalendar, FiClipboard, FiDollarSign, FiFileText, FiMessageCircle, FiSettings, FiUsers, FiHome, FiBell } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';

const menuConfig = {
  student: [
    { label: 'Dashboard', to: '/student', icon: FiHome },
    { label: 'Assignments', to: '/student/assignments', icon: FiClipboard },
    { label: 'Attendance', to: '/student/attendance', icon: FiCalendar },
    { label: 'Courses', to: '/student/courses', icon: FiBookOpen },
    { label: 'Exams', to: '/student/exams', icon: FiFileText },
    { label: 'Fees', to: '/student/fees', icon: FiDollarSign },
    { label: 'Messages', to: '/student/messages', icon: FiMessageCircle },
    { label: 'Notices', to: '/student/notices', icon: FiBell },
    { label: 'Settings', to: '/student/settings', icon: FiSettings },
  ],
  teacher: [
    { label: 'Dashboard', to: '/teacher', icon: FiHome },
    { label: 'Students', to: '/teacher/students', icon: FiUsers },
    { label: 'Attendance', to: '/teacher/attendance', icon: FiCalendar },
    { label: 'Assignments', to: '/teacher/assignments', icon: FiClipboard },
    { label: 'Exams', to: '/teacher/exams', icon: FiFileText },
    { label: 'Results', to: '/teacher/results', icon: FiBookOpen },
    { label: 'Notices', to: '/teacher/notices', icon: FiBell },
    { label: 'Messages', to: '/teacher/messages', icon: FiMessageCircle },
    { label: 'Settings', to: '/teacher/settings', icon: FiSettings },
  ],
  admin: [
    { label: 'Dashboard', to: '/admin', icon: FiHome },
    { label: 'Students', to: '/admin/students', icon: FiUsers },
    { label: 'Teachers', to: '/admin/teachers', icon: FiUsers },
    { label: 'Classes', to: '/admin/classes', icon: FiBookOpen },
    { label: 'Subjects', to: '/admin/subjects', icon: FiClipboard },
    { label: 'Fees', to: '/admin/fees', icon: FiDollarSign },
    { label: 'Reports', to: '/admin/reports', icon: FiFileText },
    { label: 'Settings', to: '/admin/settings', icon: FiSettings },
  ],
};

export default function Sidebar({ role }) {
  const { auth, logout } = useAppContext();
  const items = menuConfig[role] || [];

  return (
    <aside className="flex h-full min-h-screen w-72 flex-col gap-6 border-r border-white/10 bg-slate-950 p-5 text-slate-200">
      <div className="space-y-1">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{role || 'Guest'}</p>
        <h2 className="text-xl font-semibold text-white">{auth.user?.name ?? 'Welcome'}</h2>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                'flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ' +
                (isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-900/80')
              }
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={logout}
        className="rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-900"
      >
        Log out
      </button>
    </aside>
  );
}
`,
  'src/components/Topbar.jsx': `import { useLocation } from 'react-router-dom';
import { FiBell, FiMoon, FiSun } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';

export default function Topbar() {
  const { auth, theme, toggleTheme } = useAppContext();
  const location = useLocation();
  const section = location.pathname.split('/')[2] || 'dashboard';

  return (
    <div className="flex flex-col gap-4 border-b border-white/10 bg-slate-950/90 px-6 py-5 text-slate-100 shadow-sm shadow-black/10 backdrop-blur">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Current section</p>
          <h1 className="text-2xl font-semibold text-white capitalize">{section}</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-100 transition hover:bg-slate-700"
          >
            {theme === 'dark' ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-100 transition hover:bg-slate-700"
          >
            <FiBell className="h-4 w-4" />
            Alerts
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-400">Welcome back, {auth.user?.name ?? 'Guest'}. Your dashboard is ready.</p>
    </div>
  );
}
`,
  'src/components/SectionHeader.jsx': `export default function SectionHeader({ title, subtitle, children }) {
  return (
    <div className="mb-8 rounded-3xl bg-slate-900/80 p-6 text-slate-100 shadow-sm shadow-black/10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          {subtitle ? <p className="mt-2 text-slate-400">{subtitle}</p> : null}
        </div>
        {children}
      </div>
    </div>
  );
}
`,
  'src/components/StatCard.jsx': `export default function StatCard({ title, value, note, icon, accent = 'bg-slate-800' }) {
  return (
    <div className={`rounded-3xl ${accent} p-6 text-slate-100 shadow-sm shadow-black/10`}>
      <div className="mb-4 flex items-center gap-3">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-4xl font-bold">{value}</p>
      {note ? <p className="mt-2 text-sm text-slate-400">{note}</p> : null}
    </div>
  );
}
`,
  'src/components/Modal.jsx': `export default function Modal({ open, title, description, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-3xl bg-slate-950 p-6 text-slate-100 shadow-xl shadow-black/40">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            {description ? <p className="mt-2 text-slate-400">{description}</p> : null}
          </div>
          <button onClick={onClose} className="rounded-full bg-slate-800 px-3 py-2 text-sm text-slate-100 transition hover:bg-slate-700">
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
`,
  'src/components/ToastContainer.jsx': `import { useAppContext } from '../context/AppContext';

export default function ToastContainer() {
  const { toasts } = useAppContext();
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div key={toast.id} className="rounded-3xl bg-slate-900/95 px-5 py-3 text-sm text-slate-100 shadow-lg shadow-black/30">
          {toast.message}
        </div>
      ))}
    </div>
  );
}
`,
  'src/context/AppContext.jsx': `import { createContext, useContext, useEffect, useState } from 'react';
import {
  initialAssignments,
  initialClasses,
  initialExams,
  initialFees,
  initialNotices,
  initialStudents,
  initialTeachers,
  initialUsers,
  attendanceRecords,
} from '../data/initialData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [auth, setAuth] = useState({ user: null, role: null, loading: true });
  const [theme, setTheme] = useState('dark');
  const [users, setUsers] = useState(initialUsers);
  const [students, setStudents] = useState(initialStudents);
  const [teachers, setTeachers] = useState(initialTeachers);
  const [classes, setClasses] = useState(initialClasses);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [exams, setExams] = useState(initialExams);
  const [notices, setNotices] = useState(initialNotices);
  const [fees, setFees] = useState(initialFees);
  const [attendance, setAttendance] = useState(attendanceRecords);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = window.localStorage.getItem('sms-theme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        setTheme(storedTheme);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('sms-theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.style.colorScheme = theme;
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAuth = window.localStorage.getItem('sms-auth');
      if (storedAuth) {
        const parsed = JSON.parse(storedAuth);
        setAuth({ user: parsed.user, role: parsed.role, loading: false });
        return;
      }
    }
    setAuth({ user: null, role: null, loading: false });
  }, []);

  const sendToast = (message, type = 'success') => {
    const id = `toast-${Date.now()}`;
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3600);
  };

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  const login = async (role, email, password, remember) => {
    const found = users.find((user) => user.role === role && user.email === email && user.password === password);
    if (!found) {
      sendToast('Invalid credentials. Check your email and password.', 'error');
      return false;
    }

    const next = { user: found, role: found.role, loading: false };
    setAuth(next);
    if (remember && typeof window !== 'undefined') {
      window.localStorage.setItem('sms-auth', JSON.stringify(next));
    }
    sendToast('Logged in successfully.', 'success');
    return true;
  };

  const logout = () => {
    setAuth({ user: null, role: null, loading: false });
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('sms-auth');
    }
    sendToast('Logged out.', 'info');
  };

  const value = {
    auth,
    theme,
    toggleTheme,
    login,
    logout,
    users,
    students,
    teachers,
    classes,
    assignments,
    exams,
    notices,
    fees,
    attendance,
    toasts,
    sendToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }
  return context;
}
`,
  'src/data/initialData.ts': `export const initialUsers = [
  {
    id: 'u1',
    role: 'student',
    name: 'Alice Parker',
    email: 'alice@example.com',
    password: 'student123',
    avatar: 'student1',
    class: '10-A',
    section: 'A',
    subjects: ['Math', 'English'],
    attendance: 92,
    gpa: 3.8,
  },
  {
    id: 'u2',
    role: 'teacher',
    name: 'Mr. James',
    email: 'james@example.com',
    password: 'teacher123',
    avatar: 'teacher1',
    subject: 'Physics',
    phone: '555-0123',
  },
  {
    id: 'u3',
    role: 'admin',
    name: 'Principal Maya',
    email: 'admin@example.com',
    password: 'admin123',
    avatar: 'admin1',
    phone: '555-0456',
  },
];

export const initialStudents = [
  {
    id: 's1',
    name: 'Alice Parker',
    email: 'alice@example.com',
    class: '10-A',
    status: 'active',
    attendance: 92,
    pendingAssignments: 2,
    upcomingExams: 1,
    feesDue: 120,
    gender: 'Female',
    dob: '2008-09-12',
  },
  {
    id: 's2',
    name: 'Noah Carter',
    email: 'noah@example.com',
    class: '10-B',
    status: 'active',
    attendance: 88,
    pendingAssignments: 4,
    upcomingExams: 2,
    feesDue: 200,
    gender: 'Male',
    dob: '2008-05-22',
  },
];

export const initialTeachers = [
  {
    id: 't1',
    name: 'Mr. James',
    email: 'james@example.com',
    subject: 'Physics',
    classes: ['10-A', '10-B'],
    phone: '555-0123',
    status: 'active',
  },
  {
    id: 't2',
    name: 'Ms. Rose',
    email: 'rose@example.com',
    subject: 'English',
    classes: ['9-C'],
    phone: '555-0456',
    status: 'active',
  },
];

export const initialClasses = [
  {
    id: 'c1',
    name: '10-A',
    teacherId: 't1',
    subjects: ['English', 'Physics'],
  },
  {
    id: 'c2',
    name: '9-C',
    teacherId: 't2',
    subjects: ['History', 'Chemistry'],
  },
];

export const initialAssignments = [
  {
    id: 'a1',
    title: 'Chapter 4 Homework',
    className: '10-A',
    dueDate: '2026-06-10',
    status: 'pending',
    description: 'Daily practice exercises',
  },
  {
    id: 'a2',
    title: 'History Essay',
    className: '9-C',
    dueDate: '2026-06-12',
    status: 'completed',
    description: 'Write an essay on world history topics',
  },
];

export const initialExams = [
  {
    id: 'e1',
    title: 'Math Midterm',
    className: '10-A',
    date: '2026-06-20',
    status: 'scheduled',
    resultPublished: false,
  },
  {
    id: 'e2',
    title: 'English Grammar Test',
    className: '10-B',
    date: '2026-06-23',
    status: 'scheduled',
    resultPublished: false,
  },
];

export const initialNotices = [
  {
    id: 'n1',
    title: 'Term Break Reminder',
    message: 'Term break starts next week. Make sure to submit your assignments.',
    category: 'Announcement',
    date: '2026-06-02',
  },
  {
    id: 'n2',
    title: 'Library Hours',
    message: 'The library will be open from 8 AM to 5 PM during exams.',
    category: 'Reminder',
    date: '2026-06-05',
  },
];

export const initialFees = [
  {
    id: 'f1',
    studentName: 'Alice Parker',
    amount: 120,
    dueDate: '2026-06-15',
    status: 'pending',
  },
  {
    id: 'f2',
    studentName: 'Noah Carter',
    amount: 80,
    dueDate: '2026-06-18',
    status: 'paid',
  },
];

export const attendanceRecords = [
  { id: 'ar1', date: '2026-06-01', present: 24, absent: 6 },
  { id: 'ar2', date: '2026-06-02', present: 22, absent: 8 },
];
`,
};

for (const [relativePath, content] of Object.entries(files)) {
  const target = resolve(root, relativePath);
  writeFileSync(target, content, 'utf8');
}
console.log('Updated shared files');
`}
