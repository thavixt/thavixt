import classNames from "classnames";
import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

type BoxProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  className?: string;
  size?: Size;
};

export type BoxType = 'Card' | 'Paper';

const commonStyles = 'flex flex-col w-fit rounded-lg p-4 border border-slate-200 dark:border-slate-600';

export const BoxStyles: Record<BoxType, string> = {
  Card: classNames(commonStyles, 'shadow-xl bg-white dark:bg-gray-900'),
  Paper: classNames(commonStyles, 'bg-slate-100 dark:bg-slate-800'),
}

export const Box: Record<BoxType, ({ children, className, ...props }: BoxProps) => ReactNode> = {
  Card: function ({ children, className, size, ...props }: BoxProps) {
    return <h1 {...props} className={classNames(className, BoxStyles.Card, getSizeClasses(size))}>{children}</h1>
  },
  Paper: function ({ children, className, size, ...props }: BoxProps) {
    return <h1 {...props} className={classNames(className, BoxStyles.Paper, getSizeClasses(size))}>{children}</h1>
  },
}

type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

function getSizeClasses(size?: Size) {
  switch (size) {
    case 'sm':
      return 'w-fit max-w-md';
    case 'md':
      return 'w-fit max-w-md';
    case 'lg':
      return 'w-fit max-w-lg';
    case 'xl':
      return 'w-fit max-w-xl';
    case '2xl':
      return 'w-fit max-w-2xl';
    default:
      return 'w-fit';
  }
}