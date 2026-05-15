import { createContext, useContext, useEffect, useMemo, useState } from 'react';
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
  dailyStudentAttendance,
  studentResults,
} from '../data/initialData';

const AppContext = createContext(undefined);

function getStoredItem(key, initialValue) {
  if (typeof window === 'undefined') return initialValue;
  const stored = window.localStorage.getItem(key);
  return stored ? JSON.parse(stored) : initialValue;
}

export function AppProvider({ children }) {
  const [auth, setAuth] = useState({ user: null, role: null, loading: true });
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = window.localStorage.getItem('sms-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [users, setUsers] = useState(() => getStoredItem('sms-users', initialUsers));
  const [students, setStudents] = useState(() => getStoredItem('sms-students', initialStudents));
  const [teachers, setTeachers] = useState(() => getStoredItem('sms-teachers', initialTeachers));
  const [classes, setClasses] = useState(() => getStoredItem('sms-classes', initialClasses));
  const [assignments, setAssignments] = useState(() => getStoredItem('sms-assignments', initialAssignments));
  const [exams, setExams] = useState(() => getStoredItem('sms-exams', initialExams));
  const [notices, setNotices] = useState(() => getStoredItem('sms-notices', initialNotices));
  const [fees, setFees] = useState(() => getStoredItem('sms-fees', initialFees));
  const [attendance, setAttendance] = useState(() => getStoredItem('sms-attendance', attendanceRecords));
  const [dailyAttendance, setDailyAttendance] = useState(() => getStoredItem('sms-daily-attendance', dailyStudentAttendance));
  const [results] = useState(studentResults);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const storedAuth = window.localStorage.getItem('sms-auth');
    if (storedAuth) {
      const saved = JSON.parse(storedAuth);
      setAuth({ user: saved.user, role: saved.role, loading: false });
    } else {
      setAuth({ user: null, role: null, loading: false });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('sms-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => { window.localStorage.setItem('sms-users', JSON.stringify(users)); }, [users]);
  useEffect(() => { window.localStorage.setItem('sms-students', JSON.stringify(students)); }, [students]);
  useEffect(() => { window.localStorage.setItem('sms-teachers', JSON.stringify(teachers)); }, [teachers]);
  useEffect(() => { window.localStorage.setItem('sms-classes', JSON.stringify(classes)); }, [classes]);
  useEffect(() => { window.localStorage.setItem('sms-assignments', JSON.stringify(assignments)); }, [assignments]);
  useEffect(() => { window.localStorage.setItem('sms-exams', JSON.stringify(exams)); }, [exams]);
  useEffect(() => { window.localStorage.setItem('sms-notices', JSON.stringify(notices)); }, [notices]);
  useEffect(() => { window.localStorage.setItem('sms-fees', JSON.stringify(fees)); }, [fees]);
  useEffect(() => { window.localStorage.setItem('sms-attendance', JSON.stringify(attendance)); }, [attendance]);
  useEffect(() => { window.localStorage.setItem('sms-daily-attendance', JSON.stringify(dailyAttendance)); }, [dailyAttendance]);

  const sendToast = (message, type = 'success') => {
    const id = `toast-${Date.now()}`;
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3800);
  };

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  const login = async (role, email, password, remember) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const found = users.find((u) => u.email === email && u.password === password && u.role === role);
        if (found) {
          setAuth({ user: found, role: found.role, loading: false });
          if (remember) {
            window.localStorage.setItem('sms-auth', JSON.stringify({ user: found, role: found.role }));
          }
          sendToast('Welcome back! Redirecting to dashboard.', 'success');
          resolve(true);
        } else {
          sendToast('Invalid credentials. Check your email, password, and role.', 'error');
          resolve(false);
        }
      }, 700);
    });
  };

  const register = async (role, name, email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const exists = users.some((u) => u.email === email);
        if (exists) {
          sendToast('Account already exists with this email.', 'error');
          return resolve(false);
        }
        const newUser = {
          id: `u-${Date.now()}`,
          role,
          name,
          email,
          password,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        };
        setUsers((list) => [newUser, ...list]);
        setAuth({ user: newUser, role: newUser.role, loading: false });
        window.localStorage.setItem('sms-auth', JSON.stringify({ user: newUser, role: newUser.role }));
        sendToast('Registration complete. Redirecting to dashboard.', 'success');
        resolve(true);
      }, 700);
    });
  };

  const logout = () => {
    window.localStorage.removeItem('sms-auth');
    setAuth({ user: null, role: null, loading: false });
    sendToast('You have been logged out.', 'info');
  };

  const updateProfile = (update) => {
    setAuth((current) => {
      if (!current.user) return current;
      const next = { ...current.user, ...update };
      window.localStorage.setItem('sms-auth', JSON.stringify({ user: next, role: current.role }));
      sendToast('Profile updated successfully.', 'success');
      return { ...current, user: next };
    });
  };

  const addStudent = (student) => {
    setStudents((list) => [{ id: `s-${Date.now()}`, ...student }, ...list]);
    sendToast('Student added successfully.', 'success');
  };

  const updateStudent = (id, update) => {
    setStudents((list) => list.map((item) => (item.id === id ? { ...item, ...update } : item)));
    sendToast('Student record updated.', 'success');
  };

  const removeStudent = (id) => {
    setStudents((list) => list.filter((item) => item.id !== id));
    sendToast('Student deleted successfully.', 'info');
  };

  const addTeacher = (teacher) => {
    setTeachers((list) => [{ id: `t-${Date.now()}`, ...teacher }, ...list]);
    sendToast('Teacher added successfully.', 'success');
  };

  const updateTeacher = (id, update) => {
    setTeachers((list) => list.map((item) => (item.id === id ? { ...item, ...update } : item)));
    sendToast('Teacher information updated.', 'success');
  };

  const removeTeacher = (id) => {
    setTeachers((list) => list.filter((item) => item.id !== id));
    sendToast('Teacher removed successfully.', 'info');
  };

  const addClass = (schoolClass) => {
    setClasses((list) => [{ id: `c-${Date.now()}`, ...schoolClass }, ...list]);
    sendToast('Class added successfully.', 'success');
  };

  const addSubject = (classId, subject) => {
    setClasses((list) =>
      list.map((item) => (item.id === classId ? { ...item, subjects: [...item.subjects, subject] } : item))
    );
    sendToast('Subject added successfully.', 'success');
  };

  const addNotice = (notice) => {
    setNotices((list) => [{ id: `n-${Date.now()}`, ...notice }, ...list]);
    sendToast('Notice published successfully.', 'success');
  };

  const addAssignment = (assignment) => {
    setAssignments((list) => [{ id: `a-${Date.now()}`, ...assignment }, ...list]);
    sendToast('Assignment created successfully.', 'success');
  };

  const updateAssignment = (id, update) => {
    setAssignments((list) => list.map((item) => (item.id === id ? { ...item, ...update } : item)));
    sendToast('Assignment updated.', 'success');
  };

  const addExam = (exam) => {
    setExams((list) => [{ id: `e-${Date.now()}`, ...exam }, ...list]);
    sendToast('Exam scheduled.', 'success');
  };

  const publishExamResult = (id) => {
    setExams((list) => list.map((item) => (item.id === id ? { ...item, resultPublished: true } : item)));
    sendToast('Result published successfully.', 'success');
  };

  const payFee = (id) => {
    setFees((list) => list.map((item) => (item.id === id ? { ...item, status: 'paid' } : item)));
    sendToast('Payment recorded.', 'success');
  };

  const contextValue = useMemo(
    () => ({
      auth,
      students,
      teachers,
      classes,
      assignments,
      exams,
      notices,
      fees,
      attendance,
      dailyAttendance,
      results,
      toasts,
      login,
      register,
      logout,
      sendToast,
      theme,
      toggleTheme,
      addStudent,
      updateStudent,
      removeStudent,
      addTeacher,
      updateTeacher,
      removeTeacher,
      addNotice,
      addClass,
      addSubject,
      addAssignment,
      updateAssignment,
      addExam,
      publishExamResult,
      payFee,
      updateProfile,
    }),
    [auth, students, teachers, classes, assignments, exams, notices, fees, attendance, toasts]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
