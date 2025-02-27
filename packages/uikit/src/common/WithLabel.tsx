import classNames from "classnames";
import { PropsWithChildren } from "react";

interface WithLabelProps {
  id: string;
  label?: string;
  className?: string;
}

export function WithLabel({children, id: name, label}: PropsWithChildren<WithLabelProps>) {
  return (
    <div className={classNames('flex space-x-2 items-center dark:text-slate-100 w-full', classNames)}>
      {label ? <label className="min-w-24" htmlFor={name}>{label}:</label> : null}
      {children}
    </div>
  )
}