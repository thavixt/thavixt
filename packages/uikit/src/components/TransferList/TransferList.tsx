import classNames from "classnames";
import { useCallback, useRef, useState } from "react";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import { Scrollbar } from "../Scrollbar/Scrollbar";
import { Typography } from "../Typography/Typography";
import { CommonProps } from "../../common/commonProps";
import { themedBackgroundClasses } from "../../common/theme";

const DRAG_IMAGE_ID = 'off_canvas_drag_image_id';
type TransferListSide = 'available' | 'selected';

function clearDragImage() {
  const dragImg = document.getElementById(DRAG_IMAGE_ID);
  if (dragImg) {
    dragImg.remove();
  }
}

function setCheckboxes(items: TransferListItem[], checked: boolean) {
  items.forEach(item => {
    const checkbox = document.querySelector<HTMLInputElement>(`input[type=checkbox]#${item.key}`);
    if (checkbox) {
      checkbox.checked = checked;
    }
  });
}

export type TransferListItemKey = string;

export interface TransferListItem {
  key: TransferListItemKey;
  content: string;
}

export interface TransferListProps extends Omit<CommonProps<HTMLDivElement>, 'onChange'> {
  className?: string;
  items: TransferListItem[];
  defaultSelected: TransferListItemKey[];
  transferSelectedText?: string;
  transferAllText?: string;
  onChange: (selectedKeys: TransferListItemKey[]) => void;
}

