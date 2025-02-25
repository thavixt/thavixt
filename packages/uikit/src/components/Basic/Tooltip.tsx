import { PropsWithChildren } from "react";
import { CommonProps } from "../../common/commonProps";
import classNames from "classnames";
import { themedTextClasses } from "../../common/theme";

type Position = 'left' | 'right' | 'top' | 'bottom';

interface TooltipProps extends PropsWithChildren<CommonProps> {
  tooltip: string;
  position?: Position;
  visible?: boolean;
}

export function Tooltip({ ref, children, tooltip, position = 'bottom', visible }: TooltipProps) {
  const tooltipClasses = classNames(
    'hidden size-fit z-100',
    'opacity-0 transition-opacity',
    'text-xs text-slate-100 bg-slate-500 rounded-sm px-2 py-1',
    'group-hover:block group-hover:opacity-100',
    'drop-shadow-lg',
    {
      '!block opacity-100': visible,
      'absolute inset-x-2 bottom-full mb-3': position === 'top',
      'absolute inset-x-2 top-full mt-3': position === 'bottom',
      'absolute inset-y-1 right-full mr-3': position === 'left',
      'absolute inset-y-1 left-full ml-3': position === 'right',
      'w-fit w-max-32': position === 'top' || position === 'bottom',
      'h-fit h-max-32': position === 'left' || position === 'right',
    }
  );
  const textClasses = classNames(
    themedTextClasses,
    "static cursor-pointer border-b-1 border-slate-400",
  )

  return (
    <div ref={ref} className="group size-fit relative">
      <div className={textClasses}>{children}</div>
      <div className={tooltipClasses}>
        <Arrow position={position} />
        <span>{tooltip}</span>
      </div>
    </div>
  )
}

function Arrow({position}: {position: Position}) {
  const classes = classNames(
    'w-0 h-0 border-slate-500',
    {
      'border-x-8 border-x-transparent border-t-8 absolute inset-y-full inset-x-2': position === 'top',
      'border-x-8 border-x-transparent border-b-8 absolute -inset-y-2 inset-x-2': position === 'bottom',
      'border-y-8 border-y-transparent border-l-8 absolute inset-x-full inset-y-1': position === 'left',
      'border-y-8 border-y-transparent border-r-8 absolute -inset-x-2 inset-y-1': position === 'right',
    }
  )
  return (
    <div className={classes}/>
  )
}