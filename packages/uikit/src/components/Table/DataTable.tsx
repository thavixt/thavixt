import classNames from "classnames";
import { JSX, RefObject, useContext, useMemo } from "react";
import { Scrollbar } from "../Scrollbar/Scrollbar";
import { DataKey, TABLE_CONTAINER_CLASSES, SCROLLCONTAINER_CLASSES_DATATABLE, TABLE_CLASSES_DATATABLE, TableDataRow } from "./common";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import { TableContext, TableContextProvider } from "./TableContext";

interface StaticDataTableProps<T> {
  className?: string;
  data: Array<T>;
  ref?: RefObject<HTMLTableElement | null>;
}

export interface DataTableProps<T extends TableDataRow> extends StaticDataTableProps<T> {
  columns: Record<DataKey, {name: string, width: string | number}>;
  defaultSortBy?: DataKey;
  placeholder?: string;
  primaryKey: DataKey;
};

/**
 * A light-weight, generic DataTable component that provides a table structure with sorting.
 *
 * @template T - The type of the table data row, extending the `TableDataRow` interface.
 *
 * @returns {JSX.Element} The rendered DataTable component wrapped in a `TableContextProvider`.
 */
export function DataTable<T extends TableDataRow>({
  ref,
  columns,
  defaultSortBy,
  placeholder = '-',
  primaryKey,
  ...staticTableProps
}: DataTableProps<T>): JSX.Element {

  return (
    <TableContextProvider value={{
      checkable: false,
      columns: columns,
      placeholder: placeholder,
      primaryKey: primaryKey,
      sortBy: defaultSortBy ?? primaryKey,
    }}
    >
      <TableContent ref={ref} {...staticTableProps} />
    </TableContextProvider>
  );
}

function TableContent<T extends TableDataRow>({
  className,
  data = [],
  ref,
}: StaticDataTableProps<T>) {
  const { sortBy, sortDirection } = useContext(TableContext);

  const sortedData = useMemo(() => {
    const dataCopy = [...data];
    if (sortBy) {
      dataCopy.sort((a, b) => {
        const aValue = a[sortBy]?.toString() ?? '';
        const bValue = b[sortBy]?.toString() ?? '';
        if (sortDirection === 'desc') {
          return aValue.localeCompare(bValue, navigator.language, { numeric: true });
        } else {
          return bValue.localeCompare(aValue, navigator.language, { numeric: true });
        }
      });
    }

    return dataCopy;
  }, [data, sortBy, sortDirection]);

  return (
    <Scrollbar data-testid="DataTable" className={classNames(SCROLLCONTAINER_CLASSES_DATATABLE, className)}>
      <div className={TABLE_CONTAINER_CLASSES} role="rowgroup">
        <table ref={ref} className={TABLE_CLASSES_DATATABLE} role="grid">
          <TableHeader />
          <TableBody data={sortedData} />
        </table>
      </div>
    </Scrollbar >
  );
}
