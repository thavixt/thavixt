import classNames from "classnames";
import { Children, Fragment, PropsWithChildren } from "react";
import { CommonProps } from "../../common/commonProps";
import { Icon } from "../Icon/Icon";
import "./Breadcrumbs.css";
import { Typography } from "../Typography/Typography";

export type BreadcrumbProps = PropsWithChildren<CommonProps<HTMLDivElement>>;

export function Breadcrumbs(props: BreadcrumbProps) {
  const children = Children.toArray(props.children);

  return (
    <div
      data-testid="Breadcrumbs"
      ref={props.ref}
      className={classNames('Breadcrumbs', props.className)}
    >
      {children.map((child, i) => (
        <Fragment key={i}>
          <span>
            {typeof child === 'string' ? <Typography.Text>{child}</Typography.Text> : child}
          </span>
          <span>{i < children.length - 1 ? (
            <span className="Breadcrumbs__caret">
              <Icon icon="Caret" height={2.5} />
            </span>
          ) : null}</span>
        </Fragment>
      ))}
    </div>
  )
}