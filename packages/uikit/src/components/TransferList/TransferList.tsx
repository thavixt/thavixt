import classNames from "classnames";
import { useRef, useState } from "react";
import { Box } from "../Box/Box";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import { Scrollbar } from "../Scrollbar/Scrollbar";
import { Typography } from "../Typography/Typography";
import { CommonProps } from "../../common/commonProps";

const DRAG_IMAGE_ID = 'off_canvas_drag_image_id';

function clearDragImage() {
  const dragImg = document.getElementById(DRAG_IMAGE_ID);
  if (dragImg) {
    dragImg.remove();
  }
}

export type TransferListItemKey = string;

export interface TransferListItem {
  key: TransferListItemKey;
  content: string;
}

export interface TransferListProps extends CommonProps {
  className?: string;
  items: TransferListItem[];
  defaultSelected: TransferListItemKey[];
}

export function TransferList({ ref, className, items, defaultSelected }: TransferListProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [selected, setSelected] = useState<TransferListItemKey[]>(defaultSelected);

  const sortedAllItems = items.sort((a, b) => a.content.localeCompare(b.content, undefined, { numeric: true }));
  const availableItems = sortedAllItems.filter(item => !selected.includes(item.key));
  const selectedItems = sortedAllItems.filter(item => selected.includes(item.key));

  const classes = classNames(
    'grid grid-cols-[1fr_auto_1fr] gap-2 isolate',
    className,
  );
  const itemClasses = classNames(
    'cursor-pointer w-full flex items-center px-2',
    'flex bg-transparent hover:bg-slate-200 hover:dark:bg-slate-600 rounded-sm',
    className,
  );
  const scrollbarClasses = 'max-h-80 flex flex-col space-y-0.5';

  const onDragStart: (from: 'available' | 'selected') => React.DragEventHandler<HTMLDivElement> = (from) => (e) => {
    clearDragImage();

    e.dataTransfer.dropEffect = 'move';
    const items = getItems(from);
    if (items.length === 0) {
      const input = e.currentTarget.querySelector('input');
      if (input?.id) {
        items.push(input.id)
      }
    }
    e.dataTransfer.setData('application/json', JSON.stringify(items));

    // get labels of checked input
    const labels = e.currentTarget.parentElement?.querySelectorAll('input:checked + label');
    // clone them into an off-canvas ghost element
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
    // set drag image
    document.body.appendChild(ghostElement);
    e.dataTransfer.setDragImage(ghostElement, 0, 0);
  }
  const onDragEnd: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    clearDragImage();
  }
  const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }
  const onDrop: (from: 'available' | 'selected') => React.DragEventHandler<HTMLDivElement> = (from) => (e) => {
    e.preventDefault();
    clearDragImage();
    const transferData = JSON.parse(e.dataTransfer.getData('application/json'));
    if (from === 'selected') {
      setSelected(prev => Array.from(new Set([...prev, ...transferData])));
    } else {
      setSelected(prev => prev.filter(key => !transferData.includes(key)));
    }
  }
  const onTransferClick: (from: 'available' | 'selected', all?: 'all') => (e: React.MouseEvent<HTMLButtonElement>) => void = (from, all) => (e) => {
    e.preventDefault();

    if (all) {
      if (from === 'available') {
        setSelected(items.map(item => item.key));
      } else {
        setSelected([]);
      }
      return;
    }

    const selectedInpuNames = getItems(from);
    if (from === 'available') {
      setSelected(prev => Array.from(new Set([...prev, ...selectedInpuNames])));
    } else {
      setSelected(prev => prev.filter(key => !selectedInpuNames.includes(key)));
    }

    // if (from === 'available') {
    //   setAvailableChecked([]);
    // } else {
    //   setSelectedChecked([]);
    // }
  }
  const getItems = (from: 'available' | 'selected'): string[] => {
    if (!formRef.current) {
      return [];
    }
    const inputs = Array.from(formRef.current.querySelectorAll<HTMLInputElement>(`input[name="${from}"]`));
    const selectedInputs = inputs.filter(input => input.checked);
    const selectedInpuNames = selectedInputs.map(input => input.id);
    return selectedInpuNames;
  }

  const selectAll = (from: 'available' | 'selected', select = true) => () => {
    if (!formRef.current) {
      return [];
    }
    const inputs = Array.from(formRef.current.querySelectorAll<HTMLInputElement>(`input[name="${from}"]`));
    inputs.forEach(input => input.checked = select);

    // const keys = inputs.map(i => i.id);
    // if (from === 'available') {
    //   if (select) {
    //     setAvailableChecked(keys);
    //   } else {
    //     setAvailableChecked([]);
    //   }
    // } else {
    //   if (select) {
    //     setSelectedChecked(keys);
    //   } else {
    //     setSelectedChecked([]);
    //   }
    // }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onCheck = (_from: 'available' | 'selected') => (_key: string, _checked: boolean) => {
    // if (from === 'available') {
    //   if (checked) {
    //     setAvailableChecked(prev => [...prev, key]);
    //   } else {
    //     setAvailableChecked(prev => prev.filter(k => k !== key));
    //   }
    // }
    // if (from === 'selected') {
    //   if (checked) {
    //     setSelectedChecked(prev => [...prev, key]);
    //   } else {
    //     setSelectedChecked(prev => prev.filter(k => k !== key));
    //   }
    // }
  }

  return (
    <div data-testid="TransferList" ref={ref} className="w-full">
      <form ref={formRef} className={classes}>
        <Box
          data-testid="TransferListAvailable"
          type="paper"
          className="flex flex-col space-y-2"
          onDrop={onDrop('available')}
          onDragOver={onDragOver}
        >
          <Box.Content>
            <div className="flex justify-between items-center pb-1">
              <Button variant="silent" onClick={selectAll('available')}>Select all</Button>
              <Typography.Label>({items.length - selected.length})</Typography.Label>
              <Button variant="silent" onClick={selectAll('available', false)}>Deselect all</Button>
            </div>
            <Scrollbar className={scrollbarClasses}>
              {availableItems.map(item => (
                <div key={item.key} className={itemClasses} draggable onDragStart={onDragStart('available')} onDragEnd={onDragEnd}>
                  <TransferListListItem item={item} side="available" onCheck={onCheck('available')} />
                </div>
              ))}
            </Scrollbar>
          </Box.Content>
        </Box>

        <div className="flex flex-col justify-center space-y-1">
          <Button
            disabled={selected.length === items.length}
            id="toSelected"
            onClick={onTransferClick('available', 'all')}
            variant="silent"
          >
            <Icon icon="ArrowDouble" height={3} />
          </Button>
          <Button
            id="toSelected"
            onClick={onTransferClick('available')}
            variant="silent"
          >
            <Icon icon="Arrow" height={3} />
          </Button>
          <Button
            className="rotate-180"
            id="toSource"
            onClick={onTransferClick('selected')}
            variant="silent"
          >
            <Icon icon="Arrow" height={3} />
          </Button>
          <Button
            className="rotate-180"
            disabled={selected.length === 0}
            id="toSource"
            onClick={onTransferClick('selected', 'all')}
            variant="silent"
          >
            <Icon icon="ArrowDouble" height={3} />
          </Button>
        </div>

        <Box
          data-testid="TransferListSelected"
          type="paper"
          className="flex flex-col space-y-2"
          onDrop={onDrop('selected')}
          onDragOver={onDragOver

          }>
          <Box.Content>
            <div className="flex justify-between items-center pb-1">
              <Button className="text-xs" variant="silent" onClick={selectAll('selected')}>Select all</Button>
              <Typography.Label>({selected.length})</Typography.Label>
              <Button className="text-xs" variant="silent" onClick={selectAll('selected', false)}>Deselect all</Button>
            </div>
            <Scrollbar className={scrollbarClasses}>
              {selectedItems.map(item => (
                <div key={item.key} className={itemClasses} draggable onDragStart={onDragStart('selected')} onDragEnd={onDragEnd}>
                  <TransferListListItem item={item} side="selected" onCheck={onCheck('selected')} />
                </div>
              ))}
            </Scrollbar>
          </Box.Content>
        </Box>
      </form>
    </div>
  )
}

interface TransferListListItemProps {
  item: TransferListItem;
  side: 'available' | 'selected'
  onCheck: (key: string, checked: boolean) => void;
}

function TransferListListItem({ item, side, onCheck }: TransferListListItemProps) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { id, checked } }) => {
    onCheck(id, checked)
  }
  return (
    <>
      <input className="peer cursor-pointer" type="checkbox" name={side} id={item.key} onChange={onChange} />
      <label className="peer-checked:font-semibold cursor-pointer pl-2 w-full" htmlFor={item.key}>
        <Typography.Text>{item.content}</Typography.Text>
      </label>
    </>
  )
}