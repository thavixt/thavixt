import classNames from "classnames";
import { PropsWithChildren, ReactElement, RefObject, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import { omitKey } from "../../common/utils";
import { Scrollbar } from "../Scrollbar/Scrollbar";
import { Loader } from "../Loader/Loader";
import { DataKey, CONTAINER_CLASSES, TABLE_ROW_HEIGHT, TABLE_CONTAINER_CLASSES, TABLE_CLASSES, PLACEHOLDER_TR_CLASSES } from "./common";
import { TableBody } from "./TableBody";
import { TableFooter } from "./TableFooter";
import { TableHeader } from "./TableHeader";
import { getPagedData, hasNextPage, hasPrevPage } from "./utils";
import { TableContext } from "./TableContext";

export type TableHandle = {
  container: HTMLDivElement | null;
  table: HTMLTableElement | null;
  getSelectedKeys: () => DataKey[];
  getSelectedRows: () => Record<string, string | number>[];
}

export interface TableProps<T extends Record<string, string | number>> {
  /** Selectable - render a checkbox column at the start */
  checkable?: boolean;
  className?: string;
  columns: Record<DataKey, string>;
  data: Array<T>;
  emptyText?: string;
  /** Full size table - not scrollable overflowing body */
  full?: boolean;
  loading?: boolean;
  loadingText?: string;
  /** Pagination
   * - `false | undefined` (default) has no pagination - all rows rendered, maybe scroll
   * - `true` determines the page size automatically depending on the current `<table>` height
   * - `number` sets a specific page size
   * */
  page?: number | boolean;
  placeholder?: string;
  primaryKey: DataKey;
  ref?: RefObject<TableHandle | null>;
  search?: boolean;

  actions?: (dataKey: DataKey, row: T) => ReactElement;
  onPage?: (rowsToLoad: number, prevData: T[], nextPage: number, prevPage: number) => Promise<
    { nextData: T[], pageCount: number }
  >;
  onSelect?: (selectedDataKeys: DataKey[], data: T[]) => void;
};

export function Table<T extends Record<string, string | number>>({
  actions,
  checkable = false,
  className,
  data = [],
  columns,
  emptyText = 'No rows to display',
  full: providedFull = false,
  loading = false,
  loadingText = 'Loading',
  onPage,
  onSelect,
  page,
  placeholder = '-',
  primaryKey,
  ref,
  search = false,
}: TableProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const [checkedKeys, setCheckedKeys] = useState<Set<DataKey>>(new Set());
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(loading);
  const [loaderRowHeight, setLoaderRowHeight] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(typeof page === 'number' ? page : 0);
  const [placeholderRowHeight, setPlaceholderRowHeight] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [tableData, setTableData] = useState<T[]>(data);

  const filteredData = useMemo(() => tableData.filter(row => {
    if (!searchTerm) {
      return true;
    }
    const values = Object.values(omitKey(row, 'key'));
    const searchStr = values.join(' ').toLowerCase();
    return searchStr.includes(searchTerm);
  }), [searchTerm, tableData]);

  const currentPageData = useMemo(() => {
    if (onPage) {
      return filteredData;
    }
    return pageSize ? getPagedData(filteredData, pageSize, currentPage) : filteredData
  }, [currentPage, filteredData, onPage, pageSize]);

  const prevPage = useCallback(async () => {
    if (currentPage > 0) {
      setCurrentPage(prev => Math.max(0, prev - 1));
      if (!onPage) {
        return;
      }
      setIsLoading(true);
      const result = await onPage(pageSize, currentPageData, currentPage - 1, currentPage);
      setTableData(result.nextData);
      setPageCount(result.pageCount);
      setIsLoading(false);
    }
  }, [currentPage, onPage, pageSize, currentPageData]);

  const nextPage = useCallback(async () => {
    if (currentPage < pageCount) {
      setCurrentPage(prev => Math.min(pageCount, prev + 1));
      if (!onPage) {
        return;
      }
      setIsLoading(true);
      const result = await onPage(pageSize, currentPageData, currentPage + 1, currentPage);
      setTableData(result.nextData);
      setPageCount(result.pageCount);
      setIsLoading(false);
    }
  }, [currentPage, onPage, pageCount, pageSize, currentPageData]);

  const handleRowCheck: React.ChangeEventHandler<HTMLInputElement> = useCallback(({ target: { name, checked } }) => {
    setCheckedKeys(prev => {
      const next = new Set(prev);
      if (checked) {
        next.add(name);
      } else {
        next.delete(name);
      }
      onSelect?.(Array.from(next.keys()), tableData.filter(d => next.has(d.key)));
      return next;
    });
  }, [onSelect, tableData]);

  const handleCheckAll: React.ChangeEventHandler<HTMLInputElement> = useCallback(({ target: { checked } }) => {
    setCheckedKeys(() => {
      if (checked) {
        const allKeys = tableData.map(row => row.key);
        onSelect?.(allKeys, data);
        return new Set(allKeys);
      }
      onSelect?.([], []);
      return new Set();
    });
  }, [data, onSelect, tableData]);

  const placeholderRows = useMemo(() => {
    const rows = [];
    const showEmptyText = pageCount ? !currentPageData.length : !filteredData.length;
    if (placeholderRowHeight) {
      rows.push(
        <PlaceholderTR key="placeholder_emptytext" height={placeholderRowHeight} checkable={checkable}>
          <div className="flex space-x-2 items-center justify-center">
            <span>{showEmptyText ? emptyText : ''}</span>
          </div>
        </PlaceholderTR>
      );
    }
    return rows;
  }, [checkable, emptyText, filteredData.length, pageCount, currentPageData.length, placeholderRowHeight]);

  const loaderRow = useMemo(
    () => <PlaceholderTR key="placeholder_loadingtext" height={loaderRowHeight} checkable={checkable}>
      <div className="flex space-x-2 items-center justify-center">
        <span>{loadingText}</span>
        <Loader type="SpinningDots" height={8} />
      </div>
    </PlaceholderTR>,
    [checkable, loaderRowHeight, loadingText],
  );

  useLayoutEffect(() => {
    if (containerRef.current) {
      // container height
      const containerHeight = containerRef.current.parentElement?.clientHeight;
      if (!containerHeight) {
        return;
      }

      // minus header and footer height
      const tfootHeight = containerRef.current.getElementsByTagName('tfoot')[0].clientHeight;
      const theadHeight = containerRef.current.getElementsByTagName('thead')[0].clientHeight;
      const heightToFill = containerHeight - theadHeight - tfootHeight;
      if (typeof page === 'boolean' && page) {
        setPageSize(Math.floor(heightToFill / TABLE_ROW_HEIGHT));
      }
      // placeholder row height should fill the empty space
      const renderedRowHeights = currentPageData.length * TABLE_ROW_HEIGHT;
      setLoaderRowHeight(heightToFill);
      if (renderedRowHeights < heightToFill) {
        setPlaceholderRowHeight(heightToFill - renderedRowHeights);
        return;
      }
      setPlaceholderRowHeight(0);
    }
  }, [filteredData.length, page, pageCount, pageSize, currentPageData.length]);

  useEffect(() => {
    if (onPage) {
      return;
    }
    setPageCount(pageSize ? Math.ceil(tableData.length / pageSize) : 0);
  }, [onPage, pageSize, tableData.length]);

  useEffect(() => {
    if (!initialLoad) {
      return;
    }
    (async function InitialPageLoad() {
      if (page && currentPage === 0 && onPage && pageSize) {
        setIsLoading(true);
        const result = await onPage(pageSize, [], 0, -1);
        setTableData(result.nextData);
        setPageCount(result.pageCount);
        setIsLoading(false);
        setInitialLoad(false);
      }
    })();
  }, [currentPage, initialLoad, onPage, page, pageSize]);

  useImperativeHandle(
    ref,
    () => ({
      container: containerRef?.current,
      table: tableRef?.current,
      getSelectedKeys: () => Array.from(checkedKeys.values()),
      getSelectedRows: () => tableData.filter(row => checkedKeys.has(row.key)),
      getVisibleData: () => currentPageData,
    }),
    [checkedKeys, currentPageData, tableData],
  );

  const full = pageSize ? true : providedFull;

  return (
    <Scrollbar data-testid="Table" className={classNames(CONTAINER_CLASSES, className)}>
      <div ref={containerRef} className={TABLE_CONTAINER_CLASSES}>
        <table ref={tableRef} className={TABLE_CLASSES}>
          <TableContext.Provider value={{
            checkable,
            columns,
            emptyText,
            full,
            placeholder,
            primaryKey,
            search,
          }}>
            <TableHeader
              checkedSize={checkedKeys.size}
              dataLength={tableData.length}
              hasActions={!!actions}
              onCheckAll={handleCheckAll}
            />
            <TableBody
              checked={checkedKeys}
              data={currentPageData}
              loaderRow={loaderRow}
              loading={isLoading}
              onCheck={handleRowCheck}
              placeholderRows={placeholderRows}
              rowActions={actions}
            />
            <TableFooter
              currentPage={currentPage}
              dataLength={tableData.length}
              hasNextPage={hasNextPage(currentPage, pageCount)}
              hasPrevPage={hasPrevPage(currentPage)}
              onNextPage={nextPage}
              onPrevPage={prevPage}
              pageSize={pageSize}
              setSearchTerm={setSearchTerm}
            />
          </TableContext.Provider>
        </table>
      </div>
    </Scrollbar>
  );
}

function PlaceholderTR({ checkable, children, height }: PropsWithChildren<{ checkable?: boolean; height: number }>) {
  return (
    <tr
      className={PLACEHOLDER_TR_CLASSES}
      style={{ height }}
    >
      {checkable ? <td /> : null}
      {children ? (<td colSpan={99999}><em>{children}</em></td>) : null}
    </tr>
  );
}
