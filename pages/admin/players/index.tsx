import { NextCustomPage } from "@/pages/_app";
import { useGetAllPlayersQuery } from "graphql/generated/queryTypes";
import Link from "next/link";

const AdminPlayersPage: NextCustomPage = () => {
  const { data, loading, error } = useGetAllPlayersQuery();

  if (loading) <div>Loading</div>;
  if (error) <div>Error</div>;

  return (
    <div>
      <div className="flex justify-end">
        <Link passHref href="/admin/players/create">
          <a className="px-2 py-1 bg-gray-200 rounded">Nouveau</a>
        </Link>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

AdminPlayersPage.isAdminPage = true;
export default AdminPlayersPage;
