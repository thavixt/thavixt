import { createContext, useContext } from "react";
import { DataKey } from "./common";

interface TableContextType {
  checkable: boolean;
  columns: Record<DataKey, string>;
  emptyText: string;
  full: boolean;
  placeholder: string;
  primaryKey: DataKey;
  search: boolean;
}

export const TableContext = createContext<TableContextType>({
  checkable: false,
  columns: {},
  emptyText: '',
  full: false,
  placeholder: '',
  primaryKey: '',
  search: false,
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
  } = useContext(TableContext);

  return {
    checkable,
    columns,
    emptyText,
    full,
    placeholder,
    primaryKey,
    search,
  };
}