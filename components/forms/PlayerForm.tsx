import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../shared/Button";
import DateInput from "../shared/DateInput";
import Input from "../shared/Input";
import PhotoIcon from "../Icons/Photo";
import useUpload from "@/hooks/useUpload";
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
  // const {
  //   url,
  //   loading: uploadLoading,
  //   error: uploadError,
  //   handleUpload,
  // } = useUpload();

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

      <div className="w-full flex gap-x-4">
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

      <div className="w-full flex gap-x-2 items-end">
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
          <label className="cursor-pointer  bg-gray-600 border border-gray-200 rounded h-10 p-2 w-24 flex justify-center items-center">
            <PhotoIcon className="w-4 h-4 fill-white" />
            <span className="ml-2 text-sm text-white font-normal">Upload</span>

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

      <div className="w-full flex gap-x-4 mt-8">
        <Link href="/admin/players" passHref>
          <div>
            <Button label="Cancel" />
          </div>
        </Link>
        <Button type="submit" label="Create" />
      </div>
    </form>
  );
};

export default PlayerForm;
