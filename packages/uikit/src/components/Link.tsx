import classNames from "classnames";
import { PropsWithChildren, ReactNode } from "react";
import { CommonProps } from "../common/commonProps";
import { themedTextClasses } from "../common/theme";

export interface LinkProps extends PropsWithChildren<CommonProps<HTMLAnchorElement>> {
  /** URL to go to */
  href: string;
  /** Render an icon on the right */
  icon?: ReactNode;
  /** Open link in new window (target="_blank") - default `true` */
  blank?: boolean,
};

export function Link({ blank = true, ...props}: LinkProps) {
  const classes = classNames(
    'font-semibold hover:underline underline-offset-4',
    '!text-indigo-500 visited:text-purple-600',
    'inline-flex items-center',
    themedTextClasses,
    props.className,
  );

  return (
    <a ref={props.ref} className={classes} href={props.href} target={blank ? '_blank' : undefined}>
      {props.children}
      {props.icon}
    </a>
  )
}