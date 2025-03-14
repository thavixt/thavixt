import classNames from "classnames";
import { ReactElement, RefObject, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { themedBackgroundClasses } from "../../common/theme";
import { CommonProps } from "../../common/commonProps";
import { ClickTarget } from "../ClickTarget/ClickTarget";
import { Button } from "../Button/Button";

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
  ref,
  title,
  ...props
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [dialogOpen, setDialogOpen] = useState(open);

  const closeModal = useCallback(() => {
    setDialogOpen(prev => {
      if (prev === false) {
        return prev;
      }
      onClose?.();
      if (dialogRef.current) {
        dialogRef.current.close();
      }
      return false;
    });
  }, [onClose]);
  const openModal = useCallback(() => {
    setDialogOpen(prev => {
      if (prev === true) {
        return prev;
      }
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
    'transition-all relative m-auto min-w-[400px] w-fit max-w-[900px] select-none',
    'rounded-xl shadow-2xl backdrop:bg-black/25 backdrop:backdrop-blur-xs',
    themedBackgroundClasses,
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
      <ClickTarget onClickOutside={onClickOutside}>
        <div className="px-6 py-4 select-text">
          {closeIcon ? (
            <div className="absolute right-0 -top-0.5 p-1">
              <Button variant="silent" icon={{ icon: 'Cross', height: 2 }} onClick={closeModal} />
            </div>
          ) : null}
          {title ? <div className="text-xl text-center pb-4 px-4">{title}</div> : null}
          <div className="mb-2 flex flex-col space-y-2">
            {typeof children === 'function' ? children(closeModal) : children}
          </div>
        </div>
      </ClickTarget>
    </dialog >
  )
}
