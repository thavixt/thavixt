import classNames from "classnames";
import { PropsWithChildren } from "react";
import { CommonProps } from "../../common/commonProps";
import "./Badge.css";

export interface BadgeProps extends PropsWithChildren<CommonProps<HTMLDivElement>> {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  inactive?: boolean;
};

export function Badge({ children, className, onClick, inactive, ref }: BadgeProps) {
  return (
    <div
      data-testid="Badge"
      ref={ref}
      className={classNames(
        "Badge",
        onClick && "Badge--clickable",
        inactive && "Badge--inactive",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}