import classNames from "classnames";
import { ReactNode, RefObject, useEffect, useImperativeHandle, useRef, useState } from "react";
import { themedTextClasses } from "../common/theme";

export interface TreeHandle {
  open: () => void;
  collapse: () => void;
}

export interface TreeProps {
  className?: string;
  defaultOpen?: boolean;
  items: TreeItem[];
  ref?: RefObject<TreeHandle | null>;

  onClick: (key: string) => void;
};

export function Tree({
  items, className, onClick, ref, defaultOpen
}: TreeProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean | undefined>(defaultOpen);
  const [counter, setCount] = useState(0);

  useEffect(() => {
    setCount(prev => prev + 1);
    setOpen(defaultOpen);
  }, [defaultOpen])

  useImperativeHandle(
    ref,
    () => ({
      tree: divRef.current,
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
    <div ref={divRef} className={classNames('w-fit', className)} key={`tree-${counter}`}>
      {items.map(item => (
        <TreeItem item={item} onClick={onClick} defaultOpen={open} />
      ))}
    </div>
  )
}

export type TreeItem = {
  key: string;
  label: ReactNode;
  children?: TreeItem[];
}

interface TreeItemProps {
  item: TreeItem;
  onClick: (key: string) => void;
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
    onClick(item.key);
  };

  const containerClasses = classNames(
    themedTextClasses,
    'flex items-center space-x-1 cursor-pointer w-fit px-2 rounded-sm hover:bg-gray-200 hover:dark:bg-gray-700',
    {
      'ml-6': !hasChildren,
    },
  );
  const childClasses = classNames(
    'transition-all ml-0 opacity-0 h-0',
    {
      '-z-1': !open,
      'ml-4 opacity-100 h-full z-10': open,
    },
  );
  const svgClasses = classNames(
    'size-5 transition-transform rotate-270',
    {
      'rotate-360': open,
      'hidden': !hasChildren,
      'fill-slate-600 dark:fill-slate-200': hasChildren,
    },
  );

  return (
    <div className="flex flex-col space-y-1">
      <div className={containerClasses} onClickCapture={onClickItem}>
        <svg className={svgClasses} viewBox="0 0 24 24">
          <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
        </svg>
        <div>{item.label}</div>
      </div>
      <div className={childClasses} >
        {item.children?.map(childItem => (
          <TreeItem key={childItem.key} item={childItem} onClick={onClick} defaultOpen={defaultOpen} />
        ))}
      </div>
    </div>
  )
}