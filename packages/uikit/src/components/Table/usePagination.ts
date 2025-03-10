import { useState, useCallback, useEffect, useRef, useContext } from "react";
import { DataKey, OnPageHandler, SortDirection } from "./common";
import { TableContext } from "./TableContext";

const INITIAL_REQUESTED_PAGE = -1;

export interface usePaginationResult<T> {
  currentPage: number;
  dataLength: number;
  error: Error | null;
  isLoading: boolean;
  nextPage: () => Promise<void>;
  pageCount: number;
  prevPage: () => Promise<void>;
  tableData: T[];
}

export function usePagination<T>(
  initialData: T[],
  pageSize: number,
  sort: { dir: SortDirection; column: DataKey },
  onPage?: OnPageHandler<T>,
): usePaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(0);
  const [dataLength, setDataLength] = useState(initialData.length);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState(0);
  const [tableData, setTableData] = useState<T[]>(initialData);
  const pageRequested = useRef(INITIAL_REQUESTED_PAGE);
  
  const { error, setError } = useContext(TableContext);

  const prevPage = useCallback(async () => {
    if (currentPage <= 0) {
      return;
    }

    setError(null);
    setCurrentPage(prev => prev - 1);
    if (!onPage) {
      return;
    }

    setIsLoading(true);
    try {
      const prevPage = currentPage - 1;
      pageRequested.current = prevPage;
      const result = await onPage({
        current: tableData,
        page: { current: currentPage, next: prevPage },
        pageSize,
        sort,
      });
      if (pageRequested.current !== prevPage) {
        return;
      }
      setTableData(result.nextData);
      setPageCount(result.pageCount);
      setDataLength(result.dataLength);
      setIsLoading(false);
    } catch (error) {
      setError(error as Error);
      setIsLoading(false);
      console.error('Loading previous page failed.', error);
    }
  }, [currentPage, onPage, pageSize, setError, sort, tableData]);

  const nextPage = useCallback(async () => {
    if (currentPage >= pageCount - 1) {
      return;
    }

    setError(null);
    setCurrentPage(prev => prev + 1);
    if (!onPage) {
      return;
    }

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      pageRequested.current = nextPage;
      const result = await onPage({
        current: tableData,
        page: { current: currentPage, next: nextPage },
        pageSize,
        sort,
      });
      if (pageRequested.current !== nextPage) {
        return;
      }
      setTableData(result.nextData);
      setPageCount(result.pageCount);
      setDataLength(result.dataLength);
      setIsLoading(false);
    } catch (error) {
      setError(error as Error);
      setIsLoading(false);
      console.error('Loading loading next page failed.', error);
    }
  }, [currentPage, onPage, pageCount, pageSize, setError, sort, tableData]);

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
      if (currentPage === 0 && onPage && pageSize) {
        setIsLoading(true);
        try {
          const result = await onPage({
            current: [],
            page: { current: -1, next: 0 },
            pageSize,
            sort,
          });
          setInitialLoad(false);
          setTableData(result.nextData);
          setPageCount(result.pageCount);
          setDataLength(result.dataLength);
          setIsLoading(false);
        } catch (error) {
          setInitialLoad(false);
          setError(error as Error);
          setIsLoading(false);
          console.error('Loading initial page failed.', error);
        }
      }
    })();
  }, [currentPage, initialLoad, onPage, pageSize, setError, sort]);

  return {
    currentPage,
    dataLength,
    error,
    isLoading,
    nextPage,
    pageCount,
    prevPage,
    tableData,
  };
};