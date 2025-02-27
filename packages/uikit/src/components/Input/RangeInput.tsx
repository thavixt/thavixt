import classNames from "classnames";
import { CommonProps } from "../../common/commonProps";
import { WithLabel } from "../../common/WithLabel";
import { ReactElement, useEffect, useState } from "react";
import { themedInputClasses } from "../../common/theme";

export interface RangeInputProps extends Omit<CommonProps<HTMLFieldSetElement>, 'children'> {
  defaultValue?: number;
  label?: string;
  max: number;
  min: number;
  step?: number;
  disabled?: boolean;
  /**
   * also a `name` to associate with a `<form>`
   */
  name: string;
  value?: number;
  transformValue?: (value: number, min: number, max: number) => string | number;

  /**
   * element to render after the input
   */
  after?: (value: string | number, min: number, max: number) => ReactElement;
  /**
   * element to render before the input
   */
  before?: (value: string | number, min: number, max: number) => ReactElement;
  onChange?: (value: number, transformedValue: string | number) => void;

  /** Display vertically */
  vertical?: boolean;
  /** (default `true`) Display the current input value */
  showValue?: boolean;
}

export function RangeInput({ showValue = true, ...props }: RangeInputProps) {
  const classes = classNames(
    'flex space-x-2 bg-slate-400 rounded-md h-2 disabled:opacity-50',
    themedInputClasses,
    props.className,
  );

  const [currentValue, setCurrentValue] = useState(props.defaultValue ?? props.value ?? 0);

  const getValue = (v: number): number | string => {
    if (props.transformValue) {
      return props.transformValue(v, props.min, props.max);
    }
    return v;
  }
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = +e.target.value;
    setCurrentValue(v);
    props.onChange?.(v, getValue(v));
  }

  useEffect(() => {
    if (props.value) {
      setCurrentValue(props.value);
    }
  }, [props.value])

  return (
    <div className="flex space-x-2">
      <WithLabel label={props.label} id={props.name}>
        <div className="flex space-x-1 items-center">
          {props.before?.(getValue(currentValue), props.min, props.max)}
          <input
            // required
            className={classes}
            defaultValue={typeof props.value === 'undefined' ? props.defaultValue : undefined}
            disabled={props.disabled}
            max={props.max}
            min={props.min}
            name={props.name}
            id={`${props.name}-range`}
            onChange={onChange}
            step={props.step}
            type="range"
            value={props.value}
          />
          {props.after?.(getValue(currentValue), props.min, props.max)}
        </div>
        {showValue ? <small className="">{getValue(currentValue)}</small> : null}
      </WithLabel>
    </div>
  )
}