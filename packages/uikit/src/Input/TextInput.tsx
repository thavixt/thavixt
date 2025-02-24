import classNames from "classnames";
import { CommonProps } from "../common/commonProps";
import { WithLabel } from "../common/WithLabel";
import { RefObject } from "react";

export interface TextInputProps extends Omit<CommonProps<HTMLInputElement | HTMLTextAreaElement>, 'children'> {
  value?: string;
  defaultValue?: string;
  name?: string;
  onChange?: (value: string) => void;
  type?: 'input' | 'textarea',
}

export function TextInput({ ref, type = 'input', onChange: providedOnChange, name, ...props }: TextInputProps) {
  const classes = classNames(
    'text-black border rounded-sm border-slate-600',
    'px-1 w-full bg-slate-200',
    {
      'h-20 py-1': type === 'textarea',
    },
    props.className,
  );

  const onChange: React.FormEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    providedOnChange?.(e.currentTarget.value);
  }

  return (
    <WithLabel label="Label" name={name}>
      {type === 'input' ? (
        <input
          ref={ref as RefObject<HTMLInputElement>}
          className={classes}
          name={name}
          type="text"
          onChange={onChange}
          {...props}
        />
      ) : (
        <textarea
          ref={ref as RefObject<HTMLTextAreaElement>}
          className={classes}
          name={name}
          onChange={onChange}
          {...props}
        />
      )}
    </WithLabel>
  )
}
