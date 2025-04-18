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
    <Typography.Body
      data-testid="Breadcrumbs"
      ref={props.ref}
      className={classNames('Breadcrumbs', props.className)}
    >
      {children.map((child, i) => (
        <Fragment key={i}>
          <span>{child}</span>
          {(i < children.length - 1)
            ? (
              <span className="Breadcrumbs__caret">
                <Icon type="Caret" height={2.5} />
              </span>
            )
            : null
          }
        </Fragment>
      ))}
    </Typography.Body>
  )
}