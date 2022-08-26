import { FormattedMatchPlayerStats } from "@/utils/formatMatchStats";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";
import UserIcon from "../Icons/User";
import TableCell from "../shared/TableCell";
import PublicTable from "../shared/PublicTable";
import RatingIcon from "../Icons/Rating";
import MotmIcon from "../Icons/Motm";
import BotmIcon from "../Icons/Botm";
import { numericalSort } from "@/utils/numericalSort";
import { useMemo } from "react";

export type MatchTableProps = {
  data: FormattedMatchPlayerStats[];
};

const MatchTable = ({ data }: MatchTableProps) => {
  const columns: ColumnDef<FormattedMatchPlayerStats>[] = useMemo(
    () => [
      {
        header: () => {
          return (
            <TableCell title="joueurs" opaque header>
              <div className="relative flex items-center justify-center w-4 h-4 ml-2 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600">
                <UserIcon className="dark:fill-gray-300" />
              </div>
              <span className="ml-4 text-sm dark:text-gray-300">Joueur</span>
            </TableCell>
          );
        },
        id: "player",
        accessorFn: (player) => player.lastName,
        cell: ({ row }) => {
          const { firstName, lastName, image, id } = row.original || {};
          return (
            <TableCell padding="p-0" opaque>
              <Link href={`/players/${id}`}>
                <a className="flex items-center justify-start w-full h-full px-2">
                  <div className="relative flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-200 rounded-full">
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

                  <span className="ml-2 whitespace-nowrap">
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
        header: () => {
          return (
            <TableCell className="justify-center" title="distinctions" header>
              <RatingIcon className="w-4 h-4 dark:fill-gray-300" />
            </TableCell>
          );
        },
        id: "award",
        accessorFn: (player) => {
          const { motm, botm } = player || {};
          return motm ? "a" : botm ? "c" : "b";
        },
        cell: ({ row }) => {
          const { botm, motm } = row.original || {};
          return (
            <TableCell className="justify-center">
              {motm && <MotmIcon className="w-4 h-4 fill-marine-600" />}
              {botm && <BotmIcon className="w-3.5 h-3.5 fill-red-600" />}
            </TableCell>
          );
        },
        size: 150,
      },
      {
        header: () => {
          return (
            <TableCell className="justify-end" title="tendance" header>
              <span className="text-sm dark:text-gray-300">TDC</span>
            </TableCell>
          );
        },
        id: "tdc",
        accessorFn: (player) => {
          const { averageSum, averageQuantity } = player || {};
          return averageSum && averageQuantity
            ? averageSum - 5 * averageQuantity
            : undefined;
        },
        cell: (info) => {
          const tdc = info.getValue();

          return (
            <TableCell className="justify-end">
              <span className="font-num">
                {tdc === undefined ? "-" : tdc > 0 ? "+" : null}
                {tdc !== undefined ? tdc.toFixed(1) : null}
              </span>
            </TableCell>
          );
        },
        sortDescFirst: true,
        sortUndefined: 1,
        sortingFn: (rowA, rowB) => numericalSort({ rowA, rowB, id: "tdc" }),
        size: 1000,
      },
      {
        header: () => {
          return (
            <TableCell className="justify-end" title="moyenne" header>
              <span className="text-sm dark:text-gray-300">AVG</span>
            </TableCell>
          );
        },
        id: "avg",
        accessorFn: (player) => {
          const { averageSum, averageQuantity } = player || {};
          return averageSum && averageQuantity
            ? averageSum / averageQuantity
            : undefined;
        },
        cell: (info) => {
          const avg = info.getValue();

          return (
            <TableCell className="justify-end">
              <span className="font-bold font-num">
                {avg === undefined ? "-" : avg.toFixed(2)}
              </span>
            </TableCell>
          );
        },
        sortDescFirst: true,
        sortUndefined: 1,
        sortingFn: (rowA, rowB) => numericalSort({ rowA, rowB, id: "avg" }),
        size: 200,
      },
    ],
    []
  );

  return (
    <PublicTable
      columns={columns}
      data={data}
      frozenId="player"
      initialSortId="avg"
      initialSortDesc={true}
    />
  );
};

export default MatchTable;
