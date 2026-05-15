import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center dark:bg-slate-950">
      <p className="text-8xl font-bold text-indigo-600 dark:text-indigo-500">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-slate-800 dark:text-white">Page not found</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-8 rounded-2xl bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500">
        Go Home
      </Link>
    </div>
  );
}
