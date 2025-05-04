export type DataKey = string | number;
export type SortDirection = 'asc' | 'desc';

interface OnPageHandlerPayload<T> {
  current: T[];
  page: { current: number, next: number };
  pageSize: number;
  sort: { dir: SortDirection; column: DataKey };
}
export type OnPageHandler<T> = (params: OnPageHandlerPayload<T>) => Promise<
  {
    nextData: T[]
    pageCount: number,
    dataLength: number,
  }
>;

export type TableDataRow = Record<DataKey, CellValue> & {key: string}
export type CellValue = string | number | null;

export const BUTTON_CLASSES = 'Table__button';
export const CHECK_ALL_KEY = 'Table__checkAll table_check_all';
export const CHECK_COL_CLASSES = 'Table__checkCol'

export const SCROLLCONTAINER_CLASSES_DATATABLE = 'Table__scrollcontainer Table__scrollcontainer--datatable';
export const SCROLLCONTAINER_CLASSES = 'Table__scrollcontainer';

export const TABLE_CLASSES_DATATABLE = 'Table Table--full';
export const TABLE_CLASSES = 'Table Table--full';
export const TABLE_CONTAINER_CLASSES = 'Table__container';
export const TABLE_ROW_HEIGHT = 44; // 4 * 11

export const TD_CLASSES = 'Table__td Table--padding';
export const TFOOTTD_CLASSES = 'Table__footTd Table--padding';
export const TFOOT_CLASSES = 'Table__tfoot'

export const THEAD_CLASSES_DATATABLE = 'Table__thead';
export const THEAD_CLASSES = 'Table__thead Table__thead--full';

export const TH_CLASSES = 'Table__th Table--padding';
export const TH_CLASSES_SORTABLE_PRIMARY = 'Table__th Table__th--sortable Table__th--sortable-primary';
export const TH_CLASSES_SORTABLE_REST = 'Table__th Table__th--sortable';

export const PLACEHOLDER_TR_CLASSES = 'Table__placeholder-tr';
export const PLACEHOLDER_TD_CLASSES = 'Table__placeholder-td';
export const TR_CLASSES = 'Table__tr';