import classNames from "classnames";
import { useState, ReactElement, useEffect } from "react";
import { CommonProps } from "../../common/commonProps";
import { ClickTarget } from "../ClickTarget/ClickTarget";
import "./Drawer.css";

export interface DrawerProps extends Omit<CommonProps<HTMLDivElement>, 'content' | 'children'> {
  /** Close drawer on backdrop click */
  closeOnBackdrop?: boolean;
  /** Default open */
  defaultOpen?: boolean;
  /** Disable scrolling while the drawer is open */
  disableScroll?: boolean;
  /** Side to show the drawer from */
  side: Side;
  /** Contents of the drawer */
  children?: (close: () => void, side: Side) => ReactElement;
  onOpen?: () => void;
  onClose?: () => void;
  /** The target element that can toggle the drawer. If omitted, the drawer will be visible permanently */
  target?: (isOpen: boolean, close: () => void, side: Side) => ReactElement;
}

type Side = 'left' | 'right';

export function Drawer({
  className,
  closeOnBackdrop = true,
  defaultOpen,
  disableScroll = false,
  ref,
  side = 'right',
  children,
  onClose,
  onOpen,
  target,
}: DrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (defaultOpen) {
      setIsOpen(true);
    }
  }, [defaultOpen]);

  useEffect(() => {
    if (!isOpen) {
      onClose?.();
      document.documentElement.classList.remove('Drawer--disableScroll');
      document.body.classList.remove('Drawer--disableScroll');
      return;
    }

    onOpen?.();
    if (disableScroll) {
      document.documentElement.classList.add('Drawer--disableScroll');
      document.body.classList.add('Drawer--disableScroll');
    }
  }, [disableScroll, isOpen, onClose, onOpen]);

  const toggleOpen = () => setIsOpen(prev => !prev);
  const onClickOutside = () => {
    if (closeOnBackdrop) {
      setIsOpen(false);
    }
  }

  const drawerClasses = classNames(
    'Drawer',
    isOpen && 'Drawer--open',
    side === 'right' && 'Drawer--right',
    side === 'left' && 'Drawer--left',
    className,
  );
  const drawerBackdropClasses = classNames(
    'Drawer__backdrop',
    isOpen && 'Drawer__backdrop--open',
  );

  return (
    <div data-testid="DrawerContainer">
      {typeof target === 'function' ? target(isOpen, toggleOpen, side) : target}
      {closeOnBackdrop ? (
        <div data-testid="DrawerBackdrop" className={drawerBackdropClasses} />
      ) : null}
      <ClickTarget onClickOutside={onClickOutside}>
        <div data-testid="Drawer" ref={ref} className={drawerClasses}>
          {children ? children(toggleOpen, side) : null}
        </div>
      </ClickTarget>
    </div>
  )
}