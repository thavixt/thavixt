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

/**
 * @todo
 * TODO: consistent sizing with Icon and Loader components
 * probably using var(--scale) or smt 
 */
export function Icon({ height = 3, className, ...props }: IconProps) {
  return (
    <div
      data-testid="Icon"
      className={classNames('Icon', className, props.onClick && 'Icon--clickable')}
      {...props}
    >
      {createElement(IconList[props.icon], { height })}
    </div>
  );
}
