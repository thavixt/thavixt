import classNames from "classnames";
import { RefObject } from "react";
import { CommonProps } from "../../common/commonProps";
import { themedTextClasses } from "../../common/theme";
import { WithLabel } from "../../common/WithLabel";

export interface RadioInputProps extends Omit<CommonProps<HTMLFieldSetElement>, 'children' | 'onChange'> {
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

export function RadioInput({ required, ref, ...props }: RadioInputProps) {
  const classes = classNames(
    'w-fit grid grid-cols-[minmax(106px,auto)_auto]',
    themedTextClasses,
    props.className,
  );

  const onChange: React.FormEventHandler<HTMLFieldSetElement> = (e) => {
    props.onChange?.((e.target as HTMLInputElement).id);
  }

  return (
    <fieldset data-testid="RadioInput" onChange={onChange} ref={ref}>
      <div className={classes}>
        <WithLabel required={required} label={props.label} className="items-start">
          <div className="flex flex-col space-y-0.5">
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
        </WithLabel>
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
    'flex space-x-1.5 items-center',
    props.className,
  );
  const radioClasses = classNames(
    'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600',
  );

  const id = `${props.name}_${props.value}-radio`;

  // TODO: tabindex, accessibility
  return (
    <div className={classes}>
      <input
        data-testid={`RadioInput_${props.value}`}
        checked={props.checked}
        className={radioClasses}
        defaultChecked={props.defaultChecked}
        id={id}
        name={props.name}
        ref={props.ref}
        required={props.required}
        type="radio"
        value={props.value}
      />
      <label className="min-w-24 mb-0.5" htmlFor={id}>{props.value}</label>
    </div>
  )
}