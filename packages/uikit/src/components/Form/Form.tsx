import classNames from "classnames";
import { PropsWithChildren, useRef, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import { Button } from "../Button/Button";
import { ButtonBar } from "../ButtonBar/ButtonBar";
import { Typography } from "../Typography/Typography";
import "./Form.css";

export interface FormProps extends PropsWithChildren<Omit<CommonProps<HTMLFormElement>, 'onSubmit'>> {
  border?: boolean;
  cancelText?: string;
  resetText?: string;
  submitText?: string;
  /* allow submitting multiple times - do not disable on a successful submission */
  submitMultiple?: boolean;
  /* text of `<legend>` in `<fieldset>` */
  title?: string;

  onCancel?: () => void | Promise<void>,
  onSubmit?: (values: Record<string, number | string>) => void | Promise<void>;
  onSubmitSuccess?: (values: Record<string, number | string>) => void | Promise<void>;
  onSubmitError?: (error: Error, values: Record<string, number | string>) => void | Promise<void>;
}

export function Form({
  ref,
  children,
  className,
  id,
  title,
  border,
  cancelText = 'Cancel',
  resetText = 'Reset',
  submitText = 'Submit',
  submitMultiple,
  onCancel: onFormCancel,
  onSubmit: providedOnSubmit,
  onSubmitSuccess,
  onSubmitError,
  ...props
}: FormProps) {
  const formName = useRef(`dialogForm_${id ?? crypto.randomUUID().slice(0, 8)}`);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formElement = document.forms.namedItem(formName.current)!;
    // TODO: fix type - form entries / values
    const formData = Object.fromEntries(new FormData(formElement).entries()) as Record<string, string | number>;
    try {
      setLoading(true);
      setSuccess(false);
      await providedOnSubmit?.(formData);
      setError(null);
      setLoading(false);
      setSuccess(true);
      await onSubmitSuccess?.(formData);
    } catch (e) {
      setSuccess(false);
      const error = e as Error;
      console.warn(e);
      const name = error.name ?? '';
      const message = error.message ?? 'Something went wrong :(';
      setError(`${name}: ${message}`);
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
      className={classNames('Form group', className)}
      id={formName.current}
      method="dialog"
      onSubmit={onSubmit}
      onReset={onReset}
      {...props}
    >
      <fieldset className={border ? 'Form--fieldset' : undefined} disabled={loading}>
        <legend>
          <Typography.Label>{title}</Typography.Label>
        </legend>
        <div className="Form--container">
          <div className="Form--content">{children}</div>
          {error ? (
            <Typography.Body className={classNames("Form--error", disabled && "Form--error--disabled")}>
              {error}
            </Typography.Body>
          ) : null}
          <ButtonBar className="Form--buttons" full>
            {onFormCancel ? (
              <Button onClick={onCancel} disabled={disabled}>
                {cancelText}
              </Button>
            ) : null}
            <Button type="reset" disabled={disabled}>
              {resetText}
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              success={success}
              disabled={disabled}
            >
              {submitText}
            </Button>
          </ButtonBar>
        </div>
      </fieldset>
    </form>
  )
}
