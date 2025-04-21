import classNames from "classnames";
import { ReactElement, RefObject, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import { ClickTarget } from "../ClickTarget/ClickTarget";
import { Button } from "../Button/Button";
import { Typography } from "../Typography/Typography";
import "./Dialog.css";

export type DialogHandle = RefObject<HTMLDialogElement | null> & {
  close: () => void;
  open: () => void;
};

export interface DialogProps extends Omit<CommonProps<HTMLDialogElement>, 'children' | 'ref'> {
  ref?: RefObject<DialogHandle | null>,
  /** Dialog content */
  children: ((close: () => void) => ReactElement) | ReactElement;
  /** Dialog title */
  title?: string;
  
  /** Initial state on first render */
  open?: boolean,
  
  /** Show an explicit close button in the dialog */
  closeIcon?: boolean;
  /** Close dialog on clicking the backdrop */
  closeOnClickOutside?: boolean;
  
  /** Called on closing the dialog */
  onClose?: () => void;
  /** Called on opening the dialog */
  onOpen?: () => void;
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
      close: () => setDialogOpen(false),
      open: () => setDialogOpen(true),
    }),
    [],
  );

  useEffect(() => {
    setDialogOpen(open);
  }, [open]);

  useEffect(() => {
    if (dialogOpen) {
      document.documentElement.classList.add('Dialog--disableScroll');
      document.body.classList.add('Dialog--disableScroll');
      openModal();
    } else {
      document.documentElement.classList.remove('Dialog--disableScroll');
      document.body.classList.remove('Dialog--disableScroll');
      closeModal();
    }
  }, [closeModal, dialogOpen, openModal]);

  const onClickOutside = () => {
    if (closeOnClickOutside) {
      setDialogOpen(false);
    }
  };

  const classes = classNames('Dialog', dialogOpen ? 'Dialog--open' : 'Dialog--closed', className);

  return (
    <dialog data-testid="Dialog" ref={dialogRef} className={classes} {...props}>
      <ClickTarget onClickOutside={onClickOutside} className="Dialog__container">
        <div className={title ? 'Dialog--title' : 'Dialog--notitle'}>
          {title
            ? (
              <Typography type="title" className="Dialog--titletext">
                {title}
              </Typography>
            )
            : null
          }
          {closeIcon
            ? (
              <Button
                data-testid="DialogCloseButton"
                className="Dialog__closeButton"
                // variant="silent"
                icon={{ type: 'Cross' }}
                onClick={() => setDialogOpen(false)}
              />
            )
            : null}
        </div>
        <div className="Dialog__content">
          {typeof children === 'function' ? children(() => setDialogOpen(false)) : children}
        </div>
      </ClickTarget>
    </dialog >
  )
}
