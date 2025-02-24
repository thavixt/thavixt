import classNames from "classnames";
import { CommonProps } from "../common/commonProps";
import { WithLabel } from "../common/WithLabel";

export interface TextInputProps extends Omit<CommonProps, 'children'> {
  value?: number;
  defaultValue?: number;
  name?: string;
  onChange?: (value: string) => void;
  type?: 'input' | 'textarea',
}

export function TextInput({ type = 'input', onChange: providedOnChange, name, ...props }: TextInputProps) {
  const classes = classNames(
    'text-black border rounded-md border-slate-600',
    'px-1 w-full',
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
          className={classes}
          name={name}
          type="text"
          onChange={onChange}
          {...props}
        />
      ) : (
        <textarea
          className={classes}
          name={name}
          onChange={onChange}
          {...props}
        />
      )}
    </WithLabel>
  )
}
