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

export function Loader({ type = 'TubeSpinner', height = 8, ...props }: LoaderProps) {
  return (
    <div data-testid="Loader" {...props}>
      {createElement(LoaderList[type], { height })}
    </div>
  );
}
