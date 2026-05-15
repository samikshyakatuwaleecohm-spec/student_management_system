import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import ToastContainer from '../../components/ToastContainer';

export default function TeacherLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar role="teacher" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto px-6 py-6">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
