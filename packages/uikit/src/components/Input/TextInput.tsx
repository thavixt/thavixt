import classNames from "classnames";
import { CommonProps } from "../../common/commonProps";
import { WithLabel } from "../../common/WithLabel";
import { RefObject } from "react";
import { themedClasses } from "../../common/theme";

export interface TextInputProps extends CommonProps<HTMLInputElement | HTMLTextAreaElement> {
  value?: string;
  defaultValue?: string;
  name?: string;
  onChange?: (value: string) => void;
  type?: 'input' | 'textarea',
}

export function TextInput({ ref, type = 'input', onChange: providedOnChange, name, ...props }: TextInputProps) {
  const classes = classNames(
    'px-1 w-full',
    'border rounded-sm',
    themedClasses,
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
          id={`${props.value}-textinput`}
          className={classes}
          name={name}
          type="text"
          onChange={onChange}
          {...props}
        />
      ) : (
        <textarea
          ref={ref as RefObject<HTMLTextAreaElement>}
          id={`${props.value}-textarea`}
          className={classes}
          name={name}
          onChange={onChange}
          {...props}
        />
      )}
    </WithLabel>
  )
}
