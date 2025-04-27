import { createContext, PropsWithChildren, useState } from "react";
import { DataKey, SortDirection } from "./common";

interface TableContextProps {
  checkable: boolean;
  columns: Record<DataKey, {name: string, width: string | number}>;
  emptyText: string;
  errorText: string;
  loadingText: string;
  placeholder: string;
  primaryKey: DataKey;
  search: boolean;
  searchPlaceholder: string;
  sortBy: DataKey;
  virtualized: boolean;
  rowHeight: number;
  
  checked: Set<DataKey>,
  error: Error | null;
  sortDirection: SortDirection;
}

interface TableContextType extends TableContextProps {
  setChecked: React.Dispatch<React.SetStateAction<Set<DataKey>>>,
  setError: React.Dispatch<React.SetStateAction<Error | null>>,
  setSortBy: React.Dispatch<React.SetStateAction<DataKey>>;
  setSortDirection: React.Dispatch<React.SetStateAction<SortDirection>>;
}

export const TableContext = createContext<TableContextType>({
  checkable: false,
  columns: {},
  emptyText: '',
  errorText: '',
  loadingText: '',
  placeholder: '',
  primaryKey: '',
  search: false,
  searchPlaceholder: '',
  virtualized: false,
  rowHeight: 44,

  sortBy: '',
  setSortBy: () => { },

  sortDirection: 'asc',
  setSortDirection: () => { },

  checked: new Set<DataKey>(),
  setChecked: () => {},

  error: null,
  setError: () => {},
});

TableContext.displayName = "TableContext";

export function TableContextProvider({
  children,
  value: {
    checkable = false,
    columns = {},
    emptyText = 'No data to display',
    errorText = "An error happened",
    loadingText = "Loading ...",
    placeholder = "-",
    primaryKey = 'key',
    search = false,
    searchPlaceholder = "Search rows",
    sortBy: defaultSortBy,
    sortDirection: defaultSortDirection,
    virtualized = false,
    rowHeight = 44,
  }
}: PropsWithChildren<{ value: Partial<TableContextProps> }>) {
  const [sortBy, setSortBy] = useState<DataKey>(defaultSortBy ?? primaryKey);
  const [sortDirection, setSortDirection] = useState<SortDirection>(defaultSortDirection ?? 'desc');
  const [checked, setChecked] = useState<Set<DataKey>>(new Set<DataKey>());
  const [error, setError] = useState<Error | null>(null);

  return (
    <TableContext.Provider value={{
      checkable,
      checked,
      columns,
      emptyText,
      error,
      errorText,
      loadingText,
      placeholder,
      primaryKey,
      search,
      searchPlaceholder,
      sortBy,
      sortDirection,
      rowHeight,
      virtualized,
      setChecked,
      setError,
      setSortBy,
      setSortDirection,
    }}>
      {children}
    </TableContext.Provider>
  )
}