import classNames from "classnames";
import { PropsWithChildren } from "react";
import { CommonProps } from "../../common/commonProps";
import { themedBackgroundClasses } from "../../common/theme";
import { Divider } from "./Divider";

export interface AccordionProps extends PropsWithChildren<CommonProps<HTMLDetailsElement>> {
  defaultOpen?: boolean;
  title: string;
  openedTitle?: string;
}

export function Accordion({ className, children, defaultOpen, title, openedTitle = title, ref }: AccordionProps) {
  const classes = classNames(
    themedBackgroundClasses,
    'group p-4 mb-2 bg-slate-200 dark:bg-slate-400',
    'transition-colors duration-500 open:border-transparent',
    className,
  );
  const svgClasses = 'fill-slate-400 size-6 transition rotate-0 group-open:rotate-180';

  return (
    <details ref={ref} className={classes} open={defaultOpen}>
      <summary className="cursor-pointer list-none flex justify-between">
        <div>
          <span className="hidden group-not-open:inline">{title}</span>
          <span className="hidden group-open:inline">{openedTitle}</span>
        </div>
        <svg className={svgClasses} viewBox="0 0 24 24">
          <polyline points="4 9 12 17 20 9"></polyline>
        </svg>
      </summary>
      <div className="p-1 text-slate-500 dark:text-slate-400">
        <Divider />
        {children}
      </div>
    </details>
  )
}
