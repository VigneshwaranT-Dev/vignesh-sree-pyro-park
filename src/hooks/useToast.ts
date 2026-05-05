import { useEffect, useState } from "react";

type ToastType = "success" | "error";

type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
};

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handler = (e: any) => {
      const { message, type = "success" } = e.detail || {};

      if (!message) return;

      const id = Date.now();

      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 2500);
    };

    window.addEventListener("toast", handler);
    return () => window.removeEventListener("toast", handler);
  }, []);

  return { toasts };
};
