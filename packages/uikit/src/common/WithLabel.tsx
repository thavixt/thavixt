import classNames from "classnames";
import { PropsWithChildren } from "react";

interface LabelProps {
  id: string;
  label?: string;
  className?: string;
  required?: boolean;
}

export function WithLabel({ children, label, ...props }: PropsWithChildren<LabelProps>) {
  return (
    <div className={classNames('flex space-x-2 items-center dark:text-slate-100 w-full', classNames)}>
      <Label {...props}>{label}</Label>
      {children}
    </div>
  )
}

export function Label({ children, id: name, required }: PropsWithChildren<Omit<LabelProps, 'label'>>) {
  if (!children) {
    return null;
  };

  return (
    <label className="min-w-24" htmlFor={name}>
      {required ? <span className="text-red-500">*</span> : ''}{children}:
    </label>
  )
}