import Link from "next/link";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../shared/Button";
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
            required: "Required",
            minLength: { value: 2, message: "Min 2 chars." },
          }}
          value={getValues("name")}
        />
        <Input
          name="abbreviation"
          label="Abbr"
          register={register}
          error={errors.abbreviation}
          options={{
            required: "Required",
            minLength: { value: 2, message: "[2-5] chars." },
            maxLength: { value: 8, message: "[2-5] chars." },
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
            required: "Required",
            minLength: { value: 4, message: "[4-9] chars." },
            maxLength: { value: 9, message: "[4-9] chars." },
          }}
          value={getValues("primary")}
        />
        <Input
          name="secondary"
          label="Secondary"
          register={register}
          error={errors.secondary}
          options={{
            required: "Required",
            minLength: { value: 4, message: "[4-9] chars." },
            maxLength: { value: 9, message: "[4-9] chars." },
          }}
          value={getValues("secondary")}
        />
      </div>

      <div className="w-full flex gap-x-4 mt-8">
        <Link href="/admin/clubs" passHref>
          <div>
            <Button label="Cancel" />
          </div>
        </Link>
        <Button type="submit" label="Create" />
      </div>
    </form>
  );
};

export default ClubForm;
