import classNames from "classnames";
import { CommonProps } from "../../common/commonProps";
import { themedTextClasses } from "../../common/theme";
import { WithLabel } from "../../common/WithLabel";

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
    'px-1 pl-2 w-fit',
    themedTextClasses,
    props.className,
  );

  const onChange: React.FormEventHandler<HTMLFieldSetElement> = (e) => {
    props.onChange?.((e.target as HTMLInputElement).id);
  }

  return (
    <fieldset className={classes} onChange={onChange} ref={props.ref}>
      <legend>{props.label}:</legend>
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

  const id = `${props.name}-radio`;

  return (
    <div className={classes}>
      <WithLabel id={id} label={props.value}>
      <input
        type="radio"
        id={id}
        name={props.name}
        value={props.value}
        checked={props.checked}
        defaultChecked={props.defaultChecked}
        required
      />
      </WithLabel>
    </div>
  )
}