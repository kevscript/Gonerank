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

type AdminTableProps = {
  columns: ColumnDef<any>[];
  data: RowData[];
  frozenId?: string;
  initialSortId?: string;
  initialSortDesc?: boolean;
};

const AdminTable = ({
  columns,
  data,
  frozenId,
  initialSortDesc,
  initialSortId,
}: AdminTableProps) => {
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
    <table className="">
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
                          <ChevronIcon />
                        </div>
                      ),
                      desc: (
                        <div className="flex items-center justify-center w-4 h-4 mr-2">
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
                style={{ width: cell.column.getSize() }}
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
