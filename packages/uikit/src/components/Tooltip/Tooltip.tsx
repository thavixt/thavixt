import classNames from "classnames";
import { ReactNode } from "react";
import { Typography } from "../Typography/Typography";
import { CommonProps } from "../../common/commonProps";
import "./Tooltip.css";

type TooltipPosition = 'left' | 'right' | 'top' | 'bottom';

interface TooltipProps extends CommonProps {
  tooltip: ReactNode | ((position: TooltipPosition) => ReactNode)
  position?: TooltipPosition;
  visible?: boolean;
  className?: string;
}

export function Tooltip({ ref, className, children, tooltip, position = 'bottom', visible }: TooltipProps) {
  const tooltipClasses = classNames(
    'Tooltip__content', className,
    visible && 'Tooltip__content--visible',
    position === 'top' && 'Tooltip__content--top',
    position === 'bottom' && 'Tooltip__content--bottom',
    position === 'left' && 'Tooltip__content--left',
    position === 'right' && 'Tooltip__content--right',
  );

  return (
    <div data-testid="Tooltip" ref={ref} className="Tooltip">
      <Typography.Text className="Tooltip__target">
        {children}
      </Typography.Text>
      <div data-testid="Tooltip__content" className={tooltipClasses}>
        <Typography.Text>
          {typeof tooltip === 'function' ? tooltip(position) : tooltip}
        </Typography.Text>
        <div className="Tooltip__arrow" />
      </div>
    </div>
  )
}
