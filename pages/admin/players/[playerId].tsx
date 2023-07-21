import UserIcon from "@/components/Icons/User";
import { NextCustomPage } from "@/pages/_app";
import { Player } from "@prisma/client";
import {
  useGetPlayersQuery,
  useUpdatePlayerMutation,
} from "graphql/generated/queryTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PlayerForm, { PlayerFormInput } from "@/components/forms/NewPlayerForm";

const AdminPlayerEditPage: NextCustomPage = () => {
  const { data, loading, error } = useGetPlayersQuery();
  const [player, setPlayer] = useState<Player | null>(null);
  const router = useRouter();
  const { playerId } = router.query;

  const handleUpdatePlayer = (data: PlayerFormInput) => {
    player && updatePlayer({ variables: { id: player.id, data: data } });
  };

  const [updatePlayer] = useUpdatePlayerMutation({
    onCompleted: () => router.push("/admin/players"),
  });

  useEffect(() => {
    const currPlayer = data?.players.find((p) => p.id === playerId);
    currPlayer && setPlayer(currPlayer);
  }, [data, playerId]);

  return (
    <div className="px-8 py-16 lg:px-16">
      <h3 className="text-xl">
        {player?.firstName} {player?.lastName}
      </h3>

      <div className="mt-12">
        {loading && <div>Loading...</div>}
        {error && <div>{error.message}</div>}
        {player && (
          <PlayerForm
            onSubmit={handleUpdatePlayer}
            defaultValues={{
              firstName: player.firstName,
              lastName: player.lastName,
              country: player.country,
              countryCode: player.countryCode,
              birthDate: new Date(player.birthDate),
              image: player.image,
            }}
          />
        )}
      </div>
    </div>
  );
};

AdminPlayerEditPage.isAdminPage = true;
export default AdminPlayerEditPage;
