import classNames from "classnames";


export const themedTextClasses = "text-slate-800 dark:text-slate-100 placeholder:text-slate-400";

export const themedBorderClasses = classNames(
  themedTextClasses,
  'border-1 rounded-sm',
  'border-slate-300 dark:border-slate-500',
);

export const themedBackgroundClasses = classNames(
  themedBorderClasses,
  'bg-slate-50 dark:bg-gray-800',
);

export const themedInputClasses = classNames(
  themedBorderClasses,
  'bg-slate-100 dark:bg-slate-600 disabled:opacity-40 readonly:opacity-60',
  'read-only:bg-gray-200 dark:read-only:bg-gray-500',
);

// export const focusClasses = "focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1";
export const focusClasses = "focus:outline-2 outline-offset-1 rounded-sm";