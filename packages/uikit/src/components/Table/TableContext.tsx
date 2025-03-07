import { createContext, useContext } from "react";
import { DataKey, SortDirection } from "./common";

/**
 * Includes table props that **do not change frequently**
 */
interface TableContextType {
  checkable: boolean;
  columns: Record<DataKey, string>;
  emptyText: string;
  full: boolean;
  placeholder: string;
  primaryKey: DataKey;
  search: boolean;
  searchPlaceholder: string;
  sortBy: DataKey;
  sortDirection: SortDirection;
}

export const TableContext = createContext<TableContextType>({
  checkable: false,
  columns: {},
  emptyText: '',
  full: false,
  placeholder: '',
  primaryKey: '',
  search: false,
  searchPlaceholder: '',
  sortBy: '',
  sortDirection: 'asc',
});

export function useTableContext() {
  const {
    checkable,
    columns,
    emptyText,
    full,
    placeholder,
    primaryKey,
    search,
    searchPlaceholder,
    sortBy,
    sortDirection,
  } = useContext(TableContext);

  return {
    checkable,
    columns,
    emptyText,
    full,
    placeholder,
    primaryKey,
    search,
    searchPlaceholder,
    sortBy,
    sortDirection,
  };
}