import classNames from "classnames";
import { PropsWithChildren } from "react";
import { CommonProps } from "../../common/commonProps";

export interface BadgeProps extends PropsWithChildren<CommonProps<HTMLDivElement>> {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export function Badge({children, className, onClick, ref}: BadgeProps) {
  const classes = classNames(
    'inline rounded-xl shadow-md transition-colors',
    'px-2 py-1 text-sm leading-3',
    'text-slate-100 dark:text-slate-700',
    'bg-slate-700 dark:bg-slate-100',
    'hover:bg-slate-500 hover:dark:bg-slate-300',
    {
      'cursor-pointer': onClick,
    },
    className,
  );

  return (
    <div data-testid="Badge" ref={ref} className={classNames(classes)} onClick={onClick}>
      {children}
    </div>
  )
}