import { PropsWithChildren } from "react";
import { ScrollbarStyles, ScrollDirection, useScrollbar } from 'thavixt-scrollbar-react';
import { CommonProps } from "../common/commonProps";

interface ScrollbarProps extends PropsWithChildren, CommonProps {
  styles?: ScrollbarStyles;
  onScroll?: () => void;
  onScrollToEnd?: (direction: ScrollDirection[]) => void;
}

export function Scrollbar({ styles = {}, onScroll, onScrollToEnd, ...props }: ScrollbarProps) {
  const ref = useScrollbar<HTMLDivElement>({ styles, onScroll, onScrollToEnd });

  return (
    <div ref={ref} className={props.className}>
      {props.children}
    </div>
  )
}