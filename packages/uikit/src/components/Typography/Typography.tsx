import classNames from "classnames";
import { HTMLAttributes, PropsWithChildren, LabelHTMLAttributes } from "react";
import "./Typography.css";
import { CommonProps } from "../../common/commonProps";

type TypographyVariant =
  "h1" |
  "h2" |
  "title" |
  "subtitle" |
  "caption" |
  "body" |
  "body2" |
  "text" |
  "label" |
  "button" |
  "code";

export type TypographyProps<T = HTMLElement> = CommonProps<T> & HTMLAttributes<T> & {
  type: TypographyVariant;
} & (
    ({ type: 'h1' }) |
    ({ type: 'h2' }) |
    ({ type: 'title' }) |
    ({ type: 'subtitle' }) |
    ({ type: 'caption' }) |
    ({ type: 'body' }) |
    ({ type: 'body2' }) |
    ({ type: 'text' }) |
    ({ type: 'label' } & LabelHTMLAttributes<T>) |
    ({ type: 'button' }) |
    ({ type: 'code' })
  );

export function Typography({
  className,
  children,
  type: t = 'text',
  ...props
}: PropsWithChildren<TypographyProps>) {
  const classes = classNames(
    'Typography',
    t === 'h1' && 'Typography__H1',
    t === 'h2' && 'Typography__H2',
    t === 'title' && 'Typography__Title',
    t === 'subtitle' && 'Typography__Subtitle',
    t === 'caption' && 'Typography__Caption',
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
  if (t === 'caption') {
    return <h5 className={classes} {...(props as HTMLAttributes<HTMLHeadingElement>)}>
      {children}
    </h5>;
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
