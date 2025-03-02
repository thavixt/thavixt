import { createElement } from "react";
import { SpinnerList, SpinnerType } from "./SpinnerList";
import classNames from "classnames";

export interface SpinnerProps {
  type?: SpinnerType;
  /**
   * `x * 4` (tailwind scale)
   * */
  height?: number;
  className?: string;
}

export function Spinner({ type: icon = 'TubeSpinner', height = 5, className }: SpinnerProps) {
  const iconFn = SpinnerList[icon];

  return (
    <span className={classNames(className, 'animate-pulse')}>
      {createElement(iconFn, { height })}
    </span>
  );
}
