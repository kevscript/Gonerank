import Link from "next/link";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import DateInput from "../shared/DateInput";
import Input from "../shared/Input";

export type PlayerFormProps = {
  onSubmit: (x: PlayerFormInput) => unknown;
  defaultValues?: PlayerFormInput;
};

export type PlayerFormInput = {
  firstName: string;
  lastName: string;
  birthDate: Date;
  country: string;
  countryCode: string;
  image: string;
};

const PlayerForm = ({ onSubmit, defaultValues }: PlayerFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<PlayerFormInput>({
    mode: "onSubmit",
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });

  const submitHandler: SubmitHandler<PlayerFormInput> = (data) => {
    onSubmit(data);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
      <Input
        register={register}
        name="firstName"
        label="First name"
        value={getValues("firstName")}
        error={errors.firstName}
        options={{
          required: "required",
          minLength: { value: 2, message: "2 char. min" },
        }}
      />

      <Input
        register={register}
        name="lastName"
        label="Last name"
        value={getValues("lastName")}
        error={errors.lastName}
        options={{
          required: "required",
          minLength: { value: 2, message: "2 char. min" },
        }}
      />

      <div className="w-full flex gap-x-4">
        <Input
          register={register}
          name="country"
          label="Country"
          value={getValues("country")}
          error={errors.country}
          options={{
            required: "required",
            minLength: { value: 2, message: "2 char. min" },
          }}
        />
        <Input
          register={register}
          name="countryCode"
          label="Code"
          value={getValues("countryCode")}
          error={errors.countryCode}
          containerStyle="w-32"
          options={{
            required: "required",
            minLength: { value: 2, message: "2 char. min" },
            maxLength: { value: 3, message: "3 char. max" },
          }}
        />
      </div>

      <DateInput
        control={control}
        name="birthDate"
        label="Birth date"
        value={getValues("birthDate")}
        error={errors.birthDate}
        rules={{ required: "required" }}
      />

      <Input
        register={register}
        name="image"
        label="Image url"
        value={getValues("image")}
        error={errors.image}
        options={{ required: false }}
      />

      <div className="w-full flex gap-x-4">
        <Link href="/admin/players" passHref>
          <button type="button">Cancel</button>
        </Link>
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default PlayerForm;
