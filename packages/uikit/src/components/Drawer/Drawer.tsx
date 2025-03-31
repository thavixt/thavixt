import classNames from "classnames";
import { useState, ReactElement, useEffect } from "react";
import { CommonProps } from "../../common/commonProps";
import { ClickTarget } from "../ClickTarget/ClickTarget";

export interface DrawerProps extends Omit<CommonProps<HTMLDivElement>, 'content' | 'children'> {
  /** The target element that can toggle the drawer. If omitted, the drawer will be visible permanently */
  target?: (isOpen: boolean, close: () => void, side: Side) => ReactElement;
  /** Contents of the drawer */
  children?: (close: () => void, side: Side) => ReactElement;
  /** Default open */
  defaultOpen?: boolean;
  /** Side to show the drawer from */
  side: Side;
  /** Close drawer on backdrop click */
  closeOnBackdrop?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

type Side = 'left' | 'right';

export function Drawer({
  className,
  closeOnBackdrop = true,
  defaultOpen,
  ref,
  side = 'right',
  children,
  target,
  onOpen,
  onClose,
}: DrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (defaultOpen) {
      setIsOpen(true);
    }
  }, [defaultOpen]);

  useEffect(() => {
    if (isOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [isOpen, onClose, onOpen]);

  const drawerClasses = classNames(
    'themedBackground',
    'h-full flex flex-col justify-center ',
    'fixed top-0 p-4 my-auto z-2000',
    'transition-all duration-350 ease-in-out',
    {
      'opacity-100': isOpen,
      'opacity-0': !isOpen,
      '-right-full': side === 'right' && !isOpen,
      'right-0': side === 'right' && isOpen,
      '-left-full': side === 'left' && !isOpen,
      'left-0': side === 'left' && isOpen,
    },
    {
      'rounded-none rounded-l-lg': side === 'right',
      'rounded-none rounded-r-lg': side === 'left',
    },
    className,
  );
  const backdropClasses = classNames(
    'fixed top-0 left-0 size-full bg-black transition-opacity z-1999 pointer-events-none',
    {
      'opacity-50': isOpen,
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
    <div data-testid="DrawerContainer" className="overflow-hidden">
      {typeof target === 'function' ? target(isOpen, toggleOpen, side) : target}
      {closeOnBackdrop ? (
        <div data-testid="DrawerBackdrop" className={backdropClasses} />
      ) : null}
      <ClickTarget onClickOutside={onClickOutside}>
        <div data-testid="Drawer" ref={ref} className={drawerClasses}>
          {children ? children(toggleOpen, side) : null}
        </div>
      </ClickTarget>
    </div>
  )
}