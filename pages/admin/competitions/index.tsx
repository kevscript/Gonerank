import EditIcon from "@/components/Icons/Edit";
import AdminTable from "@/components/shared/AdminTable";
import Button from "@/components/shared/Button";
import Draggable from "@/components/shared/Draggable";
import Spinner from "@/components/shared/Spinner";
import TableCell from "@/components/shared/TableCell";
import DeleteWidget from "@/components/widgets/DeleteWidget";
import { NextCustomPage } from "@/pages/_app";
import { Competition } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  GetCompetitionsQuery,
  useDeleteCompetitionMutation,
  useGetCompetitionsQuery,
} from "graphql/generated/queryTypes";
import { GET_COMPETITIONS } from "graphql/queries/competition";
import Link from "next/link";

const AdminCompetitionsPage: NextCustomPage = () => {
  const { data: competitionsData, loading, error } = useGetCompetitionsQuery();

  const handleCompetitionDelete = (id: string) => {
    deleteCompetition({ variables: { id: id } });
  };

  const [deleteCompetition] = useDeleteCompetitionMutation({
    update: (cache, { data }) => {
      const { competitions } =
        cache.readQuery({ query: GET_COMPETITIONS }) || {};
      cache.writeQuery({
        query: GET_COMPETITIONS,
        data: {
          competitions: competitions.filter(
            (s: GetCompetitionsQuery["competitions"][0]) =>
              s.id !== data?.deleteCompetition.id
          ),
        },
      });
    },
  });

  const competitionColumns: ColumnDef<Competition>[] = [
    {
      header: () => (
        <TableCell>
          <span className="text-sm dark:text-slate-300">abbr</span>
        </TableCell>
      ),
      id: "abbr",
      accessorKey: "abbreviation",
      cell: (info) => (
        <TableCell>
          <span className="text-sm">{info.getValue()}</span>
        </TableCell>
      ),
      size: 100,
    },
    {
      header: () => (
        <TableCell>
          <span className="text-sm dark:text-slate-300">name</span>
        </TableCell>
      ),
      accessorKey: "name",
      cell: (info) => (
        <TableCell>
          <span className="text-sm whitespace-nowrap">{info.getValue()}</span>
        </TableCell>
      ),
      size: 200,
    },
    {
      header: () => (
        <TableCell className="justify-center">
          <span className="text-sm dark:text-slate-300">edit</span>
        </TableCell>
      ),
      id: "edit",
      cell: ({ row }) => {
        return (
          <Link href={`/admin/competitions/${row.original!.id}`} passHref>
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
      header: () => (
        <TableCell className="justify-center">
          <span className="text-sm dark:text-slate-300">delete</span>
        </TableCell>
      ),
      id: "delete",
      cell: ({ row }) => {
        const { id, name } = row.original || {};
        return (
          <TableCell padding="px-0">
            <DeleteWidget
              onDelete={() => handleCompetitionDelete(id!)}
              validation={name}
            >
              <p className="text-sm">
                Are you sure you want to definitely{" "}
                <span className="font-bold">remove</span> the{" "}
                <span className="font-bold">{name}</span> from the database?
                This decision is irreversible.
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
        <Link passHref href="/admin/competitions/create">
          <div>
            <Button label="Ajouter" />
          </div>
        </Link>
      </div>
      <div className="py-4">
        {competitionsData?.competitions && (
          <Draggable>
            <AdminTable
              columns={competitionColumns}
              data={competitionsData.competitions}
              frozenId="abbr"
              initialSortId="name"
            />
          </Draggable>
        )}
      </div>
    </div>
  );
};

AdminCompetitionsPage.isAdminPage = true;
export default AdminCompetitionsPage;
