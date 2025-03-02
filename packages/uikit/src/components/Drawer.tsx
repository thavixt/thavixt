import classNames from "classnames";
import { useState, ReactElement, useRef } from "react";
import { CommonProps } from "../common/commonProps";
import { themedBackgroundClasses } from "../common/theme";

export interface DrawerProps extends CommonProps<HTMLDivElement> {
  defaultVisible?: boolean;
  /** Contents of the drawer */
  content?: (isOpen: boolean, toggle: () => void, side: Side) => ReactElement;
  /** Contents of the target element that can toggle the drawer. If omitted, the drawer will be visible permanently */
  children?: (isOpen: boolean, toggle: () => void, side: Side) => ReactElement;
  /** Side to show the drawer from */
  side: Side;
}

type Side = 'top' | 'bottom' | 'left' | 'right';

export function Drawer({children, content, defaultVisible, className, ref, side}: DrawerProps) {
  const initialVisible = useRef(defaultVisible || (children ? false : true));
  const [isOpen, setIsOpen] = useState(initialVisible.current);
  const drawerClasses = classNames(
    className,
    themedBackgroundClasses,
    'overflow-hidden border-2 shadow-lg',
    'fixed',
    'transition-all duration-500',
    {
      'h-fit w-2/3 left-1/7': side === 'top' || side === 'bottom',
      'h-2/3 w-fit top-1/7': side === 'left' || side === 'right',
    },
    {
      'rounded-none rounded-b-lg': side === 'top',
      'rounded-none rounded-t-lg': side === 'bottom',
      'rounded-none rounded-r-lg': side === 'left',
      'rounded-none rounded-l-lg': side === 'right',
    },
    {
      '-top-full': side === 'top' && !isOpen,
      'top-0': side === 'top' && isOpen,
    },
    {
      '-bottom-full': side === 'bottom' && !isOpen,
      'bottom-0': side === 'bottom' && isOpen,
    },
    {
      '-left-full': side === 'left' && !isOpen,
      'left-0': side === 'left' && isOpen,
    },
    {
      '-right-full': side === 'right' && !isOpen,
      'right-0': side === 'right' && isOpen,
    },
  );

  const toggleOpen = () => setIsOpen(prev => !prev);

  return (
    <>
      {children ? children(isOpen, toggleOpen, side) : null}
      <div ref={ref} className={drawerClasses}>
        <div className="px-2 py-4 overflow-auto h-full">
          {typeof content === 'function' ? content(isOpen, toggleOpen, side) : content}
        </div>
      </div>
    </>
  )
}