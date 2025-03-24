import classNames from "classnames";
import { PropsWithChildren } from "react";
import { CommonProps } from "../../common/commonProps";

export interface BadgeProps extends PropsWithChildren<CommonProps<HTMLDivElement>> {
  inactive?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export function Badge({ children, className, onClick, inactive, ref }: BadgeProps) {
  const classes = classNames(
    'inline rounded-xl shadow-md transition-colors mx-1 select-none',
    'px-2 py-1 text-sm leading-3',
    'text-slate-100 dark:text-slate-700',
    {
      'bg-slate-700 dark:bg-slate-100': !inactive,
      'bg-slate-400 dark:bg-slate-400': inactive,
    },
    {
      'cursor-pointer hover:bg-slate-500 hover:dark:bg-slate-300': onClick,
    },
    className,
  );

  return (
    <div data-testid="Badge" ref={ref} className={classes} onClick={onClick}>
      {children}
    </div>
  )
}