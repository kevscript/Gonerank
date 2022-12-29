import Link from "next/link";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../shared/Button";
import DateInput from "../inputs/DateInput";

export type SeasonFormProps = {
  onSubmit: (x: SeasonFormInput) => unknown;
  defaultValues?: SeasonFormInput;
};

export type SeasonFormInput = {
  startDate: Date;
};

const SeasonForm = ({ onSubmit, defaultValues }: SeasonFormProps) => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<SeasonFormInput>({
    mode: "onSubmit",
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });

  const submitHandler: SubmitHandler<SeasonFormInput> = (data) => {
    onSubmit(data);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
      <DateInput
        control={control}
        name="startDate"
        label="Start date"
        value={getValues("startDate")}
        error={errors.startDate}
        rules={{ required: "Required" }}
      />

      <div className="flex w-full mt-8 gap-x-4">
        <Link href="/admin/seasons" passHref>
          <div>
            <Button label="Annuler" />
          </div>
        </Link>
        <Button
          type="submit"
          label={defaultValues ? "Editer" : "Creer"}
          data-testid="form-submit"
        />
      </div>
    </form>
  );
};

export default SeasonForm;
