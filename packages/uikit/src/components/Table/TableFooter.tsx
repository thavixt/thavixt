import classNames from "classnames";
import { BUTTON_CLASSES, TFOOT_CLASSES, TFOOTTD_CLASSES } from "./common";
import { Button } from "../Button/Button";
import { TextInput } from "../TextInput/TextInput";
import { useContext, useEffect } from "react";
import { TableContext } from "./TableContext";

interface TableFooterProps {
  currentPage: number;
  dataLength: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  loading: boolean;
  pageSize: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  setSearchTerm: (value: string) => void;
  onRender: () => void;
}

export function TableFooter({
  currentPage,
  dataLength,
  hasNextPage,
  hasPrevPage,
  loading,
  pageSize,
  onNextPage,
  onPrevPage,
  setSearchTerm,
  onRender,
}: TableFooterProps) {
  const { checkable, columns, search, searchPlaceholder } = useContext(TableContext);

  useEffect(() => onRender(), [onRender, pageSize]);

  return (
    <tfoot className={TFOOT_CLASSES} hidden={!search && !pageSize}>
      <tr>
        {search ? (
          <td className={TFOOTTD_CLASSES} colSpan={checkable ? 2 : 1}>
            <div className="max-w-48">
              <TextInput
                data-testid="TableSearchInput"
                id="tableSearchInput"
                disabled={loading}
                placeholder={searchPlaceholder}
                name="search"
                onChange={setSearchTerm}
                type="search"
              />
            </div>
          </td>
        ) : null}
        <td className={classNames(TFOOTTD_CLASSES, 'text-right')} colSpan={Object.keys(columns).length + (search ? 0 : 1)}>
          {pageSize ? (
            <div className="flex justify-end items-center">
              <Button
                title="Previous page"
                data-testid="TablePreviousPage"
                className={classNames(BUTTON_CLASSES)}
                onClick={onPrevPage}
                disabled={!hasPrevPage}
                variant="silent"
                icon={{ type: 'Arrow', className: 'rotate-180' }}
              />
              <span
                data-testid="TableCurrentPage"
                title="Current page"
                className="text-xs text-center min-w-24">
                <span>
                  <span>{(currentPage) * pageSize} - {Math.min((currentPage + 1) * pageSize, dataLength)}</span>
                  <span> of {dataLength}</span>
                </span>
              </span>
              <Button
                title="Next page"
                data-testid="TableNextPage"
                className={BUTTON_CLASSES}
                onClick={onNextPage}
                disabled={!hasNextPage}
                variant="silent"
                icon={{ type: 'Arrow' }}
              />
            </div>
          ) : null}
        </td>
      </tr>
    </tfoot>
  )
}