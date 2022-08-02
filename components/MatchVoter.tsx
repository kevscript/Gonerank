import { GetDisplayMatchQuery } from "graphql/generated/queryTypes";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./shared/Button";
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

  console.log(getValues());

  return (
    <>
      <form className="mt-4 lg:mt-8">
        <ul className="flex flex-col gap-2 lg:gap-4 lg:grid grid-cols-2">
          {match?.stats.map((player) => (
            <li
              key={player.playerId}
              className="w-full h-10 lg:h-16 bg-white rounded border border-gray-100 lg:border-none lg:drop-shadow-sm flex items-center justify-between overflow-hidden first:mt-0"
            >
              <div className="flex items-center flex-1 w-full">
                <div className="relative w-6 h-6 lg:w-12 lg:h-12 rounded-full bg-gray-300 ml-2 flex justify-center items-center overflow-hidden">
                  {player.image ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${player.image}`}
                      layout="fill"
                      objectFit="cover"
                      alt={`${player.firstName} ${player.lastName}`}
                    />
                  ) : null}
                </div>
                <span className="ml-2 text-sm lg:text-base lg:font-medium whitespace-nowrap">
                  {player.firstName![0] + ". " + player.lastName}
                </span>
              </div>

              <div className="flex h-full items-center">
                <button
                  type="button"
                  className="h-full w-6 lg:w-10 bg-marine-100 hover:bg-marine-200 text-marine-600 flex justify-center items-center font-bold"
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
                  className={`w-10 lg:w-14 lg:font-black lg:text-lg text-center font-num font-bold outline-none h-full text-marine-600`}
                  readOnly={true}
                />
                <button
                  type="button"
                  className="h-full w-6 lg:w-10 bg-marine-100 hover:bg-marine-200 text-marine-600 flex justify-center items-center font-bold"
                  onClick={() => handleIncrement(player.playerId)}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-center lg:mt-8 gap-x-4">
          <Button label="Réinitialiser" onClick={() => reset()} type="button" />
          <Button
            label="Voter"
            onClick={() => setModalIsOpen(true)}
            type="button"
          />
        </div>
        <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          <p className="text-sm lg:text-base">
            Veuillez confirmer vos notes, vous ne pourrez plus les modifier :
          </p>
          <ul className="flex mt-4 flex-wrap gap-1 lg:gap-2">
            {match?.stats.map((player) => (
              <li
                key={player.playerId}
                className="whitespace-nowrap flex items-center justify-between bg-marine-50 border border-marine-200 w-48 text-sm h-8"
              >
                <span className="flex-1 ml-2">
                  {player.firstName[0] + ". " + player.lastName}
                </span>
                <span className="w-10 bg-marine-500 text-white flex justify-center items-center h-full font-bold font-num">
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
