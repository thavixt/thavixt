import classNames from "classnames";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Button } from "../Button/Button";
import { CommonProps } from "../../common/commonProps";

interface DialogProps extends PropsWithChildren<CommonProps<HTMLDialogElement>> {
  defaultOpen?: boolean,
  title: string;

  cancelBtn?: React.ReactElement,
  resetBtn?: React.ReactElement,
  submitBtn?: React.ReactElement,
  
  onCancel?: () => void | Promise<void>,
  onSubmit: (values: Record<string, FormDataEntryValue>) => void | Promise<void>,
}

export function FormDialog(props: DialogProps) {
  const {
    cancelBtn: cancel,
    submitBtn: submit,
    resetBtn: reset,
    onSubmit,
    onCancel: onDialogCancel,
    children,
    title,
    ref,
  } = props;
  const dialogFormName = useRef(`dialogForm_${crypto.randomUUID().slice(0, 8)}`);
  const [error, setError] = useState<string | null>(null)

  const onSubmitDialog: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formElement = document.forms.namedItem(dialogFormName.current)!;
    const formData = Object.fromEntries(new FormData(formElement).entries());
    try {
      onSubmit(formData);
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

  useEffect(() => {
    if (props.defaultOpen && ref?.current) {
      ref.current?.showModal();
    }
  }, [props.defaultOpen, ref]);

  const onCancel = () => {
    setError(null);
    onDialogCancel?.();
    if (ref) {
      ref.current?.close();
    }
  };

  const classes = classNames(
    "m-auto p-6 rounded-lg border-2 border-slate-500 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-md w-fit max-w-[900px]",
    props.className,
  );

  const onReset: React.FormEventHandler<HTMLDialogElement> = (e) => {
    if (!confirm("Are you sure you want to reset the form?")) {
      e.preventDefault();
    }
  }

  return (
    <dialog ref={ref} className={classes} onReset={onReset}>
      <form id={dialogFormName.current} method="dialog" onSubmit={onSubmitDialog}>
        <div className="flex flex-col space-y-4">
          <p className="text-xl text-center">{title}</p>
          <div className="flex flex-col space-y-2">
            {children}
          </div>
          {error ? (
            <>
              <hr />
              <p className="text-red-700">{error}</p>
            </>
          ) : null}
          <div className="flex space-x-2 justify-end">
            <Button variant="danger" onClick={() => onCancel()} className="inverse">{cancel ?? 'Cancel'}</Button>
            <Button variant="secondary" type="reset">{reset ?? 'Reset'}</Button>
            <Button type="submit">{submit ?? 'Submit'}</Button>
          </div>
        </div>
      </form>
    </dialog >
  )
}
