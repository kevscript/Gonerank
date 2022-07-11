import CompetitionForm, {
  CompetitionFormInput,
} from "@/components/forms/CompetitionForm";
import TrophyIcon from "@/components/Icons/Trophy";
import { NextCustomPage } from "@/pages/_app";
import { useCreateCompetitionMutation } from "graphql/generated/queryTypes";
import { useRouter } from "next/router";

const AdminCreateCompetitionPage: NextCustomPage = () => {
  const router = useRouter();

  const handleCompetitionCreate = (data: CompetitionFormInput) => {
    createCompetition({ variables: { data } });
  };

  const [createCompetition] = useCreateCompetitionMutation({
    onCompleted: () => router.push("/admin/competitions"),
    refetchQueries: ["GetCompetitions"],
    awaitRefetchQueries: true,
  });

  return (
    <>
      <div className="flex items-end bg-gray-100 h-16 p-4">
        <div className="w-6 h-6 rounded-full overflow-hidden flex justify-center items-center bg-gray-200 mr-2">
          <TrophyIcon className="w-3 h-3 fill-marine-600 stroke-marine-600" />
        </div>
        <h3>Nouvelle Compétition</h3>
      </div>
      <div className="p-4">
        <CompetitionForm onSubmit={handleCompetitionCreate} />
      </div>
    </>
  );
};

AdminCreateCompetitionPage.isAdminPage = true;
export default AdminCreateCompetitionPage;
