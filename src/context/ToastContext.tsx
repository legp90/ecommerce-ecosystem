import { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Toast } from '../types';
import { CheckCircle, Sparkles } from 'lucide-react';

interface ToastContextType {
  addToast: (message: string, type?: Toast['type']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Función para disparar una alerta y destruirla automáticamente a los 3 segundos
  const addToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const contextValue = useMemo(() => ({ addToast }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {/* Contenedor flotante de notificaciones fijado arriba a la derecha */}
      <div className="fixed top-4 right-4 z-55 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 rounded-xl bg-slate-800/95 border border-indigo-500/30 p-4 shadow-2xl backdrop-blur-md transition-all duration-300 animate-slide-in"
          >
            <div className="rounded-lg p-1 bg-indigo-500/10 text-indigo-400">
              {toast.type === 'success' ? (
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              ) : (
                <Sparkles className="h-5 w-5" />
              )}
            </div>
            <p className="text-sm font-medium text-slate-200 flex-1">
              {toast.message}
            </p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe ser utilizado dentro de un ToastProvider');
  }
  return context;
}