import classNames from "classnames";
import { HTMLAttributes, MouseEvent, PropsWithChildren } from "react";
import { CommonProps } from "../../common/commonProps";
import { Loader } from "../Loader/Loader";
import { Typography } from "../Typography/Typography";
import { IconType } from "../Icon/IconList";
import { Icon } from "../Icon/Icon";

export interface ButtonProps extends PropsWithChildren<CommonProps<HTMLButtonElement>>, HTMLAttributes<HTMLButtonElement> {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'silent',
  type?: HTMLButtonElement['type'],
  loading?: boolean;
  disabled?: boolean;
  icon?: {
    type: IconType;
    className?: string;
  };
  title?: string;
}

export function Button({
  disabled, loading, ref, onClick, type = 'button', className, children, variant = 'default', icon, title, ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      title={title}
      className={
        classNames(
          'min-w-8 h-fit w-fit px-2 py-1 transition-colors duration-150',
          {
            'cursor-pointer': !(disabled || loading),
            'cursor-default opacity-30 select-none': disabled || loading,
          },
          {
            'text-slate-100': variant !== 'default',
            'text-slate-700': variant === 'default',
            'text-slate-700 dark:text-slate-100': variant === 'silent',
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
            'hover:bg-gray-100 active:bg-gray-200 hover:dark:bg-gray-700 active:dark:bg-gray-600': !(disabled || loading) && variant === 'silent',
          },
          {
            'rounded-sm': !icon,
            '!h-[32px] !w-[32px] border-[50%] rounded-[50%]': icon,
          },
          className,
        )
      }
      {...props}
    >
      <div className="flex items-center justify-center">
        {loading ? (
          <Loader type="TubeSpinner" />
        ) : (
          icon ? (
            <Icon icon={icon.type} className={icon.className} height={2} />
          ) : (
            <Typography.Button>{children}</Typography.Button>
          )
        )}
      </div>
    </button>
  )
}
