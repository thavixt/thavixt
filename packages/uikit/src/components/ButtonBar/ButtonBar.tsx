import classNames from "classnames";
import { PropsWithChildren } from "react";
import "./ButtonBar.css";

interface ButtonBarProps extends PropsWithChildren {
  full?: boolean;
  className?: string;
}

export function ButtonBar({ children, className, full }: ButtonBarProps) {
  return (
    <div
      data-testid="ButtonBar"
      className={classNames('ButtonBar', className, full && 'ButtonBar--full')}
    >
      {children}
    </div>
  )
}