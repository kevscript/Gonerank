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
    <div>
      <div className="flex items-end h-16 p-4 bg-gray-100">
        <div className="flex items-center justify-center w-6 h-6 mr-2 overflow-hidden bg-gray-200 rounded-full">
          <CalendarIcon className="w-3 h-3 fill-marine-600" />
        </div>
        <h3>Nouvelle Saison</h3>
      </div>
      <div className="p-4">
        <SeasonForm onSubmit={handleSeasonCreate} />
      </div>
    </div>
  );
};

export default AdminSeasonCreatePage;
