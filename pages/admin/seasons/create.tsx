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
  });

  return (
    <div>
      <div className="flex items-end bg-gray-100 h-16 p-4">
        <div className="w-6 h-6 rounded-full overflow-hidden flex justify-center items-center bg-gray-200 mr-2">
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
