import classNames from "classnames";
import { cloneElement, HTMLAttributes, PropsWithChildren, useEffect, useRef, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import { getSlotElements } from "../../common/utils";
import './Accordion.css';

interface AccordionProps extends PropsWithChildren<CommonProps<HTMLDivElement>>, HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpen?: (open: boolean) => void;
}

interface AccordionComponentProps extends AccordionProps {
  groupItem?: boolean;
}

export function Accordion(props: AccordionProps) {
  return <AccordionComponent {...props} />;
}

/**
 * Internal use only: AccordionGroup
 */
export function AccordionComponent({
  className,
  children,
  defaultOpen,
  ref,
  onOpen,
  groupItem = false,
  open: inertOpen,
  ...props
}: AccordionComponentProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useRef(props.id ?? crypto.randomUUID().slice(0, 4));

  const bodySlot = getSlotElements(children, AccordionBody)[0];
  const titleSlot = getSlotElements(children, AccordionTitle)[0];
  const openTitleSlot = getSlotElements(children, AccordionOpenTitle)[0];

  useEffect(() => {
    if (groupItem) {
      setOpen(inertOpen);
    }
  }, [groupItem, inertOpen]);

  const onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setOpen(prev => {
      onOpen?.(!prev);
      return !prev;
    });
  }

  return (
    <div
      ref={ref}
      data-testid={`Accordion-${id.current}`}
      className={classNames(
        'Accordion',
        className,
        {
          'Accordion--open': open,
          'Accordion--closed': !open,
        },
      )}
      {...props}
    >
      <div className="AccordionContainer" onClick={onClick}>
        <svg
          className="Accordion__svg"
          viewBox="0 0 24 24"
        >
          <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
        </svg>
        <div>
          {
            open
              ? cloneElement(titleSlot, { key: `AccordionTitle` })
              : cloneElement(openTitleSlot ?? titleSlot, { key: `AccordionOpenTitle` })
          }
        </div>
      </div>
      <div
        className="AccordionContent"
        data-testid="content"
      >
        {cloneElement(bodySlot, { key: `AccordionBody`, open })}
      </div>
    </div>
  )
}

type AccordionSlotProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;
type AccordionBodySlotProps = AccordionSlotProps & { open?: boolean };

function AccordionBody({ children, className, open = false, ...props }: AccordionBodySlotProps) {
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
    <div className={classNames(className, 'AccordionBody')} {...props}>
      {children}
    </div>
  )
}
Accordion.Body = AccordionBody;

function AccordionTitle({ children, ...props }: AccordionSlotProps) {
  return (
    <div className="AccordionTitle" {...props}>
      {children}
    </div>
  );
}
Accordion.Title = AccordionTitle;

function AccordionOpenTitle({ children, ...props }: AccordionSlotProps) {
  return (
    <div className="AccordionOpenTitle" {...props}>
      {children}
    </div>
  );
}
Accordion.OpenTitle = AccordionOpenTitle;