import classNames from "classnames";
import { ReactNode } from "react";
import { Typography } from "../Typography/Typography";
import { CommonProps } from "../../common/commonProps";
import "./Tooltip.css";
import "./Tooltip.css";

type TooltipPosition = 'left' | 'right' | 'top' | 'bottom';

interface TooltipProps extends CommonProps {
  tooltip: ReactNode | ((position: TooltipPosition) => ReactNode)
  position?: TooltipPosition;
  visible?: boolean;
  className?: string;
  tooltipClassName?: string;
}

export function Tooltip({ ref, className, tooltipClassName, children, tooltip: Tooltip, position = 'bottom', visible }: TooltipProps) {
  const TooltipClasses = classNames(
    'Tooltip__content', tooltipClassName,
    visible && 'Tooltip__content--visible',
    position === 'top' && 'Tooltip__content--top',
    position === 'bottom' && 'Tooltip__content--bottom',
    position === 'left' && 'Tooltip__content--left',
    position === 'right' && 'Tooltip__content--right',
  );

  return (
    <div data-testid="Tooltip" ref={ref} className={classNames("Tooltip", className)}>
      <Typography type="text" className="Tooltip__target">
        {children}
      </Typography>
      <div data-testid="Tooltip__content" className={TooltipClasses}>
        <Typography type="text">
          {typeof Tooltip === 'function' ? Tooltip(position) : Tooltip}
        </Typography>
        <div className="Tooltip__arrow" />
      </div>
    </div>
  )
}
