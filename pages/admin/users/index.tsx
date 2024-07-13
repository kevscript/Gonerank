import UserIcon from "@/components/Icons/User";
import AdminTable from "@/components/tables/AdminTable";
import Draggable from "@/components/shared/Draggable";
import Spinner from "@/components/shared/Spinner";
import TableCell from "@/components/shared/TableCell";
import { NextCustomPage } from "@/pages/_app";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useGetUsersQuery } from "graphql/generated/queryTypes";
import Image from "next/image";

const AdminUsersPage: NextCustomPage = () => {
  const { data: usersData, loading, error } = useGetUsersQuery();

  const userColumns: ColumnDef<User>[] = [
    {
      header: () => (
        <TableCell opaque header>
          <span className="text-sm">user</span>
        </TableCell>
      ),
      id: "user",
      cell: ({ row }) => {
        const { image, name } = row.original || {};
        return (
          <TableCell opaque>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-6 h-6 overflow-hidden bg-red-600 rounded-full">
                {image ? (
                  <Image src={image} alt="user" width={24} height={24} />
                ) : (
                  <UserIcon className="w-3 h-3 " />
                )}
              </div>

              <span className="ml-2">{name || "user"}</span>
            </div>
          </TableCell>
        );
      },
    },
    {
      header: () => (
        <TableCell>
          <span className="text-sm dark:text-gray-300">email</span>
        </TableCell>
      ),
      accessorKey: "email",
      cell: (info) => (
        <TableCell>
          <span className="text-sm">{info.getValue()}</span>
        </TableCell>
      ),
    },
    {
      header: () => (
        <TableCell>
          <span className="text-sm dark:text-gray-300">role</span>
        </TableCell>
      ),
      accessorKey: "role",
      cell: (info) => (
        <TableCell>
          <span>{info.getValue()}</span>
        </TableCell>
      ),
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
      {usersData?.users && (
        <Draggable>
          <AdminTable columns={userColumns} data={usersData.users} />
        </Draggable>
      )}
    </div>
  );
};

AdminUsersPage.isAdminPage = true;
export default AdminUsersPage;
