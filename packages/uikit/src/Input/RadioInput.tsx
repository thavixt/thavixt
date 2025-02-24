import classNames from "classnames";
import { CommonProps } from "../common/commonProps";

export interface RadioInputProps extends Omit<CommonProps<HTMLFieldSetElement>, 'children'> {
  value?: string;
  defaultValue?: string;
  values: string[];
  label: string;
  /**
   * also a `name` to associate with a `<form>`
   */
  name: string;
  onChange?: (chekedId: string) => void;
}

export function RadioInput(props: RadioInputProps) {
  const classes = classNames(
    'border rounded-sm border-slate-500',
    'px-2 pb-1',
    props.className,
  );

  const onChange: React.FormEventHandler<HTMLFieldSetElement> = (e) => {
    props.onChange?.((e.target as HTMLInputElement).id);
  }

  return (
    <fieldset className={classes} onChange={onChange} ref={props.ref}>
      <legend>&nbsp;{props.label}&nbsp;</legend>
      {props.values.map(value => (
        <Radio
          key={value}
          name={props.name}
          value={value}
          checked={props.value === value ? true : undefined}
          defaultChecked={props.defaultValue === value}
        />
      ))}
    </fieldset>
  )
}

interface RadioProps extends CommonProps {
  name: string;
  value: string;
  checked?: boolean;
  defaultChecked?: boolean;
}

function Radio(props: RadioProps) {
  const classes = classNames(
    'flex space-x-2',
    props.className,
  );

  return (
    <div className={classes}>
      <input
        type="radio"
        id={props.value}
        name={props.name}
        value={props.value}
        checked={props.checked}
        defaultChecked={props.defaultChecked}
        required
      />
      <label htmlFor={props.value}>{props.value}</label>
    </div>
  )
}