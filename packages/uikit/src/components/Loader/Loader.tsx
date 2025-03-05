import { createElement } from "react";
import { LoaderType, LoaderList } from "./LoaderList";

export interface LoaderProps {
  type?: LoaderType;
  /**
   * `x * 4` (tailwind scale)
   * */
  height?: number;
  className?: string;
}

export function Loader({ type = 'TubeSpinner', ...props }: LoaderProps) {
  return (
    <div data-testid="Loader" className={props.className}>
      {createElement(LoaderList[type], { height: props.height })}
    </div>
  );
}
