import EditIcon from "@/components/Icons/Edit";
import TrashIcon from "@/components/Icons/Trash";
import AdminTable from "@/components/shared/AdminTable";
import Draggable from "@/components/shared/Draggable";
import TableCell from "@/components/shared/TableCell";
import DeleteWidget from "@/components/widgets/DeleteWidget";
import { NextCustomPage } from "@/pages/_app";
import { getContrastColor } from "@/utils/getContrastColor";
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
      header: () => (
        <TableCell className="text-sm">
          <span>abbr</span>
        </TableCell>
      ),
      id: "abbr",
      accessorKey: "abbreviation",
      cell: (info) => (
        <TableCell>
          <span>{info.getValue()}</span>
        </TableCell>
      ),
      size: 100,
    },
    {
      header: () => (
        <TableCell className="text-sm">
          <span>name</span>
        </TableCell>
      ),
      accessorKey: "name",
      cell: (info) => (
        <TableCell>
          <span className="whitespace-nowrap">{info.getValue()}</span>
        </TableCell>
      ),
      size: 250,
    },
    {
      header: () => (
        <TableCell className="text-sm justify-center">
          <span>prim.</span>
        </TableCell>
      ),
      accessorKey: "primary",
      cell: ({ row }) => {
        const { primary } = row.original || {};
        const textColor = `text-${getContrastColor(primary!)}`;
        return (
          <TableCell className="py-2">
            <div
              className={`w-full h-full flex justify-center items-center px-1 drop-shadow`}
              style={{ backgroundColor: primary }}
            >
              <span className={`${textColor} text-xs`}>{primary}</span>
            </div>
          </TableCell>
        );
      },
      size: 100,
    },
    {
      header: () => (
        <TableCell className="text-sm justify-center">
          <span>sec.</span>
        </TableCell>
      ),
      accessorKey: "secondary",
      cell: ({ row }) => {
        const { secondary } = row.original || {};
        const textColor = `text-${getContrastColor(secondary!)}`;
        return (
          <TableCell className="py-2">
            <div
              className={`w-full h-full flex justify-center items-center px-1 drop-shadow`}
              style={{ backgroundColor: secondary }}
            >
              <span className={`${textColor} text-xs`}>{secondary}</span>
            </div>
          </TableCell>
        );
      },
      size: 100,
    },
    {
      header: () => (
        <TableCell className="text-sm justify-center">
          <span className="text-sm">edit</span>
        </TableCell>
      ),
      id: "edit",
      cell: ({ row }) => {
        return (
          <Link href={`/admin/clubs/${row.original!.id}`} passHref>
            <div className="w-full h-full bg-marine-100 cursor-pointer justify-center group hover:bg-marine-400">
              <TableCell className="justify-center">
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
        <TableCell className="text-sm justify-center">
          <span className="text-sm">delete</span>
        </TableCell>
      ),
      id: "delete",
      cell: ({ row }) => {
        const { name, id } = row.original || {};
        return (
          <TableCell className="justify-center" padding="px-0">
            <DeleteWidget
              onDelete={() => deleteClub({ variables: { id: id! } })}
            >
              <p className="text-sm">
                Are you sure you want to definitely{" "}
                <span className="font-bold">remove {name}</span> from the
                database? This decision is irreversible.
              </p>
            </DeleteWidget>
          </TableCell>
        );
      },
      size: 100,
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-end">
        <Link passHref href="/admin/clubs/create">
          <a className="px-2 py-1 bg-gray-200 rounded">Ajouter</a>
        </Link>
      </div>
      <div className="py-4">
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-600">{error.message}</div>}

        {data?.clubs && (
          <Draggable>
            <AdminTable
              columns={clubColumns}
              data={data.clubs}
              frozenId="abbr"
            />
          </Draggable>
        )}
      </div>
    </div>
  );
};

AdminClubsPage.isAdminPage = true;

export default AdminClubsPage;
