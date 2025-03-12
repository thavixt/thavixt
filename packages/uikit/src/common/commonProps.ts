import { HTMLAttributes, RefObject } from "react";

export type CommonProps<T = HTMLDivElement> = HTMLAttributes<T> & {
  className?: string;
  ref?: RefObject<T | null>;
};
