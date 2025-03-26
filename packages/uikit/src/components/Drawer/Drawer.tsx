import classNames from "classnames";
import { useState, ReactElement } from "react";
import { CommonProps } from "../../common/commonProps";
import { themedBackgroundClasses } from "../../common/theme";
import { ClickTarget } from "../ClickTarget/ClickTarget";

export interface DrawerProps extends Omit<CommonProps<HTMLDivElement>, 'content' | 'children'> {
  /** Contents of the drawer */
  content?: (close: () => void, side: Side) => ReactElement;
  /** Contents of the target element that can toggle the drawer. If omitted, the drawer will be visible permanently */
  children?: (isOpen: boolean, close: () => void, side: Side) => ReactElement;
  /** Default open */
  defaultOpen?: boolean;
  /** Side to show the drawer from */
  side: Side;
  /** Close drawer on backdrop click */
  closeOnBackdrop?: boolean;
}

type Side = 'left' | 'right';

export function Drawer({
  className,
  closeOnBackdrop = true,
  defaultOpen,
  ref,
  side,
  children,
  content,
}: DrawerProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen || (children ? false : true));

  const drawerContainerClasses = classNames(
    'fixed top-0 h-full flex items-center justify-center z-2000',
    'transition-all duration-350 ease-in-out',
    {
      '-right-full': side === 'right' && !isOpen,
      'right-0': side === 'right' && isOpen,
      '-left-full': side === 'left' && !isOpen,
      'left-0': side === 'left' && isOpen,
    },
  );
  const drawerClasses = classNames(
    'max-h-screen flex flex-col justify-center overflow-y-hidden',
    'px-6 py-8 h-full min-h-0',
    {
      'rounded-none rounded-l-lg': side === 'right',
      'rounded-none rounded-r-lg': side === 'left',
    },
    className,
    themedBackgroundClasses,
  );
  const backdropClasses = classNames(
    'fixed top-0 left-0 size-full bg-black transition-opacity z-1999 pointer-events-none',
    {
      'opacity-25': isOpen,
      'opacity-0': !isOpen,
    },
  );

  const toggleOpen = () => setIsOpen(prev => !prev);
  const onClickOutside = () => {
    if (closeOnBackdrop) {
      setIsOpen(false);
    }
  }

  return (
    <>
      {children ? children(isOpen, toggleOpen, side) : null}
      {closeOnBackdrop ? (
        <div data-testid="DrawerBackdrop" className={backdropClasses} >Backdrop</div>
      ) : null}
      <ClickTarget onClickOutside={onClickOutside}>
        <div data-testid="Drawer" ref={ref} className={drawerContainerClasses}>
          <div className={drawerClasses}>
            {typeof content === 'function' ? content(toggleOpen, side) : content}
          </div>
        </div>
      </ClickTarget>
    </>
  )
}