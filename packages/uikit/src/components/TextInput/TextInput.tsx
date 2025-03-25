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
  type?: 'text' | 'search' | 'textarea',
  value?: string;
  silent?: boolean;
  
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
}

export function TextInput({
  silent,
  disabled,
  label,
  name,
  readonly,
  ref,
  required,
  type = 'text',
  onChange: providedOnChange,
  onEnter,
  onKeyDown: providedOnKeyDown,
  ...props
}: TextInputProps) {
  const classes = classNames(
    'px-2 w-full',
    silent ? "bg-transparent border-b-2 border-gray-400 dark:border-gray-300" : themedInputClasses,
    {
      'py-1 resize-none': type === 'textarea',
    },
    props.className,
  );

  const onChange: React.FormEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    providedOnChange?.(e.currentTarget.value);
  }
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter') {
      providedOnKeyDown?.(e);
      onEnter?.(e.currentTarget.value);
    }
  }

  const id = `${name}-text`;

  return (
    <WithLabel data-testid="TextInput" label={label} id={id} required={required}>
      {['text', 'search'].includes(type) ? (
        <input
          ref={ref as RefObject<HTMLInputElement>}
          id={id}
          className={classes}
          name={name}
          type={type}
          onChange={onChange}
          required={required}
          disabled={disabled}
          readOnly={readonly}
          onKeyDown={onKeyDown}
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
          onKeyDown={onKeyDown}
          {...props}
        />
      )}
    </WithLabel>
  )
}
