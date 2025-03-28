import classNames from "classnames";
import { PropsWithChildren } from "react";
import { CommonProps } from "../../common/commonProps";
import { themedTextClasses } from "../../common/theme";

type Position = 'left' | 'right' | 'top' | 'bottom';

interface TooltipProps extends PropsWithChildren<CommonProps> {
  tooltip: string | number;
  position?: Position;
  visible?: boolean;
  className?: string;
}

export function Tooltip({ ref, className, children, tooltip, position = 'bottom', visible }: TooltipProps) {
  const tooltipClasses = classNames(
    'min-w-24 z-100 max-w-64 w-fit h-fit',
    'text-xs text-slate-100 bg-slate-500 rounded-sm drop-shadow-lg px-2 py-1',
    'group-hover:block group-hover:opacity-100 transition-opacity',
    {
      'block opacity-100': visible,
      'opacity-0 pointer-events-none': !visible,
      'absolute inset-x-0 bottom-full mb-3': position === 'top',
      'absolute inset-x-0 top-full mt-3': position === 'bottom',
      'absolute inset-y-0 right-full mr-3': position === 'left',
      'absolute inset-y-0 left-full ml-3': position === 'right',
    },
    className,
  );
  const textClasses = classNames(
    themedTextClasses,
    "static cursor-help border-b-1 border-slate-400",
  )

  return (
    <div data-testid="Tooltip" ref={ref} className="group size-fit relative">
      <div className={textClasses}>{children}</div>
      <div data-testid="TooltipContent" className={tooltipClasses}>
        {tooltip}
        <Arrow position={position} />
      </div>
    </div>
  )
}

function Arrow({ position }: { position: Position }) {
  const classes = classNames(
    'w-0 h-0 border-slate-500',
    {
      'border-x-8 border-x-transparent border-t-8 absolute inset-y-full inset-x-2': position === 'top',
      'border-x-8 border-x-transparent border-b-8 absolute -inset-y-2 inset-x-2': position === 'bottom',
      'border-y-8 border-y-transparent border-l-8 absolute inset-x-full inset-y-2': position === 'left',
      'border-y-8 border-y-transparent border-r-8 absolute -inset-x-2 inset-y-2': position === 'right',
    }
  )
  return (
    <div className={classes} />
  )
}