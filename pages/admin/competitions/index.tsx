import AdminTable from "@/components/shared/AdminTable";
import Draggable from "@/components/shared/Draggable";
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
      header: "edit",
      id: "edit",
      cell: ({ row }) => {
        return (
          <Link href={`/admin/competitions/${row.original!.id}`} passHref>
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
            onClick={() => handleCompetitionDelete(row.original!.id)}
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
        <Link passHref href="/admin/competitions/create">
          <a className="px-2 py-1 bg-gray-200 rounded">Ajouter</a>
        </Link>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error.message}</div>}

      {competitionsData?.competitions && (
        <Draggable>
          <AdminTable
            columns={competitionColumns}
            data={competitionsData.competitions}
            frozenId="abbr"
          />
        </Draggable>
      )}
    </div>
  );
};

AdminCompetitionsPage.isAdminPage = true;
export default AdminCompetitionsPage;
