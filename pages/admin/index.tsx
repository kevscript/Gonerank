import Head from "next/head";
import { NextCustomPage } from "../_app";

const AdminPage: NextCustomPage = () => {
  return (
    <div>
      <Head>
        <title>Gonerank - Admin</title>
        <meta name="description" content="Admin page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Admin Page
    </div>
  );
};

AdminPage.isAdminPage = true;

export default AdminPage;
