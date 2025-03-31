import classNames from "classnames";
import { Children, Fragment, PropsWithChildren } from "react";
import { CommonProps } from "../../common/commonProps";
import { Icon } from "../Icon/Icon";

export type BreadcrumbProps = PropsWithChildren<CommonProps<HTMLDivElement>>;

export function Breadcrumbs(props: BreadcrumbProps) {
  const children = Children.toArray(props.children);

  return (
    <div
      data-testid="Breadcrumbs"
      ref={props.ref}
      className={classNames(
        'themedText flex items-center',
        props.className,
      )}
    >
      {children.map((child, i) => (
        <Fragment key={i}>
          <span className="font-semibold">{child}</span>
          <span>{i < children.length - 1 ? (
            <span className="text-slate-400">
              <Icon icon="Caret" height={2.5}/>
            </span>
          ) : null}</span>
        </Fragment>
      ))}
    </div>
  )
}