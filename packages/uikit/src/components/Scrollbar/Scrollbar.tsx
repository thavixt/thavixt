import { PropsWithChildren, useImperativeHandle } from "react";
import { ScrollbarStyles, ScrollDirection, useScrollbar } from 'thavixt-scrollbar-react';
import { CommonProps } from "../../common/commonProps";

interface ScrollbarProps extends PropsWithChildren<CommonProps<HTMLDivElement>> {
  styles?: ScrollbarStyles;
  onScroll?: () => void;
  onScrollToEnd?: (direction: ScrollDirection[]) => void;
}

export function Scrollbar({ ref: providedRef, styles = {}, onScroll, onScrollToEnd, className, children }: ScrollbarProps) {
  const ref = useScrollbar<HTMLDivElement>({ styles, onScroll, onScrollToEnd });
  useImperativeHandle(providedRef, () => ref.current);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}