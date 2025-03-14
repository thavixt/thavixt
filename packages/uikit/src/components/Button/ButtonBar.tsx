import classNames from "classnames";
import { PropsWithChildren } from "react";

export function ButtonBar({children, full}: PropsWithChildren<{ full?: boolean }>) {
  const classes = classNames(
    'flex space-x-2 items-center mt-2', 
    {
      'w-full justify-end': full,
      'w-fit': !full,
    }
  );

  return <div className={classes}>
    {children}
  </div>
}