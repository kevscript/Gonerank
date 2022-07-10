import CalendarIcon from "@/components/Icons/Calendar";
import { NextCustomPage } from "@/pages/_app";
import { Season } from "@prisma/client";
import {
  useGetSeasonsQuery,
  useUpdateSeasonMutation,
} from "graphql/generated/queryTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateInput from "@/components/shared/DateInput";

export type EditSeasonFormInput = {
  startDate: Date;
};

const AdminSeasonEditPage: NextCustomPage = () => {
  const { data, loading, error } = useGetSeasonsQuery();
  const [season, setSeason] = useState<Season | null>(null);
  const router = useRouter();
  const { seasonId } = router.query;

  const {
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<EditSeasonFormInput>({
    mode: "all",
  });

  const handleUpdateSeason: SubmitHandler<EditSeasonFormInput> = (data) => {
    season && updateSeason({ variables: { id: season.id, data: data } });
  };

  const [updateSeason] = useUpdateSeasonMutation({
    onCompleted: () => router.push("/admin/seasons"),
  });

  useEffect(() => {
    const currSeason = data?.seasons.find((s) => s.id === seasonId);
    currSeason && setSeason(currSeason);
  }, [data, seasonId]);

  useEffect(() => {
    season && reset({ startDate: new Date(season.startDate) });
  }, [season, reset]);

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
          <form
            onSubmit={handleSubmit(handleUpdateSeason)}
            className="flex flex-col w-full"
          >
            <DateInput<EditSeasonFormInput>
              label="Start Date *"
              control={control}
              name="startDate"
              rules={{ required: "champ requis" }}
              error={errors.startDate}
              value={getValues("startDate")}
            />

            <div className="flex gap-4 mt-8">
              <button className="px-2 py-1 bg-gray-200 rounded">Annuler</button>
              <button
                type="submit"
                className="px-2 py-1 bg-gray-200 rounded"
                disabled={!isDirty || !isValid}
              >
                Editer
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

AdminSeasonEditPage.isAdminPage = true;

export default AdminSeasonEditPage;
