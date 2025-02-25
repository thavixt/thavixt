import classNames from "classnames";
import { PropsWithChildren } from "react";
import { CommonProps } from "../../common/commonProps";

export interface ButtonProps extends PropsWithChildren<CommonProps<HTMLButtonElement>> {
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'danger',
  type?: HTMLButtonElement['type'],
}

export function Button({ ref, onClick, type = 'button', className, children, variant = 'default' }: ButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      className={
        classNames(
          'cursor-pointer px-2 py-1 rounded-sm shadow-gray-400 hover:shadow-sm transition-shadow',
          {
            'text-slate-700 bg-gray-200': variant === 'default',
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
