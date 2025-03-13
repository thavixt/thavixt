import classNames from "classnames";
import { HTMLAttributes, PropsWithChildren } from "react";
import { getSlotElements } from "../../common/utils";

const commonStyles = 'flex flex-col w-fit rounded-lg';
const BoxStyles: Record<BoxType, string> = {
  card: classNames(commonStyles, 'shadow-md bg-slate-50 dark:bg-gray-700'),
  paper: classNames(commonStyles, 'bg-slate-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600'),
}

type Size = 'sm' | 'md' | 'lg' | 'full';

export type BoxType = 'card' | 'paper';
export type BoxProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  className?: string;
  size?: Size;
  type?: 'card' | 'paper';
};

export function Box({ type = 'card', className, children, size = 'md', ...props }: BoxProps) {
  const header = getSlotElements(children, Header)[0];
  const content = getSlotElements(children, Content)[0];
  const footer = getSlotElements(children, Footer)[0];

  return (
    <div data-testid="Box" className={classNames(className, BoxStyles[type], getSizeClasses(size))} {...props}>
      {header}
      {content}
      {footer}
    </div>
  )
}

function Header({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={classNames('px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-t-md', className)}>
      {children}
    </div>
  );
}

function Content({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={classNames('px-4 pt-2 pb-4', className)}>
      {children}
    </div>
  );
}

function Footer({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={classNames('flex justify-between px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-b-md', className)}>
      {children}
    </div>
  );
}

Box.Header = Header;
Box.Content = Content;
Box.Footer = Footer;

function getSizeClasses(size: Size = 'full') {
  switch (size) {
    case 'sm':
      return 'max-w-sm';
    case 'md':
      return 'max-w-lg';
    case 'lg':
      return 'max-w-2xl';
    case 'full':
    default:
      return 'w-full';
  }
}