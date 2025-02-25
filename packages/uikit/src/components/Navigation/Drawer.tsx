import classNames from "classnames";
import { Children, Fragment, PropsWithChildren } from "react";
import { CommonProps } from "../../common/commonProps";
import { themedTextClasses } from "../../common/theme";

export type BreadcrumbProps = PropsWithChildren<CommonProps<HTMLDivElement>>;

export function Drawer(props: BreadcrumbProps) {
  const classes = classNames(
    themedTextClasses,
    props.className,
  );

  const children = Children.toArray(props.children);

  return (
    <div ref={props.ref} className={classNames(classes)}>
      {children.map((child, i) => (
        <Fragment key={i}>
          <span>{child}</span>
          <span>{i < children.length - 1 ? <span className="text-slate-400">{' / '}</span> : ''}</span>
        </Fragment>
      ))}
    </div>
  )
}