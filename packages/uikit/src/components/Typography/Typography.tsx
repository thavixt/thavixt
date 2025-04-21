import classNames from "classnames";
import { HTMLAttributes, PropsWithChildren, RefObject } from "react";
import "./Typography.css";

export type TypographyVariant =
  "h1" |
  "h2" |
  "title" |
  "subtitle" |
  "body" |
  "body2" |
  "text" |
  "label" |
  "button" |
  "code";

export type TypographyVariantProps = HTMLAttributes<HTMLElement> & {
  className?: string;
  type: TypographyVariant;
} & (
    ({ type: 'h1' } & HTMLAttributes<HTMLHeadElement>) |
    ({ type: 'h2' } & HTMLAttributes<HTMLHeadElement>) |
    ({ type: 'title' } & HTMLAttributes<HTMLHeadElement>) |
    ({ type: 'subtitle' } & HTMLAttributes<HTMLHeadElement>) |
    ({ type: 'body' } & HTMLAttributes<HTMLParagraphElement>) |
    ({ type: 'body2' } & HTMLAttributes<HTMLParagraphElement>) |
    ({ type: 'text' } & HTMLAttributes<HTMLSpanElement>) |
    ({ type: 'label' } & HTMLAttributes<HTMLLabelElement>) |
    ({ type: 'button' } & HTMLAttributes<HTMLSpanElement>) |
    ({ type: 'code' } & HTMLAttributes<HTMLDivElement>)
  )

export function T({
  className,
  children,
  type: t,
  ...props
}: PropsWithChildren<TypographyVariantProps>) {
  const classes = classNames(
    'Typography',
    t === 'h1' && 'Typography__H1',
    t === 'h2' && 'Typography__H2',
    t === 'title' && 'Typography__Title',
    t === 'subtitle' && 'Typography__Subtitle',
    t === 'body' && 'Typography__Body',
    t === 'body2' && 'Typography__Body2',
    t === 'text' && 'Typography__Text',
    t === 'label' && 'Typography__Label',
    t === 'button' && 'Typography__Button',
    t === 'code' && 'Typography__Code',
    className,
  );

  if (t === 'h1') {
    return <h1 className={classes} {...(props as HTMLAttributes<HTMLHeadingElement>)}>
      {children}
    </h1>;
  }
  if (t === 'h2') {
    return <h2 className={classes} {...(props as HTMLAttributes<HTMLHeadingElement>)}>
      {children}
    </h2>;
  }
  if (t === 'title') {
    return <h3 className={classes} {...(props as HTMLAttributes<HTMLHeadingElement>)}>
      {children}
    </h3>;
  }
  if (t === 'subtitle') {
    return <h4 className={classes} {...(props as HTMLAttributes<HTMLHeadingElement>)}>
      {children}
    </h4>;
  }
  if (['body', 'body2'].includes(t)) {
    return <p className={classes} {...(props as HTMLAttributes<HTMLParagraphElement>)}>
      {children}
    </p>;
  }
  if (['text', 'button'].includes(t)) {
    return <span className={classes} {...(props as HTMLAttributes<HTMLSpanElement>)}>
      {children}
    </span>;
  }
  if (t === 'label') {
    return <label className={classes} {...(props as HTMLAttributes<HTMLLabelElement>)}>
      {children}
    </label>;
  }
  if (t === 'code') {
    return <div>
      <code className={classes} {...props}>
        {children}
      </code>
    </div>;
  }
};


/**
 * @deprecated use `<T type="...">` or `<Typography type="..">`
 */
export type TypographyProps<T = HTMLElement> = HTMLAttributes<T> & PropsWithChildren<{
  className?: string;
  ref?: RefObject<T | null>;
}>;

/**
 * @deprecated use `<T type="...">` or `<Typography type="..">`
 */
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
  Label: function ({ children, className, ...props }: TypographyProps<HTMLLabelElement>) {
    return <label {...props} className={classNames('Typography Typography__Label', className)}>
      {children}
    </label>
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