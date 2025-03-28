import classNames from "classnames";
import { HTMLAttributes, MouseEvent, PropsWithChildren } from "react";
import { CommonProps } from "../../common/commonProps";
import { Loader } from "../Loader/Loader";
import { Typography } from "../Typography/Typography";
import { Icon, IconProps } from "../Icon/Icon";

export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'danger' | 'silent';

export interface ButtonProps extends PropsWithChildren<CommonProps<HTMLButtonElement>>, HTMLAttributes<HTMLButtonElement> {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  variant?: ButtonVariant,
  type?: HTMLButtonElement['type'],
  loading?: boolean;
  success?: boolean;
  disabled?: boolean;
  icon?: IconProps;
  title?: string;
}

export function Button({
  disabled, loading, success, ref, onClick, type = 'button', className, children, variant = 'default', icon, title, ...props
}: ButtonProps) {
  return (
    <button
      data-testid="Button"
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      title={title}
      className={
        classNames(
          'min-w-4 h-fit my-auto w-fit px-2 py-1 transition-colors duration-150 select-none',
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
            'bg-gray-200 dark:bg-gray-300': variant === 'default',
            'bg-green-500 dark:bg-green-600': variant === 'primary',
            'bg-indigo-500 dark:bg-indigo-600': variant === 'secondary',
            'bg-red-500 dark:bg-red-600': variant === 'danger',
          },
          {
            'hover:bg-gray-300 active:bg-gray-400': variant === 'default' && !(disabled || loading),
            'dark:hover:bg-gray-400 dark:active:bg-gray-500': variant === 'default' && !(disabled || loading),
          },
          {
            'hover:bg-green-600 active:bg-green-700': variant === 'primary' && !(disabled || loading),
            'dark:hover:bg-green-700 dark:active:bg-green-800': variant === 'primary' && !(disabled || loading),
          },
          {
            'hover:bg-indigo-600 active:bg-indigo-700': variant === 'secondary' && !(disabled || loading),
            'dark:hover:bg-indigo-700 dark:active:bg-indigo-800': variant === 'secondary' && !(disabled || loading),
          },
          {
            'hover:bg-red-600 active:bg-red-700': variant === 'danger' && !(disabled || loading),
            'dark:hover:bg-red-700 dark:active:bg-red-800': variant === 'danger' && !(disabled || loading),
          },
          {
            'hover:bg-gray-200 active:bg-gray-300': !(disabled || loading) && variant === 'silent',
            'hover:dark:bg-gray-600 active:dark:bg-gray-700': !(disabled || loading) && variant === 'silent',
          },
          {
            'rounded-lg': !icon,
            'aspect-square rounded-[50%]': icon,
          },
          className,
        )
      }
      {...props}
    >
      <div className="flex space-x-1 items-center justify-center">
        {icon ? <Icon {...{height: 2.5, ...icon}} /> : <Typography.Button>{children}</Typography.Button>}
        {(!icon && success) ? <Icon height={2} icon="Check" /> : null}
        {(!icon && loading) ? <Loader height={4} type="TubeSpinner" /> : null}
      </div>
    </button>
  )
}
