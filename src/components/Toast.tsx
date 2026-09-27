import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => onDismiss(toast.id)}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-stone-900/95 dark:bg-stone-800/95 text-stone-50 border border-stone-700/80 shadow-2xl backdrop-blur-md transition-all duration-300 transform translate-y-0 opacity-100 cursor-pointer animate-in fade-in slide-in-from-bottom-2"
        >
          {toast.type === 'info' ? (
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className="text-xs sm:text-sm font-medium leading-snug flex-1">
            {toast.message}
          </span>
        </div>
      ))}
    </div>
  );
};
