import UserIcon from "@/components/Icons/User";
import { NextCustomPage } from "@/pages/_app";
import { useCreatePlayerMutation } from "graphql/generated/queryTypes";
import { useRouter } from "next/router";
import CreatePlayerForm, {
  CreatePlayerFormInput,
} from "@/components/forms/CreatePlayerForm";

const AdminPlayerCreatePage: NextCustomPage = () => {
  const router = useRouter();

  const handlePlayerCreate = (data: CreatePlayerFormInput) => {
    createPlayer({ variables: { data } });
  };

  const [createPlayer] = useCreatePlayerMutation({
    onCompleted: () => router.push("/admin/players"),
    refetchQueries: ["GetPlayers"],
    awaitRefetchQueries: true,
  });

  return (
    <>
      <div className="flex items-end bg-gray-100 h-16 p-4">
        <div className="w-6 h-6 rounded-full overflow-hidden flex justify-center items-end bg-gray-200 mr-2">
          <UserIcon className="w-5 h-5 fill-marine-600" />
        </div>
        <h3>Nouveau Joueur</h3>
      </div>
      <div className="p-4">
        <CreatePlayerForm onSubmit={handlePlayerCreate} />
      </div>
    </>
  );
};

AdminPlayerCreatePage.isAdminPage = true;
export default AdminPlayerCreatePage;
