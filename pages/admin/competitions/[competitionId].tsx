import CompetitionForm, {
  CompetitionFormInput,
} from "@/components/forms/CompetitionForm";
import TrophyIcon from "@/components/Icons/Trophy";
import { NextCustomPage } from "@/pages/_app";
import { Competition } from "@prisma/client";
import {
  useGetCompetitionsQuery,
  useUpdateCompetitionMutation,
} from "graphql/generated/queryTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type EditCompetitionFormInput = {
  name: string;
  abbreviation: string;
};

const AdminCompetitionEditPage: NextCustomPage = () => {
  const { data, loading, error } = useGetCompetitionsQuery();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const router = useRouter();
  const { competitionId } = router.query;

  const handleUpdateCompetition = (data: CompetitionFormInput) => {
    competition &&
      updateCompetition({ variables: { id: competition.id, data: data } });
  };

  const [updateCompetition] = useUpdateCompetitionMutation({
    onCompleted: () => router.push("/admin/competitions"),
  });

  useEffect(() => {
    const currCompetition = data?.competitions.find(
      (c) => c.id === competitionId
    );
    currCompetition && setCompetition(currCompetition);
  }, [data, competitionId]);

  return (
    <div>
      <div className="flex items-end bg-gray-100 h-16 p-4">
        <div className="w-6 h-6 rounded-full overflow-hidden flex justify-center items-end bg-gray-200 mr-2">
          <TrophyIcon className="w-3 h-3 fill-marine-600" />
        </div>
        <h3>Editer Saison</h3>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {competition && (
        <div className="p-4">
          <CompetitionForm
            onSubmit={handleUpdateCompetition}
            defaultValues={{
              name: competition.name,
              abbreviation: competition.abbreviation,
            }}
          />
        </div>
      )}
    </div>
  );
};

AdminCompetitionEditPage.isAdminPage = true;

export default AdminCompetitionEditPage;
