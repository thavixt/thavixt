import { createElement } from "react";
import { LoaderType, LoaderList } from "./LoaderList";
import classNames from "classnames";
import "./Loader.css";

export interface LoaderProps {
  type?: LoaderType;
  /**
   * `x * 4` (tailwind scale)
   * */
  height?: number;
  className?: string;
}

export function Loader({ type = 'TubeSpinner', height = 8, className, ...props }: LoaderProps) {
  return (
    <div data-testid="Loader" className={classNames('Loader', className)} {...props}>
      {createElement(LoaderList[type], { height })}
    </div>
  );
}
