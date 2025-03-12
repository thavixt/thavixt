import classNames from "classnames";
import { PropsWithChildren, ReactElement, RefObject, useCallback, useContext, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import { omitKey } from "../../common/utils";
import { Scrollbar } from "../Scrollbar/Scrollbar";
import { Loader } from "../Loader/Loader";
import { DataKey, CONTAINER_CLASSES, TABLE_ROW_HEIGHT, TABLE_CONTAINER_CLASSES, TABLE_CLASSES, PLACEHOLDER_TR_CLASSES, OnPageHandler, PLACEHOLDER_TD_CLASSES } from "./common";
import { TableBody } from "./TableBody";
import { TableFooter } from "./TableFooter";
import { TableHeader } from "./TableHeader";
import { getPagedData, hasNextPage, hasPrevPage } from "./utils";
import { usePagination } from "./usePagination";
import { TableContext, TableContextProvider } from "./TableContext";

const MAX_COLSPAN = 99999;

export type TableHandle = RefObject<HTMLDivElement | null> & {
  // container: HTMLDivElement | null;
  table: HTMLTableElement | null;
  getSelectedKeys: () => DataKey[];
  getSelectedRows: () => Record<string, string | number>[];
}

interface StaticTableProps<T> {
  className?: string;
  data: Array<T>;
  loading?: boolean;
  /**
   * - `false | undefined` (default) has no pagination - all rows rendered, scroll if needed
   * - `true` determine the page size automatically depending on the current `<table>` height
   * - `number` sets a specific page size
   * */
  paginated?: number | boolean;
  ref?: RefObject<TableHandle | null>;

  actions?: (dataKey: DataKey, row: T) => ReactElement;
  /** If provided, the content of next page and the currently known max page size should be returned */
  onPage?: OnPageHandler<T>;
  onSelect?: (selectedDataKeys: DataKey[], data: T[]) => void;
}

export interface TableProps<T extends Record<string, string | number>> extends StaticTableProps<T> {
  /** Selectable - render a checkbox column at the start */
  checkable?: boolean;
  columns: Record<DataKey, string>;
  defaultSortBy?: DataKey;
  emptyText?: string;
  errorText?: string;
  loadingText?: string;
  placeholder?: string;
  primaryKey: DataKey;
  searchPlaceholder?: string;
  search?: boolean;
};

export function Table<T extends Record<string, string | number>>({
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

  ...staticTableProps
}: TableProps<T>) {

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
    }}
    >
      <TableContent ref={ref} {...staticTableProps} />
    </TableContextProvider>
  );
}

function TableContent<T extends Record<string, string | number>>({
  className,
  data = [],
  loading = false,
  actions,
  onPage,
  onSelect,
  paginated,
  ref,
}: StaticTableProps<T>) {
  const { checkable, checked, emptyText, loadingText, sortBy, sortDirection, setChecked } = useContext(TableContext);

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
        <PlaceholderTR key="tabler_emptytext" height={placeholderRowHeight} checkable={checkable}>
          <div className={PLACEHOLDER_TD_CLASSES}>
            <span>{showEmptyText ? emptyText : ''}</span>
          </div>
        </PlaceholderTR>
      );
    }
    return rows;
  }, [checkable, currentPageData.length, emptyText, placeholderRowHeight]);

  const loaderRow = useMemo(
    () => <PlaceholderTR key="table_loadingtext" height={loaderRowHeight} checkable={checkable}>
      <div className={PLACEHOLDER_TD_CLASSES}>
        <span>{loadingText}</span>
        <Loader type="SpinningDots" height={8} />
      </div>
    </PlaceholderTR>,
    [checkable, loaderRowHeight, loadingText],
  );

  const errorRow = useCallback(
    (errorMessage: string) => <PlaceholderTR key="table_errortext" height={loaderRowHeight} checkable={checkable}>
      <div className={PLACEHOLDER_TD_CLASSES}>
        <span>{errorMessage}</span>
      </div>
    </PlaceholderTR>,
    [checkable, loaderRowHeight],
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

  const isLoading = loading || paginationLoading;

  const onRender = useCallback(() => setRenderCount(prev => prev + 1), []);

  return (
    <Scrollbar data-testid="Table" className={classNames(CONTAINER_CLASSES, className)}>
      <div ref={containerRef} className={classNames(TABLE_CONTAINER_CLASSES, { 'overflow-hidden': placeholderRowHeight > 0 })} role="rowgroup">
        <table ref={tableRef} className={TABLE_CLASSES} role="grid">
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

function PlaceholderTR({ checkable, children, height }: PropsWithChildren<{ checkable?: boolean; height: number }>) {
  return (
    <tr
      className={PLACEHOLDER_TR_CLASSES}
      style={{ height }}
    >
      {checkable ? <td /> : null}
      {children ? (<td colSpan={MAX_COLSPAN}><em>{children}</em></td>) : null}
    </tr>
  );
}
