import classNames from "classnames";
import { PropsWithChildren, useRef, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import { Button } from "../Button/Button";
import { Divider } from "../Divider/Divider";
import { Icon } from "../Icon/Icon";

export interface FormProps extends PropsWithChildren<Omit<CommonProps<HTMLFormElement>, 'onSubmit'>> {
  border?: boolean;
  cancelText?: string,
  resetText?: string,
  submitText?: string,

  onCancel?: () => void | Promise<void>,
  onSubmit?: (values: Record<string, FormDataEntryValue>) => void | Promise<void>,
  onSubmitSuccess?: (values: Record<string, FormDataEntryValue>) => void | Promise<void>,
  onSubmitError?: (error: Error, values: Record<string, FormDataEntryValue>) => void | Promise<void>,
}

export function Form({
  border,
  cancelText = 'Cancel',
  resetText = 'Reset',
  submitText = 'Submit',
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
  const [success, setSuccess] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formElement = document.forms.namedItem(formName.current)!;
    const formData = Object.fromEntries(new FormData(formElement).entries());
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
    setSuccess(false);
    onFormCancel?.();
  };

  const onReset: React.FormEventHandler<HTMLFormElement> = (e) => {
    if (!confirm("Are you sure you want to reset the form?")) {
      e.preventDefault();
      return;
    }
    setError(null);
    setSuccess(false);
  }

  const disabled = loading || success;

  return (
    <form data-testid="Form" ref={ref} className={classNames(className, 'group rounded-md', { 'p-4 border border-slate-300 dark:border-slate-600': border })} id={formName.current} method="dialog" onSubmit={onSubmit} onReset={onReset}>
      <fieldset disabled={disabled}>
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
                <Button variant="default" onClick={onCancel} disabled={disabled}>
                  {cancelText}
                </Button>
              ) : null}
              <Button variant="default" type="reset" disabled={disabled}>
                {resetText}
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button type="submit" variant="primary" loading={loading} disabled={disabled}>
                {success ? <Icon icon="Check" /> : submitText}
              </Button>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  )
}
