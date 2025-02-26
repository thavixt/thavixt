import classNames from "classnames";
import { CommonProps } from "../../common/commonProps";

interface DividerProps extends CommonProps<HTMLHRElement> {
  unicorn?: boolean;
  small?: boolean;
  vertical?: boolean;
}

export function Divider({ className, ref, small, unicorn, vertical }: DividerProps) {
  const classes = classNames(
    'self-center text-transparent',
    {
      'bg-slate-300 dark:bg-slate-500': !unicorn && !className,
      'bg-linear-65 from-purple-500 to-pink-500': unicorn && !vertical,
      'bg-linear-245 from-purple-500 to-pink-500': unicorn && vertical,
    },
    {
      'my-2 h-0.5': !vertical,
      'h-full': vertical && !small,
      'h-1/2': vertical && small,
    },
    {
      'mx-2 w-0.5': vertical,
      'w-full': !vertical && !small,
      'w-1/2': !vertical && small,
    },
    className,
  )
  return (
    <hr ref={ref} className={classes} />
  )
}