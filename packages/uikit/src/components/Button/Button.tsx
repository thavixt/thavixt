import classNames from "classnames";
import { HTMLAttributes, MouseEvent, PropsWithChildren } from "react";
import { CommonProps } from "../../common/commonProps";
import { Loader } from "../Loader/Loader";
import { Typography } from "../Typography/Typography";
import { Icon, IconProps } from "../Icon/Icon";
import "./Button.css";

export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'danger' | 'silent';

export interface ButtonProps extends PropsWithChildren<CommonProps<HTMLButtonElement>>, HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  icon?: IconProps;
  loading?: boolean;
  success?: boolean;
  type?: HTMLButtonElement['type'],
  variant?: ButtonVariant,

  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function Button({
  children, 
  className, 
  disabled, 
  icon,
  loading, 
  ref, 
  success, 
  type = 'button', 
  variant = 'default', 
  onClick, 
  ...props
}: ButtonProps) {
  return (
    <button
      data-testid="Button"
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={
        classNames(
          'Button',
          loading && 'Button--loading',
          icon && 'Button--icon',
          variant === 'default' && 'Button--default',
          variant === 'primary' && 'Button--primary',
          variant === 'secondary' && 'Button--secondary',
          variant === 'danger' && 'Button--danger',
          variant === 'silent' && 'Button--silent',
          className,
        )
      }
      {...props}
    >
      <div className="Button__content">
        {
          icon
            ? <Icon {...{ height: 2.5, ...icon }} />
            : <Typography.Button>{children}</Typography.Button>
        }
        {
          !icon && success
            ? <Icon height={2} icon="Check" />
            : null
        }
        {
          !icon && loading
            ? <Loader height={4} type="TubeSpinner" />
            : null
        }
      </div>
    </button>
  )
}
