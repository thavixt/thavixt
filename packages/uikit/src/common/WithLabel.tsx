import classNames from "classnames";
import { PropsWithChildren } from "react";
import { Typography } from "../components/Typography/Typography";

interface LabelProps {
  id?: string;
  label?: string;
  className?: string;
  required?: boolean;
}

export function WithLabel({ children, label, className, id, required }: PropsWithChildren<LabelProps>) {
  return (
    <div data-testid="WithLabel" className={classNames('flex space-x-2 items-start dark:text-slate-100 w-full', className)}>
      <Label id={id} required={required}>{label}</Label>
      {children}
    </div>
  )
}

export function Label({ children, id, required }: PropsWithChildren<Omit<LabelProps, 'label'>>) {
  if (!children) {
    return null;
  };

  return (
    <label className="min-w-24" htmlFor={id}>
      {required ? <span className="text-red-500">{'* '}</span> : ''}
      <Typography.Label>{children}:</Typography.Label>
    </label>
  )
}