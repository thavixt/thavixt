import classNames from "classnames";


export const themedTextClasses = classNames(
  'text-slate-800 dark:text-slate-100',
  'placeholder:text-slate-400',
);

export const themedBorderClasses = classNames(
  themedTextClasses,
  'border-1 rounded-sm',
  'border-slate-300 dark:border-slate-500',
);

export const themedBackgroundClasses = classNames(
  themedBorderClasses,
  'bg-slate-100 dark:bg-slate-800',
);

export const themedInputClasses = classNames(
  themedBorderClasses,
  'bg-slate-300 dark:bg-slate-700 disabled:opacity-40 readonly:opacity-60',
);