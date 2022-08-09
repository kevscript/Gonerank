import CalendarIcon from "@/components/Icons/Calendar";
import EditIcon from "@/components/Icons/Edit";
import PlayerIcon from "@/components/Icons/Player";
import AdminTable from "@/components/shared/AdminTable";
import Button from "@/components/shared/Button";
import Draggable from "@/components/shared/Draggable";
import Spinner from "@/components/shared/Spinner";
import TableCell from "@/components/shared/TableCell";
import DeleteWidget from "@/components/widgets/DeleteWidget";
import { NextCustomPage } from "@/pages/_app";
import { Season } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  GetSeasonsQuery,
  useDeleteSeasonMutation,
  useGetSeasonsQuery,
} from "graphql/generated/queryTypes";
import { GET_SEASONS } from "graphql/queries/season";
import Link from "next/link";

const AdminSeasonsPage: NextCustomPage = () => {
  const { data: seasonsData, loading, error } = useGetSeasonsQuery();

  const [deleteSeason] = useDeleteSeasonMutation({
    update: (cache, { data }) => {
      const { seasons } = cache.readQuery({ query: GET_SEASONS }) || {};
      cache.writeQuery({
        query: GET_SEASONS,
        data: {
          seasons: seasons.filter(
            (s: GetSeasonsQuery["seasons"][0]) => s.id !== data?.deleteSeason.id
          ),
        },
      });
    },
  });

  const handleSeasonDelete = (id: string) =>
    deleteSeason({ variables: { id: id } });

  const seasonColumns: ColumnDef<Season>[] = [
    {
      header: () => (
        <TableCell className="justify-center">
          <CalendarIcon className="w-3 h-3" />
        </TableCell>
      ),
      id: "season",
      cell: ({ row }) => {
        const { startDate } = row.original || {};
        const year = startDate && new Date(startDate).getFullYear();
        return (
          <TableCell className="justify-center">
            <span>
              {year
                ? `${String(year).substring(2)}/${String(year + 1).substring(
                    2
                  )}`
                : "X"}
            </span>
          </TableCell>
        );
      },
      size: 100,
    },
    {
      header: () => (
        <TableCell className="justify-center">
          <span className="text-sm">startDate</span>
        </TableCell>
      ),
      id: "startDate",
      accessorKey: "startDate",
      cell: (info) => {
        const startDate = new Date(info.getValue());
        return (
          <TableCell className="justify-center">
            <span>
              {startDate.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </span>
          </TableCell>
        );
      },
      size: 150,
    },
    {
      header: () => {
        return (
          <TableCell className="justify-center">
            <span className="text-sm">squad</span>
          </TableCell>
        );
      },
      id: "squad",
      cell: ({ row }) => {
        return (
          <Link href={`/admin/seasons/${row.original!.id}/squad`} passHref>
            <div className="w-full h-full">
              <TableCell
                className="justify-center cursor-pointer bg-pink-50 group hover:bg-pink-300"
                padding="px-0"
              >
                <PlayerIcon className="w-4 h-4 fill-black" />
              </TableCell>
            </div>
          </Link>
        );
      },
      size: 100,
    },
    {
      header: () => (
        <TableCell className="justify-center">
          <span className="text-sm">edit</span>
        </TableCell>
      ),
      id: "edit",
      cell: ({ row }) => {
        return (
          <Link href={`/admin/seasons/${row.original!.id}`} passHref>
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
      header: () => (
        <TableCell className="justify-center">
          <span className="text-sm">delete</span>
        </TableCell>
      ),
      id: "delete",
      cell: ({ row }) => {
        const { id, startDate } = row.original || {};
        const date = new Date(startDate!).getFullYear();
        return (
          <TableCell padding="px-0">
            <DeleteWidget
              onDelete={() => handleSeasonDelete(id!)}
              validation={`${date}/${date + 1}`}
            >
              <p className="text-sm">
                Are you sure you want to definitely{" "}
                <span className="font-bold">remove</span> the{" "}
                <span className="font-bold">{date + "/" + (date + 1)}</span>{" "}
                season from the database? This decision is irreversible.
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
        <Link passHref href="/admin/seasons/create">
          <div>
            <Button label="Ajouter" />
          </div>
        </Link>
      </div>
      <div className="py-4">
        {seasonsData?.seasons && (
          <Draggable>
            <AdminTable
              columns={seasonColumns}
              data={seasonsData.seasons}
              frozenId="season"
              initialSortId="startDate"
              initialSortDesc={true}
            />
          </Draggable>
        )}
      </div>
    </div>
  );
};

AdminSeasonsPage.isAdminPage = true;
export default AdminSeasonsPage;
