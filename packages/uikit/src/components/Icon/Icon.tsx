import { createElement, HTMLAttributes } from "react";
import { IconList, IconType } from "./IconList";
import classNames from "classnames";

export interface IconProps extends HTMLAttributes<HTMLDivElement> {
  icon: IconType;
  /**
   * `x * 4` (tailwind scale)
   * */
  height?: number;
}

export function Icon({ height = 3, className, ...props }: IconProps) {
  return (
    <div data-testid="Icon" className={classNames(className, { 'cursor-pointer': props.onClick })} {...props}>
      {createElement(IconList[props.icon], { height })}
    </div>
  );
}
