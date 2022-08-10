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

  return (
    <>
      <form className="mt-4 lg:mt-8">
        <ul className="flex flex-col grid-cols-2 gap-2 md:grid">
          {match?.stats.map((player) => (
            <li
              key={player.playerId}
              className="flex items-center justify-between w-full h-10 overflow-hidden bg-white border border-gray-100 rounded md:h-12 lg:h-16 lg:border-none lg:drop-shadow-sm first:mt-0"
            >
              <div className="flex items-center flex-1 w-full">
                <div className="relative flex items-center justify-center w-6 h-6 ml-2 overflow-hidden bg-gray-300 rounded-full md:w-8 md:h-8 lg:w-12 lg:h-12">
                  {player.image ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${player.image}`}
                      layout="fill"
                      objectFit="cover"
                      alt={`${player.firstName} ${player.lastName}`}
                    />
                  ) : null}
                </div>
                <span className="ml-2 text-sm md:text-base md:font-medium whitespace-nowrap">
                  {player.firstName![0] + ". " + player.lastName}
                </span>
              </div>

              <div className="flex items-center h-full">
                <button
                  type="button"
                  className="flex items-center justify-center w-6 h-full font-bold lg:w-10 bg-marine-100 hover:bg-marine-200 text-marine-600"
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
                  className="flex items-center justify-center w-6 h-full font-bold lg:w-10 bg-marine-100 hover:bg-marine-200 text-marine-600"
                  onClick={() => handleIncrement(player.playerId)}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-4 lg:mt-8 gap-x-4">
          <Button
            label="Réinitialiser"
            onClick={() => reset()}
            type="button"
            variety="secondary"
          />
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
          <ul className="flex flex-wrap gap-1 mt-4 lg:gap-2">
            {match?.stats.map((player) => (
              <li
                key={player.playerId}
                className="flex items-center justify-between w-48 h-8 overflow-hidden text-sm border rounded whitespace-nowrap bg-marine-50 border-marine-200"
              >
                <span className="flex-1 ml-2">
                  {player.firstName[0] + ". " + player.lastName}
                </span>
                <span className="flex items-center justify-center w-10 h-full font-bold text-white bg-marine-500 font-num">
                  {getValues(player.playerId)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-end mt-8 gap-x-2">
            <Button
              label="Annuler"
              variety="secondary"
              onClick={() => setModalIsOpen(false)}
              type="button"
            />
            <Button
              label="Confirmer"
              onClick={handleSubmit(submitHandler)}
              type="submit"
            />
          </div>
        </Modal>
      </form>
    </>
  );
};

export default MatchVoter;
