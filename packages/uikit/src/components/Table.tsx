import classNames from "classnames";
import { ReactElement, RefObject, useImperativeHandle, useRef, useState } from "react";
import { TextInput } from "./TextInput";
import useScrollbar from "thavixt-scrollbar-react";
import { omitKey } from "../common/utils";
import { DEFAULT_SCROLLBAR_STYLES } from "./Scrollbar";
import { Button } from "./Button";

const CHECK_ALL_KEY = 'table_check_all';
const PADDING_CLASSES = 'px-4 py-2';

const CONTAINER_CLASSES = 'flex-grow shadow-lg max-h-full overflow-auto rounded-lg text-normal text-slate-500 dark:text-slate-300';
const TABLE_CONTAINER_CLASSES = 'w-full min-h-0';
const TABLE_CLASSES = 'relative table-auto w-full text-sm bg-slate-100 dark:bg-slate-700';

const THEAD_CLASSES = 'text-xs bg-slate-200 dark:bg-slate-800';
const TH_CLASSES = classNames(PADDING_CLASSES, 'text-left truncate');

const TBODY_CLASSES = '';
const PLACEHOLDER_TR_CLASSES = 'h-11';
const TR_CLASSES = classNames(
  PLACEHOLDER_TR_CLASSES,
  'outline outline-gray-200 dark:outline-gray-600');

const TD_CLASSES = classNames(PADDING_CLASSES, 'whitespace-nowrap truncate max-w-[200px]');

const TFOOT_CLASSES = 'text-xs bg-slate-200 dark:bg-slate-800'
const TFOOTTD_CLASSES = classNames(PADDING_CLASSES);

const BUTTON_CLASSES = 'w-fit text-xs bg-transparent cursor-pointer disabled:cursor-default disabled:text-transparent';

const CHECK_COL_CLASSES = 'w-10 text-center'

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
  className?: string;
  data: Array<T>;
  dataKeys: Record<DataKey, string>;
  placeholder?: string;
  primaryKey: DataKey;
  ref?: RefObject<TableHandle | null>,
  search?: boolean;
  /** Full size table - not scrollable overflowing body */
  full?: boolean;
  /** Pagination - number of rows a single page displays */
  pageSize?: number;
  /** Selectable - render a checkbox column at the start */
  checkable?: boolean;
  /** Tighter spacing */
  // @todo
  // compact?: boolean;

  actions?: (dataKey: DataKey, row: T) => ReactElement;
  onSelect?: (selectedDataKeys: DataKey[], data: T[]) => void;
};

export function Table<T extends Record<string, string | number>>({
  actions,
  checkable,
  className,
  data,
  dataKeys,
  full: providedFull,
  pageSize,
  placeholder = '-',
  primaryKey,
  ref,
  search,
  onSelect,
}: TableProps<T>) {
  const containerRef = useScrollbar<HTMLDivElement>({ styles: DEFAULT_SCROLLBAR_STYLES });
  const tableRef = useRef<HTMLTableElement>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [checked, setChecked] = useState<Set<DataKey>>(new Set());

  const filteredData = data.filter(row => {
    if (!searchTerm) {
      return true;
    }
    const values = Object.values(omitKey(row, 'key'));
    const searchStr = values.join(' ').toLowerCase();
    return searchStr.includes(searchTerm);
  });

  const pageCount = pageSize ? Math.ceil(data.length / pageSize) : 0;
  const pagedData = pageSize ? getPagedData(filteredData, pageSize, currentPage) : filteredData;
  const prevPage = () => setCurrentPage(prev => Math.max(0, prev - 1))
  const nextPage = () => setCurrentPage(prev => Math.min(pageCount, prev + 1))
  const hasPrevPage = currentPage > 0
  const hasNextPage = currentPage < pageCount - 1;

  useImperativeHandle(
    ref,
    () => ({
      container: containerRef?.current,
      table: tableRef?.current,
      getSelectedKeys: () => Array.from(checked.values()),
      getSelectedRows: () => data.filter(row => checked.has(row.key)),
    }),
    [checked, containerRef, data],
  );

  // @todo fix layout / should fit in container, viewport etc..
  const full = pageSize ? true : providedFull;
  const containerClasses = classNames(
    CONTAINER_CLASSES,
    {
      'h-fit': full,
      'max-h-100': !full,
      'h-100 max-h-full': search
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

  const onCheck: React.ChangeEventHandler<HTMLInputElement> = ({ target: { name, checked } }) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (checked) {
        next.add(name);
      } else {
        next.delete(name);
      }
      onSelect?.(Array.from(next.keys()), data.filter(d => next.has(d.key)));
      return next;
    });
  }
  const onCheckAll: React.ChangeEventHandler<HTMLInputElement> = ({ target: { checked } }) => {
    setChecked(() => {
      if (checked) {
        const allKeys = data.map(row => row.key);
        onSelect?.(allKeys, data);
        return new Set(allKeys);
      }
      onSelect?.([], []);
      return new Set();
    });
  }

  const placeholderRows = [];
  if (!filteredData.length) {
    placeholderRows.push(<PlaceholderTR key="notfound_placeholder" checkable={checkable} />);
  }

  return (
    <div ref={containerRef} className={containerClasses}>
      <div className={TABLE_CONTAINER_CLASSES}>
        <table ref={tableRef} className={TABLE_CLASSES}>
          <thead className={theadClasses}>
            <tr>
              {checkable ? (
                <th className={CHECK_COL_CLASSES}>
                  <input
                    checked={checked.size === data.length}
                    name={CHECK_ALL_KEY}
                    onChange={onCheckAll}
                    title={checked.size === data.length ? 'Deselect all' : 'Select all'}
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
            {pagedData.map(row => {
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
            })}
            {placeholderRows}
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
                    <button
                      title="Previous page"
                      className={BUTTON_CLASSES}
                      onClick={prevPage}
                      disabled={!hasPrevPage}
                    >
                      <Button icon="Arrow" className="rotate-180" />
                    </button>
                    <span
                      title="Current page"
                      className="text-sm min-w-16 text-center">
                      {currentPage + 1} / {pageCount}
                    </span>
                    <button
                      title="Next page"
                      className={BUTTON_CLASSES}
                      onClick={nextPage}
                      disabled={!hasNextPage}
                    >
                      <Button icon="Arrow" />
                    </button>
                  </div>
                ) : null}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

function PlaceholderTR({checkable}: { checkable?: boolean }) {
  return (
    <tr className={PLACEHOLDER_TR_CLASSES}>
      {checkable ? <td /> : null}
      <td className={TD_CLASSES}>No rows found</td>
    </tr>
  );
}