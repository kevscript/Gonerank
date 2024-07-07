import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  RowData,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import ChevronIcon from "../Icons/Chevron";

type PublicTableProps = {
  columns: ColumnDef<any>[];
  data: RowData[];
  frozenId?: string;
  initialSortId?: string;
  initialSortDesc?: boolean;
};

const PublicTable = ({
  columns,
  data,
  frozenId,
  initialSortId,
  initialSortDesc,
}: PublicTableProps) => {
  const [sorting, setSorting] = useState<SortingState>(() =>
    initialSortId
      ? [{ id: initialSortId, desc: initialSortDesc ? initialSortDesc : false }]
      : []
  );

  const table = useReactTable({
    columns: columns,
    data: data,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className="w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="">
            {headerGroup.headers.map((header, i) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={`h-10 bg-gray-50 dark:bg-dark-400 text-left border-l border-l-gray-100 dark:border-l-dark-300 first:border-l-0 ${
                  frozenId &&
                  header.id.endsWith(frozenId) &&
                  "sticky left-0 z-10 after:absolute after:top-0 after:right-0 after:-z-10 after:w-[1px] after:bg-gray-100 dark:after:bg-dark-300 after:h-full"
                }`}
                style={{ width: header.getSize() }}
              >
                {header.isPlaceholder ? null : (
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none flex flex-row w-full justify-between"
                        : "flex flex-row w-full justify-between",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: (
                        <div className="flex items-center justify-center w-4 h-4 mr-2 rotate-180">
                          <ChevronIcon className="dark:fill-white" />
                        </div>
                      ),
                      desc: (
                        <div className="flex items-center justify-center w-4 h-4 mr-2">
                          <ChevronIcon className="dark:fill-white" />
                        </div>
                      ),
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row, i) => (
          <tr
            key={row.id}
            className={`relative border-b dark:border-b-dark-300 border-gray-100 hover:bg-marine-50 bg-white dark:bg-dark-500 dark:hover:bg-dark-400`}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={`relative h-12 border-l first:border-l-0 border-gray-100 dark:border-dark-300 text-sm ${
                  frozenId &&
                  cell.id.endsWith(frozenId) &&
                  "sticky left-0 z-10 after:absolute after:top-0 after:right-0 after:-z-10 after:w-[1px] after:bg-gray-100 dark:after:bg-dark-300 after:h-full"
                }`}
                style={{
                  width: cell.column.getSize(),
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PublicTable;
