import BallIcon from "@/components/Icons/Ball";
import CalendarIcon from "@/components/Icons/Calendar";
import EditIcon from "@/components/Icons/Edit";
import HomeIcon from "@/components/Icons/HomeIcon";
import LocationIcon from "@/components/Icons/Location";
import PlaneIcon from "@/components/Icons/PlaneIcon";
import TrophyIcon from "@/components/Icons/Trophy";
import AdminTable from "@/components/shared/AdminTable";
import Draggable from "@/components/shared/Draggable";
import TableCell from "@/components/shared/TableCell";
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
  useToggleMatchStatusMutation,
  useUpdateMatchMutation,
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
  });

  const handleMatchDelete = (id: string) => {
    deleteMatch({ variables: { id: id } });
  };

  const matchColumns: ColumnDef<Match>[] = [
    {
      header: () => (
        <TableCell className="text-sm">
          <span>date</span>
        </TableCell>
      ),
      id: "date",
      accessorKey: "date",
      cell: (info) => {
        const date = new Date(info.getValue());
        return (
          <TableCell>
            <span>{date ? date.toLocaleDateString() : ""}</span>
          </TableCell>
        );
      },
    },
    {
      header: () => (
        <TableCell className="justify-center">
          <CalendarIcon className="w-3 h-3" />
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
    },
    {
      header: () => (
        <TableCell className="justify-center">
          <LocationIcon className="w-3 h-3" />
        </TableCell>
      ),
      id: "location",
      accessorKey: "home",
      cell: (info) => {
        const home = info.getValue();
        return (
          <TableCell className="justify-center">
            {home ? (
              <HomeIcon className="w-4 h-4" />
            ) : (
              <PlaneIcon className="w-4 h-4" />
            )}
          </TableCell>
        );
      },
    },
    {
      header: () => (
        <TableCell>
          <span className="text-sm">opponent</span>
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
    },
    {
      header: () => {
        return (
          <TableCell className="justify-center">
            <span className="text-sm">status</span>
          </TableCell>
        );
      },
      accessorKey: "active",
      cell: ({ row, getValue }) => {
        const active: boolean = getValue();
        const { id, opponentId, date } = row.original || {};
        const opponent = clubsData?.clubs.find((c) => c.id === opponentId);
        return (
          <TableCell className="px-0">
            <StatusWidget
              active={active}
              onStatusChange={() =>
                toggleMatchStatus({ variables: { id: id! } })
              }
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
    },
    {
      header: () => {
        return (
          <TableCell className="justify-center">
            <span className="text-sm">edit</span>
          </TableCell>
        );
      },
      id: "edit",
      cell: ({ row }) => {
        return (
          <Link href={`/admin/matches/${row.original!.id}`} passHref>
            <div className="w-full h-full">
              <TableCell className="bg-marine-100 cursor-pointer justify-center group hover:bg-marine-400">
                <EditIcon className="w-4 h-4 fill-black group-hover:fill-white" />
              </TableCell>
            </div>
          </Link>
        );
      },
    },
    {
      header: () => {
        return (
          <TableCell className="justify-center">
            <span className="text-sm">delete</span>
          </TableCell>
        );
      },
      id: "delete",
      cell: ({ row }) => {
        const { id, opponentId, date } = row.original || {};
        const opponent = clubsData?.clubs.find((c) => c.id === opponentId);
        return (
          <TableCell className="px-0">
            <DeleteWidget onDelete={() => handleMatchDelete(id!)}>
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
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-end">
        <Link passHref href="/admin/matches/create">
          <a className="px-2 py-1 bg-gray-200 rounded">Ajouter</a>
        </Link>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error.message}</div>}
      {matchesData?.matches && (
        <Draggable>
          <AdminTable
            columns={matchColumns}
            data={matchesData.matches}
            frozenId="date"
          />
        </Draggable>
      )}
    </div>
  );
};

AdminMatchesPage.isAdminPage = true;
export default AdminMatchesPage;
