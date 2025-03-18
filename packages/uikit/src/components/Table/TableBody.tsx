import classNames from "classnames";
import { ReactElement, useContext, useMemo } from "react";
import { DataKey, TBODY_CLASSES, TR_CLASSES, CHECK_COL_CLASSES, TD_CLASSES, TableDataRow } from "./common";
import { TableContext } from "./TableContext";

export interface TableBodyProps<T extends TableDataRow> {
  data: T[];
  errorRow?: (errorMessage: string) => ReactElement;
  loaderRow?: ReactElement;
  loading?: boolean;
  placeholderRows?: ReactElement[];
  onCheck?: React.ChangeEventHandler<HTMLInputElement>;
  rowActions?: (dataKey: DataKey, row: T) => ReactElement;
  sortable?: boolean;
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
}: TableBodyProps<T>) {
  const { checkable, checked, columns, error, errorText, placeholder, primaryKey } = useContext(TableContext);

  const primaryCol = useMemo(() => Object.keys(columns).filter(key => key === primaryKey), [columns, primaryKey]);
  const cols = useMemo(() => Object.keys(columns).filter(key => key !== primaryKey), [columns, primaryKey]);

  // @todo: Retry button
  if (error) {
    return (
      <tbody className={TBODY_CLASSES}>
        {(error && errorRow) ? errorRow(errorText || error.message) : null}
      </tbody>
    );
  }

  return (
    <tbody className={TBODY_CLASSES}>
      {loading ? loaderRow : (
        data.map(row => {
          return (
            <tr key={row.key} className={TR_CLASSES}>
              <>
                {checkable ? (
                  <td className={CHECK_COL_CLASSES}>
                    <input className="cursor-pointer" type="checkbox" name={row.key.toString()} id={row.key.toString()} onChange={onCheck} checked={checked.has(row.key)} />
                  </td>
                ) : null}
                {/* primary column */}
                {primaryCol.map((key) => {
                  const cellContent = row[key] ?? placeholder;
                  if (key === primaryKey) {
                    return (
                      <td
                        title={cellContent.toString()}
                        key={`td-${key}`}
                        className={classNames(TD_CLASSES, { 'font-bold text-left': sortable })}
                      >
                        <label className={classNames({ 'cursor-pointer': checkable })} htmlFor={row.key.toString()}>{cellContent}</label>
                      </td>
                    )
                  }
                })}
                {/* rest of the columns */}
                {cols.map((key) => {
                  const cellContent = row[key] ?? placeholder;
                  if (key !== primaryKey) {
                    return (
                      <td
                        title={cellContent.toString()}
                        key={`td-${key}`}
                        className={classNames(TD_CLASSES, 'text-right')}
                      >
                        {cellContent}
                      </td>
                    )
                  }
                })}
                {rowActions ? (
                  <td className={classNames(TD_CLASSES, "flex items-center")}>
                    {rowActions(row.key, row)}
                  </td>
                ) : null}
              </>
            </tr>
          )
        })
      )}
      {loading ? null : placeholderRows}
    </tbody>
  )
}
