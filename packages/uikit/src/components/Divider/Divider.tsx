import classNames from "classnames";
import { CommonProps } from "../../common/commonProps";
import "./Divider.css";

export interface DividerProps extends CommonProps<HTMLDivElement> {
  unicorn?: boolean;
  small?: boolean;
  vertical?: boolean;
}

export function Divider({ className, ref, small, unicorn, vertical, ...props }: DividerProps) {
  const classes = classNames(
    'Divider',
    vertical && 'Divider--vertical',
    !vertical && 'Divider--horizontal',
    small && 'Divider--small',
    unicorn && 'Divider--unicorn',
    className,
  );

  return <div
    data-testid="Divider"
    role="separator"
    ref={ref}
    className={classes}
    {...props}
  />;
}