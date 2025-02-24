import { PropsWithChildren } from "react";

interface WithLabelProps {
  name?: string;
  label?: string;
}

export function WithLabel({children, name, label}: PropsWithChildren<WithLabelProps>) {
  return (
    <div className="flex space-x-2 items-start dark:text-slate-100">
      {label ? <label htmlFor={name}>{label}:</label> : null}
      {children}
    </div>
  )
}