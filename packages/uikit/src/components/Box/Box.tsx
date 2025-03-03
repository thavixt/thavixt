import classNames from "classnames";
import { Children, HTMLAttributes, PropsWithChildren, ReactElement } from "react";

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

export function Box({ type = 'card', className, children, size = 'full' }: BoxProps) {
  const slots = Children.toArray(children) as ReactElement[];
  const header = slots.filter((child) => child.type === Header);
  const content = slots.filter((child) => child.type === Content);
  const footer = slots.filter((child) => child.type === Footer);

  return (
    <div className={classNames(className, BoxStyles[type], getSizeClasses(size))}>
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
    <div className={classNames('flex justify-end px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-b-md', className)}>
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
      return 'w-fit max-w-sm';
    case 'md':
      return 'w-fit max-w-lg';
    case 'lg':
      return 'w-fit max-w-2xl';
    case 'full':
    default:
      return 'w-full';
  }
}