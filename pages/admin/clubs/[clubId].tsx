import ShieldIcon from "@/components/Icons/Shield";
import Input from "@/components/shared/Input";
import { NextCustomPage } from "@/pages/_app";
import { Club } from "@prisma/client";
import {
  useGetClubsQuery,
  useUpdateClubMutation,
} from "graphql/generated/queryTypes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export type EditClubFormInput = {
  name: string;
  abbreviation: string;
  primary: string;
  secondary: string;
};

const AdminClubEditPage: NextCustomPage = () => {
  const { data, loading, error } = useGetClubsQuery();
  const [club, setClub] = useState<Club | null>(null);
  const router = useRouter();
  const { clubId } = router.query;

  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<EditClubFormInput>({
    mode: "all",
  });

  const [updateClub] = useUpdateClubMutation({
    onCompleted: () => router.push("/admin/clubs"),
  });

  const handleUpdateClub: SubmitHandler<EditClubFormInput> = (data) => {
    club && updateClub({ variables: { id: club.id, data: data } });
  };

  useEffect(() => {
    const currClub = data?.clubs.find((c) => c.id === clubId);
    currClub && setClub(currClub);
  }, [data, clubId]);

  useEffect(() => {
    if (club) {
      reset({
        name: club.name,
        abbreviation: club.abbreviation,
        primary: club.primary,
        secondary: club.secondary,
      });
    }
  }, [club, reset]);

  return (
    <div>
      <div className="flex items-end bg-gray-100 h-16 p-4">
        <div className="w-6 h-6 rounded-full overflow-hidden flex justify-center items-end bg-gray-200 mr-2">
          <ShieldIcon className="w-5 h-5 fill-marine-600" />
        </div>
        <h3>Editer Club</h3>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {club && (
        <div className="p-4">
          <form
            onSubmit={handleSubmit(handleUpdateClub)}
            className="flex flex-col w-full"
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

            <div className="flex gap-4 mt-8">
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
                Editer
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

AdminClubEditPage.isAdminPage = true;

export default AdminClubEditPage;
