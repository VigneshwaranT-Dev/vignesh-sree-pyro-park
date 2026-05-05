import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { useToast } from "../../hooks/useToast";

const GlobalToast = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed top-20 right-6 z-[9999] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast: any) => {
          const isSuccess = toast.type === "success";

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`
                flex items-center gap-3
                px-4 py-3 rounded-xl
                backdrop-blur-xl text-sm min-w-[240px]

                ${
                  isSuccess
                    ? "bg-[#020617]/95 border border-green-500/40 shadow-[0_0_25px_rgba(34,197,94,0.25)]"
                    : "bg-[#020617]/95 border border-red-500/40 shadow-[0_0_25px_rgba(239,68,68,0.25)]"
                }
              `}
            >
              {isSuccess ? (
                <CheckCircle className="text-green-400" size={18} />
              ) : (
                <XCircle className="text-red-400" size={18} />
              )}

              <span className="text-white">{toast.message}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default GlobalToast;
