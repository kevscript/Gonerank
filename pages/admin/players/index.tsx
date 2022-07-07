import { NextCustomPage } from "@/pages/_app";
import Link from "next/link";

const AdminPlayersPage: NextCustomPage = () => {
  return (
    <div>
      <div className="flex justify-end">
        <Link passHref href="/admin/players/create">
          <a className="px-2 py-1 bg-gray-200 rounded">Nouveau</a>
        </Link>
      </div>
    </div>
  );
};

AdminPlayersPage.isAdminPage = true;
export default AdminPlayersPage;
