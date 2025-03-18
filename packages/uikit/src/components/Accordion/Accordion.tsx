import classNames from "classnames";
import { cloneElement, HTMLAttributes, PropsWithChildren, useEffect, useRef, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import { themedTextClasses } from "../../common/theme";
import { getSlotElements } from "../../common/utils";

export interface AccordionProps extends PropsWithChildren<CommonProps<HTMLDivElement>>, HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  open?: boolean;
  /* controllable / AccordionGroup child */
  onOpen?: (open: boolean) => void;
  inert?: boolean;
}


export function Accordion({ className, children, defaultOpen, ref, onOpen, inert, open: inertOpen, ...props }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useRef(props.id ?? crypto.randomUUID().slice(0, 4));

  const bodySlot = getSlotElements(children, AccordionBody)[0];
  const titleSlot = getSlotElements(children, AccordionTitle)[0];
  const openTitleSlot = getSlotElements(children, AccordionOpenTitle)[0];

  useEffect(() => {
    if (inert) {
      setOpen(inertOpen);
    }
  }, [inert, inertOpen]);

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
    'pl-6 transition-all duration-250 overflow-hidden',
    themedTextClasses,
    {
      'max-h-screen': open,
      'max-h-0': !open,
    }
  );

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
            key: `AccordionTitle`,
            className: classNames('hidden', { 'inline': !open }),
          })}
          {cloneElement(openTitleSlot ?? titleSlot, {
            key: `AccordionOpenTitle`,
            className: classNames('hidden', { 'inline font-semibold': open }),
          })}
        </div>
      </div>
      <div className={contentClasses} data-testid="content">
        {cloneElement(bodySlot, {
          key: `AccordionBody`,
          open,
        })}
      </div>
    </div>
  )
}

type AccordionSlotProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;
type AccordionBodySlotProps = AccordionSlotProps & { open?: boolean };

export function AccordionBody({ children, className, open = false, ...props }: AccordionBodySlotProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref?.current) {
      return;
    }
    if (open) {
      ref.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [ref, open]);

  return (
    <div data-testid="accordion-body" className={classNames(className, 'flex flex-col pt-1')} {...props}>
      {children}
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