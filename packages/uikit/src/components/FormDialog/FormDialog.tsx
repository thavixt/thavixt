import { RefObject, useEffect, useImperativeHandle, useRef } from "react";
import { Form, FormProps } from "../Form/Form";
import { Dialog, DialogHandle, DialogProps } from "../Dialog/Dialog";

export type FormDialogHandle = RefObject<DialogHandle | null> & {
  form: HTMLFormElement | null,
};

export interface FormDialogProps extends
  Omit<FormProps, 'onCancel' | 'ref'>,
  Pick<DialogProps, 'defaultOpen' | 'closeOnClickOutside' | 'onClose' | 'onOpen' | 'open'> {
  ref?: RefObject<FormDialogHandle | null>,
}

export function FormDialog({
  cancelText: cancel,
  children,
  closeOnClickOutside,
  className,
  defaultOpen,
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
  }

  useEffect(() => {
    if (defaultOpen && dialogRef.current) {
      dialogRef.current.open();
    }
  }, [defaultOpen, ref]);

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
