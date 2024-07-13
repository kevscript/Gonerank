import EditIcon from "@/components/Icons/Edit";
import AdminTable from "@/components/tables/AdminTable";
import Image from "next/image";
import Button from "@/components/shared/Button";
import Draggable from "@/components/shared/Draggable";
import Spinner from "@/components/shared/Spinner";
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
import ClubIcon from "@/components/Icons/Club";
import { SUPABASE } from "@/utils/constants";

const AdminClubsPage: NextCustomPage = () => {
  const { data, loading, error } = useGetClubsQuery();

  const [deleteClub] = useDeleteClubMutation({
    update: (cache, { data }) => {
      const { clubs } =
        cache.readQuery<GetClubsQuery>({ query: GET_CLUBS }) || {};
      clubs &&
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
      header: () => {
        return (
          <TableCell header opaque>
            <div className="relative flex items-center justify-center w-4 h-4 ml-2 overflow-hidden bg-gray-200 rounded-full dark:bg-dark-300">
              <ClubIcon
                className="dark:bg-gray-300"
                primary="#fff"
                secondary="#000"
              />
            </div>
          </TableCell>
        );
      },
      id: "club",
      accessorFn: (club) => club.logo,
      cell: ({ row }) => {
        const { logo, primary, secondary } = row.original || {};
        return (
          <TableCell className="flex justify-center flex-nowrap" opaque>
            <div className="relative flex items-center justify-center w-6 h-6 overflow-hidden rounded-full">
              {logo ? (
                <Image
                  src={`${SUPABASE.FULL_LOGOS_BUCKET_PATH}/${logo}`}
                  layout="fill"
                  objectFit="cover"
                  alt="player"
                />
              ) : (
                <ClubIcon
                  className="dark:bg-gray-300"
                  primary={primary || "#000"}
                  secondary={secondary || "#fff"}
                />
              )}
            </div>
          </TableCell>
        );
      },
      size: 50,
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
        <TableCell className="flex justify-center text-sm" opaque header>
          <span>abbr</span>
        </TableCell>
      ),
      id: "abbr",
      accessorKey: "abbreviation",
      cell: (info) => (
        <TableCell opaque className="flex justify-center">
          <span>{info.getValue()}</span>
        </TableCell>
      ),
      size: 100,
    },
    {
      header: () => (
        <TableCell className="justify-center text-sm">
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
              className={`w-full h-full flex justify-center items-center px-1 drop-shadow cursor-pointer`}
              style={{ backgroundColor: primary }}
              onClick={() => primary && navigator.clipboard.writeText(primary)}
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
        <TableCell className="justify-center text-sm">
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
              className={`w-full h-full flex justify-center items-center px-1 drop-shadow cursor-pointer`}
              style={{ backgroundColor: secondary }}
              onClick={() =>
                secondary && navigator.clipboard.writeText(secondary)
              }
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
        <TableCell className="justify-center text-sm">
          <span className="text-sm">edit</span>
        </TableCell>
      ),
      id: "edit",
      cell: ({ row }) => {
        return (
          <Link href={`/admin/clubs/${row.original!.id}`} passHref>
            <div className="justify-center w-full h-full cursor-pointer bg-marine-100 dark:bg-marine-600/20 group hover:bg-marine-400 dark:hover:bg-marine-600/40">
              <TableCell className="justify-center">
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
        <TableCell className="justify-center text-sm">
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
              validation={name}
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
        <Link passHref href="/admin/clubs/create">
          <div>
            <Button label="Ajouter" />
          </div>
        </Link>
      </div>
      <div className="py-4">
        {data?.clubs && (
          <Draggable>
            <AdminTable
              columns={clubColumns}
              data={data.clubs}
              frozenId="abbr"
              initialSortId="name"
            />
          </Draggable>
        )}
      </div>
    </div>
  );
};

AdminClubsPage.isAdminPage = true;

export default AdminClubsPage;
