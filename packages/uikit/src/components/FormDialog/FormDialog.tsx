import classNames from "classnames";
import { RefObject, useEffect, useImperativeHandle, useRef } from "react";
import { Form, FormProps } from "../Form/Form";

export type FormDialogRef = {
  form: HTMLFormElement | null,
  dialog: HTMLDialogElement | null,
}

export interface FormDialogProps extends Omit<FormProps, 'onCancel' | 'ref'> {
  defaultOpen?: boolean,
  title: string;

  ref?: RefObject<FormDialogRef | null>,
}

export function FormDialog({
  cancelText: cancel,
  children,
  className,
  defaultOpen,
  ref,
  resetText: reset,
  submitText: submit,
  title,
  onSubmit,
}: FormDialogProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle<FormDialogRef, FormDialogRef>(ref, () => ({
    form: formRef.current,
    dialog: dialogRef.current,
  }));

  const onCancel = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };
  const onSubmitSuccess = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }

  useEffect(() => {
    if (defaultOpen && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [defaultOpen, ref]);

  const classes = classNames(
    "m-auto min-w-[400px] p-6 rounded-lg border-2 border-slate-500 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-md w-fit max-w-[900px]",
    'bg-slate-100 text-slate-800',
    'dark:bg-slate-700 dark:text-slate-100',
    className,
  );

  return (
    <dialog ref={dialogRef} className={classes} >
      <Form
        ref={formRef}
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        cancelText={cancel ?? 'Cancel'}
        onCancel={onCancel}
        resetText={reset}
        submitText={submit}
      >
        <div className="text-xl text-center pb-4">{title}</div>
        <div className="mb-2 flex flex-col space-y-2">
          {children}
        </div>
      </Form>
    </dialog >
  )
}
