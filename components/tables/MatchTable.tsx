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
            <span className="ml-4 text-sm">Joueur</span>
          </TableCell>
        );
      },
      id: "player",
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
      header: () => {
        return (
          <TableCell className="justify-center">
            <RatingIcon className="w-4 h-4" />
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
            {motm && <MotmIcon className="w-4 h-4" />}
            {botm && <BotmIcon className="w-4 h-4" />}
          </TableCell>
        );
      },
      size: 100,
    },
    {
      header: () => {
        return (
          <TableCell className="justify-end">
            <span className="text-sm">AVG</span>
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
            <span className="font-num font-bold">
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
    {
      header: () => {
        return (
          <TableCell className="justify-end">
            <span className="text-sm">TDC</span>
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
      size: 200,
    },
  ];

  return <PublicTable columns={columns} data={data} frozenId="player" />;
};

export default MatchTable;
