import CloseIcon from "@/components/Icons/Close";
import PlayerIcon from "@/components/Icons/Player";
import Button from "@/components/shared/Button";
import Modal from "@/components/shared/Modal";
import Spinner from "@/components/shared/Spinner";
import { NextCustomPage } from "@/pages/_app";
import {
  GetPlayersQuery,
  useGetPlayersQuery,
  useGetSeasonLazyQuery,
  useUpdateSeasonPlayersMutation,
} from "graphql/generated/queryTypes";
import { GET_SEASON } from "graphql/queries/season";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AdminSeasonSquadPage: NextCustomPage = () => {
  const [initialSquad, setInitialSquad] = useState<
    GetPlayersQuery["players"] | null
  >(null);
  const [squad, setSquad] = useState<GetPlayersQuery["players"] | null>(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const router = useRouter();
  const { seasonId } = router.query;

  const [
    getSeason,
    { data: seasonData, loading: seasonLoading, error: seasonError },
  ] = useGetSeasonLazyQuery();

  const {
    data: playersData,
    loading: playersLoading,
    error: playersError,
  } = useGetPlayersQuery();

  const [updateSeasonPlayers] = useUpdateSeasonPlayersMutation({
    refetchQueries: [
      { query: GET_SEASON, variables: { id: seasonId as string } },
    ],
    awaitRefetchQueries: true,
  });

  useEffect(() => {
    seasonId && getSeason({ variables: { id: seasonId as string } });
  }, [seasonId, getSeason]);

  useEffect(() => {
    if (seasonData && playersData) {
      const currSquad = seasonData.season.players.map((sp) => {
        const player = playersData.players.find((p) => p.id === sp.playerId)!;
        return player;
      });

      currSquad && setSquad(currSquad);
      currSquad && setInitialSquad(currSquad);
    }
  }, [seasonData, playersData]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (playersData && squad) {
      const selectedPlayerId = e.target.value;
      if (selectedPlayerId === "empty") return;
      const newSquad = [...squad];
      const playerToAdd = playersData.players.find(
        (p) => p.id === selectedPlayerId
      );
      if (playerToAdd) {
        newSquad.push(playerToAdd);
        setSquad(newSquad);
      }
    }
  };

  const handleRemove = (id: string) => {
    if (squad) {
      const newSquad = squad.filter((p) => p.id !== id);
      setSquad(newSquad);
    }
  };

  const handleConfirm = () => {
    if (squad) {
      const playerIds = squad?.map((p) => p.id);
      updateSeasonPlayers({
        variables: { seasonId: seasonId as string, playerIds: playerIds },
      });
      setModalIsOpen(false);
      router.push("/admin/seasons");
    }
  };

  if (playersLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (playersError) {
    return <div className="text-red-600">{playersError.message}</div>;
  }

  return (
    <>
      <div className="flex items-end bg-gray-100 h-16 p-4 gap-x-2">
        <div className="w-6 h-6 rounded-full overflow-hidden flex justify-center items-center bg-gray-200 mr-2">
          <PlayerIcon className="w-3 h-3 fill-marine-600" />
        </div>
        {seasonData && (
          <span>
            Season Players {new Date(seasonData.season.startDate).getFullYear()}
            /{new Date(seasonData.season.startDate).getFullYear() + 1}
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="">
          <label>
            <select onChange={handleSelect} className="w-full h-10 px-2">
              <option value="empty">-- select a player --</option>
              {squad &&
                playersData &&
                playersData.players
                  .filter((player) => !squad.some((p) => p.id === player.id))
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.firstName + " " + p.lastName}
                    </option>
                  ))}
            </select>
          </label>
        </div>
        <ul className="flex flex-col flex-nowrap gap-y-1 mt-4 lg:flex-row lg:flex-wrap lg:gap-2">
          {squad &&
            squad.map((p) => (
              <li
                key={p.id}
                className="relative p-2 w-full bg-white border border-gray-100 flex items-center justify-between flex-nowrap lg:max-w-xs"
              >
                <span>{p.firstName + " " + p.lastName}</span>
                <div
                  className="w-4 h-4 flex justify-center items-center"
                  onClick={() => handleRemove(p.id)}
                >
                  <CloseIcon className="w-3 h-3" />
                </div>
              </li>
            ))}
        </ul>

        <div className="w-full flex justify-end gap-x-2 mt-4">
          <Button
            label="Annuler"
            onClick={() => router.push("/admin/seasons")}
          />
          <Button label="Soumettre" onClick={() => setModalIsOpen(true)} />
        </div>
        <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          <>
            <div className="w-full">
              <span>Current Squad :</span>
            </div>
            <div className="mt-4">
              <ul className="text-sm flex flex-wrap gap-1">
                {initialSquad &&
                  squad &&
                  squad.map((p) => {
                    const alreadyExisted = initialSquad.some(
                      (player) => player.id === p.id
                    );
                    if (alreadyExisted) {
                      return (
                        <li
                          key={p.id}
                          className="w-48 bg-gray-50 border border-gray-200 p-1 flex flex-nowrap"
                        >
                          <div className="w-4 h-full flex justify-center items-center">
                            =
                          </div>
                          <span className="flex-1 ml-2">
                            {p.firstName[0] + ". " + p.lastName}
                          </span>
                        </li>
                      );
                    } else {
                      return (
                        <li
                          key={p.id}
                          className="w-48 bg-marine-50 p-1 border border-marine-300 text-marine-900 flex flex-nowrap"
                        >
                          <div className="w-4 h-full flex justify-center items-center">
                            +
                          </div>
                          <span className="flex-1 ml-2">
                            {p.firstName[0] + ". " + p.lastName}
                          </span>
                        </li>
                      );
                    }
                  })}
                {initialSquad &&
                  squad &&
                  initialSquad
                    .filter((p) => !squad.some((player) => player.id === p.id))
                    .map((p) => (
                      <li
                        key={p.id}
                        className="w-48 bg-red-100 p-1 border border-red-300 text-red-900 flex flex-nowrap"
                      >
                        <div className="w-4 h-full flex justify-center items-center">
                          -
                        </div>
                        <span className="flex-1 ml-2">
                          {p.firstName[0] + ". " + p.lastName}
                        </span>
                      </li>
                    ))}
              </ul>
            </div>
            <div className="w-full flex justify-end flex-nowrap gap-x-2 mt-4">
              <Button label="Annuler" onClick={() => setModalIsOpen(false)} />
              <Button label="Confirmer" onClick={handleConfirm} />
            </div>
          </>
        </Modal>
      </div>
    </>
  );
};

AdminSeasonSquadPage.isAdminPage = true;
export default AdminSeasonSquadPage;