export function TransferList({
  ref,
  className,
  items,
  defaultSelected,
  transferAllText = "Transfer all items",
  transferSelectedText = "Transfer selected items",
  onChange,
}: TransferListProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [selected, setSelected] = useState<TransferListItemKey[]>(defaultSelected);
  const lastClicked = useRef<{ side: TransferListSide; key: TransferListItemKey | null }>({
    side: 'available',
    key: null,
  });

  const setSelectedKeys = useCallback((keys: TransferListItemKey[]) => {
    setSelected(keys);
    onChange?.(keys.sort((a, b) => a.localeCompare(b, navigator.language, { numeric: true })));
  }, [onChange]);

  const sortedAllItems = items.sort((a, b) => a.content.localeCompare(b.content, navigator.language, { numeric: true }));
  const sortedAllKeys = sortedAllItems.map<TransferListItemKey>(item => item.key);
  const availableItems = sortedAllItems.filter(item => !selected.includes(item.key));
  const selectedItems = sortedAllItems.filter(item => selected.includes(item.key));

  const containerClasses = 'size-full grid grid-cols-[1fr_auto_1fr] gap-2 isolate';
  const formClasses = 'h-full w-full';
  const boxClasses = classNames(themedBackgroundClasses, "p-2 flex flex-col space-y-2 size-full");
  const scrollbarClasses = classNames('size-full flex flex-col space-y-0.5', className);
  const itemContainerClasses = 'cursor-pointer flex items-center px-2 flex bg-transparent hover:bg-slate-200 hover:dark:bg-slate-600 rounded-sm';

  const getItems = useCallback((side: TransferListSide): string[] => {
    if (!formRef.current) {
      return [];
    }
    const inputs = Array.from(formRef.current.querySelectorAll<HTMLInputElement>(`input[name="${side}"]`));
    const selectedInputs = inputs.filter(input => input.checked);
    const selectedInpuNames = selectedInputs.map(input => input.id);
    return selectedInpuNames;
  }, []);

  const onDragStart: (side: TransferListSide) => React.DragEventHandler<HTMLDivElement> = useCallback((side) => (e) => {
    clearDragImage();

    e.dataTransfer.dropEffect = 'move';
    const items = getItems(side);
    if (items.length === 0) {
      const input = e.currentTarget.querySelector('input');
      if (input?.id) {
        items.push(input.id)
      }
    }
    e.dataTransfer.setData('application/json', JSON.stringify(items));

    const labels = e.currentTarget.parentElement?.querySelectorAll('input:checked + label');
    const ghostElement = document.createElement('div');
    ghostElement.id = DRAG_IMAGE_ID;
    ghostElement.style.position = 'absolute';
    ghostElement.style.left = '9999999px';
    ghostElement.classList.add('text-slate-600', 'dark:text-slate-400', 'flex', 'flex-col', 'w-full');
    labels?.forEach(({ textContent }) => {
      const p = document.createElement('p');
      p.textContent = textContent;
      ghostElement.appendChild(p);
    })
    document.body.appendChild(ghostElement);
    e.dataTransfer.setDragImage(ghostElement, 0, 0);
  }, [getItems]);

  const onDragEnd: React.DragEventHandler<HTMLDivElement> = useCallback((e) => {
    e.preventDefault();
    clearDragImage();
  }, []);

  const onDragOver: React.DragEventHandler<HTMLDivElement> = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop: (side: TransferListSide) => React.DragEventHandler<HTMLDivElement> = useCallback((side) => (e) => {
    e.preventDefault();
    clearDragImage();
    const transferData = JSON.parse(e.dataTransfer.getData('application/json'));
    if (side === 'selected') {
      setSelectedKeys(Array.from(new Set([...selected, ...transferData])));
    } else {
      setSelectedKeys(selected.filter(key => !transferData.includes(key)));
    }
  }, [selected, setSelectedKeys]);

  const onTransferClick: (side: TransferListSide, all?: 'all') => (e: React.MouseEvent<HTMLButtonElement>) => void = useCallback((side, all) => (e) => {
    e.preventDefault();
    if (all) {
      if (side === 'available') {
        setSelectedKeys(items.map(item => item.key));
      } else {
        setSelectedKeys([]);
      }
      return;
    }
    const selectedInpuNames = getItems(side);
    if (side === 'available') {
      setSelectedKeys(Array.from(new Set([...selected, ...selectedInpuNames])));
    } else {
      setSelectedKeys(selected.filter(key => !selectedInpuNames.includes(key)));
    }
  }, [getItems, items, selected, setSelectedKeys]);

  const selectAll = useCallback((side: TransferListSide, select = true) => () => {
    if (!formRef.current) {
      return [];
    }
    const inputs = Array.from(formRef.current.querySelectorAll<HTMLInputElement>(`input[name="${side}"]`));
    inputs.forEach(input => input.checked = select);
  }, []);

  const onCheck = useCallback((side: TransferListSide) => (key: TransferListItemKey) => {
    lastClicked.current = { side, key };
  }, []);

  const onShift = useCallback((side: TransferListSide) => (key: TransferListItemKey, ctrl: boolean) => {
    if (!lastClicked.current) {
      return;
    }

    const selectedIndex = sortedAllKeys.findIndex(k => k === key);
    const lastIndex = sortedAllKeys.findIndex(k => k === lastClicked.current.key);
    let items = side === 'available' ? [...availableItems] : [...selectedItems];
    if (lastIndex > selectedIndex) {
      items = items.reverse();
    }
    let check = false;
    const result = items.filter(item => {
      if (item.key === lastClicked.current.key) {
        check = true;
      }
      if (item.key === key) {
        check = false;
      }
      return check || item.key === key;
    });
    setCheckboxes(result, !ctrl);
    lastClicked.current = { side, key };
  }, [availableItems, selectedItems, sortedAllKeys])

  return (
    <form ref={formRef} className={formClasses}>
      <div data-testid="TransferList" ref={ref} className={containerClasses}>
        <div
          data-testid="TransferListAvailable"
          className={boxClasses}
          onDragOver={onDragOver}
          onDrop={onDrop('available')}
        >
          <div className="flex justify-between items-center">
            <Button variant="silent" onClick={selectAll('available')}>Select all</Button>
            <Typography.Label>({items.length - selected.length})</Typography.Label>
            <Button variant="silent" onClick={selectAll('available', false)}>Deselect all</Button>
          </div>
          <Scrollbar className={scrollbarClasses}>
            {availableItems.map(item => (
              <div
                key={item.key}
                className={itemContainerClasses}
                draggable
                onDragStart={onDragStart('available')}
                onDragEnd={onDragEnd}
              >
                <TransferListListItem
                  item={item}
                  side="available"
                  onCheck={onCheck('available')}
                  onShift={onShift('available')}
                />
              </div>
            ))}
          </Scrollbar>
        </div>
        <div className="flex flex-col justify-center space-y-1">
          <Button
            disabled={selected.length === items.length}
            id="toSelected"
            onClick={onTransferClick('available', 'all')}
            title={transferAllText}
            variant="silent"
          >
            <Icon icon="ArrowDouble" height={3} />
          </Button>
          <Button
            id="toSelected"
            onClick={onTransferClick('available')}
            title={transferSelectedText}
            variant="silent"
          >
            <Icon icon="Arrow" height={3} />
          </Button>
          <Button
            className="rotate-180"
            id="toSource"
            onClick={onTransferClick('selected')}
            title={transferSelectedText}
            variant="silent"
          >
            <Icon icon="Arrow" height={3} />
          </Button>
          <Button
            className="rotate-180"
            disabled={selected.length === 0}
            id="toSource"
            onClick={onTransferClick('selected', 'all')}
            title={transferAllText}
            variant="silent"
          >
            <Icon icon="ArrowDouble" height={3} />
          </Button>
        </div>
        <div
          data-testid="TransferListSelected"
          className={boxClasses}
          onDragOver={onDragOver}
          onDrop={onDrop('selected')}
        >
          <div className="flex justify-between items-center pb-1">
            <Button className="text-xs" variant="silent" onClick={selectAll('selected')}>Select all</Button>
            <Typography.Label>({selected.length})</Typography.Label>
            <Button className="text-xs" variant="silent" onClick={selectAll('selected', false)}>Deselect all</Button>
          </div>
          <Scrollbar className={scrollbarClasses}>
            {selectedItems.map(item => (
              <div
                key={item.key}
                className={itemContainerClasses}
                draggable
                onDragStart={onDragStart('selected')}
                onDragEnd={onDragEnd}
              >
                <TransferListListItem
                  item={item}
                  side="selected"
                  onCheck={onCheck('selected')}
                  onShift={onShift('selected')}
                />
              </div>
            ))}
          </Scrollbar>
        </div>
      </div>
    </form>
  )
}

interface TransferListListItemProps {
  item: TransferListItem;
  side: TransferListSide
  onCheck: (key: string, checked: boolean) => void;
  onShift: (key: string, ctrl: boolean) => void;
}

function TransferListListItem({ item, side, onCheck, onShift }: TransferListListItemProps) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { id, checked } = target;
    onCheck(id, checked);
  };
  const onClick: React.MouseEventHandler<HTMLInputElement> = ({ nativeEvent }) => {
    const shift = (nativeEvent as MouseEvent).shiftKey;
    const ctrl = (nativeEvent as MouseEvent).ctrlKey;
    if (shift) {
      onShift(item.key, ctrl);
    }
  };

  return (
    <div className="w-full flex" title={item.content}>
      <input
        className="peer cursor-pointer"
        id={item.key}
        name={side}
        onChange={onChange}
        onClick={onClick}
        type="checkbox"
      />
      <label className="peer-checked:font-semibold cursor-pointer pl-2 w-full" htmlFor={item.key}>
        <Typography.Text>{item.content}</Typography.Text>
      </label>
    </div>
  )
}