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
  { children = 'Click to replace.', className, replacement, onReplace, ref, ...props }: InplaceProps
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
      onBlurCapture={onBlur}
      ref={ref}
      data-testid="Inplace"
      className={classNames('Inplace', className)}
      {...props}
    >
      {replaced ? replacement : (
        <Typography type="text" className="Inplace__text" onClick={onClick}>
          {children}
        </Typography>
      )}
    </div>
  )
}