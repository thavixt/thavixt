import classNames from "classnames";
import { CommonProps } from "../../common/commonProps";
import { WithLabel } from "../../common/WithLabel";
import "./RadioInput.css"
import { Typography } from "../Typography/Typography";

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
  inline?: boolean;
  disabled?: boolean;
}

export function RadioInput({ disabled, required, ref, inline, ...props }: RadioInputProps) {
  const classes = classNames('RadioInput', props.className,);

  const onChange: React.FormEventHandler<HTMLFieldSetElement> = (e) => {
    props.onChange?.((e.target as HTMLInputElement).id);
  }

  return (
    <fieldset data-testid="RadioInput" onChange={onChange} ref={ref} disabled={disabled}>
      <div className={classes}>
        <WithLabel required={required} label={props.label} inline={inline}>
          <div className="RadioInput__RadioList">
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

interface RadioProps {
  checked?: boolean;
  defaultChecked?: boolean;
  name: string;
  required?: boolean;
  value: string;
}

function Radio({ ...props }: RadioProps) {
  const id = `${name}_${props.value}-radio`;

  // TODO: tabindex, accessibility
  return (
    <div className='RadioWrapper'>
      <input
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