import { createElement } from "react";
import { IconList, IconType } from "./IconList";

export interface IconProps {
  icon?: IconType;
  /**
   * `x * 4` (tailwind scale)
   * */
  height?: number;
  className?: string;
}

export function Icon({ icon = 'ArrowUp', height = 5, className }: IconProps) {
  const iconFn = IconList[icon];

  return (
    <span className={className}>
      {createElement(iconFn, { height })}
    </span>
  );
}
