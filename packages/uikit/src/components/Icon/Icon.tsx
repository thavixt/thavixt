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

export function Icon({ height = 2, ...props }: IconProps) {
  return (
    <div data-testid="Icon" onClick={props.onClick} className={props.className}>
      {createElement(IconList[props.icon], { height })}
    </div>
  );
}
