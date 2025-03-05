import classNames from "classnames";
import { PropsWithChildren, ReactNode, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import { themedBackgroundClasses } from "../../common/theme";
import { Divider } from "../Divider/Divider";

export interface AccordionProps extends PropsWithChildren<CommonProps<HTMLDivElement>> {
  defaultOpen?: boolean;
  title: ReactNode;
  openedTitle?: ReactNode;
  onOpen?: (open: boolean) => void;
}

export function Accordion({ className, children, defaultOpen, title, openedTitle = title, ref, onOpen }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  const classes = classNames(
    'px-4 py-2 flex flex-col align-center',
    themedBackgroundClasses,
    className,
  );
  const svgClasses = classNames(
    'fill-slate-500 size-6 transition -rotate-90 mr-1 -ml-1',
    {
      'rotate-0': open,
    }
  );
  const contentClasses = classNames(
    'text-slate-500 dark:text-slate-400',
    'transition-all duration-250',
    {
      'opacity-0 h-0 -ml-1': !open,
      'opacity-100 h-full ml-0': open,
    }
  )

  const onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setOpen(prev => {
      onOpen?.(!prev);
      return !prev;
    });
  }

  return (
    <div data-testid="Accordion" ref={ref} className={classes}>
      <div className="cursor-pointer flex items-center" onClick={onClick}>
        <svg className={svgClasses} viewBox="0 0 24 24">
          <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
        </svg>
        <div>
          <span className={classNames('hidden', { 'inline': !open })} data-testid="title">{title}</span>
          <span className={classNames('hidden', { 'inline': open })} data-testid="title-open">{openedTitle}</span>
        </div>
      </div>
      <div className={contentClasses} data-testid="content">
        <Divider />
        {children}
      </div>
    </div>
  )
}
