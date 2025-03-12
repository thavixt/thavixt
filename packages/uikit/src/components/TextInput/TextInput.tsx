import classNames from "classnames";
import { RefObject } from "react";
import { CommonProps } from "../../common/commonProps";
import { themedInputClasses } from "../../common/theme";
import { WithLabel } from "../../common/WithLabel";

export interface TextInputProps extends Omit<CommonProps<HTMLInputElement | HTMLTextAreaElement>, 'children' | 'onChange'> {
  defaultValue?: string;
  disabled?: boolean;
  label?: string;
  name: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  type?: 'input' | 'textarea',
  value?: string;

  onChange?: (value: string) => void;
}

export function TextInput({
  disabled,
  label,
  name,
  onChange: providedOnChange,
  readonly,
  ref,
  required,
  type = 'input',
  ...props
}: TextInputProps) {
  const classes = classNames(
    'px-2 w-full',
    'border rounded-sm',
    themedInputClasses,
    {
      'py-1 resize-none': type === 'textarea',
    },
    props.className,
  );

  const onChange: React.FormEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    providedOnChange?.(e.currentTarget.value);
  }

  const id = `${name}-text`;

  return (
    <WithLabel data-testid="TextInput" label={label} id={id} required={required}>
      {type === 'input' ? (
        <input
          ref={ref as RefObject<HTMLInputElement>}
          id={id}
          className={classes}
          name={name}
          type="text"
          onChange={onChange}
          required={required}
          disabled={disabled}
          readOnly={readonly}
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
          rows={3}
          disabled={disabled}
          readOnly={readonly}
          {...props}
        />
      )}
    </WithLabel>
  )
}
