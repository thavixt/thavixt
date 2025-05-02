import classNames from "classnames";
import { JSX, ReactNode, RefObject, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Icon } from "../Icon/Icon";
import { Typography } from "../Typography/Typography";
import "./Tree.css";

export type TreeItem = {
  /** Unique key */
  key: string;
  /** Text to display */
  label: ReactNode;
  /** Nested tree items */
  children?: TreeItem[];
}

export type TreeHandle = RefObject<HTMLDivElement | null> & {
  /** Open all items */
  open: () => void;
  /** Collapse all items */
  collapse: () => void;
}

export interface TreeProps {
  ref?: RefObject<TreeHandle | null>;
  className?: string;
  /** Whether the tree is fully opened by default */
  defaultOpen?: boolean;
  /** Tree children */
  items: TreeItem[];
  /** Callback on tree item click */
  onClick?: (key: string) => void;
};

/**
 * The `Tree` component renders a tree structure with expandable and collapsible items.
 * It supports controlled and uncontrolled states for managing the open/closed state of the tree.
 *
 * @returns {JSX.Element} A tree structure with the provided items.
 *
 * @remarks
 * - The `useImperativeHandle` hook exposes imperative methods (`open` and `collapse`) for controlling the tree state.
 */
export function Tree({
  items, className, onClick, ref, defaultOpen
}: TreeProps): JSX.Element {
  const divRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean | undefined>(defaultOpen);
  const [counter, setCount] = useState(0);

  useEffect(() => {
    setCount(prev => prev + 1);
    setOpen(defaultOpen);
  }, [defaultOpen])

  useImperativeHandle<RefObject<HTMLDivElement | null>, TreeHandle>(
    ref,
    () => ({
      current: divRef.current,
      open: () => {
        setCount(prev => prev + 1);
        setOpen(true);
      },
      collapse: () => {
        setCount(prev => prev + 1);
        setOpen(false);
      },
    }),
    [],
  );

  return (
    <div ref={divRef} className={classNames('Tree', className)} key={`tree-${counter}`}>
      {items.map(item => <TreeItem key={item.key} item={item} onClick={onClick} defaultOpen={open} />)}
    </div>
  )
}

interface TreeItemProps {
  item: TreeItem;
  onClick?: (key: string) => void;
  defaultOpen?: boolean;
}

function TreeItem({ item, onClick, defaultOpen }: TreeItemProps) {
  const [open, setOpen] = useState<boolean | undefined>(defaultOpen);
  const hasChildren = item.children && item.children.length > 1;

  const onClickItem: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (hasChildren) {
      setOpen(prev => prev ? undefined : true);
    }
    onClick?.(item.key);
  };

  return (
    <div data-testid="Tree" className={classNames(
      "Tree__item",
      {
        'Tree__content-single': !hasChildren,
      },
    )}>
      <div className="Tree__content" onClickCapture={onClickItem}>
        <Icon
          type="Caret"
          className={classNames(
            'Tree__caret',
            {
              'Tree__caret--open': open,
              'Tree__caret--single': !hasChildren,
            },
          )}
        />
        <Typography type="text" id={item.key}>{item.label}</Typography>
      </div>
      <div
        className={classNames(
          'Tree__label',
          {
            'Tree__label--open': open,
          },
        )}
      >
        {item.children?.map(childItem => (
          <TreeItem key={childItem.key} item={childItem} onClick={onClick} defaultOpen={defaultOpen} />
        ))}
      </div>
    </div>
  )
}
