import EditIcon from "@/components/Icons/Edit";
import UserIcon from "@/components/Icons/User";
import AdminTable from "@/components/shared/AdminTable";
import Button from "@/components/shared/Button";
import Draggable from "@/components/shared/Draggable";
import Spinner from "@/components/shared/Spinner";
import TableCell from "@/components/shared/TableCell";
import DeleteWidget from "@/components/widgets/DeleteWidget";
import StatusWidget from "@/components/widgets/StatusWidget";
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
import React from "react";

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

  const handlePlayerDelete = async (id: string) => {
    deletePlayer({ variables: { id: id } });
  };

  const playerColumns: ColumnDef<Player>[] = [
    {
      header: () => {
        return (
          <TableCell>
            <div className="relative flex items-center justify-center w-4 h-4 ml-2 overflow-hidden bg-gray-200 rounded-full">
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
          <TableCell className="flex px-2 flex-nowrap">
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
          </TableCell>
        );
      },
      size: 200,
    },
    {
      header: () => {
        return (
          <TableCell className="justify-center">
            <span className="text-sm">birthDate</span>
          </TableCell>
        );
      },
      accessorKey: "birthDate",
      cell: (info) => {
        const birthDate: Date = new Date(info.getValue());
        return (
          <TableCell className="justify-center">
            <span>
              {birthDate.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </span>
          </TableCell>
        );
      },
      size: 100,
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
      size: 150,
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
      size: 100,
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
        const { id, firstName, lastName } = row.original!;
        return (
          <TableCell padding="px-0">
            <StatusWidget
              active={active}
              onStatusChange={() =>
                updatePlayer({
                  variables: {
                    id: id,
                    data: { active: active ? false : true },
                  },
                })
              }
            >
              <p className="text-sm">
                Are you sure you want to{" "}
                <span className="font-bold">
                  {active ? "deactivate" : "activate"}
                </span>{" "}
                {firstName + " " + lastName}?
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
            <span className="text-sm">edit</span>
          </TableCell>
        );
      },
      id: "edit",
      cell: ({ row }) => {
        return (
          <Link href={`/admin/players/${row.original!.id}`} passHref>
            <div className="w-full h-full">
              <TableCell
                className="justify-center cursor-pointer bg-marine-100 group hover:bg-marine-400"
                padding="px-0"
              >
                <EditIcon className="w-4 h-4 fill-black group-hover:fill-white" />
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
          <TableCell className="justify-center px-2">
            <span className="text-sm">delete</span>
          </TableCell>
        );
      },
      id: "delete",
      cell: ({ row }) => {
        const { firstName, id, lastName } = row.original || {};
        return (
          <TableCell padding="px-0">
            <DeleteWidget
              onDelete={() => handlePlayerDelete(id!)}
              validation={firstName + " " + lastName}
            >
              <p className="text-sm">
                Are you sure you want to definitely{" "}
                <span className="font-bold">
                  remove {firstName + " " + lastName}
                </span>{" "}
                from the database? This decision is irreversible.
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
        <Link passHref href="/admin/players/create">
          <div>
            <Button label="Ajouter" />
          </div>
        </Link>
      </div>
      <div className="py-4">
        {playersData?.players && (
          <Draggable>
            <AdminTable
              columns={playerColumns}
              data={playersData.players}
              frozenId="player"
              initialSortId="player"
            />
          </Draggable>
        )}
      </div>
    </div>
  );
};

AdminPlayersPage.isAdminPage = true;
export default AdminPlayersPage;
