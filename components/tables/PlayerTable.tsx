import { FormattedPlayerSeasonStats } from "@/utils/formatPlayerSeasonStats";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import BallIcon from "../Icons/Ball";
import CalendarIcon from "../Icons/Calendar";
import ClubIcon from "../Icons/Club";
import HomeIcon from "../Icons/HomeIcon";
import LocationIcon from "../Icons/Location";
import PlaneIcon from "../Icons/PlaneIcon";
import TrophyIcon from "../Icons/Trophy";
import PublicTable from "../shared/PublicTable";
import TableCell from "../shared/TableCell";
import { numericalSort } from "@/utils/numericalSort";
import { useMemo } from "react";

export type PlayerTableProps = {
  data: FormattedPlayerSeasonStats[];
};

const PlayerTable = ({ data }: PlayerTableProps) => {
  const columns: ColumnDef<FormattedPlayerSeasonStats>[] = useMemo(
    () => [
      {
        header: () => {
          return (
            <TableCell title="adversaire">
              <div className="relative flex items-center justify-center w-4 h-4 overflow-hidden">
                <ClubIcon primary="#999" secondary="#666" />
              </div>
              <span className="hidden ml-2 text-sm md:inline-block">
                Adversaire
              </span>
              <span className="ml-2 text-sm md:hidden">Adv.</span>
            </TableCell>
          );
        },
        accessorKey: "opponent",
        id: "opponent",
        cell: ({ row }) => {
          const { opponent, id } = row.original || {};
          return (
            <TableCell padding="p-0 bg-white min-w-[100px]">
              <Link href={`/matches/${id}`}>
                <a className="flex items-center justify-start w-full h-full px-2">
                  <div className="relative flex items-center justify-center w-4 h-4 overflow-hidden">
                    {opponent ? (
                      <ClubIcon
                        primary={opponent?.primary}
                        secondary={opponent?.secondary}
                      />
                    ) : (
                      <ClubIcon primary="#999" secondary="#666" />
                    )}
                  </div>

                  <span className="hidden ml-2 whitespace-nowrap lg:inline-block">
                    {opponent?.name || "opponent"}
                  </span>
                  <span className="ml-2 whitespace-nowrap lg:hidden">
                    {opponent?.abbreviation || "opponent"}
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
            <TableCell className="justify-center" title="date du match">
              <CalendarIcon className="w-3 h-3" />
            </TableCell>
          );
        },
        accessorKey: "date",
        cell: (info) => {
          const date = new Date(info.getValue()).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          });
          return (
            <TableCell className="justify-center  min-w-[80px]">
              <span className="font-num">{date}</span>
            </TableCell>
          );
        },
      },
      {
        header: () => {
          return (
            <TableCell className="justify-center" title="domicile/exterieur">
              <LocationIcon className="w-4 h-4" />
            </TableCell>
          );
        },
        accessorKey: "home",
        cell: (info) => {
          const home = info.getValue();
          return (
            <TableCell className="justify-center min-w-[64px]">
              {home ? (
                <HomeIcon className="w-4 h-4" />
              ) : (
                <PlaneIcon className="w-4 h-4" />
              )}
            </TableCell>
          );
        },
        size: 100,
      },
      {
        header: () => {
          return (
            <TableCell className="justify-center" title="compétition">
              <TrophyIcon className="w-4 h-4" />
            </TableCell>
          );
        },
        accessorKey: "competition",
        cell: (info) => {
          const competition = info.getValue();
          return (
            <TableCell className="justify-center min-w-[64px]">
              <span>{competition.abbreviation}</span>
            </TableCell>
          );
        },
        size: 100,
      },
      {
        header: () => {
          return (
            <TableCell className="justify-center" title="buts marqués">
              <BallIcon className="w-3 h-3 fill-marine-600" />
            </TableCell>
          );
        },
        accessorKey: "scored",
        cell: (info) => {
          const scored = info.getValue();
          return (
            <TableCell className="justify-center min-w-[64px]">
              <span className="font-num">{scored}</span>
            </TableCell>
          );
        },
        size: 100,
      },
      {
        header: () => {
          return (
            <TableCell className="justify-center" title="buts concédés">
              <BallIcon className="w-3 h-3 fill-red-600" />
            </TableCell>
          );
        },
        accessorKey: "conceeded",
        cell: (info) => {
          const conceeded = info.getValue();
          return (
            <TableCell className="justify-center min-w-[64px]">
              <span className="font-num">{conceeded}</span>
            </TableCell>
          );
        },
        size: 100,
      },
      {
        header: () => {
          return (
            <TableCell className="justify-end text-sm" title="tendance">
              <span>TDC</span>
            </TableCell>
          );
        },
        id: "tendency",
        accessorFn: (match) => {
          const { averageSum, averageQuantity } = match || {};
          return averageSum && averageQuantity
            ? averageSum - 5 * averageQuantity
            : undefined;
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
        sortingFn: (rowA, rowB) => numericalSort({ rowA, rowB, id: "average" }),
        size: 200,
      },
      {
        header: () => {
          return (
            <TableCell className="justify-end text-sm" title="moyenne">
              <span>AVG</span>
            </TableCell>
          );
        },
        id: "average",
        accessorFn: (player) => {
          const { averageSum, averageQuantity } = player || {};
          return averageSum && averageQuantity
            ? averageSum / averageQuantity
            : undefined;
        },
        cell: (info) => {
          const average = info.getValue();
          return (
            <TableCell className="justify-end min-w-[80px]">
              <span className="font-bold font-num">
                {average === undefined ? "-" : average.toFixed(2)}
              </span>
            </TableCell>
          );
        },
        sortDescFirst: true,
        sortUndefined: 1,
        sortingFn: (rowA, rowB) => numericalSort({ rowA, rowB, id: "average" }),
        size: 200,
      },
    ],
    []
  );

  return <PublicTable columns={columns} data={data} frozenId="opponent" />;
};

export default PlayerTable;
