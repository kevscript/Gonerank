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
import Spinner from "@/components/shared/Spinner";

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
    <div className="px-8 py-16 lg:px-16">
      <h3 className="text-xl">
        Edit season{" "}
        {season &&
          new Date(season.startDate).getFullYear() +
            "/" +
            (new Date(season.startDate).getFullYear() + 1)}{" "}
      </h3>
      <div className="mt-12">
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
    </div>
  );
};

AdminSeasonEditPage.isAdminPage = true;
export default AdminSeasonEditPage;
