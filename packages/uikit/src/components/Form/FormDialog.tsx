import { RefObject, useImperativeHandle, useRef } from "react";
import { Form, FormProps } from "./Form";
import { Dialog, DialogHandle, DialogProps } from "../Dialog/Dialog";

export type FormDialogHandle = RefObject<DialogHandle | null> & {
  form: HTMLFormElement | null,
};

export interface FormDialogProps extends
  Omit<FormProps, 'onCancel' | 'ref'>,
  Pick<DialogProps, 'closeOnClickOutside' | 'onClose' | 'onOpen' | 'open'> {
  ref?: RefObject<FormDialogHandle | null>,
}

export function FormDialog({
  cancelText: cancel,
  children,
  closeOnClickOutside,
  className,
  open,
  ref,
  resetText: reset,
  submitText: submit,
  title,
  onSubmit,
  onClose,
  onOpen,
}: FormDialogProps) {
  const dialogRef = useRef<DialogHandle>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle<RefObject<DialogHandle | null>, FormDialogHandle>(
    ref,
    () => ({
      current: dialogRef?.current,
      form: formRef?.current,
    }), []);

  const onSubmitSuccess = (closeCallback: () => void) => () => {
    closeCallback();
    if (formRef.current) {
      formRef.current.reset();
    }
  }

  return (
    <Dialog
      data-testid="FormDialog"
      ref={dialogRef}
      className={className}
      closeOnClickOutside={closeOnClickOutside}
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      title={title}
    >
      {(close) => (
        <Form
          ref={formRef}
          onSubmit={onSubmit}
          onSubmitSuccess={onSubmitSuccess(close)}
          cancelText={cancel ?? 'Cancel'}
          onCancel={close}
          resetText={reset}
          submitText={submit}
        >
          <div className="mb-2 flex flex-col space-y-2">
            {children}
          </div>
        </Form>
      )}
    </Dialog>
  )
}
