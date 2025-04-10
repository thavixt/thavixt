import classNames from "classnames";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
  ReactNode,
  useRef,
} from "react";
import { noop } from "../../common/utils";

const ANIMATION_DELAY = 150;
const TOAST_COLORS: Record<ToastType, string> = {
  info: 'bg-slate-200 dark:bg-slate-600',
  success: 'bg-green-400 dark:bg-green-600',
  warning: 'bg-red-400 dark:bg-red-700',
}

export type ToastType = 'info' | 'success' | 'warning';

export interface Toast {
  /** If provided, override the previous Toast with the same key, restarting it's timer */
  id: string;
  /** 'info' | 'success' | 'warning' */
  type: ToastType;
  /** Epoch of toast expiry */
  expires: number;
  /** Content to display in the toast */
  content: ReactNode;
  /** Called when the toast is clicked */
  onClick?: (key: string) => void;
}

export interface ToastContextType {
  toasts: Toast[];
  createToast: ({ content, type, duration, onClick }: {
    id?: string, content: ReactNode; type?: ToastType; duration?: number; onClick?: (id: string) => void;
  }) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  side: 'left' | 'right',
}

export const ToastContext = createContext<ToastContextType>({
  toasts: [],
  createToast: noop,
  removeToast: noop,
  clearToasts: noop,
  side: 'right',
});

interface ToastProviderProps {
  /**
   * `left` | `right`
   */
  side?: 'left' | 'right';
  onToastCreated?: (toastId: string) => void;
  duration?: number;
}

export function ToastProvider({ children, side = 'right', onToastCreated, duration: defaultDuration = 15_000 }: PropsWithChildren<ToastProviderProps>) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, number>>(new Map());

  const createToast = ({
    id,
    content,
    duration = defaultDuration,
    type = 'info',
    onClick,
  }: { id?: string, content: ReactNode, duration?: number, type?: ToastType, onClick?: (toastId: string) => void }) => {
    const toastId = id ?? crypto.randomUUID().slice(0, 8);
    setToasts(prev => [
      ...prev.filter(toast => toast.id !== toastId),
      {
        id: toastId,
        content,
        expires: Date.now() + duration,
        onClick,
        type,
      },
    ]);
    onToastCreated?.(toastId);

    const timer = timers.current.get(toastId);
    if (timer) {
      clearInterval(timer);
    }
    const timeout = setTimeout(() => setToasts(prev => prev.filter(toast => toast.id !== toastId)), duration) as unknown as number;
    timers.current.set(toastId, timeout);

    return toastId;
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
        side,
      }}
    >
      {children}
      <div className={toastContainerClasses}>
        {toasts.map((toast) => <ToastMessage key={toast.id} {...toast} />)}
      </div>
    </ToastContext.Provider>
  )
}

export function ToastMessage({ content, expires, id, type = 'info', onClick }: Toast) {
  const duration = useRef(expires - Date.now());
  const { removeToast, side } = useContext(ToastContext);
  const [visible, setVisible] = useState(false);
  const [indicatorWidth, setIndicatorWidth] = useState(100);

  useEffect(() => {
    if (!isFinite(expires)) {
      return;
    }
    const interval = setInterval(() => {
      const remaining = expires - Date.now();
      const current = Math.floor((remaining / duration.current) * 100);
      setIndicatorWidth(Math.max(0, current));
    }, 250);
    return () => clearInterval(interval);
  }, [expires]);

  const onToastClick = () => {
    onClick?.(id);
    removeToast(id);
  }

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), ANIMATION_DELAY);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), duration.current - ANIMATION_DELAY);
    return () => clearTimeout(timeout);
  }, [id, duration]);

  return (
    <div
      key={id}
      data-testid={`Toast ${type}Toast`}
      className={classNames(
        "relative min-w-[100px] w-fit max-w-[500px]",
        "transition-all duration-500 shadow-xl",
        "mt-2 cursor-pointer select-none rounded-md",
        {
          'scale-75 opacity-0 left-64': !visible && side === 'right',
          'scale-75 opacity-0 -left-64': !visible && side === 'left',
          'scale-100 opacity-100 left-0': visible,
          'pb-1': isFinite(expires),
        },
        TOAST_COLORS[type],
      )}
      onClick={onToastClick}
    >
      <div className="px-3 py-2 min-w-[150px]">
        {content}
      </div>
      {isFinite(expires) ? (
        <div
          data-testid="ToastDurationIndicator"
          className={classNames(
            'absolute bottom-0 h-2 bg-black dark:bg-white opacity-35 transition-all duration-500 w-full',
            indicatorWidth > 0 ? 'visible' : 'hidden',
            indicatorWidth > 90 ? 'rounded-b-sm' : 'rounded-bl-sm',
          )}
          style={{ width: `${indicatorWidth}%` }}
        />
      ) : null}
    </div>
  )
}

export function useToast() {
  const { clearToasts, createToast, removeToast, toasts } = useContext(ToastContext);

  return {
    activeToasts: toasts.map(toast => toast.id),
    clearToasts,
    createToast,
    removeToast,
  };
}