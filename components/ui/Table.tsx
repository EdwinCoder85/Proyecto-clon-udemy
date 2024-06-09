"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  FaFastBackward,
  FaBackward,
  FaFastForward,
  FaForward,
} from "react-icons/fa";

interface Props {
  data: any;
  columns: any;
}

export function Table({ data, columns }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="block max-w-full divide-y divide-primary-500 overflow-x-scroll overflow-y-hidden rounded-tl-xl rounded-tr-xl">
        <div className="h-0" />
        <table className="w-full ">
          <thead className="bg-primary-600">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-3 py-3.5 text-left lg:text-center text-sm lg:text-lg lg:font-semibold text-white"
                      style={{ position: "relative", width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`resizer ${
                            header.column.getIsResizing() ? "isResizing" : ""
                          }`}
                        ></div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                        className="py-2 text-sm lg:text-lg text-left lg:text-center text-gray-500"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="h-0" />
      </div>
      <div className="flex gap-x-4 bg-primary-600 p-3 text-left text-base font-semibold text-gray-500 rounded-bl-xl rounded-br-xl">
        <button
          className="bg-white rounded-md p-2"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          type="button"
          title="Go to First Page"
        >
          <FaFastBackward className="text-primary-600" />
        </button>
        <button
          className="bg-white rounded-md p-2"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          type="button"
          title="Go to Previous Page"
        >
          <FaBackward className="text-primary-600" />
        </button>
        <button
          className="bg-white rounded-md p-2"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          type="button"
          title="Go to Next Page"
        >
          <FaForward className="text-primary-600" />
        </button>
        <button
          className="bg-white rounded-md p-2"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          type="button"
          title="Go to Last Page"
        >
          <FaFastForward className="text-primary-600" />
        </button>
      </div>
    </>
  );
}
