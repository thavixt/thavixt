import { RefObject } from "react";

export type CommonProps<T = HTMLDivElement> = {
  className?: string;
  ref?: RefObject<T | null>;
};
