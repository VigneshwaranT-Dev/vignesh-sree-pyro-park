import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ message }: { message: string }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="
            fixed bottom-6 left-1/2 -translate-x-1/2
            bg-[#020617]/90 backdrop-blur-xl
            border border-orange-500/30
            text-white px-5 py-3 rounded-xl
            shadow-[0_0_25px_rgba(255,115,0,0.2)]
            text-sm z-[999]
          "
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
