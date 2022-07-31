import { FormattedPlayerSeasonStats } from "@/utils/formatPlayerSeasonStats";
import { ColumnDef } from "@tanstack/react-table";
import PublicTable from "../shared/PublicTable";
import TableCell from "../shared/TableCell";

export type PlayerTableProps = {
  data: FormattedPlayerSeasonStats[];
};

const PlayerTable = ({ data }: PlayerTableProps) => {
  const columns: ColumnDef<FormattedPlayerSeasonStats>[] = [
    {
      header: () => {
        return (
          <TableCell>
            <span>date</span>
          </TableCell>
        );
      },
      accessorKey: "date",
      cell: (info) => {
        const date = new Date(info.getValue()).toLocaleDateString();
        return (
          <TableCell>
            <span>{date}</span>
          </TableCell>
        );
      },
    },
    {
      header: () => {
        return (
          <TableCell>
            <span>location</span>
          </TableCell>
        );
      },
      accessorKey: "home",
      cell: (info) => {
        const home = info.getValue();
        return (
          <TableCell>
            <span>{home ? "home" : "away"}</span>
          </TableCell>
        );
      },
    },
    {
      header: () => {
        return (
          <TableCell>
            <span>comp</span>
          </TableCell>
        );
      },
      accessorKey: "competition",
      cell: (info) => {
        const competition = info.getValue();
        return (
          <TableCell>
            <span>{competition.abbreviation}</span>
          </TableCell>
        );
      },
    },
    {
      header: () => {
        return (
          <TableCell>
            <span>opponent</span>
          </TableCell>
        );
      },
      accessorKey: "opponent",
      cell: (info) => {
        const opponent = info.getValue();
        return (
          <TableCell>
            <span>{opponent.name}</span>
          </TableCell>
        );
      },
    },
    {
      header: () => {
        return (
          <TableCell>
            <span>scored</span>
          </TableCell>
        );
      },
      accessorKey: "scored",
      cell: (info) => {
        const scored = info.getValue();
        return (
          <TableCell>
            <span>{scored}</span>
          </TableCell>
        );
      },
    },
    {
      header: () => {
        return (
          <TableCell>
            <span>conceeded</span>
          </TableCell>
        );
      },
      accessorKey: "conceeded",
      cell: (info) => {
        const conceeded = info.getValue();
        return (
          <TableCell>
            <span>{conceeded}</span>
          </TableCell>
        );
      },
    },
    {
      header: () => {
        return (
          <TableCell>
            <span>avg</span>
          </TableCell>
        );
      },
      id: "average",
      cell: ({ row }) => {
        const { averageSum, averageQuantity } = row.original || {};
        return (
          <TableCell>
            <span>
              {averageQuantity && averageSum
                ? (averageSum / averageQuantity).toFixed(2)
                : "-"}
            </span>
          </TableCell>
        );
      },
    },
    {
      header: () => {
        return (
          <TableCell>
            <span>tdc</span>
          </TableCell>
        );
      },
      id: "tendency",
      cell: ({ row }) => {
        const { averageSum, averageQuantity } = row.original || {};
        return (
          <TableCell>
            <span>
              {averageQuantity && averageSum
                ? (averageSum - 5 * averageQuantity).toFixed(1)
                : "-"}
            </span>
          </TableCell>
        );
      },
    },
  ];

  return <PublicTable columns={columns} data={data} />;
};

export default PlayerTable;
