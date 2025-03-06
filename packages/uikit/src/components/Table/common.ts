import classNames from "classnames";

export type DataKey = string | number;

export const BUTTON_CLASSES = 'w-fit text-xs bg-transparent';
export const CHECK_ALL_KEY = 'table_check_all';
export const CHECK_COL_CLASSES = 'pl-3 pr-1 text-center'
export const CONTAINER_CLASSES = 'relative size-full min-h-[400px] overflow-x-auto rounded-lg text-normal text-slate-500 dark:text-slate-300 shadow-lg';
export const PADDING_CLASSES = 'px-4 py-2';
export const PLACEHOLDER_TR_CLASSES = 'h-11';
export const TABLE_CLASSES = 'table-auto w-full border-collapse text-sm bg-slate-100 dark:bg-slate-700';
export const TABLE_CONTAINER_CLASSES = 'w-full h-full min-h-0';
export const TABLE_ROW_HEIGHT = 44; // 4 * 11
export const TBODY_CLASSES = '';
export const TD_CLASSES = classNames(PADDING_CLASSES, 'whitespace-nowrap truncate max-w-[200px]');
export const TFOOTTD_CLASSES = classNames(PADDING_CLASSES);
export const TFOOT_CLASSES = 'sticky bottom-0 bg-slate-200 dark:bg-slate-800'
export const THEAD_CLASSES = 'sticky top-0 text-xs bg-slate-200 dark:bg-slate-800';
export const TH_CLASSES = classNames(PADDING_CLASSES, 'text-left truncate');
export const TR_CLASSES = classNames(PLACEHOLDER_TR_CLASSES, 'outline outline-gray-200 dark:outline-gray-600');