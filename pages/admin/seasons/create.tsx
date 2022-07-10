import CalendarIcon from "@/components/Icons/Calendar";
import { NextCustomPage } from "@/pages/_app";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import { useCreateSeasonMutation } from "graphql/generated/queryTypes";
import Link from "next/link";

type CreateSeasonFormInput = {
  startDate: Date;
};

const AdminSeasonCreatePage: NextCustomPage = () => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<CreateSeasonFormInput>({ mode: "all" });

  const router = useRouter();

  const handleSeasonUpdate: SubmitHandler<CreateSeasonFormInput> = (data) => {
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
        <form
          onSubmit={handleSubmit(handleSeasonUpdate)}
          className="flex flex-col w-full"
        >
          <Controller
            control={control}
            name="startDate"
            rules={{ required: "champ requis" }}
            render={({ field }) => (
              <label className="flex flex-col mt-4 w-32">
                <span className="ml-2 text-sm">Start Date *</span>
                <DatePicker
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                  dateFormat="dd/MM/yyyy"
                  className={`h-10 px-2 bg-white border text-base rounded mt-1 w-full font-num ${
                    errors.startDate
                      ? "border-red-400 outline-red-600"
                      : getValues("startDate")
                      ? "border-marine-400 outline-marine-600 bg-marine-50"
                      : "border-gray-200 outline-marine-600"
                  }`}
                  popperPlacement="bottom-start"
                  showPopperArrow={false}
                />
                <div className="min-h-[20px] w-full">
                  {errors.startDate && (
                    <span className="block text-sm ml-2 text-red-500">
                      {errors.startDate.message}
                    </span>
                  )}
                </div>
              </label>
            )}
          />
          <div className="flex gap-4 mt-8">
            <Link href="/admin/seasons" passHref>
              <button type="button" className="px-2 py-1 bg-gray-200 rounded">
                Annuler
              </button>
            </Link>

            <button
              type="submit"
              className="px-2 py-1 bg-gray-200 rounded"
              disabled={!isDirty || !isValid}
            >
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSeasonCreatePage;
