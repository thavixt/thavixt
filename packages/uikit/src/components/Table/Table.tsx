import classNames from "classnames";
import { PropsWithChildren, ReactElement, RefObject, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import { omitKey } from "../../common/utils";
import { Button } from "../Button/Button";
import { Scrollbar } from "../Scrollbar/Scrollbar";
import { TextInput } from "../TextInput/TextInput";
import { Loader } from "../Loader/Loader";

const CHECK_ALL_KEY = 'table_check_all';
const PADDING_CLASSES = 'px-4 py-2';

const CONTAINER_CLASSES = 'relative size-full min-h-[400px] overflow-x-auto rounded-lg text-normal text-slate-500 dark:text-slate-300 shadow-lg';
const TABLE_CONTAINER_CLASSES = 'w-full h-full min-h-0';
const TABLE_CLASSES = 'table-auto w-full border-collapse text-sm bg-slate-100 dark:bg-slate-700';

const THEAD_CLASSES = 'sticky top-0 text-xs bg-slate-200 dark:bg-slate-800';
const TH_CLASSES = classNames(PADDING_CLASSES, 'text-left truncate');

const TBODY_CLASSES = '';
const PLACEHOLDER_TR_CLASSES = 'h-11';
const TR_CLASSES = classNames(
  PLACEHOLDER_TR_CLASSES,
  'outline outline-gray-200 dark:outline-gray-600');

const TD_CLASSES = classNames(PADDING_CLASSES, 'whitespace-nowrap truncate max-w-[200px]');

const TFOOT_CLASSES = 'sticky bottom-0 bg-slate-200 dark:bg-slate-800'
const TFOOTTD_CLASSES = classNames(PADDING_CLASSES);

const BUTTON_CLASSES = 'w-fit text-xs bg-transparent';

const CHECK_COL_CLASSES = 'pl-3 pr-1 text-center'

function getPagedData<T>(items: T[], pageSize: number, pageCount: number): T[] {
  const index = pageCount * pageSize;
  return items.slice(index, index + pageSize);
}

export type TableHandle = {
  container: HTMLDivElement | null;
  table: HTMLTableElement | null;
  getSelectedKeys: () => DataKey[];
  getSelectedRows: () => Record<string, string | number>[];
}

export type DataKey = string | number;

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
  ref?: RefObject<TableHandle | null>,
  search?: boolean;

  actions?: (dataKey: DataKey, row: T) => ReactElement;
  onPage?: (rowsToLoad: number, prevData: T[], nextPage: number, prevPage: number) => Promise<
    { nextData: T[], pageCount: number }
  >;
  onSelect?: (selectedDataKeys: DataKey[], data: T[]) => void;

  // @todo implement action in footer
  // should have selected keys array as onclick args
};

