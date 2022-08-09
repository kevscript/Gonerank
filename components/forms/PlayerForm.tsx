import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../shared/Button";
import DateInput from "../shared/DateInput";
import Input from "../shared/Input";
import PhotoIcon from "../Icons/Photo";
import useStorage from "@/hooks/useStorage";
import SelectInput from "../shared/SelectInput";

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
    data: files,
    loading,
    error,
    latestFile,
    handleUpload,
  } = useStorage("avatars");

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<PlayerFormInput>({
    mode: "onSubmit",
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });

  const submitHandler: SubmitHandler<PlayerFormInput> = (data) => {
    onSubmit(data);
  };

  useEffect(() => {
    if (files && defaultValues) {
      const currFile = files.find((f) => f.name === defaultValues.image);
      currFile && setValue("image", currFile.name);
    }
  }, [files, defaultValues, setValue]);

  useEffect(() => {
    latestFile && setValue("image", latestFile);
  }, [latestFile, setValue]);

  return (
    <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
      <Input
        register={register}
        name="firstName"
        label="First Name"
        value={getValues("firstName")}
        error={errors.firstName}
        options={{
          required: "First name is required",
          minLength: { value: 2, message: "2 characters minimum" },
        }}
      />

      <Input
        register={register}
        name="lastName"
        label="Last Name"
        value={getValues("lastName")}
        error={errors.lastName}
        options={{
          required: "Last name is required",
          minLength: { value: 2, message: "2 characters minimum" },
        }}
      />

      <div className="flex w-full gap-x-4">
        <Input
          register={register}
          name="country"
          label="Country"
          value={getValues("country")}
          error={errors.country}
          options={{
            required: "Country is required",
            minLength: { value: 2, message: "2 characters minimum" },
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
            required: "Required",
            minLength: { value: 2, message: "2/3 chars." },
            maxLength: { value: 3, message: "2/3 chars." },
          }}
        />
      </div>

      <DateInput
        control={control}
        name="birthDate"
        label="Birth date"
        value={getValues("birthDate")}
        error={errors.birthDate}
        rules={{ required: "Required" }}
      />

      <div className="flex items-end w-full gap-x-2">
        <SelectInput
          register={register}
          name="image"
          label="Image url"
          value={getValues("image")}
          error={errors.image}
          options={{ required: false }}
        >
          {files?.map((file) => (
            <option key={file.name} value={file.name}>
              {file.name}
            </option>
          ))}
        </SelectInput>

        {loading ? (
          "Uploading..."
        ) : (
          <label className="flex items-center justify-center w-24 h-10 p-2 bg-gray-600 border border-gray-200 rounded cursor-pointer">
            <PhotoIcon className="w-4 h-4 fill-white" />
            <span className="ml-2 text-sm font-normal text-white">Upload</span>

            <input
              type="file"
              id="single"
              accept="image/*"
              onChange={handleUpload}
              disabled={loading}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="flex w-full mt-8 gap-x-4">
        <Link href="/admin/players" passHref>
          <div>
            <Button label="Annuler" />
          </div>
        </Link>
        <Button type="submit" label="Créer" />
      </div>
    </form>
  );
};

export default PlayerForm;
