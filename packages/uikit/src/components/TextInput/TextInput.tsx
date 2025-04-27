import classNames from "classnames";
import { RefObject } from "react";
import { CommonProps } from "../../common/commonProps";
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
  inline?: boolean;

  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
}

export function TextInput({
  silent,
  label,
  id = `textinput-${crypto.randomUUID().slice(0, 4)}`,
  ref,
  required,
  type = 'text',
  onChange: providedOnChange,
  onEnter,
  onKeyDown: providedOnKeyDown,
  inline,
  ...props
}: TextInputProps) {
  const classes = classNames(
    'px-2 w-full',
    silent
      ? "text-slate-600 dark:text-slate-50 placeholder:text-slate-400 bg-transparent border-b-2 border-gray-400 dark:border-gray-300"
      : 'themedInput themedBorder ',
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

  return (
    <WithLabel data-testid="TextInput" label={label} id={id} required={required} inline={inline}>
      {['text', 'search'].includes(type) ? (
        <input
          ref={ref as RefObject<HTMLInputElement>}
          className={classes}
          id={id}
          onChange={onChange}
          onKeyDown={onKeyDown}
          {...props}
        />
      ) : (
        <textarea
          ref={ref as RefObject<HTMLTextAreaElement>}
          id={id}
          onChange={onChange}
          rows={3}
          onKeyDown={onKeyDown}
          {...props}
        />
      )}
    </WithLabel>
  )
}
