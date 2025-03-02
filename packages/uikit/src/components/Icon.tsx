import { createElement } from "react";
import { IconList, IconType } from "./IconList";

export interface IconProps {
  icon: IconType;
  /**
   * `x * 4` (tailwind scale)
   * */
  height?: number;
  className?: string;
  onClick?: () => void;
}

export function Icon({ icon, height = 5, className, onClick }: IconProps) {
  const iconFn = IconList[icon];

  return (
    <span className={className} onClick={onClick}>
      {createElement(iconFn, { height })}
    </span>
  );
}
