import classNames from "classnames";
import { ReactNode, useState } from "react";
import { Icon } from "../Illustration/Icon";

export type SnackbarType = 'info' | 'success' | 'warning';

const Snackbar_COLORS: Record<SnackbarType, string> = {
  info: 'bg-slate-200 dark:bg-slate-300 text-slate-800',
  success: 'bg-green-400 text-slate-800',
  warning: 'bg-red-600',
}

export type SnackbarPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

export interface SnackbarProps {
  children: ReactNode;
  className?: string;
  position?: SnackbarPosition;
  type?: SnackbarType;
  open?: boolean;
}

export function Snackbar({
  position = 'bottom-right', className, children, type = 'info', open = false
}: SnackbarProps) {
  const [hidden, setHidden] = useState(false);

  const classes = classNames(
    'flex items-center space-x-2 p-2 text-slate-100 w-fit max-w-80 fixed',
    'rounded-sm shadow-lg shadow-slate-400 dark:shadow-slate-800',
    'transition-opacity ease-in-out delay-150 duration-300',
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
    <div className={classes}>
      <div>{children}</div>
      <Icon icon="Cross" height={4} className="cursor-pointer" onClick={() => setHidden(true)}/>
    </div>
  );
}