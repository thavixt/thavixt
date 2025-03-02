import classNames from "classnames";
import { CommonProps } from "../common/commonProps";
import { Button } from "./Button";
import { JSX, MouseEvent } from 'react';
import { Icon } from "./Icon";

type ScrollTo = 'top' | 'bottom';

interface ScrollPageProps extends CommonProps<HTMLButtonElement> {
  onClick?: (to: ScrollTo, e: MouseEvent<HTMLButtonElement>) => void;
  to?: ScrollTo;
  label?: string;
}

const DEFAULT_LABELS: Record<ScrollTo, JSX.Element> = {
  bottom: <Icon icon="ArrowDown" />,
  top: <Icon icon="ArrowUp" />,
}

export function ScrollPage({ to = 'top', ...props }: ScrollPageProps) {
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(to, e);
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: to === 'top' ? 'start' : 'end',
    })
  }

  const classes = classNames(
    'size-16 m-4',
    'fixed bottom-0 right-0',
    props.className,
  )

  return (
    <Button ref={props.ref} variant="default" className={classes} round onClick={onClick}>
      {props.label ?? DEFAULT_LABELS[to]}
    </Button>
  )
}