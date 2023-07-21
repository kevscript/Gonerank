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
    <div className="px-8 py-16 lg:px-16">
      <h3 className="text-xl">Create player</h3>
      <div className="mt-12">
        <PlayerForm onSubmit={handlePlayerCreate} />
      </div>
    </div>
  );
};

AdminPlayerCreatePage.isAdminPage = true;
export default AdminPlayerCreatePage;
