import { FormattedPlayerSeasonStats } from "@/utils/formatPlayersSeasonStats";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import UserIcon from "../Icons/User";
import TableCell from "../shared/TableCell";
import PublicTable from "../shared/PublicTable";
import Link from "next/link";
import MatchIcon from "../Icons/Match";
import HomeIcon from "../Icons/HomeIcon";
import PlaneIcon from "../Icons/PlaneIcon";
import MotmIcon from "../Icons/Motm";
import BotmIcon from "../Icons/Botm";
import { numericalSort } from "@/utils/numericalSort";

export type PlayersTableProps = {
  data: FormattedPlayerSeasonStats[];
};

const PlayersTable = ({ data }: PlayersTableProps) => {
  const columns: ColumnDef<FormattedPlayerSeasonStats>[] = [
    {
      header: () => {
        return (
          <TableCell title="Joueurs">
            <div className="ml-2 relative w-4 h-4 flex justify-center items-center rounded-full overflow-hidden bg-gray-200">
              <UserIcon />
            </div>
            <span className="ml-4 text-sm">Joueur</span>
          </TableCell>
        );
      },
      id: "player",
      accessorFn: (player) => player.lastName,
      cell: ({ row }) => {
        const { firstName, lastName, image, id } = row.original || {};
        return (
          <TableCell padding="p-0" className="bg-white">
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
      size: 250,
    },
    {
      header: () => (
        <TableCell className="justify-center" title="nombre de matchs joués">
          <MatchIcon className="w-4 h-4" />
        </TableCell>
      ),
      id: "matches",
      accessorFn: (player) => Object.keys(player.matches).length,
      cell: ({ row }) => {
        const matches = row.original?.matches || {};
        return (
          <TableCell className="justify-center min-w-[64px]">
            <span className="font-num">{Object.keys(matches).length}</span>
          </TableCell>
        );
      },
      size: 100,
    },
    {
      header: () => (
        <TableCell
          className="justify-center"
          title="nombre de fois homme du match"
        >
          <MotmIcon className="w-4 h-4" />
        </TableCell>
      ),
      accessorKey: "globalMotm",
      cell: (info) => (
        <TableCell className="justify-center min-w-[64px]">
          <span className="font-num">{info.getValue()}</span>
        </TableCell>
      ),
      size: 100,
    },
    {
      header: () => (
        <TableCell
          className="justify-center"
          title="nombre de fois boulet du match"
        >
          <BotmIcon className="w-4 h-4" />
        </TableCell>
      ),
      accessorKey: "globalBotm",
      cell: (info) => (
        <TableCell className="justify-center min-w-[64px]">
          <span className="font-num">{info.getValue()}</span>
        </TableCell>
      ),
      size: 100,
    },
    {
      header: () => (
        <TableCell
          className="justify-end items-center"
          title="tendance à domicile"
        >
          <HomeIcon className="w-4 h-4" />
        </TableCell>
      ),
      accessorFn: (player) => {
        const { matches } = player || {};
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
        const tendency = sum - 5 * quantity;
        return quantity ? tendency : undefined;
      },
      id: "homeTdc",
      cell: (info) => {
        const tendency = info.getValue();

        return (
          <TableCell className="justify-end min-w-[80px]">
            <span className="font-num">
              {tendency === undefined ? "-" : tendency > 0 ? "+" : null}
              {tendency !== undefined ? tendency.toFixed(1) : null}
            </span>
          </TableCell>
        );
      },
      sortDescFirst: true,
      sortUndefined: 1,
      sortingFn: (rowA, rowB) => numericalSort({ rowA, rowB, id: "homeTdc" }),
    },
    {
      header: () => (
        <TableCell
          className="justify-end items-center"
          title="tendance à l'exterieur"
        >
          <PlaneIcon className="w-4 h-4" />
        </TableCell>
      ),
      id: "awayTdc",
      accessorFn: (player) => {
        const { matches } = player || {};
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
        const tendency = sum - 5 * quantity;
        return quantity > 0 ? tendency : undefined;
      },
      cell: (info) => {
        const tendency = info.getValue();

        return (
          <TableCell className="justify-end min-w-[80px]">
            <span className="font-num">
              {tendency === undefined ? "-" : tendency > 0 ? "+" : null}
              {tendency !== undefined ? tendency.toFixed(1) : null}
            </span>
          </TableCell>
        );
      },
      sortDescFirst: true,
      sortUndefined: 1,
      sortingFn: (rowA, rowB) => numericalSort({ rowA, rowB, id: "awayTdc" }),
    },
    {
      header: () => (
        <TableCell
          className="justify-end items-center"
          title="tendance globale"
        >
          <span className="text-sm ml-1">TDC</span>
        </TableCell>
      ),
      id: "globalTdc",
      accessorFn: (player) => {
        const { matches } = player || {};
        let sum = 0;
        let quantity = 0;
        for (const mId in matches) {
          sum += matches[mId].averageSum || 0;
          quantity += matches[mId].averageQuantity
            ? matches[mId].averageQuantity
            : 0;
        }
        const tendency = sum - 5 * quantity;
        return quantity > 0 ? tendency : undefined;
      },
      cell: (info) => {
        const tendency = info.getValue();

        return (
          <TableCell className="justify-end min-w-[80px]">
            <span className="font-num font-bold">
              {tendency === undefined ? "-" : tendency > 0 ? "+" : null}
              {tendency !== undefined ? tendency.toFixed(1) : null}
            </span>
          </TableCell>
        );
      },
      sortDescFirst: true,
      sortUndefined: 1,
      sortingFn: (rowA, rowB) => numericalSort({ rowA, rowB, id: "globalTdc" }),
    },
    {
      header: () => (
        <TableCell
          className="justify-end items-center"
          title="moyenne à domicile"
        >
          <HomeIcon className="w-4 h-4" />
        </TableCell>
      ),
      id: "homeAverage",
      accessorFn: (player) => {
        return player.homeAverage > 0 ? player.homeAverage : undefined;
      },
      cell: (info) => {
        const homeAverage = info.getValue();
        return (
          <TableCell className="justify-end items-center min-w-[80px]">
            <span className="font-num">
              {homeAverage !== undefined ? homeAverage.toFixed(2) : "-"}
            </span>
          </TableCell>
        );
      },
      sortDescFirst: true,
      sortUndefined: 1,
      sortingFn: (rowA, rowB) =>
        numericalSort({ rowA, rowB, id: "homeAverage" }),
    },
    {
      header: () => (
        <TableCell
          className="justify-end items-center"
          title="moyenne à l'exterieur"
        >
          <PlaneIcon className="w-4 h-4" />
        </TableCell>
      ),
      id: "awayAverage",
      accessorFn: (player) => {
        return player.awayAverage > 0 ? player.awayAverage : undefined;
      },
      cell: (info) => {
        const awayAverage = info.getValue();
        return (
          <TableCell className="justify-end items-center min-w-[80px]">
            <span className="font-num">
              {awayAverage !== undefined ? awayAverage.toFixed(2) : "-"}
            </span>
          </TableCell>
        );
      },
      sortDescFirst: true,
      sortUndefined: 1,
      sortingFn: (rowA, rowB) =>
        numericalSort({ rowA, rowB, id: "awayAverage" }),
    },
    {
      header: () => (
        <TableCell className="justify-end items-center" title="moyenne globale">
          <span className="text-sm ml-1">AVG</span>
        </TableCell>
      ),
      id: "globalAverage",
      accessorFn: (player) => {
        return player.globalAverage > 0 ? player.globalAverage : undefined;
      },
      cell: (info) => {
        const globalAverage = info.getValue();
        return (
          <TableCell className="justify-end items-center min-w-[80px]">
            <span className="font-num font-bold">
              {globalAverage !== undefined ? globalAverage.toFixed(2) : "-"}
            </span>
          </TableCell>
        );
      },
      sortDescFirst: true,
      sortUndefined: 1,
      sortingFn: (rowA, rowB) =>
        numericalSort({ rowA, rowB, id: "globalAverage" }),
    },
  ];

  return <PublicTable columns={columns} data={data} frozenId="player" />;
};

export default PlayersTable;
