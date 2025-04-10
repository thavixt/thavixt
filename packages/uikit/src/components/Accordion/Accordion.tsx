import classNames from "classnames";
import { cloneElement, HTMLAttributes, PropsWithChildren, useEffect, useRef, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import { getSlotElements } from "../../common/utils";
import './Accordion.css';
import { Icon } from "../Icon/Icon";
import { Typography } from "../Typography/Typography";

export interface AccordionProps extends PropsWithChildren<CommonProps<HTMLDivElement>>, HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpen?: (open: boolean) => void;
}

interface AccordionComponentProps extends AccordionProps {
  groupItem?: boolean;
}

export function Accordion(props: AccordionProps) {
  return <AccordionBase {...props} />;
}

/**
 * For internal usage only.
 */
export function AccordionBase({
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
        <Typography.Text>
          <Icon className="Accordion__svg" icon="Caret" />
        </Typography.Text>
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