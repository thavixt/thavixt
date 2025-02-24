import classNames from "classnames";
import { CommonProps } from "../common/commonProps";

export interface ButtonProps extends CommonProps {
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger',
}

export function Button({ className, children, variant = 'primary' }: ButtonProps) {
  const variantClasses: string[] = [];

  if (variant === 'primary') {
    variantClasses.push('');
  }

  if (variant === 'secondary') {
    variantClasses.push('');
  }

  return (
    <button className={
      classNames(
        'cursor-pointer font-bold px-2 py-1 rounded-md active:scale-95',
        {
          'text-slate-100 bg-green-600': variant === 'primary',
          'text-slate-100 bg-indigo-500': variant === 'secondary',
          'text-slate-100 bg-red-500': variant === 'danger',
        },
        className,
      )
    }>
      {children}
    </button>
  )
}
