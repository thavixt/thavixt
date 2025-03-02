import { PropsWithChildren, useRef, useState } from "react";
import { CommonProps } from "../common/commonProps";
import { Button } from "./Button";
import { Divider } from "./Divider";
import classNames from "classnames";

export interface FormProps extends PropsWithChildren<CommonProps<HTMLFormElement>> {
  cancelText?: string,
  resetText?: string,
  submitText?: string,

  onCancel?: () => void | Promise<void>,
  onSubmit?: (values: Record<string, FormDataEntryValue>) => void | Promise<void>,
  onSubmitSuccess?: (values: Record<string, FormDataEntryValue>) => void | Promise<void>,
  onSubmitError?: (error: Error, values: Record<string, FormDataEntryValue>) => void | Promise<void>,
}

export function Form({
  cancelText,
  resetText,
  submitText,
  children,
  className,
  ref,
  onCancel: onFormCancel,
  onSubmit: providedOnSubmit,
  onSubmitSuccess,
  onSubmitError,
}: FormProps) {
  const formName = useRef(`dialogForm_${crypto.randomUUID().slice(0, 8)}`);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formElement = document.forms.namedItem(formName.current)!;
    const formData = Object.fromEntries(new FormData(formElement).entries());
    try {
      setLoading(true);
      await providedOnSubmit?.(formData);
      setLoading(false);
      await onSubmitSuccess?.(formData);
    } catch (e) {
      const error = e as Error;
      console.warn(e);
      const name = error.name ?? 'Error'
      const message = error.message ?? 'Something went wrong :('
      setError(`${name} - ${message}`);
      onSubmitError?.(error, formData);
      setLoading(false);
      return;
    }
    setError(null);
  }

  const onCancel = () => {
    setError(null);
    onFormCancel?.();
  };

  const onReset: React.FormEventHandler<HTMLFormElement> = (e) => {
    if (!confirm("Are you sure you want to reset the form?")) {
      e.preventDefault();
      return;
    }
    setError(null);
  }

  return (
    <form ref={ref} className={classNames(className, 'group')} id={formName.current} method="dialog" onSubmit={onSubmit} onReset={onReset}>
      <fieldset disabled={loading}>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            {children}
          </div>
          {error ? (
            <>
              <Divider />
              <p className="dark:text-red-400 text-red-700">{error}</p>
            </>
          ) : null}
          <div className="flex space-x-2 justify-between">
            <div className="flex space-x-2">
              {onFormCancel ? (
                <Button variant="default" onClick={onCancel} disabled={loading}>
                  {typeof cancelText === 'string' ? cancelText : 'Cancel'}
                </Button>
              ) : null}
              <Button variant="default" type="reset" disabled={loading}>
                {resetText ?? 'Reset'}
              </Button>
            </div>
            <Button type="submit" variant="primary" loading={loading}>
              {submitText ?? 'Submit'}
            </Button>
          </div>
        </div>
      </fieldset>
    </form>
  )
}