export function Table<T extends Record<string, string | number>>({
  actions,
  checkable,
  className,
  data = [],
  columns: dataKeys,
  emptyText = 'No rows to display',
  full: providedFull,
  loading = false,
  loadingText = 'Loading',
  onPage,
  onSelect,
  page,
  placeholder = '-',
  primaryKey,
  ref,
  search,
}: TableProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const [checked, setChecked] = useState<Set<DataKey>>(new Set());
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
  const pagedData = useMemo(() => {
    if (onPage) {
      return filteredData;
    }
    return pageSize ? getPagedData(filteredData, pageSize, currentPage) : filteredData
  }, [currentPage, filteredData, onPage, pageSize]);

  const hasPrevPage = useMemo(() => currentPage > 0, [currentPage]);
  const hasNextPage = useMemo(() => currentPage < pageCount - 1, [currentPage, pageCount]);

  const prevPage = useCallback(async () => {
    if (currentPage > 0) {
      setCurrentPage(prev => Math.max(0, prev - 1));
      if (!onPage) {
        return;
      }
      setIsLoading(true);
      const result = await onPage(pageSize, pagedData, currentPage - 1, currentPage);
      setTableData(result.nextData);
      setPageCount(result.pageCount);
      setIsLoading(false);
    }
  }, [currentPage, onPage, pageSize, pagedData]);
  const nextPage = useCallback(async () => {
    if (currentPage < pageCount) {
      setCurrentPage(prev => Math.min(pageCount, prev + 1));
      if (!onPage) {
        return;
      }
      setIsLoading(true);
      const result = await onPage(pageSize, pagedData, currentPage + 1, currentPage);
      setTableData(result.nextData);
      setPageCount(result.pageCount);
      setIsLoading(false);
    }
  }, [currentPage, onPage, pageCount, pageSize, pagedData]);

  const full = pageSize ? true : providedFull;
  const containerClasses = classNames(
    CONTAINER_CLASSES,
    {
      // 'h-fit': full,
      // 'max-h-100': !full,
      // 'h-100 max-h-full': search
    },
    className,
  );
  const theadClasses = classNames(
    THEAD_CLASSES,
    { 'top-0 sticky': !full },
  );
  const tfootClasses = classNames(
    TFOOT_CLASSES,
    { 'bottom-0 sticky': !full },
  );

  const onCheck: React.ChangeEventHandler<HTMLInputElement> = useCallback(({ target: { name, checked } }) => {
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
  }, [onSelect, tableData]);

  const onCheckAll: React.ChangeEventHandler<HTMLInputElement> = useCallback(({ target: { checked } }) => {
    setChecked(() => {
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
    const showEmptyText = pageCount ? !pagedData.length : !filteredData.length;
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
  }, [checkable, emptyText, filteredData.length, pageCount, pagedData.length, placeholderRowHeight]);

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

      const rowHeight = 4 * 11;
      // minus header and footer height
      const tfootHeight = containerRef.current.getElementsByTagName('tfoot')[0].clientHeight;
      const theadHeight = containerRef.current.getElementsByTagName('thead')[0].clientHeight;
      const heightToFill = containerHeight - theadHeight - tfootHeight;
      if (typeof page === 'boolean' && page) {
        setPageSize(Math.floor(heightToFill / rowHeight));
      }
      // placeholder row height should fill the empty space
      const renderedRowHeights = (pageCount ? pagedData.length : filteredData.length) * rowHeight;
      setLoaderRowHeight(heightToFill);
      if (renderedRowHeights < heightToFill) {
        setPlaceholderRowHeight(heightToFill - renderedRowHeights);
        return;
      }
      setPlaceholderRowHeight(0);
    }
  }, [filteredData.length, page, pageCount, pageSize, pagedData.length]);

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
      getSelectedKeys: () => Array.from(checked.values()),
      getSelectedRows: () => tableData.filter(row => checked.has(row.key)),
      getVisibleData: () => pagedData,
    }),
    [checked, pagedData, tableData],
  );

  return (
    <Scrollbar data-testid="Table" ref={containerRef} className={containerClasses}>
      <div className={TABLE_CONTAINER_CLASSES}>
        <table ref={tableRef} className={TABLE_CLASSES}>
          <thead className={theadClasses}>
            <tr>
              {checkable ? (
                <th className={CHECK_COL_CLASSES}>
                  <input
                    disabled={!tableData.length}
                    checked={tableData.length ? checked.size === tableData.length : false}
                    name={CHECK_ALL_KEY}
                    onChange={onCheckAll}
                    title={checked.size === tableData.length ? 'Deselect all' : 'Select all'}
                    type="checkbox"
                  />
                </th>
              ) : null}
              {Object.entries(dataKeys).map(([key, value]) => {
                return (
                  <th key={`td-${key}`} className={
                    key === primaryKey ? classNames(TH_CLASSES, 'font-bold', 'text-left') : classNames(TH_CLASSES, 'text-right')
                  }>
                    {value}
                  </th>
                )
              })}
              {actions ? (
                <th className={classNames(TH_CLASSES, 'text-left')}>
                  Actions
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody className={TBODY_CLASSES}>
            {isLoading ? loaderRow : null}
            {isLoading ? null : (
              pagedData.map(row => {
                return (
                  <tr key={row.key} className={TR_CLASSES}>
                    {checkable ? (
                      <td className={CHECK_COL_CLASSES}>
                        <input className="cursor-pointer" type="checkbox" name={row.key.toString()} id={row.key.toString()} onChange={onCheck} checked={checked.has(row.key)} />
                      </td>
                    ) : null}
                    {Object.keys(dataKeys).map((key) => {
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
                    {actions ? (
                      <td className={classNames(TD_CLASSES, "flex items-center")}>
                        {actions(row.key, row)}
                      </td>
                    ) : null}
                  </tr>
                )
              })
            )}
            {isLoading ? null : placeholderRows}
          </tbody>
          <tfoot className={tfootClasses} hidden={!search && !pageSize}>
            <tr>
              {search ? (
                <td className={TFOOTTD_CLASSES} colSpan={checkable ? 2 : 1}>
                  <TextInput placeholder="Search" name="search" onChange={setSearchTerm} />
                </td>
              ) : null}
              <td className={classNames(TFOOTTD_CLASSES, 'text-right')} colSpan={Object.keys(dataKeys).length + (search ? 0 : 1)}>
                {pageSize ? (
                  <div className="flex justify-end items-center">
                    <Button
                      title="Previous page"
                      className={BUTTON_CLASSES}
                      onClick={prevPage}
                      disabled={!hasPrevPage}
                      icon={{ type: 'Arrow', className: 'rotate-180' }}
                    />
                    <span
                      title="Current page"
                      className="text-xs text-center min-w-24">
                      <span>{(currentPage) * pageSize} - {(currentPage + 1) * pageSize} of {pageCount * pageSize}</span>
                    </span>
                    <Button
                      title="Next page"
                      className={BUTTON_CLASSES}
                      onClick={nextPage}
                      disabled={!hasNextPage}
                      icon={{ type: 'Arrow' }}
                    />
                  </div>
                ) : null}
              </td>
            </tr>
          </tfoot>
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