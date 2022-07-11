import AdminTable from "@/components/shared/AdminTable";
import Draggable from "@/components/shared/Draggable";
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

  const [updateMatch] = useUpdateMatchMutation();

  const handleMatchDelete = (id: string) => {
    deleteMatch({ variables: { id: id } });
  };

  const matchColumns: ColumnDef<Match>[] = [
    {
      header: "date",
      id: "date",
      accessorKey: "date",
      cell: (info) => {
        const date: Date = new Date(info.getValue());
        return date.toLocaleDateString();
      },
    },
    {
      header: "season",
      id: "season",
      accessorKey: "seasonId",
      cell: (info) => {
        const seasonId = info.getValue();
        const season = seasonsData?.seasons.find((s) => s.id === seasonId);
        return `${new Date(season?.startDate).getFullYear()}`;
      },
    },
    {
      header: "comp",
      id: "competition",
      accessorKey: "competitionId",
      cell: (info) => {
        const competitionId = info.getValue();
        const competition = competitionsData?.competitions.find(
          (c) => c.id === competitionId
        );
        return competition?.abbreviation;
      },
    },
    {
      header: "location",
      id: "location",
      accessorKey: "home",
      cell: (info) => {
        const home = info.getValue();
        return home ? "Home" : "Away";
      },
    },
    {
      header: "opponent",
      id: "opponent",
      accessorKey: "opponentId",
      cell: (info) => {
        const opponentId = info.getValue();
        const opponent = clubsData?.clubs.find((c) => c.id === opponentId);
        return opponent?.abbreviation;
      },
    },
    {
      header: "scored",
      id: "scored",
      accessorKey: "scored",
      cell: (info) => info.getValue(),
    },
    {
      header: "conceeded",
      id: "conceeded",
      accessorKey: "conceeded",
      cell: (info) => info.getValue(),
    },
    {
      header: "edit",
      id: "edit",
      cell: ({ row }) => {
        return (
          <Link href={`/admin/matches/${row.original!.id}`} passHref>
            <div className="w-full h-full bg-green-500">Edit</div>
          </Link>
        );
      },
    },
    {
      header: "delete",
      id: "delete",
      cell: ({ row }) => {
        return (
          <div
            className="w-full h-full bg-red-500"
            onClick={() => handleMatchDelete(row.original!.id)}
          >
            Delete
          </div>
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
