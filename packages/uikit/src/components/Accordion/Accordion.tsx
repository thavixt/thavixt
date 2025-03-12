import classNames from "classnames";
import { Children, cloneElement, HTMLAttributes, PropsWithChildren, ReactElement, useEffect, useRef, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import { themedTextClasses } from "../../common/theme";
import { Scrollbar } from "../Scrollbar/Scrollbar";

export interface AccordionProps extends PropsWithChildren<CommonProps<HTMLDivElement>>, HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  // title: ReactNode;
  // openedTitle?: ReactNode;
  onOpen?: (open: boolean) => void;
  /* controllable / AccordionGroup child */
  inert?: boolean;
  open?: boolean;
}

export function Accordion({ className, children, defaultOpen, ref, onOpen, inert, open: inertOpen, ...props }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useRef(props.id ?? crypto.randomUUID().slice(0, 4));

  const slots = Children.toArray(children) as ReactElement[];
  const bodySlot = slots.filter((child) => child.type === AccordionBody)[0] as ReactElement<AccordionBodySlotProps>;
  const titleSlot = slots.filter((child) => child.type === AccordionTitle)[0] as ReactElement<AccordionSlotProps>;
  const openTitleSlot = slots.filter((child) => child.type === AccordionOpenTitle)[0] as ReactElement<AccordionSlotProps>;

  useEffect(() => {
    if (inert) {
      setOpen(inertOpen);
    }
  }, [inert, inertOpen])

  const classes = classNames(
    'px-4 py-2 flex flex-col align-center',
    themedTextClasses,
    className,
  );
  const svgClasses = classNames(
    'fill-slate-500 size-6 transition -rotate-90 mr-1 -ml-1',
    {
      'rotate-0': open,
    }
  );
  const contentClasses = classNames(
    themedTextClasses,
    'transition-all duration-250 overflow-hidden',
    {
      'max-h-0': !open,
      'max-h-64': open,
    }
  )

  const onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setOpen(prev => {
      onOpen?.(!prev);
      return !prev;
    });
  }

  return (
    <div data-testid={`Accordion-${id}`} ref={ref} className={classes} {...props}>
      <div className="cursor-pointer flex w-full items-center" onClick={onClick}>
        <svg className={svgClasses} viewBox="0 0 24 24">
          <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
        </svg>
        <div>
          {cloneElement(titleSlot, {
            className: classNames('hidden', { 'inline': !open }),
            key: `AccordionTitle`,
          })}
          {cloneElement(openTitleSlot ?? titleSlot, {
            className: classNames('hidden', { 'inline font-semibold': open }),
            key: `AccordionOpenTitle`,
          })}
        </div>
      </div>
      <div className={contentClasses} data-testid="content">
        {cloneElement(bodySlot, {
          open,
          key: `AccordionBody`,
        })}
      </div>
    </div>
  )
}

type AccordionSlotProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;
type AccordionBodySlotProps = AccordionSlotProps & {open?: boolean};

export function AccordionBody({ children, className, open = false, ...props }: AccordionBodySlotProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref?.current) {
      return;
    }
    if (open) {
      ref.current.scrollTo({top: 0, behavior: 'smooth'});
    }
  }, [ref, open]);

  return (
    <div data-testid="accordion-body" className={classNames(className, 'flex flex-col h-fit max-h-64 pt-1')} {...props}>
      <Scrollbar ref={ref} className="h-fit max-h-64 overflow-auto min-h-0">
          {children}
      </Scrollbar>
    </div>
  )
}

export function AccordionTitle({ children, ...props }: AccordionSlotProps) {
  return (
    <div data-testid="accordion-title" {...props}>
      {children}
    </div>
  );
}

export function AccordionOpenTitle({ children, ...props }: AccordionSlotProps) {
  return (
    <div data-testid="accordion-opentitle" {...props}>
      {children}
    </div>
  );
}