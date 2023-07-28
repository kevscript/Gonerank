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
    <div className="px-8 py-16 lg:px-16">
      <h3 className="text-xl">Create competition</h3>
      <div className="mt-12">
        <CompetitionForm onSubmit={handleCompetitionCreate} />
      </div>
    </div>
  );
};

AdminCreateCompetitionPage.isAdminPage = true;
export default AdminCreateCompetitionPage;
