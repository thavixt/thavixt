import classNames from "classnames";
import { PropsWithChildren, useRef, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import { Button } from "../Basic/Button";
import { HorizontalRule } from "../Basic/HorizontalRule";

interface DialogProps extends PropsWithChildren<CommonProps<HTMLDialogElement>> {
  cancelBtn?: React.ReactElement,
  resetBtn?: React.ReactElement,
  submitBtn?: React.ReactElement,

  onCancel?: () => void | Promise<void>,
  onSubmit: (values: Record<string, FormDataEntryValue>) => void | Promise<void>,
}

export function Form(props: DialogProps) {
  const {
    cancelBtn: cancel,
    submitBtn: submit,
    resetBtn: reset,
    onSubmit: providedOnSubmit,
    onCancel: onFormCancel,
    children,
    ref,
  } = props;
  const formName = useRef(`dialogForm_${crypto.randomUUID().slice(0, 8)}`);
  const [error, setError] = useState<string | null>(null)

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formElement = document.forms.namedItem(formName.current)!;
    const formData = Object.fromEntries(new FormData(formElement).entries());
    try {
      providedOnSubmit(formData);
    } catch (e) {
      const error = e as Error;
      console.warn(e);
      setError(`${error.name} - ${error.message}`);
      return;
    }
    setError(null);
    if (ref) {
      ref.current?.close();
    }
  }


  const onCancel = () => {
    setError(null);
    onFormCancel?.();
    if (ref) {
      ref.current?.close();
    }
  };

  const classes = classNames(
    props.className,
  );

  const onReset: React.FormEventHandler<HTMLFormElement> = (e) => {
    if (!confirm("Are you sure you want to reset the form?")) {
      e.preventDefault();
    }
  }

  return (
    <form className={classes} id={formName.current} method="dialog" onSubmit={onSubmit} onReset={onReset}>
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
            <Button variant="default" onClick={onCancel}>{cancel ?? 'Cancel'}</Button>
            <Button variant="default" type="reset">{reset ?? 'Reset'}</Button>
          </div>
          <Button type="submit" variant="primary">{submit ?? 'Submit'}</Button>
        </div>
      </div>
    </form>
  )
}
