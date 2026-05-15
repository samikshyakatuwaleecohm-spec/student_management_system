import { AnimatePresence, motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const typeStyles = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  info: 'bg-blue-600',
  warning: 'bg-yellow-600',
};

export default function ToastContainer() {
  const { toasts } = useAppContext();
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`rounded-2xl px-5 py-3 text-sm font-medium text-white shadow-lg ${typeStyles[toast.type] ?? typeStyles.info}`}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
