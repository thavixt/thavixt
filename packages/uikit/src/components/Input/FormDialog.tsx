import classNames from "classnames";
import { PropsWithChildren, useEffect } from "react";
import { CommonProps } from "../../common/commonProps";
import { Form } from "./Form";

interface DialogProps extends PropsWithChildren<CommonProps<HTMLDialogElement>> {
  defaultOpen?: boolean,
  title: string;

  cancelBtn?: React.ReactElement,
  resetBtn?: React.ReactElement,
  submitBtn?: React.ReactElement,
  
  onSubmit: (values: Record<string, FormDataEntryValue>) => void | Promise<void>,
}

export function FormDialog(props: DialogProps) {
  const {
    cancelBtn: cancel,
    submitBtn: submit,
    resetBtn: reset,
    onSubmit,
    children,
    title,
    ref,
  } = props;
  useEffect(() => {
    if (props.defaultOpen && ref?.current) {
      ref.current?.showModal();
    }
  }, [props.defaultOpen, ref]);

  const onCancel = () => {
    if (ref) {
      ref.current?.close();
    }
  };

  const classes = classNames(
    "m-auto min-w-[400px] p-6 rounded-lg border-2 border-slate-500 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-md w-fit max-w-[900px]",
    'bg-slate-100 text-slate-800',
    'dark:bg-slate-700 dark:text-slate-100',
    props.className,
  );

  return (
    <dialog ref={ref} className={classes} >
      <Form
        onSubmit={onSubmit}
        cancelBtn={cancel}
        onCancel={onCancel}
        resetBtn={reset}
        submitBtn={submit}
      >
        <p className="text-xl text-center">{title}</p>
        {children}
      </Form>
    </dialog >
  )
}
