import { GetDisplayMatchQuery } from "graphql/generated/queryTypes";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "./shared/Modal";

export type MatchVoterProps = {
  match: GetDisplayMatchQuery["displayMatch"];
  onSubmit: (x: MatchFormInput) => unknown;
};

export type MatchFormInput = {
  [key: string]: number;
};

const MatchVoter = ({ match, onSubmit }: MatchVoterProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { register, handleSubmit, setValue, getValues, reset } =
    useForm<MatchFormInput>({
      mode: "onSubmit",
      defaultValues: useMemo(() => {
        if (match) {
          const defStats: MatchFormInput = {};

          match.stats.forEach((stat) => {
            defStats[stat.playerId] = 5;
          });

          return defStats;
        }
      }, [match]),
    });

  const handleDecrement = (id: string) => {
    const currRating = getValues(id);
    currRating > 1 && setValue(id, currRating - 0.5);
  };

  const handleIncrement = (id: string) => {
    const currRating = getValues(id);
    currRating < 10 && setValue(id, currRating + 0.5);
  };

  const submitHandler = (data: MatchFormInput) => {
    onSubmit(data);
    setModalIsOpen(false);
  };

  return (
    <>
      <form className="mt-4">
        <ul>
          {match.stats.map((player) => (
            <li
              key={player.playerId}
              className="w-full h-10 bg-white rounded border border-gray-100 flex items-center justify-between mt-2 first:mt-0"
            >
              <div className="flex items-center flex-1 w-full">
                <div className="relative w-6 h-6 rounded-full bg-gray-300 ml-2 flex justify-center items-center overflow-hidden">
                  {player.image ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${player.image}`}
                      layout="fill"
                      objectFit="cover"
                      alt={`${player.firstName} ${player.lastName}`}
                    />
                  ) : null}
                </div>
                <span className="ml-2 text-sm whitespace-nowrap">
                  {player.firstName![0] + ". " + player.lastName}
                </span>
              </div>

              <div className="flex h-full items-center">
                <button
                  type="button"
                  className="h-full w-6 bg-marine-50 text-marine-600 flex justify-center items-center font-bold"
                  onClick={() => handleDecrement(player.playerId)}
                >
                  -
                </button>
                <input
                  {...register(`${player.playerId}`, {
                    min: 1,
                    max: 10,
                    valueAsNumber: true,
                  })}
                  className={`w-10 text-center font-num font-bold outline-none border-none text-marine-600`}
                  readOnly={true}
                />
                <button
                  type="button"
                  className="h-full w-6 bg-marine-50 text-marine-600 flex justify-center items-center font-bold"
                  onClick={() => handleIncrement(player.playerId)}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-center">
          <button
            className="py-2 px-4 bg-gray-200 min-w-[80px] rounded-sm"
            type="button"
            onClick={() => reset()}
          >
            Réinitialiser
          </button>
          <button
            type="button"
            className="ml-4 py-2 px-4 bg-gray-200 min-w-[80px] rounded-sm"
            onClick={() => setModalIsOpen(true)}
          >
            Voter
          </button>
        </div>
        <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          <p className="text-sm">
            Veuillez confirmer vos notes, vous ne pourrez plus les modifier :
          </p>
          <ul className="flex mt-4 flex-wrap gap-1">
            {match.stats.map((player) => (
              <li
                key={player.playerId}
                className="whitespace-nowrap flex items-center justify-between bg-gray-100 border border-gray-200 w-48 text-sm h-8"
              >
                <span className="flex-1 ml-2">
                  {player.firstName[0] + ". " + player.lastName}
                </span>
                <span className="w-10 bg-gray-300 flex justify-center items-center h-full font-bold font-num">
                  {getValues(player.playerId)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-end">
            <button
              className="py-2 px-4 bg-gray-200 min-w-[80px] rounded-sm"
              type="button"
              onClick={() => setModalIsOpen(false)}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="ml-4 py-2 px-4 bg-gray-200 min-w-[80px] rounded-sm"
              onClick={handleSubmit(submitHandler)}
            >
              Confirmer
            </button>
          </div>
        </Modal>
      </form>
    </>
  );
};

export default MatchVoter;
