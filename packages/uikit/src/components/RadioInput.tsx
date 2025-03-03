import classNames from "classnames";
import { CommonProps } from "../common/commonProps";
import { themedTextClasses } from "../common/theme";
import { RefObject } from "react";
import { Label } from "../common/WithLabel";

export interface RadioInputProps extends Omit<CommonProps<HTMLFieldSetElement>, 'children'> {
  defaultValue?: string;
  label?: string;
  /**
   * also a `name` to associate with a `<form>`
   */
  name: string;
  value?: string;
  values: string[];
  required?: boolean;
  onChange?: (chekedId: string) => void;
}

export function RadioInput({required, ref, ...props}: RadioInputProps) {
  const classes = classNames(
    'w-fit grid grid-cols-[minmax(106px,auto)_auto]',
    themedTextClasses,
    props.className,
  );

  const onChange: React.FormEventHandler<HTMLFieldSetElement> = (e) => {
    props.onChange?.((e.target as HTMLInputElement).id);
  }

  return (
    <fieldset onChange={onChange} ref={ref}>
      <div className={classes}>
        {props.label ? <Label id="name" required={required}>{props.label}</Label> : null}
        <div className="flex flex-col">
          {props.values.map(value => (
            <Radio
              checked={props.value === value ? true : undefined}
              defaultChecked={props.defaultValue === value}
              key={value}
              name={props.name}
              value={value}
            />
          ))}
        </div>
      </div>
    </fieldset>
  )
}

interface RadioProps extends Partial<HTMLInputElement> {
  checked?: boolean;
  defaultChecked?: boolean;
  name: string;
  ref?: RefObject<HTMLInputElement | null>;
  required?: boolean;
  value: string;
}

function Radio(props: RadioProps) {
  const classes = classNames(
    'flex space-x-2',
    props.className,
  );

  const id = `${props.name}_${props.value}-radio`;

  return (
    <div className={classes}>
      <input
        checked={props.checked}
        defaultChecked={props.defaultChecked}
        id={id}
        name={props.name}
        ref={props.ref}
        required={props.required}
        type="radio"
        value={props.value}
      />
      <label className="min-w-24" htmlFor={id}>{props.value}</label>
    </div>
  )
}