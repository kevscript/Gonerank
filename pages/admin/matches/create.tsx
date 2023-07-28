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
    <div className="px-8 py-16 lg:px-16">
      <h3 className="text-xl">Create match</h3>
      <div className="mt-12">
        <MatchForm
          seasons={seasonsData?.seasons}
          competitions={competitionsData?.competitions}
          clubs={clubsData?.clubs}
          onSubmit={handleMatchCreate}
        />
      </div>
    </div>
  );
};

export default AdminCreateMatch;
