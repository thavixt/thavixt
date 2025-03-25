import classNames from "classnames";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
  ReactNode,
} from "react";
import { noop } from "../../common/utils";

const ANIMATION_DELAY = 150;

const TOAST_COLORS: Record<ToastType, string> = {
  info: 'border-sky-400 bg-slate-200 dark:bg-slate-700',
  success: 'border-green-400 !bg-green-100',
  warning: 'border-red-400 !bg-red-100',
}

/* context */

export type ToastType = 'info' | 'success' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  expires: number;
  content: ReactNode;
  onClick?: () => void;
}

export interface ToastContextType {
  toasts: Toast[];
  createToast: ({ content, type, duration, onClick }: {
    content: ReactNode; type?: ToastType; duration?: number; onClick?: () => void;
  }) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const ToastContext = createContext<ToastContextType>({
  toasts: [],
  createToast: noop,
  removeToast: noop,
  clearToasts: noop,
});

/* provider */

interface ToastProviderProps {
  /**
   * `left` | `right`
   */
  side?: 'left' | 'right';
}

export function ToastProvider({ children, side = 'right' }: PropsWithChildren<ToastProviderProps>) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const createToast = ({
    content, type = 'info', duration = 15_000, onClick,
  }: {
    content: ReactNode; type?: ToastType; duration?: number; onClick?: () => void;
  }) => {
    const id = crypto.randomUUID().slice(0, 6);
    setToasts(prev => [
      ...prev,
      {
        id,
        content,
        expires: Date.now() + duration,
        onClick,
        type,
      },
    ]);
    setTimeout(() => setToasts(prev => prev.filter(toast => toast.id !== id)), duration)
    return id;
  };

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const toastContainerClasses = classNames(
    "flex flex-col fixed",
    {
      "bottom-4 left-4": side === 'left',
      "bottom-4 right-4": side === 'right',
    },
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        createToast,
        removeToast,
        clearToasts,
      }}
    >
      {children}
      <div className={toastContainerClasses}>
        {toasts.map((toast) => <ToastMessage key={toast.id} toast={toast} />)}
      </div>
    </ToastContext.Provider>
  )
}

/* component rendered by the context */

function ToastMessage({ toast }: { toast: Toast }) {
  const { removeToast } = useContext(ToastContext);
  const [visible, setVisible] = useState(false);

  const onClick = () => {
    toast.onClick?.();
    removeToast(toast.id);
  }

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), ANIMATION_DELAY);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), toast.expires - Date.now() - ANIMATION_DELAY * 2);
    return () => clearTimeout(timeout);
  }, [toast.expires]);

  return (
    <div
      className={classNames(
        "transition-all duration-350 relative min-w-[100px] w-fit max-w-[500px] shadow-md",
        "p-2 mt-2 cursor-pointer select-none border-2 rounded-md",
        {
          'scale-75 opacity-0 left-64': !visible,
          'scale-100 opacity-100 left-0': visible,
        },
        TOAST_COLORS[toast.type],
      )}
      onClick={onClick}
    >
      {toast.content}
    </div>
  )
}

/* hook */

export function useToast() {
  const { clearToasts, createToast, removeToast, toasts } = useContext(ToastContext);

  return {
    activeToasts: toasts.map(toast => toast.id),
    clearToasts,
    createToast,
    removeToast,
  };
}