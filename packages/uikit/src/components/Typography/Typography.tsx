import classNames from "classnames";
import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

type TypographyProps<T = HTMLElement> = PropsWithChildren<HTMLAttributes<T>> & {
  className?: string;
};

export type TypographyType = 'H1' | 'H2' | 'Title' | 'Subtitle' | 'Caption' | 'Body' | 'Button' | 'Code' | 'Text';

const commonStyles = 'text-slate-600 dark:text-slate-300';

export const TypographyStyles: Record<TypographyType, string> = {
  H1: classNames(commonStyles, 'font-serif text-4xl font-bold tracking-wide capitalize leading-20'),
  H2: classNames(commonStyles, 'font-serif text-3xl font-bold tracking-wide capitalize leading-12'),
  Title: classNames(commonStyles, 'font-sans text-2xl font-semibold leading-12'),
  Subtitle: classNames(commonStyles, 'font-sans text-lg font-semibold leading-12'),
  Caption: classNames(commonStyles, 'font-sans text-lg font-thin leading-12'),
  Body: classNames(commonStyles, 'font-sans text-base text-pretty leading-6 pb-2'),
  Button: 'font-sans text-sm font-semibold uppercase',
  Code: 'font-mono bg-slate-600 dark:bg-slate-300 text-slate-100 dark:text-slate-800 px-1 inline rounded text-base',
  Text: classNames(commonStyles, 'font-sans text-thin text-pretty'),
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
  Text: function ({ children, className, ...props }: TypographyProps<HTMLSpanElement>) {
    return <span>
      <code {...props} className={classNames(className, TypographyStyles.Text)}>{children}</code>
    </span>
  },
}