import classNames from "classnames";
import { HTMLAttributes, PropsWithChildren, RefObject } from "react";
import "./Typography.css";

export type TypographyProps<T = HTMLElement> = PropsWithChildren<HTMLAttributes<T>> & {
  className?: string;
  ref?: RefObject<T | null>;
};

export type TypographyType = 'H1' | 'H2' | 'Title' | 'Subtitle' | 'Caption' | 'Body' | 'Button' | 'Code' | 'Text' | 'Label';


export const Typography = {
  H1: function ({ children, className, ...props }: TypographyProps<HTMLHeadingElement>) {
    return <h1 {...props} className={classNames('Typography Typography__H1', className)}>
      {children}
    </h1>
  },
  H2: function ({ children, className, ...props }: TypographyProps<HTMLHeadingElement>) {
    return <h2 {...props} className={classNames('Typography Typography__H2', className)}>
      {children}
    </h2>
  },
  Title: function ({ children, className, ...props }: TypographyProps<HTMLHeadingElement>) {
    return <h4 {...props} className={classNames('Typography Typography__Title', className)}>
      {children}
    </h4>
  },
  Subtitle: function ({ children, className, ...props }: TypographyProps<HTMLHeadingElement>) {
    return <h5 {...props} className={classNames('Typography Typography__Subtitle', className)}>
      {children}
    </h5>
  },
  Caption: function ({ children, className, ...props }: TypographyProps<HTMLSpanElement>) {
    return <span {...props} className={classNames('Typography Typography__Caption', className)}>
      {children}
    </span>
  },
  Body: function ({ children, className, ...props }: TypographyProps<HTMLDivElement>) {
    return <div {...props} className={classNames('Typography Typography__Body', className)}>
      {children}
    </div>
  },
  Text: function ({ children, className, ...props }: TypographyProps<HTMLSpanElement>) {
    return <span {...props} className={classNames('Typography Typography__Text', className)}>
      {children}
    </span>
  },
  Label: function ({ children, className, ...props }: TypographyProps<HTMLSpanElement>) {
    return <span {...props} className={classNames('Typography Typography__Label', className)}>
      {children}
    </span>
  },
  Button: function ({ children, className, ...props }: TypographyProps<HTMLSpanElement>) {
    return <span {...props} className={classNames('Typography Typography__Button', className)}>
      {children}
    </span>
  },
  Code: function ({ children, className, ...props }: TypographyProps<HTMLSpanElement>) {
    return <code {...props} className={classNames('Typography Typography__Code', className)}>
      {children}
    </code>
  },
}