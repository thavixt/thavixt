import { PropsWithChildren, useImperativeHandle } from "react";
import { ScrollbarStyles, ScrollDirection, useScrollbar } from '@thavixt/scrollbar-react';
import { CommonProps } from "../../common/commonProps";

interface ScrollbarProps extends PropsWithChildren<CommonProps<HTMLDivElement>> {
  styles?: ScrollbarStyles;
  onScroll?: () => void;
  onScrollToEnd?: (direction: ScrollDirection[]) => void;
}

const DEFAULT_SCROLLBAR_STYLES: ScrollbarStyles = {
  thumbColor: 'var(--gray)',
  trackColor: 'var(--white)',
  thumbColorDark: 'var(--gray-dark)',
  trackColorDark: 'var(--slate-dark)',
}

export function Scrollbar({ ref: providedRef, styles = {}, onScroll, onScrollToEnd, className, children }: ScrollbarProps) {
  const ref = useScrollbar<HTMLDivElement>({ styles: { ...DEFAULT_SCROLLBAR_STYLES, ...styles }, onScroll, onScrollToEnd });
  useImperativeHandle(providedRef, () => ref!.current);

  return (
    /* style={{scrollbarGutter: 'stable'}} */
    <div data-testid="Scrollbar" ref={ref} className={className}>
      {children}
    </div>
  )
}