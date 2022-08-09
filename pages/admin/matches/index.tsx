import BallIcon from "@/components/Icons/Ball";
import CalendarIcon from "@/components/Icons/Calendar";
import EditIcon from "@/components/Icons/Edit";
import HomeIcon from "@/components/Icons/HomeIcon";
import LocationIcon from "@/components/Icons/Location";
import PlaneIcon from "@/components/Icons/PlaneIcon";
import PlayerIcon from "@/components/Icons/Player";
import TrophyIcon from "@/components/Icons/Trophy";
import AdminTable from "@/components/shared/AdminTable";
import Button from "@/components/shared/Button";
import Draggable from "@/components/shared/Draggable";
import Spinner from "@/components/shared/Spinner";
import TableCell from "@/components/shared/TableCell";
import ArchiveWidget from "@/components/widgets/ArchiveWidget";
import DeleteWidget from "@/components/widgets/DeleteWidget";
import StatusWidget from "@/components/widgets/StatusWidget";
import { NextCustomPage } from "@/pages/_app";
import { Match } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  GetMatchesQuery,
  useDeleteMatchMutation,
  useGetClubsQuery,
  useGetCompetitionsQuery,
  useGetMatchesQuery,
  useGetSeasonsQuery,
  useToggleMatchArchiveMutation,
  useToggleMatchStatusMutation,
} from "graphql/generated/queryTypes";
import { GET_MATCHES } from "graphql/queries/match";
import Link from "next/link";

