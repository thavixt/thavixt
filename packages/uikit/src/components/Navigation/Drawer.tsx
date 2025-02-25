import classNames from "classnames";
import { useState, ReactElement, useRef } from "react";
import { CommonProps } from "../../common/commonProps";
import { themedBackgroundClasses } from "../../common/theme";

export interface DrawerProps extends CommonProps<HTMLDivElement> {
  defaultVisible?: boolean;
  /** Contents of the drawer */
  content?: (isOpen: boolean, toggle: () => void) => ReactElement;
  /** Contents of the target element that can toggle the drawer. If omitted, the drawer will be visible permanently */
  children?: (isOpen: boolean, toggle: () => void) => ReactElement;
}

export function Drawer({children, content, defaultVisible, className, ref}: DrawerProps) {
  const initialVisible = useRef(defaultVisible || (children ? false : true));
  const [isOpen, setIsOpen] = useState(initialVisible.current);
  const drawerClasses = classNames(
    className,
    themedBackgroundClasses,
    'overflow-auto',
    'border-2 rounded-l-none rounded-r-xl shadow-lg',
    'px-2 py-4 fixed top-0 h-full w-fit',
    'transition-all duration-500',
    {
      '-left-100': !isOpen,
      'left-0': isOpen,
    }
  );

  const toggleOpen = () => setIsOpen(prev => !prev);

  return (
    <>
      {children ? children(isOpen, toggleOpen) : null}
      <div ref={ref} className={drawerClasses}>
        {typeof content === 'function' ? content(isOpen, toggleOpen) : content}
      </div>
    </>
  )
}