import CalendarIcon from "@/components/Icons/Calendar";
import { NextCustomPage } from "@/pages/_app";
import { useRouter } from "next/router";
import { useCreateSeasonMutation } from "graphql/generated/queryTypes";
import SeasonForm, { SeasonFormInput } from "@/components/forms/SeasonForm";

const AdminSeasonCreatePage: NextCustomPage = () => {
  const router = useRouter();

  const handleSeasonCreate = (data: SeasonFormInput) => {
    createSeason({ variables: { data } });
  };

  const [createSeason] = useCreateSeasonMutation({
    onCompleted: () => router.push("/admin/seasons"),
    refetchQueries: ["GetSeasons"],
    awaitRefetchQueries: true,
  });

  return (
    <div className="px-8 py-16 lg:px-16">
      <h3 className="text-xl">Create season</h3>
      <div className="mt-12">
        <SeasonForm onSubmit={handleSeasonCreate} />
      </div>
    </div>
  );
};

export default AdminSeasonCreatePage;
