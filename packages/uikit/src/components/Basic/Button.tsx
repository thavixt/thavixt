import classNames from "classnames";
import { MouseEvent, PropsWithChildren } from "react";
import { CommonProps } from "../../common/commonProps";
import { Spinner } from "../Illustration/Spinner";

export interface ButtonProps extends PropsWithChildren<CommonProps<HTMLButtonElement>> {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  variant?: 'default' | 'primary' | 'secondary' | 'danger',
  type?: HTMLButtonElement['type'],
  loading?: boolean;
  disabled?: boolean;
  round?: boolean;
}

export function Button({ disabled, loading, ref, onClick, type = 'button', className, children, variant = 'default', round }: ButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={loading}
      className={
        classNames(
          'min-w-16 px-2 py-1 transition-colors',
          {
            'cursor-pointer': !(disabled || loading),
            'cursor-not-allowed opacity-60': disabled || loading,
          },
          {
            'text-slate-700': variant === 'default',
            'text-slate-100': variant !== 'default',
          },
          {
            'bg-gray-200 hover:bg-gray-300 active:bg-gray-400': variant === 'default',
            'bg-green-500 hover:bg-green-600 active:bg-green-700': variant === 'primary',
            'bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700': variant === 'secondary',
            'bg-red-500 hover:bg-red-600 active:bg-red-700': variant === 'danger',
          },
          {
            'rounded-sm': !round,
            'h-[60px] w-[60px] border-[50%] rounded-[50%]': round,
          },
          className,
        )
      }
    >
      <div className="flex items-center justify-center">
        {loading ? <Spinner icon="TubeSpinner" /> : children}
      </div>
    </button>
  )
}
