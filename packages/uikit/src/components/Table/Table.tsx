import classNames from "classnames";
import { JSX, PropsWithChildren, ReactElement, ReactNode, RefObject, useCallback, useContext, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import { omitKey } from "../../common/utils";
import { Scrollbar } from "../Scrollbar/Scrollbar";
import { Loader } from "../Loader/Loader";
import { DataKey, SCROLLCONTAINER_CLASSES, TABLE_ROW_HEIGHT, TABLE_CONTAINER_CLASSES, TABLE_CLASSES, PLACEHOLDER_TR_CLASSES, OnPageHandler, PLACEHOLDER_TD_CLASSES, TableDataRow } from "./common";
import { TableBody } from "./TableBody";
import { TableFooter } from "./TableFooter";
import { TableHeader } from "./TableHeader";
import { getPagedData, hasNextPage, hasPrevPage } from "./utils";
import { usePagination } from "./usePagination";
import { TableContext, TableContextProvider } from "./TableContext";
import "./Table.css";

const MAX_COLSPAN = 99999;

export type TableHandle = RefObject<HTMLDivElement | null> & {
  // container: HTMLDivElement | null;
  table: HTMLTableElement | null;
  getSelectedKeys: () => DataKey[];
  getSelectedRows: () => TableDataRow[];
}

interface StaticTableProps<T> {
  /** Table container classes */
  className?: string;
  /** Table rows */
  data: Array<T>;
  /** "Virtualize" table rows */
  virtualized?: boolean;
  /** Show loading state */
  loading?: boolean;
  /**
   * - `false | undefined` (default) has no pagination - all rows rendered, scroll if needed
   * - `true` determine the page size automatically depending on the current `<table>` height
   * - `number` sets a specific page size
   * */
  paginated?: number | boolean;
  /** Table handle */
  ref?: RefObject<TableHandle | null>;

  /** Table actions cell content */
  actions?: (dataKey: DataKey, row: T) => ReactElement;
  /** If provided, the content of next page and the currently known max page size should be returned */
  onPage?: OnPageHandler<T>;
  /** Table check callback */
  onSelect?: (selectedDataKeys: DataKey[], data: T[]) => void;
  /** Table cell renderer */
  renderCell?: (column: DataKey, row: T) => ReactNode;
}

export interface TableProps<T extends TableDataRow> extends StaticTableProps<T> {
  /** Selectable - render a checkbox column at the start */
  checkable?: boolean;
  /** Table columns */
  columns: Record<DataKey | 'actions', { name: string, width: string | number }>;
  /** Sort rows by value */
  defaultSortBy?: DataKey;
  /** Empty tabla placeholder */
  emptyText?: string;
  /** Loader error message */
  errorText?: string;
  /** Text to display while loading */
  loadingText?: string;
  /** Cell placeholder text */
  placeholder?: string;
  /** Primary row key */
  primaryKey: DataKey;
  /** Search input placeholder text */
  searchPlaceholder?: string;
  /** Allow search */
  search?: boolean;
  /** Row size */
  rowHeight?: number;
};

/**
 * A generic Table component that provides a flexible and customizable table structure.
 * It supports features like sorting, searching, pagination with loading, a virtualization-like solution, etc.
 *
 * @template T - The type of the data rows in the table.
 *
 * @returns {JSX.Element} The rendered Table component.
 */
export function Table<T extends TableDataRow>({
  ref,

  checkable = false,
  columns,
  defaultSortBy,
  emptyText = 'No rows to display',
  errorText = '',
  loadingText = 'Loading ...',
  placeholder = '-',
  primaryKey,
  search = false,
  searchPlaceholder = 'Search rows',
  virtualized,
  rowHeight = 44,

  ...staticTableProps
}: TableProps<T>): JSX.Element {

  return (
    <TableContextProvider value={{
      checkable: checkable,
      columns: columns,
      emptyText: emptyText,
      errorText: errorText,
      loadingText: loadingText,
      placeholder: placeholder,
      primaryKey: primaryKey,
      search: search,
      searchPlaceholder: searchPlaceholder,
      sortBy: defaultSortBy ?? primaryKey,
      virtualized: virtualized || false,
      rowHeight: rowHeight,
    }}
    >
      <TableContent ref={ref} {...staticTableProps} />
    </TableContextProvider>
  );
}

function TableContent<T extends TableDataRow>({
  className,
  data = [],
  loading = false,
  actions,
  onPage,
  onSelect,
  paginated,
  ref,
  renderCell,
}: StaticTableProps<T>) {
  const { checked, emptyText, loadingText, sortBy, sortDirection, setChecked, columns, virtualized } = useContext(TableContext);

  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const [renderCount, setRenderCount] = useState(0);
  const [loaderRowHeight, setLoaderRowHeight] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(typeof paginated === 'number' ? paginated : 0);
  const [placeholderRowHeight, setPlaceholderRowHeight] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const {
    currentPage,
    dataLength,
    isLoading: paginationLoading,
    nextPage,
    pageCount,
    prevPage,
    tableData,
  } = usePagination(
    data,
    pageSize,
    { dir: sortDirection, column: sortBy },
    onPage
  );

  const filteredData = useMemo(() => {
    const filtered = tableData.filter(row => {
      if (!searchTerm) {
        return true;
      }
      const searchTerms = searchTerm.split(' ');
      const values = Object.values(omitKey(row, 'key'));
      const searchStr = values.join(' ').toLowerCase();
      return searchTerms.every(term => searchStr.includes(term.toLowerCase()));
    });

    if (sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[sortBy]?.toString() ?? '';
        const bValue = b[sortBy]?.toString() ?? '';
        if (sortDirection === 'desc') {
          return aValue.localeCompare(bValue, navigator.language, { numeric: true });
        } else {
          return bValue.localeCompare(aValue, navigator.language, { numeric: true });
        }
      });
    }

    return filtered;
  }, [searchTerm, sortBy, sortDirection, tableData]);

  const currentPageData = useMemo(() => {
    if (onPage) {
      return filteredData;
    }
    return pageSize ? getPagedData(filteredData, pageSize, currentPage) : filteredData
  }, [currentPage, filteredData, onPage, pageSize]);

  const handleRowCheck: React.ChangeEventHandler<HTMLInputElement> = useCallback(({ target: { name, checked } }) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (checked) {
        next.add(name);
      } else {
        next.delete(name);
      }
      onSelect?.(Array.from(next.keys()), tableData.filter(d => next.has(d.key)));
      return next;
    });
  }, [onSelect, setChecked, tableData]);

  const handleCheckAll: React.ChangeEventHandler<HTMLInputElement> = useCallback(({ target: { checked } }) => {
    setChecked(() => {
      if (checked) {
        const allKeys = tableData.map(row => row.key);
        onSelect?.(allKeys, data);
        return new Set(allKeys);
      }
      onSelect?.([], []);
      return new Set();
    });
  }, [data, onSelect, setChecked, tableData]);

  const placeholderRows = useMemo(() => {
    const rows = [];
    const showEmptyText = !currentPageData.length;
    if (placeholderRowHeight) {
      rows.push(
        <PlaceholderTR data-testid="TableEmptyRow" key="tabler_emptytext" height={placeholderRowHeight}>
          <div className={PLACEHOLDER_TD_CLASSES}>
            <span>{showEmptyText ? emptyText : ''}</span>
          </div>
        </PlaceholderTR>
      );
    }
    return rows;
  }, [currentPageData.length, emptyText, placeholderRowHeight]);

  const loaderRow = useMemo(
    () => <PlaceholderTR data-testid="TableLoaderRow" key="table_loadingtext" height={loaderRowHeight}>
      <div className={PLACEHOLDER_TD_CLASSES}>
        <span>{loadingText}</span>
        <Loader type="SpinningDots" height={8} />
      </div>
    </PlaceholderTR>,
    [loaderRowHeight, loadingText],
  );

  const errorRow = useCallback(
    (errorMessage: string) => <PlaceholderTR data-testid="TableErrorRow" key="table_errortext" height={loaderRowHeight}>
      <div className={PLACEHOLDER_TD_CLASSES}>
        <span>{errorMessage}</span>
      </div>
    </PlaceholderTR>,
    [loaderRowHeight],
  );

  useLayoutEffect(() => {
    try {
      if (containerRef.current) {
        const containerHeight = containerRef.current.parentElement?.clientHeight;
        if (!containerHeight) {
          return;
        }
        // Calculate the height available for the table body
        // minus header and footer height
        const tfootHeight = containerRef.current.getElementsByTagName('tfoot')[0].clientHeight;
        const theadHeight = containerRef.current.getElementsByTagName('thead')[0].clientHeight;
        const heightToFill = containerHeight - theadHeight - tfootHeight;
        if (typeof paginated === 'boolean' && paginated) {
          setPageSize(Math.floor(heightToFill / TABLE_ROW_HEIGHT));
        }
        // Adjust placeholder row height to fill the remaining space
        const renderedRowHeights = currentPageData.length * TABLE_ROW_HEIGHT;
        setLoaderRowHeight(heightToFill);
        if (renderedRowHeights < heightToFill) {
          setPlaceholderRowHeight(heightToFill - renderedRowHeights);
          return;
        }
        setPlaceholderRowHeight(0);
      }
    } catch (error) {
      console.error('Error calculating layout:', error);
    }
  }, [currentPageData.length, paginated, renderCount]);

  useImperativeHandle<RefObject<HTMLDivElement | null>, TableHandle>(
    ref,
    () => ({
      current: containerRef?.current,
      table: tableRef.current,
      getSelectedKeys: () => Array.from(checked.values()),
      getSelectedRows: () => tableData.filter(row => checked.has(row.key)),
      getVisibleData: () => currentPageData,
    }),
    [checked, currentPageData, tableData],
  );

  const onRender = useCallback(() => setRenderCount(prev => prev + 1), []);
  const isLoading = loading || paginationLoading;

  return (
    <Scrollbar data-testid="Table" className={classNames(SCROLLCONTAINER_CLASSES, className)}>
      <div ref={containerRef} className={classNames(TABLE_CONTAINER_CLASSES, { 'overflow-hidden': placeholderRowHeight > 0 })} role="rowgroup">
        <table ref={tableRef} className={classNames(TABLE_CLASSES, virtualized && 'Table--virtualized')} role="table">
          <colgroup>
            {Object.entries(columns).map(([key, col]) => (
              <col key={key} span={1} width={typeof col === 'string' ? undefined : col.width} />
            ))}
          </colgroup>
          <TableHeader
            checkedSize={checked.size}
            dataLength={tableData.length}
            hasActions={!!actions}
            onCheckAll={handleCheckAll}
          />
          <TableBody
            data={currentPageData}
            errorRow={errorRow}
            loaderRow={loaderRow}
            loading={isLoading}
            onCheck={handleRowCheck}
            placeholderRows={placeholderRows}
            rowActions={actions}
            renderCell={renderCell}
          />
          <TableFooter
            onRender={onRender}
            currentPage={currentPage}
            dataLength={dataLength}
            hasNextPage={hasNextPage(currentPage, pageCount)}
            hasPrevPage={hasPrevPage(currentPage)}
            loading={isLoading}
            onNextPage={nextPage}
            onPrevPage={prevPage}
            pageSize={pageSize}
            setSearchTerm={setSearchTerm}
          />
        </table>
      </div>
    </Scrollbar >
  );
}

function PlaceholderTR({ children, height, ...props }: PropsWithChildren<{ height: number }>) {
  return (
    <tr
      className={PLACEHOLDER_TR_CLASSES}
      style={{ height }}
      {...props}
    >
      {/* {checkable ? <td /> : null} */}
      {children ? (<td colSpan={MAX_COLSPAN}><em>{children}</em></td>) : null}
    </tr>
  );
}
