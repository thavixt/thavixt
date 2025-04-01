import classNames from "classnames";
import { PropsWithChildren } from "react";
import "./ButtonBar.css";

interface ButtonBarProps extends PropsWithChildren {
  full?: boolean;
}

export function ButtonBar({ children, full }: ButtonBarProps) {
  return (
    <div
      data-testid="ButtonBar"
      className={classNames('ButtonBar', full && 'ButtonBar--full')}
    >
      {children}
    </div>
  )
}