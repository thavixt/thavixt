import classNames from "classnames";
import { THEAD_CLASSES, CHECK_COL_CLASSES, CHECK_ALL_KEY, TH_CLASSES, DataKey, TH_CLASSES_SORTABLE_PRIMARY, TH_CLASSES_SORTABLE_REST, THEAD_CLASSES_DATATABLE } from "./common";
import { useCallback, useContext, useMemo } from "react";
import { Icon } from "../Icon/Icon";
import { TableContext } from "./TableContext";

interface TableHeaderProps {
  checkedSize?: number,
  dataLength?: number;
  hasActions?: boolean;
  sortable?: boolean;
  onCheckAll?: React.ChangeEventHandler<HTMLInputElement>,
}

export function TableHeader({
  checkedSize,
  dataLength,
  hasActions,
  sortable = true,
  onCheckAll,
}: TableHeaderProps) {
  const {
    checkable, columns, primaryKey, setSortBy, setSortDirection, sortBy, sortDirection,
  } = useContext(TableContext);

  const onColumnClick: React.MouseEventHandler<HTMLTableCellElement> = useCallback((e) => {
    const column = e.currentTarget.dataset.column as DataKey;
    if (sortBy === column) {
      setSortDirection(prevDir => prevDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortDirection('desc');
      setSortBy(column);
    }
  }, [setSortBy, setSortDirection, sortBy]);
  
  const primaryCol = useMemo(() => Object.keys(columns).filter(key => key === primaryKey), [columns, primaryKey]);
  const cols = useMemo(() => Object.keys(columns).filter(key => key !== primaryKey), [columns, primaryKey]);

  return (
    <thead className={classNames({ [THEAD_CLASSES]: sortable, [THEAD_CLASSES_DATATABLE]: !sortable })}>
      <tr>
        {checkable ? (
          <th className={CHECK_COL_CLASSES}>
            <input
              className="cursor-pointer"
              disabled={!dataLength}
              checked={dataLength ? checkedSize === dataLength : false}
              name={CHECK_ALL_KEY}
              onChange={onCheckAll}
              title={checkedSize === dataLength ? 'Deselect all' : 'Select all'}
              type="checkbox"
            />
          </th>
        ) : null}
        {primaryCol.map((key) => {
          const value = columns[key];
          return (
            <th
              key={`td-${key}`}
              data-column={key}
              onClick={onColumnClick}
            >
              <div
                className={classNames({
                  [classNames(TH_CLASSES_SORTABLE_PRIMARY)]: sortable,
                })}
              >
                {(sortable && sortBy === key) ? (
                  <Icon
                    className={classNames({
                      "rotate-90": sortDirection === 'desc',
                      "-rotate-90": sortDirection === 'asc',
                    })}
                    icon="Caret"
                  />
                ) : null}
                <span>{value}</span>
              </div>
            </th>
          )
        })}
        {cols.map((key) => {
          const value = columns[key];
          return (
            <th
              key={`td-${key}`}
              data-column={key}
              onClick={onColumnClick}
            >
              <div
                className={classNames({
                  [classNames(TH_CLASSES_SORTABLE_REST, 'font-bold')]: sortable,
                })}
              >
                {(sortable && sortBy === key) ? (
                  <Icon
                    className={classNames({
                      "rotate-90": sortDirection === 'desc',
                      "-rotate-90": sortDirection === 'asc',
                    })}
                    icon="Caret"
                  />
                ) : null}
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
