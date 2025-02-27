import { PropsWithChildren } from "react";

interface WithLabelProps {
  name: string;
  label?: string;
}

export function WithLabel({children, name, label}: PropsWithChildren<WithLabelProps>) {
  return (
    <div className="flex space-x-2 items-center dark:text-slate-100 w-full">
      {label ? <label className="min-w-24" htmlFor={name}>{label}:</label> : null}
      {children}
    </div>
  )
}