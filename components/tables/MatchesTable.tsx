import { FormattedMatchStats } from "@/utils/formatMatchesSeasonStats";
import { ColumnDef } from "@tanstack/react-table";
import ClubIcon from "@/components/Icons/Club";
import TableCell from "../shared/TableCell";
import Link from "next/link";
import PublicTable from "../shared/PublicTable";

export type MatchesTableProps = {
  data: FormattedMatchStats[];
};

const MatchesTable = ({ data }: MatchesTableProps) => {
  const columns: ColumnDef<FormattedMatchStats>[] = [
    {
      header: () => {
        return (
          <TableCell>
            <div className="ml-2 relative w-4 h-4 flex justify-center items-center overflow-hidden">
              <ClubIcon primary="#999" secondary="#666" />
            </div>
            <span className="ml-4 text-sm">Team</span>
          </TableCell>
        );
      },
      id: "match",
      cell: ({ row }) => {
        const { opponent, id } = row.original || {};
        return (
          <TableCell padding="p-0">
            <Link href={`/matches/${id}`}>
              <a className="w-full h-full flex items-center justify-start px-2">
                <div className="relative w-6 h-6 flex justify-center items-center overflow-hidden">
                  {opponent ? (
                    <ClubIcon
                      primary={opponent?.primary}
                      secondary={opponent?.secondary}
                    />
                  ) : (
                    <ClubIcon primary="#999" secondary="#666" />
                  )}
                </div>

                <span className="whitespace-nowrap ml-2">
                  {opponent?.name || "opponent"}
                </span>
              </a>
            </Link>
          </TableCell>
        );
      },
    },
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
            <span>avg</span>
          </TableCell>
        );
      },
      id: "avg",
      cell: ({ row }) => {
        const { averageSum, averageQuantity } = row.original || {};
        return (
          <TableCell>
            <span>
              {averageSum && averageQuantity
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
      accessorKey: "tendency",
      cell: (info) => {
        const tendency = info.getValue();
        return (
          <TableCell>
            <span>{tendency.toFixed(1) || "-"}</span>
          </TableCell>
        );
      },
    },
  ];

  return <PublicTable columns={columns} data={data} frozenId="match" />;
};

export default MatchesTable;
