import classNames from "classnames";
import { THEAD_CLASSES, CHECK_COL_CLASSES, CHECK_ALL_KEY, TH_CLASSES, DataKey, TH_CLASSES_SORTABLE_PRIMARY, TH_CLASSES_SORTABLE_REST } from "./common";
import { useTableContext } from "./TableContext";
import { useCallback } from "react";
import { Icon } from "../Icon/Icon";

interface TableHeaderProps {
  checkedSize: number,
  dataLength: number;
  hasActions: boolean;
  onCheckAll: React.ChangeEventHandler<HTMLInputElement>,
  setSortBy: (column: DataKey) => void;
}

export function TableHeader({
  checkedSize,
  dataLength,
  hasActions,
  onCheckAll,
  setSortBy,
}: TableHeaderProps) {
  const { checkable, columns, full, primaryKey, sortBy, sortDirection } = useTableContext();

  const onColumnClick: React.MouseEventHandler<HTMLTableCellElement> = useCallback((e) => {
    setSortBy(e.currentTarget.dataset.column as DataKey)
  }, [setSortBy]);

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
            <th
              key={`td-${key}`}
              data-column={key}
              onClick={onColumnClick}
            >
              <div
                className={
                  key === primaryKey ? classNames(TH_CLASSES_SORTABLE_PRIMARY, 'font-bold', 'text-left') : classNames(TH_CLASSES_SORTABLE_REST, 'text-right')
                }
              >
                {sortBy === key ? <Icon icon="Caret" className={classNames({
                  "rotate-90": sortDirection === 'desc',
                  "-rotate-90": sortDirection === 'asc',
                })} /> : null}
                <span>{value}</span>
              </div>
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
