import classNames from "classnames";
import { CommonProps } from "../../common/commonProps";
import { themedTextClasses } from "../../common/theme";
import { WithLabel } from "../../common/WithLabel";

export interface SwitchInputProps extends CommonProps<HTMLInputElement> {
  checked?: boolean;
  defaultChecked?: boolean;
  label: string;
  /** also `value` */
  name: string;
  disabled?: boolean;
  required?: boolean;

  onChange?: (value: boolean) => void;
}

export function SwitchInput({ ref, label, onChange: providedOnChange, name, required, ...props }: SwitchInputProps) {
  const containerClasses = classNames(
    themedTextClasses,
    props.className,
  );
  const switchContainerClasses = classNames(
    'w-8 h-4 rounded-lg relative',
    'bg-slate-200 dark:bg-slate-500',
  );

  const switchClasses = classNames(
    'appearance-none w-8 h-4 peer cursor-pointer disabled:cursor-default',
  );
  const switchKnobClasses = classNames(
    'w-5 h-5 z-100 pointer-events-none',
    'rounded-[50%] bg-slate-400',
    'absolute -top-0.5 -left-0.5 transition-all',
    'peer-checked:left-[14px] peer-checked:bg-blue-400 peer-disabled:bg-slate-400',
    'hover:shadow-lg'
  );

  const id = `${name}-switch`;

  const onChange: React.FormEventHandler<HTMLInputElement> = (e) => {
    providedOnChange?.(e.currentTarget.checked);
  }

  return (
    <div className={containerClasses}>
      <WithLabel id={id} label={label} required={required}>
        <div className={switchContainerClasses}>
          <input
            ref={ref}
            className={switchClasses}
            disabled={props.disabled}
            id={id}
            onChange={onChange}
            type="checkbox"
            {...props}
          />
          <div className={switchKnobClasses} />
        </div>
      </WithLabel>
    </div>
  )
}
