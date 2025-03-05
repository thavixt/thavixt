import classNames from "classnames";
import { ReactNode, RefObject, useImperativeHandle, useRef, useState } from "react";
import { Icon } from "../Icon/Icon";
import { themedBackgroundClasses } from "../../common/theme";

export type SnackbarType = 'info' | 'success' | 'warning';

const Snackbar_COLORS: Record<SnackbarType, string> = {
  info: 'bg-slate-200 dark:bg-slate-300 text-slate-800',
  success: 'bg-green-400 text-slate-800',
  warning: 'bg-red-600',
}

export type SnackbarPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

export type SnackbarHandle = RefObject<HTMLDivElement | null> & {
  show: () => void,
  hide: () => void,
}

export interface SnackbarProps {
  children: ReactNode;
  className?: string;
  position?: SnackbarPosition;
  type?: SnackbarType;
  open?: boolean;
  ref?: RefObject<SnackbarHandle | null>,
}

export function Snackbar({
  position = 'bottom-right', className, children, type = 'info', open = false, ref
}: SnackbarProps) {
  const [hidden, setHidden] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle<RefObject<HTMLDivElement | null>, SnackbarHandle>(
    ref,
    () => ({
      current: containerRef?.current,
      show: () => setHidden(false),
      hide: () => setHidden(true),
    }),
    [],
  );

  const classes = classNames(
    themedBackgroundClasses,
    'fixed flex items-center space-x-2 p-2 shadow-lg',
    'transition-opacity ease-in-out duration-200',
    {
      'opacity-0 pointer-events-none': !open || hidden,
      'opacity-100': open && !hidden,
    },
    {
      'bottom-4 left-4': position === 'bottom-right',
      'bottom-4 right-4': position === 'bottom-left',
      'top-4 left-4': position === 'top-right',
      'top-4 right-4': position === 'top-left',
    },
    className,
    {
      [Snackbar_COLORS[type]]: true,
    },
  );

  return (
    <div data-testid="Snackbar" ref={containerRef} className={classes}>
      <div>{children}</div>
      <Icon data-testid="close" icon="Cross" height={4} className="cursor-pointer" onClick={() => setHidden(true)}/>
    </div>
  );
}