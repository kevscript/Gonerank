import UserIcon from "@/components/Icons/User";
import { NextCustomPage } from "@/pages/_app";
import { useCreatePlayerMutation } from "graphql/generated/queryTypes";
import { useRouter } from "next/router";
import { PlayerFormInput } from "@/components/forms/PlayerForm";
import PlayerForm from "@/components/forms/NewPlayerForm";

const AdminPlayerCreatePage: NextCustomPage = () => {
  const router = useRouter();

  const handlePlayerCreate = (data: PlayerFormInput) => {
    createPlayer({ variables: { data: data } });
  };

  const [createPlayer] = useCreatePlayerMutation({
    onCompleted: () => router.push("/admin/players"),
    refetchQueries: ["GetPlayers"],
    awaitRefetchQueries: true,
  });

  return (
    <div className="p-8">
      <h1 className="mt-8 text-xl">Create player</h1>
      <div className="mt-16">
        {/* <PlayerForm onSubmit={handlePlayerCreate} /> */}
        <PlayerForm onSubmit={handlePlayerCreate} />
      </div>
    </div>
  );
};

AdminPlayerCreatePage.isAdminPage = true;
export default AdminPlayerCreatePage;
