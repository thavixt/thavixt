import classNames from "classnames";
import { CommonProps } from "../../common/commonProps";
import { WithLabel } from "../../common/WithLabel";

export interface SelectProps<T extends Record<string, string>>
  extends Omit<CommonProps<HTMLSelectElement>, 'children'> {
  defaultValue?: keyof T;
  disabled?: boolean;
  label?: string;
  name?: string;
  onChange?: (value: keyof T) => void;
  placeholder?: string;
  value?: keyof T;
  options: T;
}

export function Select<T extends Record<string, string>>({
  defaultValue,
  disabled,
  label,
  name,
  onChange: providedOnChange,
  options,
  placeholder,
  ref,
  value,
  ...props
}: SelectProps<T>) {
  const classes = classNames(
    'text-black border rounded-sm border-slate-600',
    'bg-slate-100 text-center w-fit text-left',
    props.className,
  );

  const onChange: React.FormEventHandler<HTMLSelectElement> = (e) => {
    providedOnChange?.(e.currentTarget.value as keyof T);
  }

  return (
    <WithLabel label={label} name={name}>
      <select
        ref={ref}
        className={classes}
        disabled={disabled}
        name={name}
        id={`${name}-select`}
        onChange={onChange}
        defaultValue={defaultValue as string}
        value={value as string}
      >
        <option value="">{placeholder ?? '-- Choose an option --'}</option>
        {Object.entries(options).map(([key, value]) => (
          <option value={key}>{value}</option>
        ))}
      </select>
    </WithLabel>
  )
}