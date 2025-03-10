import classNames from "classnames";
import { ReactElement, useContext } from "react";
import { DataKey, TBODY_CLASSES, TR_CLASSES, CHECK_COL_CLASSES, TD_CLASSES } from "./common";
import { TableContext } from "./TableContext";

export interface TableBodyProps<T extends Record<string, string | number>> {
  data: T[];
  errorRow: (errorMessage: string) => ReactElement;
  loaderRow: ReactElement;
  loading: boolean;
  placeholderRows: ReactElement[];
  onCheck: React.ChangeEventHandler<HTMLInputElement>;
  rowActions?: (dataKey: DataKey, row: T) => ReactElement;
}

export function TableBody<T extends Record<string, string | number>>({
  data,
  errorRow,
  loaderRow,
  loading,
  placeholderRows,
  onCheck,
  rowActions,
}: TableBodyProps<T>) {
  const { checkable, checked, columns, error, errorText, placeholder, primaryKey } = useContext(TableContext);

  if (error) {
    return (
      <tbody className={TBODY_CLASSES}>
        {error ? errorRow(errorText || error.message) : null}
      </tbody>
    )
  }

  return (
    <tbody className={TBODY_CLASSES}>
      {loading ? loaderRow : (
        data.map(row => {
          return (
            <tr key={row.key} className={TR_CLASSES}>
              {checkable ? (
                <td className={CHECK_COL_CLASSES}>
                  <input className="cursor-pointer" type="checkbox" name={row.key.toString()} id={row.key.toString()} onChange={onCheck} checked={checked.has(row.key)} />
                </td>
              ) : null}
              {Object.keys(columns).map((key) => {
                const cellContent = row[key] ?? placeholder;
                if (key === primaryKey) {
                  return (
                    <td
                      title={cellContent.toString()}
                      key={`td-${key}`}
                      className={classNames(TD_CLASSES, 'font-bold', 'text-left')}
                    >
                      <label className={classNames({'cursor-pointer': checkable})} htmlFor={row.key.toString()}>{cellContent}</label>
                    </td>
                  )
                } else {
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
            </tr>
          )
        })
      )}
      {loading ? null : placeholderRows}
    </tbody>
  )
}
