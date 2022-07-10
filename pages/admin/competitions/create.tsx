import TrophyIcon from "@/components/Icons/Trophy";
import Input from "@/components/shared/Input";
import { NextCustomPage } from "@/pages/_app";
import { useCreateCompetitionMutation } from "graphql/generated/queryTypes";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

type CreateCompetitionFormInput = {
  name: string;
  abbreviation: string;
};

const AdminCreateCompetitionPage: NextCustomPage = () => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<CreateCompetitionFormInput>({ mode: "all" });

  const router = useRouter();

  const handleCompetitionCreate: SubmitHandler<CreateCompetitionFormInput> = (
    data
  ) => {
    createCompetition({ variables: { data } });
  };

  const [createCompetition] = useCreateCompetitionMutation({
    onCompleted: () => router.push("/admin/competitions"),
    refetchQueries: ["GetCompetitions"],
  });

  return (
    <>
      <div className="flex items-end bg-gray-100 h-16 p-4">
        <div className="w-6 h-6 rounded-full overflow-hidden flex justify-center items-center bg-gray-200 mr-2">
          <TrophyIcon className="w-3 h-3 fill-marine-600 stroke-marine-600" />
        </div>
        <h3>Nouvelle Compétition</h3>
      </div>
      <div className="p-4">
        <form
          onSubmit={handleSubmit(handleCompetitionCreate)}
          className="flex flex-col w-full"
        >
          <div className="flex w-full gap-x-4">
            <Input
              name="name"
              label="Name *"
              register={register}
              error={errors.name}
              options={{
                required: "requis",
              }}
              value={getValues("name")}
              containerStyle="flex-1"
            />

            <Input
              name="abbreviation"
              label="Abbrev *"
              register={register}
              error={errors.abbreviation}
              options={{
                required: "requis",
                maxLength: { value: 4, message: "4 chars max" },
              }}
              value={getValues("abbreviation")}
              containerStyle="w-24"
            />
          </div>

          <div className="flex gap-x-4 mt-4">
            <Link href="/admin/competitions" passHref>
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
    </>
  );
};

AdminCreateCompetitionPage.isAdminPage = true;

export default AdminCreateCompetitionPage;
