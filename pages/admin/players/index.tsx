import AdminTable from "@/components/shared/AdminTable";
import Draggable from "@/components/shared/Draggable";
import { NextCustomPage } from "@/pages/_app";
import { Player } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  GetPlayersQuery,
  useDeletePlayerMutation,
  useGetPlayersQuery,
  useUpdatePlayerMutation,
} from "graphql/generated/queryTypes";
import { GET_PLAYERS } from "graphql/queries/player";
import Link from "next/link";

const AdminPlayersPage: NextCustomPage = () => {
  const { data: playersData, loading, error } = useGetPlayersQuery();

  const [deletePlayer] = useDeletePlayerMutation({
    update: (cache, { data }) => {
      const { players } = cache.readQuery({ query: GET_PLAYERS }) || {};
      cache.writeQuery({
        query: GET_PLAYERS,
        data: {
          players: players.filter(
            (s: GetPlayersQuery["players"][0]) => s.id !== data?.deletePlayer.id
          ),
        },
      });
    },
  });

  const [updatePlayer] = useUpdatePlayerMutation();

  const handlePlayerDelete = (id: string) => {
    deletePlayer({ variables: { id: id } });
  };

  const playerColumns: ColumnDef<Player>[] = [
    {
      header: "player",
      id: "player",
      accessorFn: (player) => player.lastName,
      cell: ({ row }) => {
        const { firstName, lastName, image } = row.original || {};
        return (
          <span className="whitespace-nowrap">
            {firstName![0] + ". " + lastName}
          </span>
        );
      },
    },
    {
      header: "birthDate",
      accessorKey: "birthDate",
      cell: (info) => {
        const birthDate: Date = new Date(info.getValue());
        return birthDate.toLocaleDateString();
      },
    },
    {
      header: "country",
      accessorKey: "country",
      cell: (info) => info.getValue(),
    },
    {
      header: "code",
      accessorKey: "countryCode",
      cell: (info) => info.getValue(),
      maxSize: 80,
    },
    {
      header: "status",
      accessorKey: "active",
      cell: ({ row, getValue }) => {
        const active: boolean = getValue();
        const { id } = row.original!;
        return (
          <div
            className="w-full h-full bg-cyan-500"
            onClick={() =>
              updatePlayer({
                variables: { id: id, data: { active: active ? false : true } },
              })
            }
          >
            <span>{active ? "active" : "inactive"}</span>
          </div>
        );
      },
    },
    {
      header: "edit",
      id: "edit",
      cell: ({ row }) => {
        return (
          <Link href={`/admin/players/${row.original!.id}`} passHref>
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
            onClick={() => handlePlayerDelete(row.original!.id)}
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
        <Link passHref href="/admin/players/create">
          <a className="px-2 py-1 bg-gray-200 rounded">Ajouter</a>
        </Link>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error.message}</div>}
      {playersData?.players && (
        <Draggable>
          <AdminTable
            columns={playerColumns}
            data={playersData.players}
            frozenId="player"
          />
        </Draggable>
      )}
    </div>
  );
};

AdminPlayersPage.isAdminPage = true;
export default AdminPlayersPage;
