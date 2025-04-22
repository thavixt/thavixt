import classNames from "classnames";
import { HTMLAttributes, PropsWithChildren, useEffect, useRef, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import { Icon } from "../Icon/Icon";
import './Accordion.css';

export interface AccordionProps extends PropsWithChildren<CommonProps<HTMLDivElement>>, HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  open?: boolean;
  title: string;
  openTitle?: string;
  onOpen?: (open: boolean) => void;
}

export function Accordion(props: AccordionProps) {
  return <AccordionBase {...props} />;
}

interface AccordionBaseProps extends AccordionProps {
  groupItem?: boolean;
}

/**
 * For internal usage only.
 */
export function AccordionBase({
  ref,
  children,
  className,
  defaultOpen,
  groupItem = false,
  onOpen,
  open: inertOpen,
  openTitle,
  title,
  ...props
}: AccordionBaseProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useRef(props.id ?? crypto.randomUUID().slice(0, 4));

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
      <div data-testid="AccordionHeader" className="AccordionHeader" onClick={onClick}>
        <Icon className="Accordion__svg" type="Caret" />
        <div
          data-testid={open ? 'AccordionOpenTitle' : 'AccordionTitle'}
          className={open ? 'AccordionOpenTitle' : 'AccordionTitle'}
        >
          {open ? openTitle ?? title : title}
        </div>
      </div>
      <AccordionBody open={open}>{children}</AccordionBody>
    </div>
  )
}

type AccordionPartProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;
type AccordionBodyProps = AccordionPartProps & { open?: boolean };

function AccordionBody({ children, open = false }: AccordionBodyProps) {
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
    <div data-testid="AccordionBody" className="AccordionBody">
      {children}
    </div>
  )
}
