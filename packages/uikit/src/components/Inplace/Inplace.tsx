import classNames from "classnames";
import { PropsWithChildren, ReactNode, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import { Typography } from "../Typography/Typography";

export interface InplaceProps extends PropsWithChildren<CommonProps<HTMLDivElement>> {
  onReplace?: (replaced: boolean) => void;
  replacement: ReactNode;
};

export function Inplace({ children, className, replacement, onReplace, ref }: InplaceProps) {
  const [replaced, setReplaced] = useState(false);

  const onBlur = () => {
    onReplace?.(false);
    setReplaced(false);
  };

  const onClick = () => {
    onReplace?.(true);
    setReplaced(true);
  }

  return (
    <div data-testid="Inplace" ref={ref} className={classNames('inline-flex px-1', className)}>
      {replaced ? null : <Typography.Text className="border-b cursor-pointer" onClick={onClick}>{children}</Typography.Text>}
      {replaced ? (
        <div className="flex space-x-2" onBlur={onBlur}>{replacement}</div>
      ) : null}
    </div>
  )
}