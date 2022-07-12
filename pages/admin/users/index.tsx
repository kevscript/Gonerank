import UserIcon from "@/components/Icons/User";
import AdminTable from "@/components/shared/AdminTable";
import Draggable from "@/components/shared/Draggable";
import { NextCustomPage } from "@/pages/_app";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useGetUsersQuery } from "graphql/generated/queryTypes";
import Image from "next/image";

const AdminUsersPage: NextCustomPage = () => {
  const { data: usersData, loading, error } = useGetUsersQuery();

  const userColumns: ColumnDef<User>[] = [
    {
      header: "user",
      id: "user",
      cell: ({ row }) => {
        const { image, name } = row.original || {};
        return (
          <div className="flex items-center">
            <div className="w-6 h-6 bg-red-600 flex justify-center items-center rounded-full overflow-hidden">
              {image ? (
                <Image src={image} alt="user" width={24} height={24} />
              ) : (
                <UserIcon className="w-3 h-3 " />
              )}
            </div>

            <span className="ml-2">{name || "user"}</span>
          </div>
        );
      },
    },
    {
      header: "email",
      accessorKey: "email",
      cell: (info) => info.getValue(),
    },
    {
      header: "role",
      accessorKey: "role",
      cell: (info) => info.getValue(),
    },
  ];

  return (
    <div className="p-4">
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error.message}</div>}

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
