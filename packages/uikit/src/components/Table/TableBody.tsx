import classNames from "classnames";
import { ReactElement } from "react";
import { DataKey, TBODY_CLASSES, TR_CLASSES, CHECK_COL_CLASSES, TD_CLASSES } from "./common";
import { useTableContext } from "./TableContext";

export interface TableBodyProps<T extends Record<string, string | number>> {
  checked: Set<DataKey>;
  data: T[];
  loaderRow: ReactElement;
  loading: boolean;
  placeholderRows: ReactElement[];
  onCheck: React.ChangeEventHandler<HTMLInputElement>;
  rowActions?: (dataKey: DataKey, row: T) => ReactElement;
}

export function TableBody<T extends Record<string, string | number>>({
  checked,
  data,
  loaderRow,
  loading,
  placeholderRows,
  onCheck,
  rowActions,
}: TableBodyProps<T>) {
  const { checkable, columns, placeholder, primaryKey } = useTableContext();

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
                      <label className="cursor-pointer" htmlFor={row.key.toString()}>{cellContent}</label>
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
