import classNames from "classnames";
import { PropsWithChildren, ReactNode } from "react";
import { CommonProps } from "../common/commonProps";

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
    'inline-flex items-center',
    'font-semibold underline underline-offset-4',
    'text-indigo-500 hover:text-blue-500 visited:text-purple-600',
    props.className,
  );

  return (
    <a ref={props.ref} className={classes} href={props.href} target={blank ? '_blank' : undefined}>
      {props.children}
      {props.icon}
    </a>
  )
}