import CalendarIcon from "@/components/Icons/Calendar";
import { NextCustomPage } from "@/pages/_app";
import { Season } from "@prisma/client";
import {
  useGetSeasonsQuery,
  useUpdateSeasonMutation,
} from "graphql/generated/queryTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SeasonForm, { SeasonFormInput } from "@/components/forms/SeasonForm";

const AdminSeasonEditPage: NextCustomPage = () => {
  const { data, loading, error } = useGetSeasonsQuery();
  const [season, setSeason] = useState<Season | null>(null);
  const router = useRouter();
  const { seasonId } = router.query;

  const handleUpdateSeason = (data: SeasonFormInput) => {
    season && updateSeason({ variables: { id: season.id, data: data } });
  };

  const [updateSeason] = useUpdateSeasonMutation({
    onCompleted: () => router.push("/admin/seasons"),
  });

  useEffect(() => {
    const currSeason = data?.seasons.find((s) => s.id === seasonId);
    currSeason && setSeason(currSeason);
  }, [data, seasonId]);

  return (
    <div>
      <div className="flex items-end bg-gray-100 h-16 p-4">
        <div className="w-6 h-6 rounded-full overflow-hidden flex justify-center items-end bg-gray-200 mr-2">
          <CalendarIcon className="w-3 h-3 fill-marine-600" />
        </div>
        <h3>Editer Saison</h3>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {season && (
        <div className="p-4">
          <SeasonForm
            onSubmit={handleUpdateSeason}
            defaultValues={{
              startDate: new Date(season.startDate),
            }}
          />
        </div>
      )}
    </div>
  );
};

AdminSeasonEditPage.isAdminPage = true;
export default AdminSeasonEditPage;
