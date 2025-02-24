import classNames from "classnames";
import { CommonProps } from "../common/commonProps";
import { PropsWithChildren } from "react";

export interface ButtonProps extends PropsWithChildren<CommonProps<HTMLButtonElement>> {
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger',
  type?: HTMLButtonElement['type'],
}

export function Button({ ref, onClick, type = 'button', className, children, variant = 'primary' }: ButtonProps) {
  const variantClasses: string[] = [];

  if (variant === 'primary') {
    variantClasses.push('');
  }

  if (variant === 'secondary') {
    variantClasses.push('');
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      className={
        classNames(
          'cursor-pointer font-bold px-2 py-1 rounded-sm active:scale-95',
          {
            'text-slate-100 bg-green-600': variant === 'primary',
            'text-slate-100 bg-indigo-500': variant === 'secondary',
            'text-slate-100 bg-red-500': variant === 'danger',
          },
          className,
        )
      }
    >
      {children}
    </button>
  )
}
