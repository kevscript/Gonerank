import ShieldIcon from "@/components/Icons/Shield";
import Input from "@/components/shared/Input";
import { NextCustomPage } from "@/pages/_app";
import { useCreateClubMutation } from "graphql/generated/queryTypes";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

export type CreateClubFormInput = {
  name: string;
  abbreviation: string;
  primary: string;
  secondary: string;
};

const AdminCreateClubPage: NextCustomPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<CreateClubFormInput>({ mode: "all" });

  const router = useRouter();

  const handleClubCreation: SubmitHandler<CreateClubFormInput> = (data) => {
    createClub({ variables: { data: data } });
  };

  const [createClub] = useCreateClubMutation({
    onCompleted: () => router.push("/admin/clubs"),
    refetchQueries: ["GetClubs"],
  });

  return (
    <>
      <div className="flex items-end bg-gray-100 h-16 p-4">
        <div className="w-6 h-6 rounded-full overflow-hidden flex justify-center items-center bg-gray-200 mr-2">
          <ShieldIcon className="w-3 h-3 fill-marine-600 stroke-marine-600" />
        </div>
        <h3>Nouveau Club</h3>
      </div>
      <div className="p-4">
        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit(handleClubCreation)}
        >
          <div className="flex gap-x-4 mt-4">
            <Input
              name="name"
              label="Name *"
              register={register}
              error={errors.name}
              options={{
                required: "requis",
              }}
              value={getValues("name")}
            />
            <Input
              name="abbreviation"
              label="Abbr *"
              register={register}
              error={errors.abbreviation}
              options={{
                required: "requis",
              }}
              value={getValues("abbreviation")}
              containerStyle="w-32"
            />
          </div>
          <div className="flex gap-x-4 mt-4">
            <Input
              name="primary"
              label="Primary *"
              register={register}
              error={errors.primary}
              options={{
                required: "requis",
              }}
              value={getValues("primary")}
            />
            <Input
              name="secondary"
              label="Secondary *"
              register={register}
              error={errors.secondary}
              options={{
                required: "requis",
              }}
              value={getValues("secondary")}
            />
          </div>

          <div className="flex gap-x-4 mt-4">
            <Link href="/admin/clubs" passHref>
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

AdminCreateClubPage.isAdminPage = true;

export default AdminCreateClubPage;
