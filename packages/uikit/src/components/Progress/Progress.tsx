import classNames from "classnames";
import { CommonProps } from "../../common/commonProps";
import { useLayoutEffect, useRef, useState } from "react";
import { Typography } from "../Typography/Typography";
import { useResizeObserver } from "../../common/useResizeObserver";

interface ProgressProps extends CommonProps<HTMLProgressElement> {
  current: number;
  max?: number;
  label?: string;
}

export function Progress({ label, className, max = 100, current, ...props }: ProgressProps) {
  const [resizeCounter, setResizeCounter] = useState(0);
  const [labelInside, setLabelInside] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  useResizeObserver(() => setResizeCounter(prev => prev + 1));

  const labelClasses = 'text-slate-600 text-xs';
  const insideLabelClasses = 'text-slate-100 text-xs';
  const percent = +((current / max) * 100).toFixed();
  const percentLabel = `${percent.toString().padStart(3)}%`;

  useLayoutEffect(() => {
    if (!progressRef.current) {
      return;
    }
    const labelRect = progressRef.current.getBoundingClientRect();
    setLabelInside(labelRect.width > percentLabel.length * 10);
  }, [percent, percentLabel.length, resizeCounter]);

  return (
    <div className={classNames('flex flex-col space-y-2 items-start', className)}>
      {label ? <Typography.Label>{label}:</Typography.Label> : null}
      <progress hidden max={max} value={current} {...props}>{percentLabel}</progress>
      <div aria-hidden="true" className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 flex space-x-2">
        <div
          ref={progressRef}
          className="h-4 rounded-full flex justify-center transition-all"
          style={{ width: `${percent}%`, backgroundColor: getRGBColorFromNumber(percent, max) }}
        >
          {labelInside ? (
            <div className={insideLabelClasses}>{percentLabel}</div>
          ) : null}
        </div>
        {!labelInside ? (
          <div className={labelClasses}>{percentLabel}</div>
        ) : null}
      </div>
    </div>
  )
}

function getRatio(value: number, max: number) {
  if (max === 0) return 0; // Avoid division by zero
  return Math.min(100, Math.max(0, (value / max) * 100)); // Clamp between 0-100
}

function getRGBColorFromNumber(value: number, max: number) {
  const clampedNum = getRatio(value, max);
  const factor = Math.pow(clampedNum / 100, 2); // Exponential transition
  const blue = Math.floor(200 * (1 - factor)); // Starts at 255 and drops faster near 100
  const green = Math.floor(200 * factor); // Starts low and rises sharply near 100
  return `rgb(0, ${green}, ${blue})`;
}
