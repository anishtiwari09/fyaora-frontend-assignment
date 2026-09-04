"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  titleIcon?: React.ReactNode;
  children: React.ReactNode;
};

export function Modal({ open, onClose, title, titleIcon, children }: ModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        className="absolute inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative w-full max-w-[503px] rounded-lg bg-white outline-none transition-transform [box-shadow:1px_1px_3px_0px_#0000001A,5px_3px_6px_0px_#00000017,10px_8px_8px_0px_#0000000D,18px_13px_9px_0px_#00000003,29px_21px_10px_0px_#00000000]"
      >
        <header className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
          <div className="flex items-center">
            {titleIcon}
            <h2 id={titleId} className="text-[17.18px] font-medium leading-none text-black">
              {title}
            </h2>
          </div>
          <button
            className="rounded p-1 text-neutral-500 transition-colors hover:bg-neutral-950 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X className="text-neutral-500" style={{ width: 19.6, height: 19.6 }} />
          </button>
        </header>

        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
