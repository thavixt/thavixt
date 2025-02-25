import classNames from "classnames";

export function HorizontalRule({className}: {className?: string}) {
  return (
    <hr className={classNames(className, 'text-slate-300 dark:text-slate-600 my-2')} />
  )
}