import { PropsWithChildren, useEffect, useRef } from "react";
import { CommonProps } from "../../common/commonProps";

export interface ClickOutsideProps extends PropsWithChildren<Omit<CommonProps<HTMLDivElement>, 'ref'>> {
  onClickOutside: () => void;
  onClickInside?: () => void;
}

export function ClickTarget({ onClickOutside, onClickInside, children }: ClickOutsideProps) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClickOutside, onClickInside);

  return (
    <div ref={ref}>{children}</div>
  )
}

function useClickOutside(ref: React.RefObject<HTMLDivElement | null>, onClickOutside: () => void, onClickInside?: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside: EventListener = (event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
        return;
      }
      if (onClickInside) {
        onClickInside();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickInside, onClickOutside, ref]);
}