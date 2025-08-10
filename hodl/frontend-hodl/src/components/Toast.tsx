import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: number) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`backdrop-blur-md border rounded-xl shadow-lg p-4 max-w-sm transform transition-all duration-300 animate-in slide-in-from-right ${
            toast.type === 'success' 
              ? 'bg-green-500/20 border-green-400/30 text-green-100' 
              : toast.type === 'error'
              ? 'bg-red-500/20 border-red-400/30 text-red-100'
              : 'bg-blue-500/20 border-blue-400/30 text-blue-100'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
              {toast.type === 'error' && <XCircle className="w-5 h-5" />}
              {toast.type === 'info' && <Clock className="w-5 h-5" />}
              <p className="font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-white/60 hover:text-white transition-colors"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;