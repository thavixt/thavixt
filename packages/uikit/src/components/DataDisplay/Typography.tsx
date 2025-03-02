import classNames from "classnames";
import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

type TypographyProps<T = HTMLElement> = PropsWithChildren<HTMLAttributes<T>> & {
  className?: string;
};

export type TypographyType = 'H1' | 'H2' | 'Title' | 'Subtitle' | 'Caption' | 'Body' | 'Button' | 'Code';

const commonStyles = 'text-slate-800 dark:text-slate-200';

export const TypographyStyles: Record<TypographyType, string> = {
  H1: classNames(commonStyles, 'font-serif text-4xl font-bold tracking-wide capitalize leading-20'),
  H2: classNames(commonStyles, 'font-sans text-3xl font-bold tracking-wide capitalize leading-12'),
  Title: classNames(commonStyles, 'font-sans text-3xl font-semibold leading-12'),
  Subtitle: classNames(commonStyles, 'font-sans text-xl font-semibold leading-12'),
  Caption: classNames(commonStyles, 'font-sans text-lg font-thin leading-10 mt-2'),
  Body: classNames(commonStyles, 'font-sans text-base text-pretty mb-2'),
  Button: 'font-sans text-sm font-semibold uppercase',
  Code: 'font-mono bg-slate-600 dark:bg-slate-300 text-slate-100 dark:text-slate-800 px-1 inline rounded text-base',
}

export const Typography: Record<TypographyType, ({ children, className, ...props }: TypographyProps<HTMLElement>) => ReactNode> = {
  /* titles */
  H1: function ({ children, className, ...props }: TypographyProps<HTMLHeadingElement>) {
    return <h1 {...props} className={classNames(className, TypographyStyles.H1)}>{children}</h1>
  },
  H2: function ({ children, className, ...props }: TypographyProps<HTMLHeadingElement>) {
    return <h2 {...props} className={classNames(className, TypographyStyles.H2)}>{children}</h2>
  },
  Title: function ({ children, className, ...props }: TypographyProps<HTMLHeadingElement>) {
    return <h4 {...props} className={classNames(className, TypographyStyles.Title)}>{children}</h4>
  },
  Subtitle: function ({ children, className, ...props }: TypographyProps<HTMLHeadingElement>) {
    return <h5 {...props} className={classNames(className, TypographyStyles.Subtitle)}>{children}</h5>
  },
  /* misc text */
  Caption: function ({ children, className, ...props }: TypographyProps<HTMLSpanElement>) {
    return <span {...props} className={classNames(className, TypographyStyles.Caption)}>{children}</span>
  },
  Body: function ({ children, className, ...props }: TypographyProps<HTMLDivElement>) {
    return <div {...props} className={classNames(className, TypographyStyles.Body)}>{children}</div>
  },
  Button: function ({ children, className, ...props }: TypographyProps<HTMLSpanElement>) {
    return <span {...props} className={classNames(className, TypographyStyles.Button)}>{children}</span>
  },
  Code: function ({ children, className, ...props }: TypographyProps<HTMLSpanElement>) {
    return <span>
      <code {...props} className={classNames(className, TypographyStyles.Code)}>{children}</code>
    </span>
  },
}