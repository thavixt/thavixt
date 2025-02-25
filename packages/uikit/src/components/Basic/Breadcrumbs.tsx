import classNames from "classnames";
import { Children, PropsWithChildren } from "react";
import { CommonProps } from "../../common/commonProps";
import { themedTextClasses } from "../../common/theme";

export type BreadcrumbProps = PropsWithChildren<CommonProps<HTMLElement>>;

export function Breadcrumbs(props: BreadcrumbProps) {
  const classes = classNames(
    themedTextClasses,
    props.className,
  );

  const children = Children.toArray(props.children);

  return (
    <div className={classNames(classes)}>
      {children.map((child, i) => (
        <>
          <span>{child}</span>
          <span>{i < children.length - 1 ? <span className="text-slate-400">{' / '}</span> : ''}</span>
        </>
      ))}
    </div>
  )
}