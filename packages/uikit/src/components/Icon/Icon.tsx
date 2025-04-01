import { createElement, HTMLAttributes } from "react";
import { IconList, IconType } from "./IconList";
import classNames from "classnames";
import "./Icon.css";

export interface IconProps extends HTMLAttributes<HTMLDivElement> {
  icon: IconType;
  /**
   * `x * 4` (tailwind scale)
   * */
  height?: number;
}

export function Icon({ height = 3, className, ...props }: IconProps) {
  return (
    <span
      data-testid="Icon"
      className={classNames('Icon', props.onClick && 'Icon--clickable')}
      {...props}
    >
      {createElement(IconList[props.icon], { height, className })}
    </span>
  );
}
