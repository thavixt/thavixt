import { PropsWithChildren, useState } from "react";
import { Accordion, AccordionBase } from "../Accordion/Accordion";
import { getSlotElements, sleep } from "../../common/utils";
import './AccordionGroup.css';

export interface AccordionGroupProps {
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
    <div className="AccordionGroup">
      {accordions.map((c, i) => (
        <AccordionBase
          key={`accordiongroup-${i}`}
          data-testid={`AccordionGroup-${i}`}
          groupItem
          onOpen={onOpen(i)}
          open={i === openIndex}
          {...c.props}
        />
      ))}
    </div>
  )
}