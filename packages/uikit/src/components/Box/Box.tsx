import classNames from "classnames";
import { HTMLAttributes, PropsWithChildren } from "react";
import { getSlotElements } from "../../common/utils";
import "./Box.css";

type Size = 'sm' | 'md' | 'lg' | 'full';

export type BoxProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  className?: string;
  size?: Size;
  type?: 'card' | 'paper';
};

export function Box({ type = 'card', className, children, size = 'sm', ...props }: BoxProps) {
  const header = getSlotElements(children, Box.Header)[0];
  const content = getSlotElements(children, Box.Content)[0];
  const footer = getSlotElements(children, Box.Footer)[0];

  return (
    <div
      data-testid="Box"
      className={classNames(
        "Box",
        type === "card" ? 'Box--card' : 'Box--paper',
        className,
        {
          'Box--sm': size === 'sm',
          'Box--md': size === 'md',
          'Box--lg': size === 'lg',
          'Box--full': size === 'full',
        }
      )}
      {...props}
    >
      {header}
      {content}
      {footer}
    </div>
  )
}

Box.Header = function Header({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={classNames('Box__Header', className)}>
      {children}
    </div>
  );
};

Box.Content = function Content({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={classNames('Box__Content', className)}>
      {children}
    </div>
  );
};

Box.Footer = function Footer({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={classNames('Box__Footer', className)}>
      {children}
    </div>
  );
};
