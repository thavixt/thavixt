import classNames from "classnames";
import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

type BoxProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  className?: string;
  size?: Size;
};

export type BoxType = 'Card' | 'Paper';

const commonStyles = 'w-fit rounded-lg p-4';

export const BoxStyles: Record<BoxType, string> = {
  Card: classNames(commonStyles, 'shadow-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-gray-900'),
  Paper: classNames(commonStyles, 'border border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-700'),
}

export const Box: Record<BoxType, ({ children, className, ...props }: BoxProps) => ReactNode> = {
  Card: function ({ children, className, size = 'md', ...props }: BoxProps) {
    return <h1 {...props} className={classNames(className, BoxStyles.Card, getSizeClasses(size))}>{children}</h1>
  },
  Paper: function ({ children, className, size = 'md', ...props }: BoxProps) {
    return <h1 {...props} className={classNames(className, BoxStyles.Paper, getSizeClasses(size))}>{children}</h1>
  },
}

type Size = 'sm' | 'md' | 'lg';

function getSizeClasses(size: Size) {
  switch (size) {
    case 'lg':
      return 'max-w-lg';
    case 'md':
      return 'max-w-md';
    case 'sm':
      return 'max-w-md';
  }
}