export function getPagedData<T>(items: T[], pageSize: number, pageCount: number): T[] {
  const index = pageCount * pageSize;
  return items.slice(index, index + pageSize);
}

export function hasPrevPage(currentPage: number) {
  return currentPage > 0;
}
export function hasNextPage(currentPage: number, pageCount: number) {
  return currentPage < pageCount - 1;
}
