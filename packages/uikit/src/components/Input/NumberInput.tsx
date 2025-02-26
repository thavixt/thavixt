import classNames from "classnames";
import { CommonProps } from "../../common/commonProps";
import { WithLabel } from "../../common/WithLabel";
import { themedInputClasses } from "../../common/theme";

export interface NumberInputProps extends Omit<CommonProps<HTMLInputElement>, 'children'> {
  value?: number;
  defaultValue?: number;
  name?: string;
  label?: string;
  max?: number;
  min?: number;
  placeholder?: string;

  onChange?: (value: number) => void;
}

export function NumberInput({name, label, min = 0, max = 999_999, onChange: providedOnChange, ...props}: NumberInputProps) {
  const classes = classNames(
    'border rounded-sm',
    'text-center w-32',
    themedInputClasses,
    props.className,
  );

  const onChange: React.FormEventHandler<HTMLInputElement> = (e) => {
    const value = Math.min(Math.max(+e.currentTarget.value, min), max);
    providedOnChange?.(value);
  }

  return (
    <WithLabel label={label} name={name}>
      <input
        className={classes}
        name={name}
        id={`${props.value}-numberinput`}
        type="number"
        min={min}
        max={max}
        onChange={onChange}
        {...props}
      />
    </WithLabel>
  )
}