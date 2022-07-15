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

type AdminTableProps = {
  columns: ColumnDef<any>[];
  data: RowData[];
  frozenId?: string;
};

const AdminTable = ({ columns, data, frozenId }: AdminTableProps) => {
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
    <table className="w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="">
            {headerGroup.headers.map((header, i) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={`h-10 bg-gray-50 text-left border-r border-r-gray-100 last-border-r-0 ${
                  frozenId &&
                  header.id.endsWith(frozenId) &&
                  "sticky left-0 z-10 after:absolute after:top-0 after:right-0 after:-z-10 after:w-[1px] after:bg-gray-100 after:h-full"
                }`}
              >
                {header.isPlaceholder ? null : (
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {/* {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null} */}
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="relative border-b border-gray-100">
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={`relative h-12 border-r last:border-r-0 border-gray-100 bg-white text-sm ${
                  frozenId &&
                  cell.id.endsWith(frozenId) &&
                  "sticky left-0 z-10 after:absolute after:top-0 after:right-0 after:-z-10 after:w-[1px] after:bg-gray-100 after:h-full"
                }`}
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

export default AdminTable;
