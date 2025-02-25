import classNames from "classnames";


export const themedTextClasses = classNames(
  'text-slate-800',
  'dark:text-slate-100',
);

export const themedBorderClasses = classNames(
  themedTextClasses,
  'border-1 rounded-sm',
  'border-slate-300',
  'dark:border-slate-600',
);


export const themedBackgroundClasses = classNames(
  themedBorderClasses,
  'bg-slate-100',
  'dark:bg-slate-800',
);