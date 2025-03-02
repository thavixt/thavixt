import classNames from "classnames";
import { MouseEvent, PropsWithChildren } from "react";
import { CommonProps } from "../../common/commonProps";
import { Spinner } from "../Illustration/Spinner";
import { Typography } from "../DataDisplay/Typography";

export interface ButtonProps extends PropsWithChildren<CommonProps<HTMLButtonElement>> {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  variant?: 'default' | 'primary' | 'secondary' | 'danger',
  type?: HTMLButtonElement['type'],
  loading?: boolean;
  disabled?: boolean;
  round?: boolean;
  title?: string;
}

export function Button({ disabled, loading, ref, onClick, type = 'button', className, children, variant = 'default', round, title }: ButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      title={title}
      className={
        classNames(
          'min-w-12 px-2 py-1 transition-colors duration-150',
          {
            'cursor-pointer': !(disabled || loading),
            'cursor-default opacity-60 select-none': disabled || loading,
          },
          {
            'text-slate-100': variant !== 'default',
            'text-slate-700': variant === 'default',
          },
          {
            'bg-gray-200': variant === 'default',
            'bg-green-500': variant === 'primary',
            'bg-indigo-500': variant === 'secondary',
            'bg-red-500': variant === 'danger',
          },
          {
            'hover:bg-gray-300 active:bg-gray-400': !(disabled || loading) && variant === 'default',
            'hover:bg-green-600 active:bg-green-700': !(disabled || loading) && variant === 'primary',
            'hover:bg-indigo-600 active:bg-indigo-700': !(disabled || loading) && variant === 'secondary',
            'hover:bg-red-600 active:bg-red-700': !(disabled || loading) && variant === 'danger',
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
        {loading ? <Spinner type="TubeSpinner" /> : <Typography.Button>{children}</Typography.Button>}
      </div>
    </button>
  )
}
