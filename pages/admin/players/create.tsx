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
    <>
      <div className="flex items-end h-16 p-4 bg-gray-100 dark:bg-dark-400">
        <div className="flex items-end justify-center w-6 h-6 mr-2 overflow-hidden bg-gray-200 rounded-full">
          <UserIcon className="w-5 h-5 fill-marine-600" />
        </div>
        <h3>Nouveau Joueur</h3>
      </div>
      <div className="p-4">
        {/* <PlayerForm onSubmit={handlePlayerCreate} /> */}
        <PlayerForm />
      </div>
    </>
  );
};

AdminPlayerCreatePage.isAdminPage = true;
export default AdminPlayerCreatePage;
