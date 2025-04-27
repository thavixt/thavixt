import classNames from "classnames";
import { CommonProps } from "../../common/commonProps";
import { WithLabel } from "../../common/WithLabel";
import { Typography } from "../Typography/Typography";
import "./RadioInput.css"

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
  onChange?: (value: string) => void;
  inline?: boolean;
  disabled?: boolean;
}

export function RadioInput({ disabled, required, ref, inline, onChange, ...props }: RadioInputProps) {
  const classes = classNames('RadioInput', props.className,);

  return (
    <fieldset data-testid="RadioInput" ref={ref} disabled={disabled}>
      <div className={classes}>
        <WithLabel required={required} label={props.label} inline={inline}>
          <div className={classNames('RadioInput__RadioList', inline ?? 'RadioInput__RadioList--inline')}>
            {props.values.map(value => (
              <Radio
                key={value}
                checked={props.value === value ? true : undefined}
                defaultChecked={props.defaultValue === value}
                name={props.name}
                onChange={() => onChange?.(value)}
                value={value}
              />
            ))}
          </div>
        </WithLabel>
      </div>
    </fieldset>
  )
}

interface RadioProps {
  checked?: boolean;
  defaultChecked?: boolean;
  name: string;
  required?: boolean;
  value: string;
  onChange?: () => void;
}

function Radio(props: RadioProps) {
  const id = `${props.name}_${props.value}-radio`;

  // TODO: tabindex, accessibility
  return (
    <div className='RadioWrapper'>
      <input
      className="Radio"
        data-testid={`RadioInput_${props.value}`}
        id={id}
        type="radio"
        {...props}
      />
      <Typography type="label" htmlFor={id}>
        {props.value}
      </Typography>
    </div>
  )
}