import classNames from "classnames";
import { PropsWithChildren } from "react";
import { CommonProps } from "../../common/commonProps";
import "./Link.css";
import { Icon } from "../Icon/Icon";
import { IconType } from "../Icon/IconList";

export interface LinkProps extends PropsWithChildren<CommonProps<HTMLAnchorElement>> {
  /** URL to go to */
  href: string;
  /** Render an icon on the right */
  icon?: IconType | false;
  /** Open link in new window (target="_blank") - default `true` */
  self?: boolean,
};

/**
 * A functional component that renders a customizable hyperlink (`<a>` element).
 *
 * @returns {JSX.Element} The rendered `<a>` element with the specified properties.
 */
export function Link({ self, icon = "Link", ...props }: LinkProps) {
  const classes = classNames('Link', props.className);

  return (
    <a data-testid="Link" ref={props.ref} className={classes} href={props.href} target={self ? '_self' : '_blank'}>
      {props.children}
      {icon ? <Icon type={icon} height={2} /> : null}
    </a>
  )
}