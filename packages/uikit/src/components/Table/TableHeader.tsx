import classNames from "classnames";
import { THEAD_CLASSES, CHECK_COL_CLASSES, CHECK_ALL_KEY, TH_CLASSES } from "./common";
import { useTableContext } from "./TableContext";

interface TableHeaderProps {
  checkedSize: number,
  dataLength: number;
  hasActions: boolean;
  onCheckAll: React.ChangeEventHandler<HTMLInputElement>,
}

export function TableHeader({
  checkedSize,
  dataLength,
  hasActions,
  onCheckAll,
}: TableHeaderProps) {
  const { checkable, columns, full, primaryKey } = useTableContext();

  return (
    <thead className={classNames(THEAD_CLASSES, { 'top-0 sticky': !full })}>
      <tr>
        {checkable ? (
          <th className={CHECK_COL_CLASSES}>
            <input
              disabled={!dataLength}
              checked={dataLength ? checkedSize === dataLength : false}
              name={CHECK_ALL_KEY}
              onChange={onCheckAll}
              title={checkedSize === dataLength ? 'Deselect all' : 'Select all'}
              type="checkbox"
            />
          </th>
        ) : null}
        {Object.entries(columns).map(([key, value]) => {
          return (
            <th key={`td-${key}`} className={
              key === primaryKey ? classNames(TH_CLASSES, 'font-bold', 'text-left') : classNames(TH_CLASSES, 'text-right')
            }>
              {value}
            </th>
          )
        })}
        {hasActions ? (
          <th className={classNames(TH_CLASSES, 'text-left')}>
            Actions
          </th>
        ) : null}
      </tr>
    </thead>
  )
}
