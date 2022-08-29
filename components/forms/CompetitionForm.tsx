import Link from "next/link";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../shared/Button";
import Input from "../inputs/Input";

export type CompetitionFormProps = {
  onSubmit: (x: CompetitionFormInput) => unknown;
  defaultValues?: CompetitionFormInput;
};

export type CompetitionFormInput = {
  name: string;
  abbreviation: string;
};

const CompetitionForm = ({ onSubmit, defaultValues }: CompetitionFormProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CompetitionFormInput>({
    mode: "onSubmit",
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });

  const submitHandler: SubmitHandler<CompetitionFormInput> = (data) => {
    onSubmit(data);
  };

  return (
    <form className="w-full max-w-3xl" onSubmit={handleSubmit(submitHandler)}>
      <div className="flex w-full gap-x-4">
        <Input
          name="name"
          label="Name"
          register={register}
          error={errors.name}
          options={{
            required: "required",
            minLength: { value: 2, message: "2 chars min" },
          }}
          value={getValues("name")}
          containerStyle="flex-1"
        />

        <Input
          name="abbreviation"
          label="Abbrev"
          register={register}
          error={errors.abbreviation}
          options={{
            required: "required",
            minLength: { value: 2, message: "2 chars min" },
            maxLength: { value: 4, message: "4 chars max" },
          }}
          value={getValues("abbreviation")}
          containerStyle="w-24"
        />
      </div>

      <div className="flex w-full mt-8 gap-x-4">
        <Link href="/admin/competitions" passHref>
          <div>
            <Button label="Annuler" />
          </div>
        </Link>
        <Button type="submit" label="Créer" />
      </div>
    </form>
  );
};

export default CompetitionForm;
