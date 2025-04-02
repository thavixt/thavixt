import classNames from "classnames";
import { PropsWithChildren, ReactNode, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import { Typography } from "../Typography/Typography";
import './Inplace.css';

export interface InplaceProps extends PropsWithChildren<CommonProps<HTMLDivElement>> {
  onReplace?: (replaced: boolean) => void;
  replacement: ReactNode;
};

export function Inplace(
  { children = 'Click to replace.', className, replacement, onReplace, ref }: InplaceProps
) {
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
    <div
      ref={ref}
      data-testid="Inplace"
      className={classNames('Inplace', className)}
    >
      {replaced ? null : (
        <Typography.Text className="Inplace__text" onClick={onClick}>
          {children}
        </Typography.Text>
      )}
      {replaced ? (
        <div className="Inplace__replacement" onBlur={onBlur}>
          {replacement}
        </div>
      ) : null}
    </div>
  )
}