const AdminMatchesPage: NextCustomPage = () => {
  const { data: matchesData, loading, error } = useGetMatchesQuery();

  const { data: seasonsData } = useGetSeasonsQuery();
  const { data: competitionsData } = useGetCompetitionsQuery();
  const { data: clubsData } = useGetClubsQuery();

  const [deleteMatch] = useDeleteMatchMutation({
    update: (cache, { data }) => {
      const { matches } = cache.readQuery({ query: GET_MATCHES }) || {};
      cache.writeQuery({
        query: GET_MATCHES,
        data: {
          matches: matches.filter(
            (m: GetMatchesQuery["matches"][0]) => m.id !== data?.deleteMatch.id
          ),
        },
      });
    },
  });

  const [toggleMatchStatus] = useToggleMatchStatusMutation({
    update: (cache, { data }) => {
      const { matches } = cache.readQuery({ query: GET_MATCHES }) || {};
      cache.modify({
        fields: {
          matches: () => {
            cache.writeQuery({
              query: GET_MATCHES,
              data: {
                matches: matches.map((m: Match) => {
                  return m.id === data?.toggleMatchStatus.id
                    ? { ...m, active: m.active ? false : true }
                    : { ...m, active: false };
                }),
              },
            });
          },
        },
      });
    },
    refetchQueries: ["GetDisplayMatch"],
    awaitRefetchQueries: true,
  });

  const [toggleMatchArchive] = useToggleMatchArchiveMutation({
    refetchQueries: ["GetDisplayMatch"],
    awaitRefetchQueries: true,
  });

  const handleMatchDelete = (id: string) => {
    deleteMatch({ variables: { id: id } });
  };

  const handleMatchActivation = (id: string) => {
    if (matchesData) {
      const currMatch = matchesData.matches.find((m) => m.id === id);

      if (currMatch && currMatch.archived) {
        console.error("Can't toggle activation on an archived match");
        return;
      }

      toggleMatchStatus({ variables: { id: id } });
    }
  };

  const handleMatchArchive = (id: string) => {
    if (matchesData) {
      const currMatch = matchesData.matches.find((m) => m.id === id);
      if (currMatch && currMatch.active) {
        console.error("Can't toggle archivation on an active match");
        return;
      }

      toggleMatchArchive({ variables: { id: id } });
    }
  };

  const matchColumns: ColumnDef<Match>[] = [
    {
      header: () => (
        <TableCell className="justify-center">
          <span className="text-sm dark:text-slate-300">date</span>
        </TableCell>
      ),
      id: "date",
      accessorKey: "date",
      cell: (info) => {
        const date = new Date(info.getValue());
        return (
          <TableCell className="justify-center">
            <span>
              {date
                ? date.toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })
                : ""}
            </span>
          </TableCell>
        );
      },
      size: 100,
    },
    {
      header: () => (
        <TableCell className="justify-center">
          <CalendarIcon className="w-3 h-3 dark:fill-slate-300" />
        </TableCell>
      ),
      id: "season",
      accessorKey: "seasonId",
      cell: (info) => {
        const seasonId = info.getValue();
        const season = seasonsData?.seasons.find((s) => s.id === seasonId);
        const year = new Date(season?.startDate).getFullYear();
        return (
          <TableCell className="justify-center">
            <span>{year || ""}</span>
          </TableCell>
        );
      },
      size: 100,
    },
    {
      header: () => (
        <TableCell className="justify-center">
          <TrophyIcon className="w-3 h-3" />
        </TableCell>
      ),
      id: "competition",
      accessorKey: "competitionId",
      cell: (info) => {
        const competitionId = info.getValue();
        const competition = competitionsData?.competitions.find(
          (c) => c.id === competitionId
        );
        return (
          <TableCell className="justify-center">
            <span>{competition?.abbreviation}</span>
          </TableCell>
        );
      },
      size: 100,
    },
    {
      header: () => (
        <TableCell className="justify-center">
          <LocationIcon className="w-3 h-3 dark:fill-slate-300" />
        </TableCell>
      ),
      id: "location",
      accessorKey: "home",
      cell: (info) => {
        const home = info.getValue();
        return (
          <TableCell className="justify-center">
            {home ? (
              <HomeIcon className="w-4 h-4 dark:fill-slate-300" />
            ) : (
              <PlaneIcon className="w-4 h-4 dark:fill-slate-300" />
            )}
          </TableCell>
        );
      },
      size: 80,
    },
    {
      header: () => (
        <TableCell className="justify-center">
          <BallIcon className="w-3 h-3 fill-marine-600" />
        </TableCell>
      ),
      id: "scored",
      accessorKey: "scored",
      cell: (info) => (
        <TableCell className="justify-center">
          <span>{info.getValue()}</span>
        </TableCell>
      ),
      size: 80,
    },
    {
      header: () => (
        <TableCell className="justify-center">
          <BallIcon className="w-3 h-3 fill-red-600" />
        </TableCell>
      ),
      id: "conceeded",
      accessorKey: "conceeded",
      cell: (info) => (
        <TableCell className="justify-center">
          <span>{info.getValue()}</span>
        </TableCell>
      ),
      size: 80,
    },
    {
      header: () => (
        <TableCell>
          <span className="text-sm dark:text-slate-300">opponent</span>
        </TableCell>
      ),
      id: "opponent",
      accessorKey: "opponentId",
      cell: (info) => {
        const opponentId = info.getValue();
        const opponent = clubsData?.clubs.find((c) => c.id === opponentId);
        return (
          <TableCell className="whitespace-nowrap">
            <span>{opponent?.name}</span>
          </TableCell>
        );
      },
      size: 250,
    },
    {
      header: () => {
        return (
          <TableCell className="justify-center">
            <span className="text-sm dark:text-slate-300">squad</span>
          </TableCell>
        );
      },
      id: "squad",
      cell: ({ row }) => {
        return (
          <Link href={`/admin/matches/${row.original!.id}/squad`} passHref>
            <div className="w-full h-full">
              <TableCell
                className="justify-center cursor-pointer bg-pink-50 dark:bg-pink-600/20 group hover:bg-pink-300 dark:hover:bg-pink-600/40"
                padding="px-0"
              >
                <PlayerIcon className="w-4 h-4 fill-black dark:fill-gray-300 group:dark:hover:fill-white" />
              </TableCell>
            </div>
          </Link>
        );
      },
      size: 100,
    },
    {
      header: () => {
        return (
          <TableCell className="justify-center">
            <span className="text-sm dark:text-slate-300">active</span>
          </TableCell>
        );
      },
      accessorKey: "active",
      cell: ({ row, getValue }) => {
        const active: boolean = getValue();
        const { id, opponentId, date, archived } = row.original || {};
        const opponent = clubsData?.clubs.find((c) => c.id === opponentId);
        return archived ? (
          <TableCell padding="px-0">
            <div
              className="flex items-center justify-center w-full h-full bg-gray-100 cursor-pointer"
              onClick={() => alert("Can't activate an archived match")}
            >
              <span className="text-xs font-bold text-gray-300">ARCHIVED</span>
            </div>
          </TableCell>
        ) : (
          <TableCell padding="px-0">
            <StatusWidget
              active={active}
              onStatusChange={() => handleMatchActivation(id!)}
            >
              <p className="text-sm">
                Are you sure you want to{" "}
                <span className="font-bold">
                  {active ? "deactivate" : "activate"}
                </span>{" "}
                the match against{" "}
                <span className="font-bold">{opponent?.name}</span> on the{" "}
                {date ? new Date(date).toLocaleDateString() : ""}?
              </p>
            </StatusWidget>
          </TableCell>
        );
      },
      size: 100,
    },
    {
      header: () => {
        return (
          <TableCell className="justify-center">
            <span className="text-sm dark:text-slate-300">archived</span>
          </TableCell>
        );
      },
      accessorKey: "archived",
      cell: ({ row, getValue }) => {
        const archived: boolean = getValue();
        const { id, opponentId, date, active } = row.original || {};
        const opponent = clubsData?.clubs.find((c) => c.id === opponentId);
        return active ? (
          <TableCell padding="px-0">
            <div
              className="flex items-center justify-center w-full h-full bg-gray-100 cursor-pointer dark:bg-gray-600/60"
              onClick={() => alert("Can't archive an active match")}
            >
              <span className="text-xs font-bold text-gray-300">ACTIVE</span>
            </div>
          </TableCell>
        ) : (
          <TableCell padding="px-0">
            <ArchiveWidget
              archived={archived}
              onStatusChange={() => handleMatchArchive(id!)}
            >
              <p className="text-sm">
                Are you sure you want to{" "}
                <span className="font-bold">
                  {archived ? "restore" : "archive"}
                </span>{" "}
                the match against{" "}
                <span className="font-bold">{opponent?.name}</span> on the{" "}
                {date ? new Date(date).toLocaleDateString() : ""}?
              </p>
            </ArchiveWidget>
          </TableCell>
        );
      },
      size: 100,
    },
    {
      header: () => {
        return (
          <TableCell className="justify-center">
            <span className="text-sm dark:text-slate-300">edit</span>
          </TableCell>
        );
      },
      id: "edit",
      cell: ({ row }) => {
        return (
          <Link href={`/admin/matches/${row.original!.id}`} passHref>
            <div className="w-full h-full">
              <TableCell
                className="justify-center cursor-pointer bg-marine-100 dark:bg-marine-600/20 group hover:bg-marine-400 dark:hover:bg-marine-600/40"
                padding="px-0"
              >
                <EditIcon className="w-4 h-4 fill-black dark:fill-gray-300 group-hover:fill-white" />
              </TableCell>
            </div>
          </Link>
        );
      },
      size: 100,
    },
    {
      header: () => {
        return (
          <TableCell className="justify-center">
            <span className="text-sm dark:text-slate-300">delete</span>
          </TableCell>
        );
      },
      id: "delete",
      cell: ({ row }) => {
        const { id, opponentId, date } = row.original || {};
        const opponent = clubsData?.clubs.find((c) => c.id === opponentId);
        return (
          <TableCell padding="px-0">
            <DeleteWidget
              onDelete={() => handleMatchDelete(id!)}
              validation={opponent?.name}
            >
              <p className="text-sm">
                Are you sure you want to definitely{" "}
                <span className="font-bold">remove</span> the match against{" "}
                <span className="font-bold">{opponent?.name}</span> on the{" "}
                {date ? new Date(date).toLocaleDateString() : ""} from the
                database? This decision is irreversible.
              </p>
            </DeleteWidget>
          </TableCell>
        );
      },
      size: 100,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600">{error.message}</div>;
  }

  return (
    <div className="p-4 lg:p-8 max-w-max">
      <div className="flex justify-end">
        <Link passHref href="/admin/matches/create">
          <div>
            <Button label="Ajouter" />
          </div>
        </Link>
      </div>
      <div className="py-4">
        {matchesData?.matches && (
          <Draggable>
            <AdminTable
              columns={matchColumns}
              data={matchesData.matches}
              frozenId="date"
              initialSortId="date"
              initialSortDesc={true}
            />
          </Draggable>
        )}
      </div>
    </div>
  );
};

AdminMatchesPage.isAdminPage = true;
export default AdminMatchesPage;
