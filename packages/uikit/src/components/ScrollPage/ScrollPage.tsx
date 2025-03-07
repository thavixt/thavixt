import classNames from "classnames";
import { CommonProps } from "../../common/commonProps";
import { Button } from "../Button/Button";
import { MouseEvent } from 'react';

type ScrollTo = 'top' | 'bottom';

interface ScrollPageProps extends CommonProps<HTMLButtonElement> {
  onClick?: (to: ScrollTo, e: MouseEvent<HTMLButtonElement>) => void;
  to?: ScrollTo;
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
    'size-16 m-4 shadow-xl',
    'fixed bottom-0 right-0',
    props.className,
  );
  const iconClasses = classNames('helloworld', {
    '-rotate-90': to === 'top',
    'rotate-90': to === 'bottom',
  });

  return (
    <Button
      data-testid="ScrollPage"
      ref={props.ref}
      icon={{ type: 'Arrow', className: iconClasses }}
      variant="default"
      className={classes}
      onClick={onClick}
    />
  )
}