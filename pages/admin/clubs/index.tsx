import AdminTable from "@/components/shared/AdminTable";
import Draggable from "@/components/shared/Draggable";
import { NextCustomPage } from "@/pages/_app";
import { Club } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  GetClubsQuery,
  useDeleteClubMutation,
  useGetClubsQuery,
} from "graphql/generated/queryTypes";
import { GET_CLUBS } from "graphql/queries/club";
import Link from "next/link";

const AdminClubsPage: NextCustomPage = () => {
  const { data, loading, error } = useGetClubsQuery();

  const [deleteClub] = useDeleteClubMutation({
    update: (cache, { data }) => {
      const { clubs } = cache.readQuery({ query: GET_CLUBS }) || {};
      cache.writeQuery({
        query: GET_CLUBS,
        data: {
          clubs: clubs.filter(
            (s: GetClubsQuery["clubs"][0]) => s.id !== data?.deleteClub.id
          ),
        },
      });
    },
  });

  const clubColumns: ColumnDef<Club>[] = [
    {
      header: "abbr",
      id: "abbr",
      accessorKey: "abbreviation",
      cell: (info) => info.getValue(),
    },
    {
      header: "name",
      accessorKey: "name",
      cell: (info) => (
        <span className="whitespace-nowrap">{info.getValue()}</span>
      ),
    },
    {
      header: "primary",
      accessorKey: "primary",
      cell: (info) => info.getValue(),
    },
    {
      header: "secondary",
      accessorKey: "secondary",
      cell: (info) => info.getValue(),
    },
    {
      header: "edit",
      id: "edit",
      cell: ({ row }) => {
        return (
          <Link href={`/admin/clubs/${row.original!.id}`} passHref>
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
            onClick={() => deleteClub({ variables: { id: row.original!.id } })}
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
        <Link passHref href="/admin/clubs/create">
          <a className="px-2 py-1 bg-gray-200 rounded">Ajouter</a>
        </Link>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error.message}</div>}

      {data?.clubs && (
        <Draggable>
          <AdminTable columns={clubColumns} data={data.clubs} frozenId="abbr" />
        </Draggable>
      )}
    </div>
  );
};

AdminClubsPage.isAdminPage = true;

export default AdminClubsPage;
