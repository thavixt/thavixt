import { PropsWithChildren, useEffect, useRef } from "react";
import { CommonProps } from "../../common/commonProps";

export interface ClickOutsideProps extends PropsWithChildren<Omit<CommonProps<HTMLDivElement>, 'ref'>> {
  onClickOutside: () => void;
  onClickInside?: () => void;
}

export function ClickTarget({ onClickOutside, onClickInside, children, ...props }: ClickOutsideProps) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClickOutside, onClickInside);

  return (
    <div data-testid="ClickTarget" ref={ref} {...props}>{children}</div>
  )
}

function useClickOutside(ref: React.RefObject<HTMLDivElement | null>, onClickOutside: () => void, onClickInside?: () => void) {
  useEffect(() => {
    const handleClickOutside: EventListener = (event) => {
      if ((event as MouseEvent).button !== 0) {
        return;
      }
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
        return;
      }
      if (onClickInside) {
        onClickInside();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClickInside, onClickOutside, ref]);
}