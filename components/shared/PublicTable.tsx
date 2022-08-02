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
};

const PublicTable = ({ columns, data, frozenId }: PublicTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    columns: columns,
    data: data,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className="">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="">
            {headerGroup.headers.map((header, i) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={`h-10 bg-gray-50 text-left border-l border-l-gray-100 first:border-l-0 ${
                  frozenId &&
                  header.id.endsWith(frozenId) &&
                  "sticky left-0 z-10 after:absolute after:top-0 after:right-0 after:-z-10 after:w-[1px] after:bg-gray-100 after:h-full"
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
                        <div className="mr-2 rotate-180 w-4 h-4 flex justify-center items-center">
                          <ChevronIcon />
                        </div>
                      ),
                      desc: (
                        <div className="mr-2 w-4 h-4 flex justify-center items-center">
                          <ChevronIcon />
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
            className={`relative border-b border-gray-100 hover:bg-marine-50 bg-white`}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={`relative h-12 border-l first:border-l-0 border-gray-100 text-sm ${
                  frozenId &&
                  cell.id.endsWith(frozenId) &&
                  "sticky left-0 z-10 after:absolute after:top-0 after:right-0 after:-z-10 after:w-[1px] after:bg-gray-100 after:h-full"
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
