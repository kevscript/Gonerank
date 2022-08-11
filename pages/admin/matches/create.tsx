import MatchIcon from "@/components/Icons/Match";
import { NextCustomPage } from "@/pages/_app";
import {
  useCreateMatchMutation,
  useGetClubsQuery,
  useGetCompetitionsQuery,
  useGetSeasonsQuery,
} from "graphql/generated/queryTypes";
import { useRouter } from "next/router";
import MatchForm, { MatchFormInput } from "@/components/forms/MatchForm";
import { GET_MATCHES } from "graphql/queries/match";

const AdminCreateMatch: NextCustomPage = () => {
  const { data: seasonsData } = useGetSeasonsQuery();
  const { data: competitionsData } = useGetCompetitionsQuery();
  const { data: clubsData } = useGetClubsQuery();

  const router = useRouter();

  const handleMatchCreate = (data: MatchFormInput) => {
    createMatch({
      variables: {
        data: { ...data, home: data.home === "home" ? true : false },
      },
    });
  };

  const [createMatch] = useCreateMatchMutation({
    onCompleted: () => router.push("/admin/matches"),
    refetchQueries: [{ query: GET_MATCHES }],
    awaitRefetchQueries: true,
  });

  return (
    <>
      <div className="flex items-end h-16 p-4 bg-gray-100 dark:bg-dark-400">
        <div className="flex items-center justify-center w-6 h-6 mr-2 overflow-hidden bg-gray-200 rounded-full">
          <MatchIcon className="w-3 h-3 fill-marine-600" />
        </div>
        <h3>Nouveau Match</h3>
      </div>
      <div className="p-4">
        <MatchForm
          seasons={seasonsData?.seasons}
          competitions={competitionsData?.competitions}
          clubs={clubsData?.clubs}
          onSubmit={handleMatchCreate}
        />
      </div>
    </>
  );
};

export default AdminCreateMatch;
