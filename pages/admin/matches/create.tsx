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
      <div className="flex items-end bg-gray-100 h-16 p-4">
        <div className="w-6 h-6 rounded-full overflow-hidden flex justify-center items-center bg-gray-200 mr-2">
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
