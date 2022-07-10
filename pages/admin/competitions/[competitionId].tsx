import TrophyIcon from "@/components/Icons/Trophy";
import Input from "@/components/shared/Input";
import { NextCustomPage } from "@/pages/_app";
import { Competition } from "@prisma/client";
import {
  useGetCompetitionsQuery,
  useUpdateCompetitionMutation,
} from "graphql/generated/queryTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export type EditCompetitionFormInput = {
  name: string;
  abbreviation: string;
};

const AdminCompetitionEditPage: NextCustomPage = () => {
  const { data, loading, error } = useGetCompetitionsQuery();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const router = useRouter();
  const { competitionId } = router.query;

  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<EditCompetitionFormInput>({
    mode: "all",
  });

  const handleUpdateCompetition: SubmitHandler<EditCompetitionFormInput> = (
    data
  ) => {
    competition &&
      updateCompetition({ variables: { id: competition.id, data: data } });
  };

  const [updateCompetition] = useUpdateCompetitionMutation({
    onCompleted: () => router.push("/admin/competitions"),
  });

  useEffect(() => {
    const currCompetition = data?.competitions.find(
      (c) => c.id === competitionId
    );
    currCompetition && setCompetition(currCompetition);
  }, [data, competitionId]);

  useEffect(() => {
    competition &&
      reset({ name: competition.name, abbreviation: competition.abbreviation });
  }, [competition, reset]);

  return (
    <div>
      <div className="flex items-end bg-gray-100 h-16 p-4">
        <div className="w-6 h-6 rounded-full overflow-hidden flex justify-center items-end bg-gray-200 mr-2">
          <TrophyIcon className="w-3 h-3 fill-marine-600" />
        </div>
        <h3>Editer Saison</h3>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {competition && (
        <div className="p-4">
          <form
            onSubmit={handleSubmit(handleUpdateCompetition)}
            className="flex flex-col w-full"
          >
            <div className="flex w-full gap-x-4">
              <Input
                label="Name *"
                name="name"
                register={register}
                value={getValues("name")}
                options={{ minLength: { value: 2, message: "2 chars min" } }}
                error={errors.name}
              />

              <Input
                label="Abbr *"
                name="abbreviation"
                register={register}
                value={getValues("abbreviation")}
                options={{ maxLength: { value: 4, message: "4 chars max" } }}
                error={errors.abbreviation}
                containerStyle="w-32"
              />
            </div>

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

AdminCompetitionEditPage.isAdminPage = true;

export default AdminCompetitionEditPage;
