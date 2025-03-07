import { useState, useCallback, useEffect, useRef } from "react";
import { OnPageHandler } from "./common";

export function usePagination<T>(initialData: T[], pageSize: number, onPage?: OnPageHandler<T>) {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [dataLength, setDataLength] = useState(initialData.length);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<T[]>(initialData);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const pageRequested = useRef(0);

  const prevPage = useCallback(async () => {
    if (currentPage > 0) {
      setCurrentPage(prev => Math.max(0, prev - 1));
      if (!onPage) {
        return;
      }
      setIsLoading(true);
      try {
        pageRequested.current = currentPage - 1;
        const result = await onPage(pageSize, tableData, currentPage - 1, currentPage);
        if (pageRequested.current !== currentPage - 1) {
          // console.warn('Pagination:onLoad aborted', currentPage - 1);
          return;
        }
        setTableData(result.nextData);
        setPageCount(result.pageCount);
        setDataLength(result.dataLength);
        setIsLoading(false);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading next page:', error);
      }
    }
  }, [currentPage, onPage, pageSize, tableData]);

  const nextPage = useCallback(async () => {
    if (currentPage < pageCount) {
      setCurrentPage(prev => Math.min(pageCount, prev + 1));
      if (!onPage) {
        return;
      }
      setIsLoading(true);
      try {
        pageRequested.current = currentPage + 1;
        const result = await onPage(pageSize, tableData, currentPage + 1, currentPage);
        if (pageRequested.current !== currentPage + 1) {
          // console.warn('Pagination:onLoad aborted', currentPage + 1);
          return;
        }
        setTableData(result.nextData);
        setPageCount(result.pageCount);
        setDataLength(result.dataLength);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading next page:', error);
      }
    }
  }, [currentPage, onPage, pageCount, pageSize, tableData]);

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
        const result = await onPage(pageSize, [], 0, -1);
        setTableData(result.nextData);
        setPageCount(result.pageCount);
        setDataLength(result.dataLength);
        setIsLoading(false);
        setInitialLoad(false);
      }
    })();
  }, [currentPage, initialLoad, onPage, pageSize]);

  return {
    currentPage,
    dataLength,
    isLoading,
    nextPage,
    pageCount,
    prevPage,
    tableData,
  };
};