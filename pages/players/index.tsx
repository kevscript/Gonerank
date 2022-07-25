import UserIcon from "@/components/Icons/User";
import TableCell from "@/components/shared/TableCell";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import {
  useGetSeasonRatingsLazyQuery,
  useGetSeasonsQuery,
  useGlobalSeasonDataLazyQuery,
} from "graphql/generated/queryTypes";
import { useEffect, useState } from "react";
import {
  formatSeasonPlayersStats,
  FormattedPlayerSeasonStats,
} from "@/utils/formatSeasonStats";
import PublicTable from "@/components/shared/PublicTable";
import Draggable from "@/components/shared/Draggable";

const PlayersPage = () => {
  const { data: seasonsData } = useGetSeasonsQuery();
  const [getGlobalSeasonData, { data: globalSeasonData }] =
    useGlobalSeasonDataLazyQuery();
  const [getSeasonRatings, { data: seasonRatings }] =
    useGetSeasonRatingsLazyQuery();

  const [stats, setStats] = useState<FormattedPlayerSeasonStats[] | null>(null);

  useEffect(() => {
    if (seasonsData?.seasons) {
      const latestSeason = seasonsData.seasons.sort((a, b) =>
        new Date(a.startDate) < new Date(b.startDate) ? 1 : -1
      )[0];
      if (latestSeason) {
        getGlobalSeasonData({ variables: { seasonId: latestSeason.id } });
        getSeasonRatings({ variables: { seasonId: latestSeason.id } });
      }
    }
  }, [seasonsData?.seasons, getSeasonRatings, getGlobalSeasonData]);

  useEffect(() => {
    if (
      globalSeasonData?.matches &&
      globalSeasonData.matches.length > 0 &&
      seasonRatings
    ) {
      const formattedStats = formatSeasonPlayersStats({
        matches: globalSeasonData.matches,
        players: globalSeasonData.players,
        clubs: globalSeasonData.clubs,
        competitions: globalSeasonData.competitions,
        ratings: seasonRatings.ratings,
      });
      formattedStats && setStats(formattedStats);
    }
  }, [globalSeasonData, seasonRatings]);

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
        const { firstName, lastName, image } = row.original || {};
        return (
          <TableCell className="flex flex-nowrap px-2">
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
          </TableCell>
        );
      },
      size: 200,
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
      cell: (info) => (
        <TableCell>
          <span>{info.getValue()}</span>
        </TableCell>
      ),
    },
    {
      header: () => (
        <TableCell>
          <span>awayAvg</span>
        </TableCell>
      ),
      accessorKey: "awayAverage",
      cell: (info) => (
        <TableCell>
          <span>{info.getValue()}</span>
        </TableCell>
      ),
    },
    {
      header: () => (
        <TableCell>
          <span>globalAvg</span>
        </TableCell>
      ),
      accessorKey: "globalAverage",
      cell: (info) => (
        <TableCell>
          <span>{info.getValue()}</span>
        </TableCell>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1>Players</h1>
      {stats && (
        <Draggable>
          <PublicTable columns={columns} data={stats} frozenId="player" />
        </Draggable>
      )}
    </div>
  );
};

export default PlayersPage;
