import { PropsWithChildren, useImperativeHandle } from "react";
import { ScrollbarStyles, ScrollDirection, useScrollbar } from 'thavixt-scrollbar-react';
import { CommonProps } from "../common/commonProps";

interface ScrollbarProps extends PropsWithChildren<CommonProps<HTMLDivElement>> {
  styles?: ScrollbarStyles;
  onScroll?: () => void;
  onScrollToEnd?: (direction: ScrollDirection[]) => void;
}

export const DEFAULT_SCROLLBAR_STYLES: ScrollbarStyles = {
  thumbColor: '#888',
  thumbColorDark: '#FFF',
  trackColor: '#DDD',
  trackColorDark: '#555',
}

export function Scrollbar({ ref: providedRef, styles = {}, onScroll, onScrollToEnd, className, children }: ScrollbarProps) {
  const ref = useScrollbar<HTMLDivElement>({ styles: { ...DEFAULT_SCROLLBAR_STYLES, ...styles }, onScroll, onScrollToEnd });
  useImperativeHandle(providedRef, () => ref.current);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}