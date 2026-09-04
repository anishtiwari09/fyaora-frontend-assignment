"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import type { Toast, ToastVariant } from "@/types/waitlist";
import { CloseIcon } from "@/components/icons";

type ToastContextValue = {
  showToast: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

const STYLES: Record<ToastVariant, { container: string; bar: string }> = {
  success: { container: "bg-white", bar: "bg-green-600" },
  error: { container: "bg-white", bar: "bg-red-600" },
  info: { container: "bg-white", bar: "bg-primary" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "success") => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, message, variant }]);
      window.setTimeout(() => dismiss(id), 4000);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="pointer-events-none fixed right-4 top-4 z-[60] flex w-full max-w-sm flex-col gap-2"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((toast) => {
          const style = STYLES[toast.variant];
          return (
            <div
              key={toast.id}
              role="status"
              className={`pointer-events-auto flex items-start gap-3 overflow-hidden rounded-md border border-neutral-100 px-4 py-3 shadow-lg transition-all ${style.container}`}
            >
              <span className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${style.bar}`} />
              <p className="min-w-0 flex-1 text-[14px] leading-5 text-ink">{toast.message}</p>
              <button
                className="shrink-0 rounded p-0.5 text-neutral-500 transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss notification"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
