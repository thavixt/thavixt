import classNames from "classnames";
import { Children, Fragment, PropsWithChildren } from "react";
import { CommonProps } from "../../common/commonProps";
import { themedTextClasses } from "../../common/theme";
import { Icon } from "../Icon/Icon";

export type BreadcrumbProps = PropsWithChildren<CommonProps<HTMLDivElement>>;

export function Breadcrumbs(props: BreadcrumbProps) {
  const classes = classNames(
    'flex items-center',
    themedTextClasses,
    props.className,
  );

  const children = Children.toArray(props.children);

  return (
    <div ref={props.ref} className={classNames(classes)}>
      {children.map((child, i) => (
        <Fragment key={i}>
          <span className="font-semibold">{child}</span>
          <span>{i < children.length - 1 ? <span className="text-slate-400">
            <Icon icon="Caret" height={3} className="text-slate-800 dark:text-slate-300" />
          </span> : ''}</span>
        </Fragment>
      ))}
    </div>
  )
}