import classNames from "classnames";
import { PropsWithChildren } from "react";
import { Typography } from "../components/Typography/Typography";

interface WithLabelProps extends LabelProps {
  label?: string;
  inline?: boolean;
}

export function WithLabel({ children, label, className, id, required, inline = false }: PropsWithChildren<WithLabelProps>) {
  const classes = classNames(
    inline ? 'flex space-x-2' : 'flex flex-col space-y-1',
    className,
  );

  return (
    <div data-testid="WithLabel" className={classes}>
      <Label id={id} required={required}>{label}</Label>
      {children}
    </div>
  )
}

interface LabelProps {
  id?: string;
  className?: string;
  required?: boolean;
}

export function Label({ children, id, required }: PropsWithChildren<LabelProps>) {
  if (!children) {
    return null;
  };

  return (
    <label className="min-w-32" htmlFor={id} title={typeof children === 'string' ? children : undefined}>
      <Typography.Label>
        {required ? <span className="text-red-500">{'* '}</span> : ''}
        {children}:
      </Typography.Label>
    </label>
  )
}