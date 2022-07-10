import UserIcon from "@/components/Icons/User";
import Input from "@/components/shared/Input";
import { NextCustomPage } from "@/pages/_app";
import { Player } from "@prisma/client";
import {
  useGetPlayersQuery,
  useUpdatePlayerMutation,
} from "graphql/generated/queryTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import DateInput from "@/components/shared/DateInput";
import Link from "next/link";

export type EditPlayerFormInput = {
  firstName: string;
  lastName: string;
  birthDate: Date;
  country: string;
  countryCode: string;
  image: string;
  active: boolean;
};

const AdminPlayerEditPage: NextCustomPage = () => {
  const { data, loading, error } = useGetPlayersQuery();
  const [player, setPlayer] = useState<Player | null>(null);
  const router = useRouter();
  const { playerId } = router.query;

  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<EditPlayerFormInput>({
    mode: "all",
  });

  const handleUpdatePlayer: SubmitHandler<EditPlayerFormInput> = (data) => {
    player && updatePlayer({ variables: { id: player.id, data: data } });
  };

  const [updatePlayer] = useUpdatePlayerMutation({
    onCompleted: () => router.push("/admin/players"),
  });

  useEffect(() => {
    const currPlayer = data?.players.find((p) => p.id === playerId);
    currPlayer && setPlayer(currPlayer);
  }, [data, playerId]);

  useEffect(() => {
    if (player) {
      reset({
        firstName: player.firstName,
        lastName: player.lastName,
        country: player.country,
        countryCode: player.countryCode,
        birthDate: new Date(player.birthDate),
        active: player.active,
        image: player.image,
      });
    }
  }, [player, reset]);

  return (
    <div>
      <div className="flex items-end bg-gray-100 h-16 p-4">
        <div className="w-6 h-6 rounded-full overflow-hidden flex justify-center items-end bg-gray-200 mr-2">
          <UserIcon className="w-5 h-5 fill-marine-600" />
        </div>
        <h3>Editer Joueur</h3>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {player && (
        <div className="p-4">
          <form
            onSubmit={handleSubmit(handleUpdatePlayer)}
            className="flex flex-col w-full"
          >
            <Input
              name="firstName"
              label="First Name *"
              register={register}
              error={errors.firstName}
              options={{
                required: "champ requis",
                minLength: { value: 2, message: "2 charactères minimum" },
              }}
              value={getValues("firstName")}
            />

            <Input
              name="lastName"
              label="Last Name *"
              register={register}
              error={errors.lastName}
              options={{
                required: "champ requis",
                minLength: { value: 2, message: "2 charactères minimum" },
              }}
              value={getValues("lastName")}
            />

            <div className="flex">
              <Input
                name="country"
                label="Country *"
                register={register}
                error={errors.country}
                options={{
                  required: "champ requis",
                  minLength: { value: 2, message: "2 charactères minimum" },
                }}
                value={getValues("country")}
              />
              <Input
                name="countryCode"
                label="Code *"
                register={register}
                error={errors.countryCode}
                options={{
                  required: "champ requis",
                  minLength: { value: 2, message: "2 chars min" },
                  maxLength: { value: 3, message: "3 chars max" },
                }}
                containerStyle="w-48 ml-4"
                value={getValues("countryCode")}
              />
            </div>

            <DateInput<EditPlayerFormInput>
              label="Birth Date *"
              control={control}
              name="birthDate"
              rules={{ required: "champ requis" }}
              error={errors.birthDate}
              value={getValues("birthDate")}
            />

            <Input
              name="image"
              label="Image Url"
              register={register}
              error={errors.image}
              value={getValues("image")}
            />

            <div className="flex gap-4 mt-8">
              <Link href="/admin/players" passHref>
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

AdminPlayerEditPage.isAdminPage = true;
export default AdminPlayerEditPage;
