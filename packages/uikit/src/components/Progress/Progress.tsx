import classNames from "classnames";
import { CommonProps } from "../../common/commonProps";
import { JSX, useCallback, useLayoutEffect, useRef, useState } from "react";
import { Typography } from "../Typography/Typography";
import { useResizeObserver } from "../../common/useResizeObserver";
import "./Progress.css";

interface ProgressProps extends CommonProps<HTMLProgressElement> {
  /** Current value */
  current: number;
  /** Max value */
  max?: number;
  /** Label text */
  label?: string;
  /** Display label and bar inline */
  inline?: boolean;
  /** Progress bar height */
  height?: string;
  /** Dynamically get a CSS color for the progress bar based on the current value */
  getColorFromValue?: (value: number, max: number) => string;
}

/**
 * A functional React component that renders a customizable progress bar with optional labels and styles.
 *
 * @example
 * ```tsx
 * <Progress current={47} label="Downloading archive" />
 * ```
 *
 * @remarks
 * - The component uses a `useResizeObserver` hook to detect size changes and adjust the label's position.
 * - The progress percentage is calculated as `(current / max) * 100` and displayed as a label.
 * - The label is conditionally rendered inside or outside the progress bar based on available space.
 * - The `getRGBColorFromNumber` function is used to dynamically determine the bar's background color.
 */
export function Progress({
  className,
  current,
  inline,
  label,
  getColorFromValue: providedGetColorFromValue,
  height = '20px',
  max = 100,
  ...props
}: ProgressProps): JSX.Element {
  const [resizeCounter, setResizeCounter] = useState(0);
  const [labelInside, setLabelInside] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const percent = +((current / max) * 100).toFixed();
  const percentLabel = `${percent.toString().padStart(3)}% (${Math.round(current)}/${Math.round(max)})`;
  
  useResizeObserver(() => setResizeCounter(prev => prev + 1));

  useLayoutEffect(() => {
    if (!progressRef.current) {
      return;
    }
    const labelRect = progressRef.current.getBoundingClientRect();
    setLabelInside(labelRect.width > percentLabel.length * 10);
  }, [percent, percentLabel.length, resizeCounter]);

  const getRGBColorFromNumber = useCallback((value: number, max: number) => {
    if (providedGetColorFromValue) {
      return providedGetColorFromValue(value, max);
    }
    return defaultGetColorFromValue(value, max);
  }, [providedGetColorFromValue]);

  return (
    <div className={classNames(
      'Progress',
      inline && 'Progress--inline',
      className,
    )}
      // @ts-expect-error css variable declaration - types dont support it but works 
      style={{ '--barHeight': height }}
    >
      {label ? (
        <Typography type="label">{label}</Typography>
      ) : null}
      <progress hidden max={max} value={current} {...props}>
        {percentLabel}
      </progress>
      <div aria-hidden="true" className="Progress__wrapper">
        <div
          ref={progressRef}
          className="Progress__bar"
          style={{ width: `${percent}%`, backgroundColor: getRGBColorFromNumber(percent, max) }}
        >
          {labelInside ? (
            <div className="Progress__label Progress--labelInside">{percentLabel}</div>
          ) : null}
        </div>
        {!labelInside ? (
          <div className="Progress__label Progress--labelOutside">{percentLabel}</div>
        ) : null}
      </div>
    </div >
  )
}

function getRatio(value: number, max: number) {
  if (max === 0) {
    return 0;
  }
  return Math.min(100, Math.max(0, (value / max) * 100));
}

const TRANSITION_FACTOR = 2; // 1: linear, 100: instant at the end

function defaultGetColorFromValue(value: number, max: number) {
  const clampedNum = getRatio(value, max);
  const transition = Math.pow(clampedNum / 100, TRANSITION_FACTOR); // Exponential transition
  const blue = Math.floor(175 * (1 - transition)); // Starts at 255 and drops faster near 100
  const green = Math.floor(175 * transition); // Starts low and rises sharply near 100
  return `rgb(50, ${green}, ${blue})`;
}
