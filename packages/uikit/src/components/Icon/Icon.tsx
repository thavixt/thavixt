import { createElement, HTMLAttributes } from "react";
import { IconList, IconType } from "./IconList";

export interface IconProps extends HTMLAttributes<HTMLDivElement> {
  icon: IconType;
  /**
   * `x * 4` (tailwind scale)
   * */
  height?: number;
}

export function Icon({ height = 2, ...props }: IconProps) {
  return (
    <div data-testid="Icon" {...props}>
      {createElement(IconList[props.icon], { height })}
    </div>
  );
}
