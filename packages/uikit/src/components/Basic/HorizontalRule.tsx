import classNames from "classnames";
import { CommonProps } from "../../common/commonProps";

export function HorizontalRule(props: CommonProps<HTMLHRElement>) {
  return (
    <hr ref={props.ref} className={classNames(props.className, 'text-slate-300 dark:text-slate-600 my-2')} />
  )
}