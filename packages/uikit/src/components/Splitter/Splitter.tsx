import { PropsWithChildren, ReactElement, useEffect, useRef, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import classNames from "classnames";

export interface SplitterProps extends PropsWithChildren<CommonProps<HTMLDivElement>> {
  /** Splitter panel elements (max 2) */
  children: ReactElement[];
  /** Classes for the divider element */
  className?: string;
  /** Vertical layout */
  vertical?: boolean;
  /** Split the two children at the specified ratio */
  split?: number;
  /** Collapse when reaching the specified ratio */
  collapse?: number;
};

export function Splitter({ children, className, vertical, split = 50, collapse }: SplitterProps) {
  const splitterRef = useRef<HTMLDivElement>(null);
  const [leftWidth, setLeftWidth] = useState<number>(split);
  const [topHeight, setTopHeight] = useState<number>(split);

  useEffect(() => {
    setLeftWidth(split);
    setTopHeight(split);
  }, [split]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!splitterRef.current) {
      return;
    }
    const container = splitterRef.current.parentElement;
    if (!container) {
      return;
    }

    if (vertical) {
      const containerRect = container.getBoundingClientRect();
      const containerHeight = containerRect.height;
      const offsetY = e.clientY - containerRect.top;
      let newTopHeight = (offsetY / containerHeight) * 100;
      if (collapse) {
        if (newTopHeight <= collapse) {
          newTopHeight = 0;
        } else if (newTopHeight >= 100 - collapse) {
          newTopHeight = 100;
        }
      }
      setTopHeight(Math.max(0, Math.min(100, newTopHeight)));
      return;
    }

    if (container) {
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const offsetX = e.clientX - containerRect.left;
      let newLeftWidth = (offsetX / containerWidth) * 100;
      if (collapse) {
        if (newLeftWidth <= collapse) {
          newLeftWidth = 0;
        } else if (newLeftWidth >= 100 - collapse) {
          newLeftWidth = 100;
        }
      }
      setLeftWidth(Math.max(0, Math.min(100, newLeftWidth)));
    }
  };

  const containerClasses = classNames(
    'size-full',
    {
      'flex flex-col': vertical,
      'flex': !vertical,
    },
  );
  const dividerClasses = classNames(
    'border-2 border-slate-500',
    {
      'h-1 cursor-row-resize': vertical,
      'w-1 cursor-col-resize': !vertical,
    },
    className,
  )
  const panelClasses = classNames(
    'size-fit overflow-hidden',
    // 'min-w-[100px]',
  );

  if (children.length < 2) {
    console.warn('Too many children for <Splitter>');
  }
  if (children.length > 2) {
    console.warn('Not enough children for <Splitter>');
  }

  return (
    <div
      ref={splitterRef}
      className={containerClasses}
    >
      <div
        className={panelClasses}
        style={{
          height: vertical ? `${topHeight}%` : 'initial',
          width: vertical ? 'initial' : `${leftWidth}%`,
        }}
      >
        {children[0] ?? <div/>}
      </div>
      <div className={dividerClasses} onMouseDown={handleMouseDown} />
      <div
        className={panelClasses}
        style={{
          height: vertical ? `${100 - topHeight}%` : 'initial',
          width: vertical ? 'initial' : `${100 - leftWidth}%`,
        }}
      >
        {children[1] ?? <div/>}
      </div>
    </div>
  );
}
