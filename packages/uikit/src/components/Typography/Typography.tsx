import classNames from "classnames";
import { HTMLAttributes, PropsWithChildren } from "react";

type TypographyProps<T = HTMLElement> = PropsWithChildren<HTMLAttributes<T>> & {
  className?: string;
};

export type TypographyType = 'H1' | 'H2' | 'Title' | 'Subtitle' | 'Caption' | 'Body' | 'Button' | 'Code' | 'Text' | 'Label';

export const TypographyStyles: Record<TypographyType, string> = {
  H1: classNames('themedText block font-serif text-4xl font-bold tracking-wide capitalize leading-20 first-letter:text-6xl'),
  H2: classNames('themedText block font-serif text-3xl font-bold tracking-wide capitalize leading-12 first-letter:text-5xl'),
  Title: classNames('themedText block font-sans text-2xl font-semibold leading-16'),
  Subtitle: classNames('themedText block font-sans text-lg font-semibold leading-14'),
  Caption: classNames('themedText block font-sans text-lg font-thin leading-12'),
  Body: classNames('themedText block font-sans text-base text-pretty leading-6 pb-2'),
  Text: classNames('themedText inline font-sans text-pretty'),
  Label: classNames('themedText inline font-sans text-normal font-light leading-6'),
  Button: 'inline font-sans text-sm font-semibold',
  Code: 'inline font-mono bg-slate-600 dark:bg-slate-300 text-slate-100 dark:text-slate-800 px-1 py-0.5 rounded text-base',
}

export const Typography = {
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
  Caption: function ({ children, className, ...props }: TypographyProps<HTMLSpanElement>) {
    return <span {...props} className={classNames(className, TypographyStyles.Caption)}>{children}</span>
  },
  Body: function ({ children, className, ...props }: TypographyProps<HTMLDivElement>) {
    return <div {...props} className={classNames(className, TypographyStyles.Body)}>{children}</div>
  },
  Text: function ({ children, className, ...props }: TypographyProps<HTMLSpanElement>) {
    return <span {...props} className={classNames(className, TypographyStyles.Text)}>{children}</span>
  },
  Label: function ({ children, className, ...props }: TypographyProps<HTMLSpanElement>) {
    return <span {...props} className={classNames(className, TypographyStyles.Label)}>{children}</span>
  },
  Button: function ({ children, className, ...props }: TypographyProps<HTMLSpanElement>) {
    return <span {...props} className={classNames(className, TypographyStyles.Button)}>{children}</span>
  },
  Code: function ({ children, className, ...props }: TypographyProps<HTMLSpanElement>) {
    return <code {...props} className={classNames(className, TypographyStyles.Code)}>{children}</code>
  },
}