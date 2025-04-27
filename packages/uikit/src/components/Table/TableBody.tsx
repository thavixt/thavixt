import { PropsWithChildren, ReactElement, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { DataKey, TR_CLASSES, CHECK_COL_CLASSES, TD_CLASSES, TableDataRow } from "./common";
import { TableContext } from "./TableContext";
import classNames from "classnames";
import { noop } from "../../common/utils";

export interface TableBodyProps<T extends TableDataRow> {
  data: T[];
  errorRow?: (errorMessage: string) => ReactElement;
  loaderRow?: ReactElement;
  loading?: boolean;
  placeholderRows?: ReactElement[];
  onCheck?: React.ChangeEventHandler<HTMLInputElement>;
  rowActions?: (dataKey: DataKey, row: T) => ReactElement;
  sortable?: boolean;
  renderCell?: (column: DataKey, row: T) => ReactNode;
}

export function TableBody<T extends TableDataRow>({
  data,
  errorRow,
  loaderRow,
  loading,
  placeholderRows,
  onCheck,
  rowActions,
  sortable = true,
  renderCell,
}: TableBodyProps<T>) {
  const { checkable, checked, columns, error, errorText, placeholder, primaryKey, rowHeight, virtualized } = useContext(TableContext);

  const intersectionObserver = useRef<IntersectionObserver>(null);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  const [visibleRowsIndexes, setVisibleRowsIndexes] = useState<Array<number>>([]);
  const primaryCol = useMemo(() => Object.keys(columns).filter(key => key === primaryKey), [columns, primaryKey]);
  const cols = useMemo(() => Object.keys(columns).filter(key => key !== primaryKey && key !== 'actions'), [columns, primaryKey]);
  const rowRefCallback = useCallback((row: HTMLTableRowElement | null) => {
    if (!row) {
      return;
    }
    intersectionObserver.current?.observe(row);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const target = entry.target as HTMLTableRowElement;
        const index = +(target.dataset.index as string);
        if (!entry.isIntersecting) {
          target.ariaHidden = 'true';
          delete target.dataset.visible;
          setVisibleRowsIndexes(prev => prev.filter(n => n !== index));
          return;
        };
        target.ariaHidden = null;
        target.dataset.visible = 'true';
        setVisibleRowsIndexes(prev => [...prev, index]);
      });
    }, { threshold: 0.1, root: tbodyRef.current?.closest('.Table__scrollcontainer') as HTMLDivElement, rootMargin: '100px 0px' });
    intersectionObserver.current = observer;
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (tbodyRef.current) {
      const visibleRows = tbodyRef.current.getBoundingClientRect().height / rowHeight;
      console.log(rowHeight, tbodyRef.current.getBoundingClientRect().top, tbodyRef.current.getBoundingClientRect().bottom, visibleRows);
    }
  }, [rowHeight]);


  const onScroll: React.UIEventHandler<HTMLTableSectionElement> = (e) => {
    console.log(e.currentTarget.clientHeight, e.currentTarget.scrollHeight, e.currentTarget.offsetHeight)
  }

  // @TODO: Retry button
  if (error) {
    return (
      <tbody>
        {(error && errorRow) ? errorRow(errorText || error.message) : null}
      </tbody>
    );
  }

  return (
    // @ts-expect-error css variable...
    <tbody onScroll={onScroll} ref={tbodyRef} style={{ '--rowHeight': `${rowHeight}px` }}>
      {loading ? loaderRow : (
        data.map((row, rowIndex) => (
          <tr ref={el => virtualized ? rowRefCallback(el) : noop} key={row.key} className={TR_CLASSES} data-index={rowIndex}>
            {!virtualized || visibleRowsIndexes.includes(rowIndex) ? (
              <>
                {primaryCol.map((key) => {
                  const cellContent = row[key] ?? placeholder;
                  if (key === primaryKey) {
                    return (
                      <TableCell
                        title={cellContent.toString()}
                        key={`td-${key}`}
                        className={classNames(TD_CLASSES, { 'font-bold text-left': sortable })}
                      >
                        {checkable ?
                          (
                            <>
                              <input
                                className={CHECK_COL_CLASSES}
                                type="checkbox"
                                name={row.key.toString()}
                                id={row.key.toString()}
                                onChange={onCheck}
                                checked={checked.has(row.key)}
                              />
                              <label className={classNames({ 'cursor-pointer': checkable })} htmlFor={row.key.toString()}>
                                {renderCell ? renderCell(key, row) : cellContent}
                              </label>
                            </>
                          )
                          : (renderCell ? renderCell(key, row) : cellContent)
                        }
                      </TableCell>
                    )
                  }
                })}
                {cols.map((key) => {
                  const cellContent = row[key] ?? placeholder;
                  if (key !== primaryKey) {
                    return (
                      <TableCell
                        key={`td-${key}`}
                        className={classNames(TD_CLASSES, 'text-right')}
                      >
                        {renderCell ? renderCell(key, row) : cellContent}
                      </TableCell>
                    )
                  }
                })}
                {rowActions ? (
                  <td className={classNames(TD_CLASSES, "flex items-center")}>
                    {rowActions(row.key, row)}
                  </td>
                ) : (
                  null
                )}
              </>
            ) : (
              null
            )}
          </tr>
        )
        )
      )}
      {loading ? null : placeholderRows}
    </tbody>
  )
}

interface TableCellProps {
  className?: string;
  title?: string;
}

function TableCell({ children, className, title }: PropsWithChildren<TableCellProps>) {
  return (
    <td className={className} title={title ?? (typeof children === 'string' ? children?.toString() : undefined)}>{children}</td>
  );
}