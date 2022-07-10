import AdminTable from "@/components/shared/AdminTable";
import Draggable from "@/components/shared/Draggable";
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
      header: "id",
      accessorKey: "id",
      cell: ({ row }) => row.id,
    },
    {
      header: "startDate",
      accessorKey: "startDate",
      cell: (info) => {
        const startDate: Date = new Date(info.getValue());
        return startDate.toLocaleDateString();
      },
    },
    {
      header: "edit",
      id: "edit",
      cell: ({ row }) => {
        return (
          <Link href={`/admin/seasons/${row.original!.id}`} passHref>
            <div className="w-full h-full bg-green-500">E</div>
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
            onClick={() => handleSeasonDelete(row.original!.id)}
          >
            X
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-end">
        <Link passHref href="/admin/seasons/create">
          <a className="px-2 py-1 bg-gray-200 rounded">Ajouter</a>
        </Link>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error.message}</div>}

      {seasonsData?.seasons && (
        <Draggable>
          <AdminTable columns={seasonColumns} data={seasonsData.seasons} />
        </Draggable>
      )}
    </div>
  );
};

AdminSeasonsPage.isAdminPage = true;
export default AdminSeasonsPage;
