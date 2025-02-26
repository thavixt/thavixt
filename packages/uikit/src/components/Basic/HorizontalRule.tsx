import classNames from "classnames";
import { CommonProps } from "../../common/commonProps";

interface HorizontalRuleProps extends CommonProps<HTMLHRElement> {
  unicorn?: boolean;
  small?: boolean;
}

export function HorizontalRule(props: HorizontalRuleProps) {
  const classes = classNames(
    'text-transparent self-center my-2 bg-slate-400',
    {
      'bg-linear-65 from-purple-500 to-pink-500 h-0.5': props.unicorn,
      'w-full': !props.small,
      'w-1/2': props.small,
    },
    props.className,
  )
  return (
    <hr ref={props.ref} className={classes} />
  )
}