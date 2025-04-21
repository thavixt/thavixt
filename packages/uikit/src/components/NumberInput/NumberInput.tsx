import classNames from "classnames";
import { CommonProps } from "../../common/commonProps";
import { WithLabel } from "../../common/WithLabel";
import "./NumberInput.css";

export interface NumberInputProps extends Omit<CommonProps<HTMLInputElement>, 'children' | 'onChange'> {
  value?: number;
  defaultValue?: number;
  name: string;
  label?: string;
  max?: number;
  min?: number;
  placeholder?: string;
  required?: boolean;
  inline?: boolean;

  onChange?: (value: number) => void;
}

export function NumberInput({ ref, required, name, label, min, max, onChange: providedOnChange, inline, ...props }: NumberInputProps) {
  const id = `${crypto.randomUUID().slice(0, 4)}_${name}-number`;
  const classes = classNames("NumberInput", props.className);

  const contrainValue = (value: string | number) => {
    let result = +value;
    if (min) {
      result = Math.max(result, min);
    }
    if (max) {
      result = Math.min(result, max);
    }
    return result;
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = contrainValue(e.currentTarget.value);
    providedOnChange?.(value);
  }

  const onBlur: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = contrainValue(e.target.value ?? '0');
    const input = document.getElementById(id) as HTMLInputElement;
    input.value = `${value}`;
  }

  return (
    <WithLabel data-testid="NumberInput" label={label} id={id} required={required} inline={inline}>
      <input
        ref={ref}
        required={required}
        className={classes}
        name={name}
        id={id}
        type="number"
        min={min}
        max={max}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
    </WithLabel>
  )
}