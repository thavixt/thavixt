import classNames from "classnames";
import { CommonProps } from "../common/commonProps";
import { WithLabel } from "../common/WithLabel";
import { RefObject } from "react";
import { themedInputClasses } from "../common/theme";

export interface TextInputProps extends CommonProps<HTMLInputElement | HTMLTextAreaElement> {
  defaultValue?: string;
  label?: string;
  name: string;
  placeholder?: string;
  type?: 'input' | 'textarea',
  value?: string;
  required?: boolean;

  onChange?: (value: string) => void;
}

export function TextInput({ required, label, ref, type = 'input', onChange: providedOnChange, name, ...props }: TextInputProps) {
  const classes = classNames(
    'px-1 w-full',
    'border rounded-sm',
    themedInputClasses,
    {
      'h-20 py-1': type === 'textarea',
    },
    props.className,
  );

  const onChange: React.FormEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    providedOnChange?.(e.currentTarget.value);
  }

  const id = `${name}-text`;

  return (
    <WithLabel label={label} id={id} required={required}>
      {type === 'input' ? (
        <input
          ref={ref as RefObject<HTMLInputElement>}
          id={id}
          className={classes}
          name={name}
          type="text"
          onChange={onChange}
          required={required}
          {...props}
        />
      ) : (
        <textarea
          ref={ref as RefObject<HTMLTextAreaElement>}
          id={id}
          className={classes}
          name={name}
          onChange={onChange}
          required={required}
          {...props}
        />
      )}
    </WithLabel>
  )
}
