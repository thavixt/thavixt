import { createElement, HTMLAttributes, JSX } from "react";
import { LoaderType, LoaderList } from "./LoaderList";
import classNames from "classnames";
import "./Loader.css";

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  type?: LoaderType;
  /**
   * `x * 4px`
   * */
  height?: number;
  className?: string;
}

/**
 * A functional React component that renders an animated loader element.
 *
 * @returns {JSX.Element} The rendered loader component.
 */
export function Loader({ type = 'TubeSpinner', height = 8, className, ...props }: LoaderProps): JSX.Element {
  return (
    <div data-testid="Loader" className={classNames('Loader', className)} {...props}>
      {createElement(LoaderList[type], { height })}
    </div>
  );
}
