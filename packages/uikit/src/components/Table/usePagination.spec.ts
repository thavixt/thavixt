import { act, renderHook, waitFor } from '@testing-library/react';
import { usePagination } from './usePagination';

import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('usePagination', () => {
  const mockOnPage = vi.fn();
  const firstData = [1, 2, 3];
  const pageCount = 10;
  const dataLength = 999;
  const initialPageData = {
    nextData: firstData,
    pageCount,
    dataLength,
  }

  beforeEach(() => {
    mockOnPage.mockClear();
    mockOnPage.mockResolvedValue(initialPageData);
  });

  it('should initialize with correct default values', async () => {
    const { result } = renderHook(() => usePagination([], 3, {column: 'name', dir: 'asc'}, mockOnPage));
    await waitFor(() => {
      expect(result.current.isLoading).toStrictEqual(false);
    });

    await waitFor(() => {
      expect(result.current.tableData).toEqual(initialPageData.nextData);
      expect(result.current.pageCount).toStrictEqual(initialPageData.pageCount);
      expect(result.current.dataLength).toStrictEqual(initialPageData.dataLength);
    });
  });

  it('should load the next, then previous page correctly', async () => {
    const { result } = renderHook(() => usePagination([], 3, {column: 'name', dir: 'asc'}, mockOnPage));
    await waitFor(() => {
      expect(result.current.isLoading).toStrictEqual(false);
    });

    const nextPageData = {
      nextData: [1, 1, 1],
      pageCount,
      dataLength,
    };
    mockOnPage.mockResolvedValueOnce(nextPageData);
    await act(async () => {
      await result.current.nextPage();
    });
    await waitFor(() => {
      expect(result.current.isLoading).toStrictEqual(false);
      expect(result.current.tableData).toEqual(nextPageData.nextData);
    });

    const prevPageData = {
      nextData: [-1],
      pageCount,
      dataLength,
    };
    mockOnPage.mockResolvedValueOnce(prevPageData);
    await act(async () => {
      await result.current.prevPage();
    });
    await waitFor(() => {
      expect(result.current.isLoading).toStrictEqual(false);
      expect(result.current.tableData).toEqual(prevPageData.nextData);
    });
  });

  it('should not go to the next page if already on the last page', async () => {
    const { result } = renderHook(() => usePagination([], 5, {column: 'name', dir: 'asc'}, mockOnPage));
    await waitFor(() => {
      expect(result.current.isLoading).toStrictEqual(false);
    });

    await act(async () => {
      // page 1
      mockOnPage.mockResolvedValue({
        nextData: [2222, 2222, 2222],
        pageCount: 1,
        dataLength,
      });
      await result.current.nextPage();
    });
    await waitFor(() => {
      expect(result.current.isLoading).toStrictEqual(false);
    });
    expect(result.current.tableData).toStrictEqual([2222, 2222, 2222]); // Should be on page 1

    await act(async () => {
      // page 2 (out of bounds, should not happen)
      mockOnPage.mockResolvedValue({
        nextData: [3333, 3333, 3333],
        pageCount: 1,
        dataLength,
      });
      await result.current.nextPage();
    });
    await waitFor(() => {
      expect(result.current.isLoading).toStrictEqual(false);
    });
    expect(result.current.tableData).toStrictEqual([2222, 2222, 2222]); // Should still be on page 1
  });

  it('should not go to the previous page if already on the first page', async () => {
    mockOnPage.mockImplementation(() => ({
      nextData: [123, 123, 123],
      pageCount: 2,
      dataLength: 5,
    }));
    const { result } = renderHook(() => usePagination([], 1, {column: 'name', dir: 'asc'}, mockOnPage));

    await act(async () => {
      await result.current.prevPage(); // go back from page 0
    });

    expect(result.current.tableData).toStrictEqual([123, 123, 123]); // still on the first page
  });
});
