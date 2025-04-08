import classNames from "classnames";
import { ReactElement, RefObject, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import { ClickTarget } from "../ClickTarget/ClickTarget";
import { Button } from "../Button/Button";
import { Typography } from "../Typography/Typography";

export type DialogHandle = RefObject<HTMLDialogElement | null> & {
  close: () => void;
  open: () => void;
};

export interface DialogProps extends Omit<CommonProps<HTMLDialogElement>, 'children' | 'ref'> {
  children: ((close: () => void) => ReactElement) | ReactElement;
  closeIcon?: boolean;
  closeOnClickOutside?: boolean;
  defaultOpen?: boolean,
  onClose?: () => void;
  onOpen?: () => void;
  open?: boolean,
  ref?: RefObject<DialogHandle | null>,
  title?: string;
}

export function Dialog({
  children,
  className,
  closeIcon,
  closeOnClickOutside,
  onClose,
  onOpen,
  open = false,
  defaultOpen = false,
  ref,
  title = "&nbsp;",
  ...props
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [dialogOpen, setDialogOpen] = useState(defaultOpen || open);

  const closeModal = useCallback(() => {
    setDialogOpen(() => {
      onClose?.();
      if (dialogRef.current) {
        dialogRef.current.close();
      }
      return false;
    });
  }, [onClose]);

  const openModal = useCallback(() => {
    setDialogOpen(() => {
      onOpen?.();
      if (dialogRef.current) {
        dialogRef.current.showModal();
      }
      return true;
    });
  }, [onOpen]);

  useImperativeHandle<RefObject<HTMLDialogElement | null>, DialogHandle>(
    ref,
    () => ({
      current: dialogRef?.current,
      close: closeModal,
      open: openModal,
    }),
    [closeModal, openModal],
  );

  useEffect(() => {
    if (open) {
      openModal();
    } else {
      closeModal();
    }
  }, [closeModal, open, openModal]);

  useEffect(() => {
    if (dialogOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [closeModal, dialogOpen, openModal]);

  const classes = classNames(
    'Dialog transition-all relative m-auto min-w-[400px] w-fit max-w-[900px] select-none',
    'rounded-xl shadow-2xl backdrop:bg-black/25 backdrop:backdrop-blur-xs',
    'bg-slate-100 dark:bg-gray-800',
    {
      'scale-75 opacity-0': !dialogOpen,
      'scale-100 opacity-100': dialogOpen,
    },
    className,
  );

  const onClickOutside = () => {
    if (closeOnClickOutside) {
      closeModal();
    }
  };

  return (
    <dialog data-testid="Dialog" ref={dialogRef} className={classes} {...props}>
      <ClickTarget onClickOutside={onClickOutside} className="Dialog__container h-full p-4 select-text">
        <div className={classNames('flex w-full', title ? 'justify-between' : 'justify-end')}>
          {title
            ? <Typography.Title className="text-center pb-2">{title}</Typography.Title>
            : null
          }
          {closeIcon
            ? <Button variant="silent" icon={{ icon: 'Cross' }} onClick={closeModal} />
            : null}
        </div>
        <div className="Dialog__content h-fit flex flex-col flex-col space-y-2">
          {typeof children === 'function' ? children(closeModal) : children}
        </div>
      </ClickTarget>
    </dialog >
  )
}
