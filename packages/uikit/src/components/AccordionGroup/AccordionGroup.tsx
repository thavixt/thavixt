import { cloneElement, PropsWithChildren, useState } from "react";
import { Accordion } from "../Accordion/Accordion";
import { getSlotElements, sleep } from "../../common/utils";
import classNames from "classnames";
import { themedBackgroundClasses } from "../../common/theme";

interface AccordionGroupProps {
  /**
   * index of the default opened accordion
   * - @todo: should be a key/string
   */
  defaultOpen?: number;
  onOpen?: (tabIndex: number) => void;
}

export function AccordionGroup({ children, defaultOpen = -1, onOpen: onOpened }: PropsWithChildren<AccordionGroupProps>) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpen);
  const accordions = getSlotElements(children, Accordion);

  const onOpen = (index: number) => async (open: boolean) => {
    setOpenIndex(-1);
    await sleep(150);
    if (open) {
      setOpenIndex(index);
    }
    onOpened?.(index);
  };

  return (
    <div className={classNames('divide-y-1 divide-slate-300 dark:divide-slate-500', themedBackgroundClasses)}>
      {accordions.map((c, i) => {
        return cloneElement(c, {
          key: `accordiongroup-${i}`,
          groupItem: true,
          onOpen: onOpen(i),
          open: i === openIndex,
        })
      })}
    </div>
  )
}