import { FormattedMatchStats } from "@/utils/formatMatchesSeasonStats";
import { ColumnDef } from "@tanstack/react-table";
import ClubIcon from "@/components/Icons/Club";
import TableCell from "../shared/TableCell";
import Link from "next/link";
import PublicTable from "../shared/PublicTable";
import CalendarIcon from "../Icons/Calendar";
import { numericalSort } from "@/utils/numericalSort";
import LocationIcon from "../Icons/Location";
import HomeIcon from "../Icons/HomeIcon";
import PlaneIcon from "../Icons/PlaneIcon";
import TrophyIcon from "../Icons/Trophy";
import BallIcon from "../Icons/Ball";
import { useMemo } from "react";

export type MatchesTableProps = {
  data: FormattedMatchStats[];
};

const MatchesTable = ({ data }: MatchesTableProps) => {
  const columns: ColumnDef<FormattedMatchStats>[] = useMemo(
    () => [
      {
        header: () => {
          return (
            <TableCell>
              <div className="relative flex items-center justify-center w-4 h-4 overflow-hidden">
                <ClubIcon primary="#999" secondary="#666" />
              </div>
              <span className="ml-2 text-sm dark:text-slate-300">
                Adversaire
              </span>
            </TableCell>
          );
        },
        id: "match",
        cell: ({ row }) => {
          const { opponent, id } = row.original || {};
          return (
            <TableCell padding="p-0" className="bg-white">
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

                  <span className="ml-2 whitespace-nowrap">
                    {opponent?.name || "opponent"}
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
              <CalendarIcon className="w-3 h-3 dark:fill-slate-300" />
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
              <LocationIcon className="w-4 h-4 dark:fill-slate-300" />
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
            <TableCell className="justify-end">
              <span className="text-sm dark:text-slate-300">TDC</span>
            </TableCell>
          );
        },
        id: "tendency",
        accessorFn: (match) => {
          const { tendency, averageQuantity } = match || {};
          return averageQuantity ? tendency : undefined;
        },
        cell: (info) => {
          const tendency = info.getValue();
          return (
            <TableCell className="justify-end">
              <span className="font-num">
                {tendency === undefined ? "-" : tendency > 0 ? "+" : null}
                {tendency !== undefined ? tendency.toFixed(1) : null}
              </span>
            </TableCell>
          );
        },
        sortDescFirst: true,
        sortUndefined: 1,
        sortingFn: (rowA, rowB) =>
          numericalSort({ rowA, rowB, id: "tendency" }),
        size: 200,
      },
      {
        header: () => {
          return (
            <TableCell className="justify-end">
              <span className="text-sm dark:text-slate-300">AVG</span>
            </TableCell>
          );
        },
        id: "avg",
        accessorFn: (match) => {
          const { averageQuantity, averageSum } = match || {};
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
      frozenId="match"
      initialSortId="date"
      initialSortDesc={true}
    />
  );
};

export default MatchesTable;
