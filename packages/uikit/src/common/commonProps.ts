import { PropsWithChildren, RefObject } from "react";

export type CommonProps<T = HTMLDivElement> = PropsWithChildren<{
  className?: string;
  ref?: RefObject<T | null>;
}>;
