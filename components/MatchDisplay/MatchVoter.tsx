import { percentageToColor } from "@/utils/percentageToColor";
import { GetDisplayMatchQuery } from "graphql/generated/queryTypes";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../shared/Button";
import Modal from "../shared/Modal";
import { SUPABASE } from "@/utils/constants";

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
          {match &&
            [...match.stats]
              .sort((a, b) => (a.lastName > b.lastName ? 1 : -1))
              .map((player) => (
                <li
                  key={player.playerId}
                  className="flex items-center justify-between w-full h-10 overflow-hidden bg-white border border-gray-100 rounded dark:bg-dark-500 dark:border-dark-400 md:h-12 xl:h-16 xl:border-none xl:drop-shadow-sm first:mt-0"
                >
                  <div className="flex items-center flex-1 w-full">
                    <div className="relative flex items-center justify-center w-6 h-6 ml-2 overflow-hidden bg-gray-300 rounded-full dark:bg-dark-600 md:w-8 md:h-8 xl:w-12 xl:h-12">
                      {player.image ? (
                        <Image
                          src={`${SUPABASE.FULL_AVATARS_BUCKET_PATH}/${player.image}`}
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
                      className="flex items-center justify-center w-6 h-full font-bold lg:w-8 xl:w-10 bg-marine-100 hover:bg-marine-200 text-marine-600 dark:bg-dark-400 dark:hover:bg-dark-300 dark:text-marine-400"
                      onClick={() => handleDecrement(player.playerId)}
                      data-testid={`decrement-${player.playerId}`}
                    >
                      -
                    </button>
                    <label
                      className="sr-only"
                      htmlFor={`${player.playerId}`}
                    >{`${player.firstName} ${player.lastName}`}</label>
                    <input
                      {...register(`${player.playerId}`, {
                        min: 1,
                        max: 10,
                        valueAsNumber: true,
                      })}
                      className={`w-10 xl:w-14 xl:font-black xl:text-lg text-center font-num font-bold outline-none h-full text-marine-600 dark:text-white`}
                      readOnly={true}
                      id={`${player.playerId}`}
                    />
                    <button
                      type="button"
                      className="flex items-center justify-center w-6 h-full font-bold lg:w-8 xl:w-10 bg-marine-100 hover:bg-marine-200 text-marine-600 dark:bg-dark-400 dark:hover:bg-dark-300 dark:text-marine-400"
                      onClick={() => handleIncrement(player.playerId)}
                      data-testid={`increment-${player.playerId}`}
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
        </ul>
        <div className="flex justify-center mt-4 xl:mt-8 gap-x-4">
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
            {Object.entries(getValues())
              .sort((a, b) => (a[1] > b[1] ? -1 : 1))
              .map((item) => (
                <li
                  key={item[0]}
                  className="flex items-center justify-between w-48 h-8 overflow-hidden text-sm border rounded whitespace-nowrap bg-marine-50 border-marine-200 dark:bg-dark-300 dark:border-marine-600"
                >
                  <span className="flex-1 ml-2">
                    {match?.stats.find((p) => p.playerId === item[0])!
                      .firstName[0] +
                      ". " +
                      match?.stats.find((p) => p.playerId === item[0])!
                        .lastName}
                  </span>
                  <span
                    className="flex items-center justify-center w-10 h-full font-bold text-white font-num"
                    style={{
                      backgroundColor: `${percentageToColor({
                        percentage: item[1] / 10,
                        theme: "dark",
                      })}`,
                    }}
                  >
                    {item[1]}
                  </span>
                </li>
              ))}
            {/* {match?.stats.map((player) => (
              <li
                key={player.playerId}
                className="flex items-center justify-between w-48 h-8 overflow-hidden text-sm border rounded whitespace-nowrap bg-marine-50 border-marine-200 dark:bg-dark-300 dark:border-marine-600"
              >
                <span className="flex-1 ml-2">
                  {player.firstName[0] + ". " + player.lastName}
                </span>
                <span className="flex items-center justify-center w-10 h-full font-bold text-white bg-marine-500 font-num">
                  {getValues(player.playerId)}
                </span>
              </li>
            ))} */}
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
