import { FormattedMatchPlayerStats } from "@/utils/formatMatchStats";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";
import UserIcon from "../Icons/User";
import TableCell from "../shared/TableCell";
import PublicTable from "../shared/PublicTable";

export type MatchTableProps = {
  data: FormattedMatchPlayerStats[];
};

const MatchTable = ({ data }: MatchTableProps) => {
  const columns: ColumnDef<FormattedMatchPlayerStats>[] = [
    {
      header: () => {
        return (
          <TableCell>
            <div className="ml-2 relative w-4 h-4 flex justify-center items-center rounded-full overflow-hidden bg-gray-200">
              <UserIcon />
            </div>
            <span className="ml-4 text-sm">Player</span>
          </TableCell>
        );
      },
      id: "player",
      cell: ({ row }) => {
        const { firstName, lastName, image, id } = row.original || {};
        return (
          <TableCell padding="p-0">
            <Link href={`/players/${id}`}>
              <a className="w-full h-full flex items-center justify-start px-2">
                <div className="relative w-8 h-8 flex justify-center items-center rounded-full overflow-hidden bg-gray-200">
                  {image ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${image}`}
                      layout="fill"
                      objectFit="cover"
                      alt="player"
                    />
                  ) : (
                    <UserIcon />
                  )}
                </div>

                <span className="whitespace-nowrap ml-2">
                  {firstName![0] + ". " + lastName}
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
            <span>prize</span>
          </TableCell>
        );
      },
      id: "prize",
      cell: ({ row }) => {
        const { botm, motm } = row.original || {};

        return (
          <TableCell>
            {motm && <span>motm</span>}
            {botm && <span>botm</span>}
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
      id: "tdc",
      cell: ({ row }) => {
        const { averageSum, averageQuantity } = row.original || {};

        return (
          <TableCell>
            <span>
              {averageSum && averageQuantity
                ? (averageSum - 5 * averageQuantity).toFixed(1)
                : "-"}
            </span>
          </TableCell>
        );
      },
    },
  ];

  return <PublicTable columns={columns} data={data} frozenId="player" />;
};

export default MatchTable;
