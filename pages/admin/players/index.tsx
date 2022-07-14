import EditIcon from "@/components/Icons/Edit";
import EyeIcon from "@/components/Icons/Eye";
import EyeClosedIcon from "@/components/Icons/EyeClosedIcon";
import TrashIcon from "@/components/Icons/Trash";
import UserIcon from "@/components/Icons/User";
import AdminTable from "@/components/shared/AdminTable";
import Draggable from "@/components/shared/Draggable";
import TableCell from "@/components/shared/TableCell";
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
import Image from "next/image";
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
          <TableCell className="flex flex-nowrap">
            <div className="relative w-8 h-8 flex justify-center items-center rounded-full overflow-hidden bg-gray-200">
              {image ? (
                <Image
                  src={image}
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
    },
    {
      header: () => {
        return (
          <TableCell>
            <span className="text-sm">birthDate</span>
          </TableCell>
        );
      },
      accessorKey: "birthDate",
      cell: (info) => {
        const birthDate: Date = new Date(info.getValue());
        return (
          <TableCell>
            <span>{birthDate.toLocaleDateString()}</span>
          </TableCell>
        );
      },
    },
    {
      header: () => {
        return (
          <TableCell>
            <span className="text-sm">country</span>
          </TableCell>
        );
      },
      accessorKey: "country",
      cell: (info) => {
        return (
          <TableCell>
            <span>{info.getValue()}</span>
          </TableCell>
        );
      },
    },
    {
      header: () => {
        return (
          <TableCell>
            <span className="text-sm">code</span>
          </TableCell>
        );
      },
      accessorKey: "countryCode",
      cell: (info) => {
        return (
          <TableCell>
            <span>{info.getValue()}</span>
          </TableCell>
        );
      },
      maxSize: 80,
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
        const { id } = row.original!;
        return (
          <TableCell
            className={`cursor-pointer justify-center group ${
              active
                ? "bg-violet-100 hover:bg-violet-400"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() =>
              updatePlayer({
                variables: {
                  id: id,
                  data: { active: active ? false : true },
                },
              })
            }
          >
            {active ? (
              <EyeIcon className="w-5 h-5 fill-gray-500 group-hover:fill-white" />
            ) : (
              <EyeClosedIcon className="w-5 h-5 fill-gray-500 group-hover:fill-gray-600" />
            )}
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
          <Link href={`/admin/players/${row.original!.id}`} passHref>
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
        return (
          <TableCell
            className="bg-red-100 cursor-pointer justify-center group hover:bg-red-400"
            onClick={() => handlePlayerDelete(row.original!.id)}
          >
            <TrashIcon className="w-4 h-4 fill-black group-hover:fill-white" />
          </TableCell>
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
      <div className="py-4">
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
    </div>
  );
};

AdminPlayersPage.isAdminPage = true;
export default AdminPlayersPage;
