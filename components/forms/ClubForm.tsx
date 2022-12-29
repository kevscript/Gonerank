import Link from "next/link";
import React, { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../shared/Button";
import ColorInput from "../inputs/ColorInput";
import Input from "../inputs/Input";

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
    setValue,
    formState: { errors },
  } = useForm<ClubFormInput>({
    mode: "onSubmit",
    defaultValues: useMemo(
      () => defaultValues || { primary: "#fff", secondary: "#fff" },
      [defaultValues]
    ),
  });

  const submitHandler: SubmitHandler<ClubFormInput> = (data) => {
    onSubmit(data);
  };

  const checkKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") e.preventDefault();
  };

  return (
    <form
      className="w-full max-w-3xl"
      onSubmit={handleSubmit(submitHandler)}
      onKeyDown={(e) => checkKeyDown(e)}
    >
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
      {/* <div className="flex gap-x-4">
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
      </div> */}

      <div className="flex gap-x-4">
        <ColorInput
          name="primary"
          label="Primary"
          register={register}
          error={errors.primary}
          options={{
            required: "Required",
            minLength: { value: 4, message: "[4-9] chars." },
            maxLength: { value: 7, message: "[4-9] chars." },
          }}
          setValue={setValue}
          initialValue={getValues("primary")}
        />

        <ColorInput
          name="secondary"
          label="Secondary"
          register={register}
          error={errors.secondary}
          options={{
            required: "Required",
            minLength: { value: 4, message: "[4-9] chars." },
            maxLength: { value: 7, message: "[4-9] chars." },
          }}
          setValue={setValue}
          right={true}
          initialValue={getValues("secondary")}
        />
      </div>

      <div className="flex w-full mt-8 gap-x-4">
        <Link href="/admin/clubs" passHref>
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

export default ClubForm;
