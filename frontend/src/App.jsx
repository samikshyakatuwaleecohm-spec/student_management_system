import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import RoleSelection from './pages/auth/RoleSelection';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import StudentLayout from './pages/student/StudentLayout';
import TeacherLayout from './pages/teacher/TeacherLayout';
import AdminLayout from './pages/admin/AdminLayout';
import NotFoundPage from './pages/NotFoundPage';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentAssignments from './pages/student/StudentAssignments';
import StudentAttendance from './pages/student/StudentAttendance';
import StudentCourses from './pages/student/StudentCourses';
import StudentExams from './pages/student/StudentExams';
import StudentFees from './pages/student/StudentFees';
import StudentMessages from './pages/student/StudentMessages';
import StudentNotices from './pages/student/StudentNotices';
import StudentProfile from './pages/student/StudentProfile';
import StudentResults from './pages/student/StudentResults';
import StudentSettings from './pages/student/StudentSettings';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherStudents from './pages/teacher/TeacherStudents';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherAssignments from './pages/teacher/TeacherAssignments';
import TeacherExams from './pages/teacher/TeacherExams';
import TeacherResults from './pages/teacher/TeacherResults';
import TeacherNotices from './pages/teacher/TeacherNotices';
import TeacherMessages from './pages/teacher/TeacherMessages';
import TeacherSettings from './pages/teacher/TeacherSettings';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStudents from './pages/admin/AdminStudents';
import AdminTeachers from './pages/admin/AdminTeachers';
import AdminClasses from './pages/admin/AdminClasses';
import AdminSubjects from './pages/admin/AdminSubjects';
import AdminFees from './pages/admin/AdminFees';
import AdminReports from './pages/admin/AdminReports';
import AdminSettings from './pages/admin/AdminSettings';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/role" element={<RoleSelection />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="assignments" element={<StudentAssignments />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="courses" element={<StudentCourses />} />
        <Route path="exams" element={<StudentExams />} />
        <Route path="fees" element={<StudentFees />} />
        <Route path="messages" element={<StudentMessages />} />
        <Route path="notices" element={<StudentNotices />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="results" element={<StudentResults />} />
        <Route path="settings" element={<StudentSettings />} />
      </Route>

      <Route
        path="/teacher"
        element={
          <ProtectedRoute role="teacher">
            <TeacherLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TeacherDashboard />} />
        <Route path="students" element={<TeacherStudents />} />
        <Route path="attendance" element={<TeacherAttendance />} />
        <Route path="assignments" element={<TeacherAssignments />} />
        <Route path="exams" element={<TeacherExams />} />
        <Route path="results" element={<TeacherResults />} />
        <Route path="notices" element={<TeacherNotices />} />
        <Route path="messages" element={<TeacherMessages />} />
        <Route path="settings" element={<TeacherSettings />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="teachers" element={<AdminTeachers />} />
        <Route path="classes" element={<AdminClasses />} />
        <Route path="subjects" element={<AdminSubjects />} />
        <Route path="fees" element={<AdminFees />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
