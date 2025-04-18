import classNames from "classnames";
import { createContext, createElement, HTMLAttributes, PropsWithChildren, ReactNode, RefObject, useContext, useState } from "react";
import { Icon } from "../Icon/Icon";
import { ButtonProps } from "../Button/Button";
import { getSlotElements } from "../../common/utils";
import { Typography } from "../Typography/Typography";
import "./Popover.css";

interface PopoverContextProps {
  onClick?: (id: string) => void;
}

const PopoverContext = createContext<PopoverContextProps>({ onClick: undefined })

type PopoverPosition = 'left' | 'right' | 'top' | 'bottom';

export interface PopoverProps extends Omit<ButtonProps, 'ref' | 'position' | 'onClick'> {
  className?: string;
  ref?: RefObject<HTMLDivElement>;
  target: ReactNode;
  position?: PopoverPosition;
  onClick?: (key: string) => void;
}

export function Popover({
  id = 'root',
  ref,
  children,
  className,
  target,
  position = "right",
  onClick: providedOnClick,
   ...buttonProps
}: PropsWithChildren<PopoverProps>) {
  const context = useContext(PopoverContext);
  const onClick = providedOnClick ?? context.onClick;
  const [popoverTarget] = useState(crypto.randomUUID().slice(0, 6));
  const classes = classNames(
    "Popover", className,
    position === 'top' && 'Popover--top',
    position === 'bottom' && 'Popover--bottom',
    position === 'left' && 'Popover--left',
    position === 'right' && 'Popover--right',
  );
  const items = getSlotElements(children, PopoverItem);

  const content = (
    <>
      <button
        className="Popover__toggle"
        popoverTarget={popoverTarget}
        popoverTargetAction="toggle"
        data-testid={`Popover-${id}`}
        {...buttonProps}
      >
        {typeof target === "string" ? (
          <Typography.Label>{target}</Typography.Label>
        ) : (
          target
        )}
        {context.onClick ? <Icon className="Popover__icon" type="Caret" height={2} /> : null}
      </button>
      <div
        ref={ref}
        data-testid="Popover"
        className={classes}
        id={popoverTarget}
        popover="auto"
      >
        <div className="Popover__items">
          {items.map(item => (
            <div key={item.props.id} className="Popover__item">
              {createElement(item.type, { ...item.props, onClick })}
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <PopoverContext.Provider value={{ onClick }}>
      {content}
    </PopoverContext.Provider>
  )
}

interface PopoverItemProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  id: string;
  children: ReactNode;
}

function PopoverItem({ children, id, ...props }: PopoverItemProps) {
  const context = useContext(PopoverContext);
  const onClick: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    e.stopPropagation();
    context.onClick?.(id);
  }

  return (
    <Typography.Label
      data-testid={`PopoverItem-${id}`}
      {...props}
      key={id}
      id={id}
      onClick={onClick}
    >
      {children}
    </Typography.Label>
  );
}

Popover.Item = PopoverItem;

interface PopoverSubMenu extends PopoverProps {
  id: string;
}

function PopoverSubMenu({id, ...props}: PopoverSubMenu) {
  return <Popover id={id} data-testid={`PopoverSubmenu-${id}`} {...props} />
}

Popover.SubMenu = PopoverSubMenu;
