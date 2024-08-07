import EditIcon from "@/components/Icons/Edit";
import UserIcon from "@/components/Icons/User";
import AdminTable from "@/components/tables/AdminTable";
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
import { SUPABASE } from "@/utils/constants";

const AdminPlayersPage: NextCustomPage = () => {
  const { data: playersData, loading, error } = useGetPlayersQuery();

  const [deletePlayer] = useDeletePlayerMutation({
    update: (cache, { data }) => {
      const { players } =
        cache.readQuery<GetPlayersQuery>({ query: GET_PLAYERS }) || {};
      players &&
        cache.writeQuery({
          query: GET_PLAYERS,
          data: {
            players: players.filter(
              (s: GetPlayersQuery["players"][0]) =>
                s.id !== data?.deletePlayer.id
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
          <TableCell header opaque>
            <div className="relative flex items-center justify-center w-4 h-4 ml-2 overflow-hidden bg-gray-200 rounded-full dark:bg-dark-300">
              <UserIcon className="dark:bg-gray-300" />
            </div>
            <span className="ml-4 text-sm dark:text-gray-300">Player</span>
          </TableCell>
        );
      },
      id: "player",
      accessorFn: (player) => player.lastName,
      cell: ({ row }) => {
        const { firstName, lastName, image } = row.original || {};
        return (
          <TableCell className="flex pl-2 pr-2 md:pr-16 flex-nowrap" opaque>
            <div className="relative flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-200 rounded-full dark:bg-dark-300">
              {image ? (
                <Image
                  src={`${SUPABASE.FULL_AVATARS_BUCKET_PATH}/${image}`}
                  layout="fill"
                  objectFit="cover"
                  alt="player"
                />
              ) : (
                <UserIcon />
              )}
            </div>
            <span className="ml-2 whitespace-nowrap md:hidden">
              {firstName![0] + ". " + lastName}
            </span>
            <span className="hidden ml-2 whitespace-nowrap md:inline-block">
              {firstName + " " + lastName}
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
            <span className="text-sm dark:text-gray-300">birthDate</span>
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
          <TableCell className="justify-center">
            <span className="text-sm dark:text-gray-300">country</span>
          </TableCell>
        );
      },
      accessorKey: "country",
      cell: ({ row }) => {
        const { country, countryCode } = row.original || {};
        return (
          <TableCell className="justify-center">
            {countryCode && (
              <Image
                src={`https://flagcdn.com/h20/${countryCode.toLowerCase()}.png`}
                width={20}
                height={12}
                alt={country}
                title={country}
              />
            )}
          </TableCell>
        );
      },
      size: 100,
    },
    {
      header: () => {
        return (
          <TableCell className="justify-center">
            <span className="text-sm dark:text-gray-300">status</span>
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
            <span className="text-sm dark:text-gray-300">edit</span>
          </TableCell>
        );
      },
      id: "edit",
      cell: ({ row }) => {
        return (
          <Link href={`/admin/players/${row.original!.id}`} passHref>
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
          <TableCell className="justify-center px-2">
            <span className="text-sm dark:text-gray-300">delete</span>
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
