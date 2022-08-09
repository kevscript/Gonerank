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
      <div className="flex items-end h-16 p-4 bg-gray-100 dark:bg-slate-900">
        <div className="flex items-center justify-center w-6 h-6 mr-2 overflow-hidden bg-gray-200 rounded-full">
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
