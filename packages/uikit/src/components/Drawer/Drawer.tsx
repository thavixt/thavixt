import classNames from "classnames";
import { useState, ReactElement, useRef } from "react";
import { CommonProps } from "../../common/commonProps";
import { themedBackgroundClasses } from "../../common/theme";
import { Scrollbar } from "../Scrollbar/Scrollbar";
import { ClickTarget } from "../ClickTarget/ClickTarget";

export interface DrawerProps extends Omit<CommonProps<HTMLDivElement>, 'content' | 'children'> {
  defaultVisible?: boolean;
  /** Contents of the drawer */
  content?: (isOpen: boolean, toggle: () => void, side: Side) => ReactElement;
  /** Contents of the target element that can toggle the drawer. If omitted, the drawer will be visible permanently */
  children?: (isOpen: boolean, toggle: () => void, side: Side) => ReactElement;
  /** Side to show the drawer from */
  side: Side;
  full?: boolean;
  closeOnClickOutside?: boolean;
}

type Side = 'top' | 'right' | 'bottom' | 'left';

export function Drawer({ children, content, defaultVisible, className, ref, side, full, closeOnClickOutside }: DrawerProps) {
  const initialVisible = useRef(defaultVisible || (children ? false : true));
  const [isOpen, setIsOpen] = useState(initialVisible.current);
  const drawerContainerClasses = classNames(
    'flex items-center justify-center',
    'fixed overflow-hidden',
    'transition-all duration-500',
    {
      'left-0 w-full': side === 'top' || side === 'bottom',
      'top-0 h-full': side === 'left' || side === 'right',
    },
    {
      '-top-full': side === 'top' && !isOpen,
      'top-0': side === 'top' && isOpen,
    },
    {
      '-right-full': side === 'right' && !isOpen,
      'right-0': side === 'right' && isOpen,
    },
    {
      '-bottom-full': side === 'bottom' && !isOpen,
      'bottom-0': side === 'bottom' && isOpen,
    },
    {
      '-left-full': side === 'left' && !isOpen,
      'left-0': side === 'left' && isOpen,
    },
  );
  const drawerClasses = classNames(
    'px-2 py-4 overflow-auto',
    {
      'max-w-screen flex justify-center': side === 'top' || side === 'bottom',
      'max-h-screen flex flex-col justify-center': side === 'left' || side === 'right',
    },
    {
      'size-full': full,
      'size-fit': !full,
    },
    {
      'rounded-none rounded-b-lg': side === 'top',
      'rounded-none rounded-l-lg': side === 'right',
      'rounded-none rounded-t-lg': side === 'bottom',
      'rounded-none rounded-r-lg': side === 'left',
    },
    className,
    themedBackgroundClasses,
  );
  const backdropClasses = classNames(
    'fixed top-0 left-0 size-full bg-black transition-opacity',
    {
      'opacity-50': isOpen,
      'opacity-0 pointer-events-none': !isOpen,
    },
  );

  const toggleOpen = () => setIsOpen(prev => !prev);
  const onClickOutside = () => {
    if (closeOnClickOutside) {
      setIsOpen(false);
    }
  }

  return (
    <>
      {children ? children(isOpen, toggleOpen, side) : null}
      {closeOnClickOutside ? (
        <div className={backdropClasses} />
      ) : null}
      <ClickTarget onClickOutside={onClickOutside}>
        <div data-testid="Drawer" ref={ref} className={drawerContainerClasses}>
          <Scrollbar className={drawerClasses}>
            {typeof content === 'function' ? content(isOpen, toggleOpen, side) : content}
          </Scrollbar>
        </div>
      </ClickTarget>
    </>
  )
}