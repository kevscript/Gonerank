import { FormattedPlayerSeasonStats } from "@/utils/formatPlayersSeasonStats";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import UserIcon from "../Icons/User";
import TableCell from "../shared/TableCell";
import PublicTable from "../shared/PublicTable";
import Link from "next/link";

export type PlayersTableProps = {
  data: FormattedPlayerSeasonStats[];
};

const PlayersTable = ({ data }: PlayersTableProps) => {
  const columns: ColumnDef<FormattedPlayerSeasonStats>[] = [
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
      accessorFn: (player) => player.lastName,
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
      size: 200,
    },
    {
      header: () => (
        <TableCell>
          <span>matches</span>
        </TableCell>
      ),
      id: "matches",
      cell: ({ row }) => {
        const matches = row.original?.matches || {};
        return (
          <TableCell>
            <span>{Object.keys(matches).length}</span>
          </TableCell>
        );
      },
    },
    {
      header: () => (
        <TableCell>
          <span>motm</span>
        </TableCell>
      ),
      accessorKey: "globalMotm",
      cell: (info) => (
        <TableCell>
          <span>{info.getValue()}</span>
        </TableCell>
      ),
    },
    {
      header: () => (
        <TableCell>
          <span>botm</span>
        </TableCell>
      ),
      accessorKey: "globalBotm",
      cell: (info) => (
        <TableCell>
          <span>{info.getValue()}</span>
        </TableCell>
      ),
    },
    {
      header: () => (
        <TableCell>
          <span>homeAvg</span>
        </TableCell>
      ),
      accessorKey: "homeAverage",
      cell: (info) => {
        const homeAverage: number = info.getValue();
        return (
          <TableCell>
            <span>{homeAverage ? homeAverage.toFixed(2) : "-"}</span>
          </TableCell>
        );
      },
    },
    {
      header: () => (
        <TableCell>
          <span>homeTdc</span>
        </TableCell>
      ),
      id: "homeTdc",
      cell: ({ row }) => {
        const { matches } = row.original || {};
        let sum = 0;
        let quantity = 0;
        for (const mId in matches) {
          if (matches[mId].home) {
            sum += matches[mId].averageSum || 0;
            quantity += matches[mId].averageQuantity
              ? matches[mId].averageQuantity
              : 0;
          }
        }

        return (
          <TableCell>
            <span>{quantity ? (sum - quantity * 5).toFixed(1) : "-"}</span>
          </TableCell>
        );
      },
    },
    {
      header: () => (
        <TableCell>
          <span>awayAvg</span>
        </TableCell>
      ),
      accessorKey: "awayAverage",
      cell: (info) => {
        const awayAverage: number = info.getValue();
        return (
          <TableCell>
            <span>{awayAverage ? awayAverage.toFixed(2) : "-"}</span>
          </TableCell>
        );
      },
    },
    {
      header: () => (
        <TableCell>
          <span>awayTdc</span>
        </TableCell>
      ),
      id: "awayTdc",
      cell: ({ row }) => {
        const { matches } = row.original || {};
        let sum = 0;
        let quantity = 0;
        for (const mId in matches) {
          if (!matches[mId].home) {
            sum += matches[mId].averageSum || 0;
            quantity += matches[mId].averageQuantity
              ? matches[mId].averageQuantity
              : 0;
          }
        }

        return (
          <TableCell>
            <span>{quantity ? (sum - quantity * 5).toFixed(1) : "-"}</span>
          </TableCell>
        );
      },
    },
    {
      header: () => (
        <TableCell>
          <span>globalAvg</span>
        </TableCell>
      ),
      accessorKey: "globalAverage",
      cell: (info) => {
        const globalAverage: number = info.getValue();
        return (
          <TableCell>
            <span>{globalAverage ? globalAverage.toFixed(2) : "-"}</span>
          </TableCell>
        );
      },
    },
    {
      header: () => (
        <TableCell>
          <span>globalTdc</span>
        </TableCell>
      ),
      id: "globalTdc",
      cell: ({ row }) => {
        const { matches } = row.original || {};
        let sum = 0;
        let quantity = 0;
        for (const mId in matches) {
          sum += matches[mId].averageSum || 0;
          quantity += matches[mId].averageQuantity
            ? matches[mId].averageQuantity
            : 0;
        }

        return (
          <TableCell>
            <span>{quantity ? (sum - quantity * 5).toFixed(1) : "-"}</span>
          </TableCell>
        );
      },
    },
  ];

  return <PublicTable columns={columns} data={data} frozenId="player" />;
};

export default PlayersTable;
