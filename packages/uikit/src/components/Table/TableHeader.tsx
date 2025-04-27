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
  onCheckAll: providedOnCheckAll,
}: TableHeaderProps) {
  const {
    checkable, columns, primaryKey, setSortBy, setSortDirection, sortBy, sortDirection,
  } = useContext(TableContext);

  const onColumnClick: React.MouseEventHandler<HTMLTableCellElement> = useCallback((e) => {
    const column = (e.currentTarget as HTMLTableCellElement).dataset.column as DataKey | undefined;
    if (!column || (e.target as HTMLElement).tagName === 'INPUT') {
      return;
    }
    setSortBy(column);
    if (sortBy === column) {
      setSortDirection(prevDir => prevDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortDirection('desc');
    }
  }, [setSortBy, setSortDirection, sortBy]);

  const onCheckAll: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (providedOnCheckAll) {
      providedOnCheckAll(e);
    }
  }

  const primaryCol = useMemo(() => Object.keys(columns).filter(key => key === primaryKey), [columns, primaryKey]);
  const cols = useMemo(() => Object.keys(columns).filter(key => key !== primaryKey && key !== 'actions'), [columns, primaryKey]);

  return (
    <thead className={classNames({ [THEAD_CLASSES]: sortable, [THEAD_CLASSES_DATATABLE]: !sortable })}>
      <tr>
        {primaryCol.map((key) => {
          const value = columns[key];
          return (
            <th
              className={TH_CLASSES}
              key={`td-${key}`}
              data-column={key}
              onClick={onColumnClick}
            >
              <div
                className={sortable ? TH_CLASSES_SORTABLE_PRIMARY : undefined}
              >
                {checkable ? (
                  <input
                    className={CHECK_COL_CLASSES}
                    disabled={!dataLength}
                    checked={dataLength ? checkedSize === dataLength : false}
                    name={CHECK_ALL_KEY}
                    data-testid="TableCheckAll"
                    onChange={onCheckAll}
                    title={checkedSize === dataLength ? 'Deselect all' : 'Select all'}
                    type="checkbox"
                  />
                ) : null}
                <span >{typeof value === 'string' ? value : value.name}</span>
                {(sortable && sortBy === key) ? (
                  <Icon
                    className={classNames(
                      sortDirection === 'desc' && "rotate-90",
                      sortDirection === 'asc' && "-rotate-90",
                    )}
                    type="Caret"
                  />
                ) : null}
              </div>
            </th>
          )
        })}
        {cols.map((key) => {
          const value = columns[key];
          return (
            <th
              className={TH_CLASSES}
              key={`td-${key}`}
              data-column={key}
              onClick={onColumnClick}
            >
              <div
                className={TH_CLASSES_SORTABLE_REST}
              >
                <span>{typeof value === 'string' ? value : value.name}</span>
                {(sortable && sortBy === key) ? (
                  <Icon
                    className={classNames({
                      "rotate-90": sortDirection === 'desc',
                      "-rotate-90": sortDirection === 'asc',
                    })}
                    type="Caret"
                  />
                ) : null}
              </div>
            </th>
          )
        })}
        {hasActions ? (
          <th className={classNames(TH_CLASSES, 'text-left')}>
            {columns['actions'].name ?? 'Actions'}
          </th>
        ) : null}
      </tr>
    </thead>
  )
}
