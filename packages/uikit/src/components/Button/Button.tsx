import classNames from "classnames";
import { HTMLAttributes, MouseEvent, PropsWithChildren, ReactNode } from "react";
import { CommonProps } from "../../common/commonProps";
import { Loader } from "../Loader/Loader";
import { Typography } from "../Typography/Typography";
import { Icon, IconProps } from "../Icon/Icon";
import "./Button.css";

export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'danger' | 'silent';

interface BaseButtonProps extends CommonProps<HTMLButtonElement>, HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  loading?: boolean;
  success?: boolean;
  type?: HTMLButtonElement['type'],
  variant?: ButtonVariant,

  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;

  icon?: IconProps | never;
  children?: ReactNode | never;
}

interface IconButtonProps extends BaseButtonProps {
  icon: IconProps;
}
interface TextButtonProps extends PropsWithChildren<BaseButtonProps> {
  children: ReactNode;
};
export type ButtonProps = IconButtonProps | TextButtonProps;

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
  title,
  ...props
}: ButtonProps) {
  return (
    <button
      data-testid="Button"
      ref={ref}
      type={type}
      title={title ?? (typeof children === 'string' ? children : undefined)}
      onClick={onClick}
      disabled={disabled || loading}
      className={
        classNames(
          'Button',
          loading && 'Button--loading',
          // icon && 'Button--icon',
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
          children
            ? <Typography.Button>{children}</Typography.Button>
            : null
        }
        {
          icon
            ? <Icon {...{ height: 2.5, ...icon }} />
            : null
        }
        {
          !icon && success
            ? <Icon height={2} type="Check" />
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
