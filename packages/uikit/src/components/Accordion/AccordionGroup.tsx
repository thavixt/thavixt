import { Children, cloneElement, PropsWithChildren, ReactElement, useState } from "react";
import { Accordion, AccordionProps } from "./Accordion";
import { sleep } from "../../common/utils";

interface AccordionGroupProps {
  /**
   * index of the default opened accordion
   * - @todo: should be a key/string
   */
  defaultOpen?: number;
  onOpen: (tabIndex: number) => void;
}

export function AccordionGroup({ children, defaultOpen = -1, onOpen: onOpened }: PropsWithChildren<AccordionGroupProps>) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpen);
  const slots = Children.toArray(children) as ReactElement[];
  const accordions = slots.filter((child) => child.type === Accordion) as ReactElement<AccordionProps>[];

  const onOpen = (index: number) => async (open: boolean) => {
    setOpenIndex(-1);
    await sleep(150);
    if (open) {
      setOpenIndex(index);
    }
    onOpened?.(index);
  };

  return (
    <div className="divide-y-1 divide-slate-300 dark:divide-slate-500">
      {accordions.map((c, i) => {
        return cloneElement(c, {
          key: `accordiongroup-${i}`,
          inert: true,
          onOpen: onOpen(i),
          open: i === openIndex,
        })
      })}
    </div>
  )
}