import classNames from "classnames";
import { PropsWithChildren, useRef, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import { Button } from "../Button/Button";
import { ButtonBar } from "../ButtonBar/ButtonBar";
import { Typography } from "../Typography/Typography";

export interface FormProps extends PropsWithChildren<Omit<CommonProps<HTMLFormElement>, 'onSubmit'>> {
  border?: boolean;
  cancelText?: string;
  resetText?: string;
  submitText?: string;
  /* allow submitting multiple times - do not disable on a successful submission */
  submitMultiple?: boolean;

  onCancel?: () => void | Promise<void>,
  onSubmit?: (values: Record<string, number | string>) => void | Promise<void>;
  onSubmitSuccess?: (values: Record<string, number | string>) => void | Promise<void>;
  onSubmitError?: (error: Error, values: Record<string, number | string>) => void | Promise<void>;
}

export function Form({
  border,
  cancelText = 'Cancel',
  resetText = 'Reset',
  submitText = 'Submit',
  submitMultiple,
  children,
  className,
  ref,
  onCancel: onFormCancel,
  onSubmit: providedOnSubmit,
  onSubmitSuccess,
  onSubmitError,
  ...props
}: FormProps) {
  const formName = useRef(`dialogForm_${crypto.randomUUID().slice(0, 8)}`);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formElement = document.forms.namedItem(formName.current)!;
    // TODO: fix type - form entries / values
    const formData = Object.fromEntries(new FormData(formElement).entries()) as Record<string, string | number>;
    try {
      setError(null);
      setLoading(true);
      setSuccess(false);
      await providedOnSubmit?.(formData);
      setLoading(false);
      setSuccess(true);
      await onSubmitSuccess?.(formData);
    } catch (e) {
      setSuccess(false);
      const error = e as Error;
      console.warn(e);
      const name = error.name ?? '';
      const message = error.message ?? 'Something went wrong :(';
      setError(`${name} - ${message}`);
      onSubmitError?.(error, formData);
      setLoading(false);
      return;
    }
  }

  const onCancel = () => {
    setError(null);
    setSuccess(false);
    onFormCancel?.();
  };

  const onReset: React.FormEventHandler<HTMLFormElement> = (e) => {
    props.onReset?.(e);
    setError(null);
    setSuccess(false);
  };

  const successLock = submitMultiple ? false : success;
  const disabled = loading || successLock;
  return (
    <form
      data-testid="Form"
      ref={ref}
      className={classNames(className, 'group rounded-md', { 'p-4 border border-slate-300 dark:border-slate-600': border })}
      id={formName.current}
      method="dialog"
      onSubmit={onSubmit}
      onReset={onReset}
      {...props}
    >
      <fieldset disabled={loading}>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            {children}
          </div>
          {error ? (
            <>
              <div className="border-l-4 border-red-500 dark:text-red-400 pl-2">
                <Typography.Text className="text-red-500 dark:text-red-400">{error}</Typography.Text>
              </div>
            </>
          ) : null}
          <ButtonBar>
            {onFormCancel ? (
              <Button variant="default" onClick={onCancel} disabled={disabled}>
                {cancelText}
              </Button>
            ) : null}
            <Button variant="default" type="reset" disabled={loading}>
              {resetText}
            </Button>
            <Button type="submit" variant="primary" loading={loading} success={success} disabled={disabled}>
              {submitText}
            </Button>
          </ButtonBar>
        </div>
      </fieldset>
    </form>
  )
}
