import { createElement, HTMLAttributes, JSX } from "react";
import { IconList, IconType } from "./IconList";
import classNames from "classnames";
import "./Icon.css";

export interface IconProps extends HTMLAttributes<HTMLDivElement> {
  type: IconType;
  /**
   * `x * 4px`
   * */
  height?: number;
  className?: string;
}

/**
 * A reusable `Icon` component that renders an icon based on the provided type.
 *
 * @returns {JSX.Element} The rendered icon component.
 */
export function Icon({ height = 3, className, ...props }: IconProps): JSX.Element {
  return (
    <span
      data-testid="Icon"
      className={classNames('Icon', className, props.onClick && 'Icon--clickable')}
      {...props}
    >
      {createElement(IconList[props.type], { height })}
    </span>
  );
}
