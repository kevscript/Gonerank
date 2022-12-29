import { noTimezone } from "@/utils/noTimezone";
import {
  GetClubsQuery,
  GetCompetitionsQuery,
  GetSeasonsQuery,
} from "graphql/generated/queryTypes";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../shared/Button";
import DateInput from "../inputs/DateInput";
import Input from "../inputs/Input";
import SelectInput from "../inputs/SelectInput";

export type MatchFormProps = {
  seasons: GetSeasonsQuery["seasons"] | undefined;
  competitions: GetCompetitionsQuery["competitions"] | undefined;
  clubs: GetClubsQuery["clubs"] | undefined;
  onSubmit: (x: MatchFormInput) => unknown;
  defaultValues?: MatchFormInput;
};

export type MatchFormInput = {
  date: Date;
  seasonId: string;
  competitionId: string;
  opponentId: string;
  home: "home" | "away";
  scored: number;
  conceeded: number;
};

const MatchForm = ({
  seasons,
  competitions,
  clubs,
  defaultValues,
  onSubmit,
}: MatchFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<MatchFormInput>({
    mode: "onSubmit",
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });

  const submitHandler: SubmitHandler<MatchFormInput> = (data) => {
    onSubmit(data);
  };

  useEffect(() => {
    if (!defaultValues && seasons && competitions && clubs) {
      setValue("seasonId", seasons[0].id);
      setValue("competitionId", competitions[0].id);
      setValue("opponentId", clubs[0].id);
    }
  }, [clubs, competitions, defaultValues, seasons, setValue]);

  return (
    <form className="w-full max-w-5xl" onSubmit={handleSubmit(submitHandler)}>
      <div className="flex w-full gap-x-4">
        <DateInput<MatchFormInput>
          label="Date"
          control={control}
          error={errors.date}
          name="date"
          value={getValues("date")}
          rules={{ required: "Date is required" }}
        />

        <SelectInput<MatchFormInput>
          label="Season"
          name="seasonId"
          error={errors.seasonId}
          options={{ required: "requis" }}
          register={register}
          value={getValues("seasonId")}
        >
          <>
            {seasons?.map((s) => (
              <option key={s.id} value={s.id}>
                {new Date(s.startDate).getFullYear() +
                  "/" +
                  (new Date(s.startDate).getFullYear() + 1)}
              </option>
            ))}
          </>
        </SelectInput>
      </div>

      <SelectInput<MatchFormInput>
        label="Competition"
        name="competitionId"
        error={errors.competitionId}
        options={{ required: "Season is required" }}
        register={register}
        value={getValues("competitionId")}
      >
        <>
          {competitions?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </>
      </SelectInput>

      <SelectInput<MatchFormInput>
        label="Opponent"
        name="opponentId"
        error={errors.opponentId}
        options={{ required: "Opponent is required" }}
        register={register}
        value={getValues("opponentId")}
      >
        <>
          {clubs &&
            [...clubs]
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
        </>
      </SelectInput>

      <div className="flex w-full gap-x-4">
        <SelectInput<MatchFormInput>
          label="Location"
          name="home"
          error={errors.home}
          register={register}
          options={{ required: "Location is required" }}
          value={getValues("home")}
          containerStyle="flex-1"
        >
          <option value={"home"}>Home</option>
          <option value={"away"}>Away</option>
        </SelectInput>

        <Input
          name="scored"
          type="number"
          label="Scored"
          register={register}
          error={errors.scored}
          options={{
            required: "Required",
            valueAsNumber: true,
            min: { value: 0, message: "min: 0" },
          }}
          value={getValues("scored")}
          containerStyle="w-20"
        />

        <Input
          name="conceeded"
          type="number"
          label="Conceed"
          register={register}
          error={errors.conceeded}
          options={{
            required: "Required",
            valueAsNumber: true,
            min: { value: 0, message: "min: 0" },
          }}
          value={getValues("conceeded")}
          containerStyle="w-20"
        />
      </div>

      <div className="flex w-full mt-8 gap-x-4">
        <Link href="/admin/matches" passHref>
          <div>
            <Button label="Annuler" />
          </div>
        </Link>
        <Button
          type="submit"
          label={defaultValues ? "Editer" : "Créer"}
          data-testid="form-submit"
        />
      </div>
    </form>
  );
};

export default MatchForm;
