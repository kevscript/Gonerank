import Link from "next/link";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import DateInput from "../shared/DateInput";

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
        rules={{ required: "required" }}
      />

      <div className="flex gap-4 mt-8">
        <Link href="/admin/seasons" passHref>
          <button type="button">Cancel</button>
        </Link>
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default SeasonForm;
