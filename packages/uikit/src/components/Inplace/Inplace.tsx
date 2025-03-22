import classNames from "classnames";
import { PropsWithChildren, ReactNode, useCallback, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import { Button } from "../Button/Button";

export interface InplaceProps extends PropsWithChildren<CommonProps<HTMLDivElement>> {
  onReplace?: (replaced: boolean) => void;
  replacement: ReactNode;
};

export function Inplace({ children, className, replacement, onReplace, ref }: InplaceProps) {
  const [replaced, setReplaced] = useState(false);

  const onClick = useCallback(() => {
    setReplaced(prev => {
      onReplace?.(!prev);
      return !prev;
    });
  }, [onReplace]);

  return (
    <div data-testid="Inplace" ref={ref} className={classNames('flex h-8 space-x-4 items-center', className)}>
      {replaced ? null : <Button variant="silent" onClick={onClick}>{children}</Button>}
      {replaced ? (
        <div className="flex space-x-2">
          {replacement}
          <Button icon={{ icon: 'Cross', className: 'text-red-600' }} variant="silent" onClick={onClick}></Button>
        </div>
      ) : null}
    </div>
  )
}