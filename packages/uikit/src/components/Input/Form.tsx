import { PropsWithChildren, useRef, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import { Button } from "../Basic/Button";
import { HorizontalRule } from "../Basic/HorizontalRule";
import classNames from "classnames";

export interface FormProps extends PropsWithChildren<CommonProps<HTMLFormElement>> {
  cancel?: string,
  reset?: string,
  submit?: string,

  onCancel?: () => void | Promise<void>,
  onSubmit?: (values: Record<string, FormDataEntryValue>) => void | Promise<void>,
  onSubmitSuccess?: (values: Record<string, FormDataEntryValue>) => void | Promise<void>,
}

export function Form({
  cancel,
  children,
  className,
  ref,
  reset,
  submit,
  onCancel: onFormCancel,
  onSubmit: providedOnSubmit,
  onSubmitSuccess,
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
      setError(`${error.name} - ${error.message}`);
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
              <HorizontalRule />
              <p className="dark:text-red-400 text-red-700">{error}</p>
            </>
          ) : null}
          <div className="flex space-x-2 justify-between">
            <div className="flex space-x-2">
              {cancel ? (
                <Button variant="default" onClick={onCancel} disabled={loading}>
                  {typeof cancel === 'string' ? cancel : 'Cancel'}
                </Button>
              ) : null}
              <Button variant="default" type="reset" disabled={loading}>
                {reset ?? 'Reset'}
              </Button>
            </div>
            <Button type="submit" variant="primary" loading={loading}>
              {submit ?? 'Submit'}
            </Button>
          </div>
        </div>
      </fieldset>
    </form>
  )
}
