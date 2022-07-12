import Link from "next/link";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { uploadAvatar } from "@/utils/uploadAvatar";
import Button from "../shared/Button";
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
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: any) => {
    try {
      setUploading(true);
      const avatarUrl = await uploadAvatar(e);
      avatarUrl && setValue("image", avatarUrl);
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setUploading(false);
    }
  };

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

      <Input
        register={register}
        name="image"
        label="Image url"
        value={getValues("image")}
        error={errors.image}
        options={{ required: false }}
      />

      {uploading ? (
        "Uploading..."
      ) : (
        <label>
          <span>Upload</span>
          <input
            type="file"
            id="single"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      )}

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
