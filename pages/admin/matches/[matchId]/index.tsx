import MatchForm, { MatchFormInput } from "@/components/forms/MatchForm";
import MatchIcon from "@/components/Icons/Match";
import Spinner from "@/components/shared/Spinner";
import { NextCustomPage } from "@/pages/_app";
import { Match } from "@prisma/client";
import {
  useGetClubsQuery,
  useGetCompetitionsQuery,
  useGetMatchesQuery,
  useGetSeasonsQuery,
  useUpdateMatchMutation,
} from "graphql/generated/queryTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AdminMatchEditPage: NextCustomPage = () => {
  const { data, loading, error } = useGetMatchesQuery();
  const [match, setMatch] = useState<Match | null>(null);
  const router = useRouter();
  const { matchId } = router.query;

  const { data: seasonsData } = useGetSeasonsQuery();
  const { data: competitionsData } = useGetCompetitionsQuery();
  const { data: clubsData } = useGetClubsQuery();

  const [updateMatch] = useUpdateMatchMutation({
    onCompleted: () => router.push("/admin/matches"),
  });

  const handleUpdateMatch = (data: MatchFormInput) => {
    match &&
      updateMatch({
        variables: {
          id: match.id,
          data: {
            competitionId: data.competitionId,
            seasonId: data.seasonId,
            opponentId: data.opponentId,
            scored: data.scored,
            conceeded: data.conceeded,
            home: data.home === "home" ? true : false,
            date: data.date,
          },
        },
      });
  };

  useEffect(() => {
    const currMatch = data?.matches.find((m) => m.id === matchId);
    currMatch && setMatch(currMatch);
  }, [data, matchId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600">{error.message}</div>;
  }

  return (
    <div>
      <div className="flex items-end h-16 p-4 bg-gray-100 dark:bg-dark-400">
        <div className="flex items-center justify-center w-6 h-6 mr-2 overflow-hidden bg-gray-200 rounded-full">
          <MatchIcon className="w-3 h-3 fill-marine-600" />
        </div>
        <h3>Editer Match</h3>
      </div>
      <div className="p-4">
        {match && (
          <MatchForm
            onSubmit={handleUpdateMatch}
            seasons={seasonsData?.seasons}
            competitions={competitionsData?.competitions}
            clubs={clubsData?.clubs}
            defaultValues={{
              date: new Date(match.date),
              seasonId: match.seasonId,
              competitionId: match.competitionId,
              opponentId: match.opponentId,
              home: match.home ? "home" : "away",
              scored: match.scored,
              conceeded: match.conceeded,
            }}
          />
        )}
      </div>
    </div>
  );
};

AdminMatchEditPage.isAdminPage = true;

export default AdminMatchEditPage;
