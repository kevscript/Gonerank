import Link from "next/link";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../shared/Input";

export type ClubFormProps = {
  onSubmit: (x: ClubFormInput) => unknown;
  defaultValues?: ClubFormInput;
};

export type ClubFormInput = {
  name: string;
  abbreviation: string;
  primary: string;
  secondary: string;
};

const ClubForm = ({ onSubmit, defaultValues }: ClubFormProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ClubFormInput>({
    mode: "onSubmit",
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });

  const submitHandler: SubmitHandler<ClubFormInput> = (data) => {
    onSubmit(data);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
      <div className="flex gap-x-4">
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
        />
        <Input
          name="abbreviation"
          label="Abbr"
          register={register}
          error={errors.abbreviation}
          options={{
            required: "required",
            minLength: { value: 2, message: "2 chars min" },
            maxLength: { value: 8, message: "5 chars max" },
          }}
          value={getValues("abbreviation")}
          containerStyle="w-32"
        />
      </div>
      <div className="flex gap-x-4">
        <Input
          name="primary"
          label="Primary"
          register={register}
          error={errors.primary}
          options={{
            required: "required",
            minLength: { value: 4, message: "4 chars min" },
            maxLength: { value: 9, message: "9 chars max" },
          }}
          value={getValues("primary")}
        />
        <Input
          name="secondary"
          label="Secondary"
          register={register}
          error={errors.secondary}
          options={{
            required: "required",
            minLength: { value: 4, message: "4 chars min" },
            maxLength: { value: 9, message: "9 chars max" },
          }}
          value={getValues("secondary")}
        />
      </div>

      <div className="flex gap-x-4">
        <Link href="/admin/clubs" passHref>
          <button type="button">Cancel</button>
        </Link>

        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default ClubForm;
