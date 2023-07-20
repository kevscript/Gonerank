import useStorage from "@/hooks/useNewStorage";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import SelectInput from "../inputs/SelectInput";
import Link from "next/link";
import Input from "../inputs/Input";
import DateInput from "../inputs/DateInput";
import Button from "../shared/Button";
import countries from "@/utils/countries";

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
    setValue,
    watch,
    formState: { errors },
  } = useForm<PlayerFormInput>({
    mode: "onSubmit",
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });

  const { files, loading, handleUpload, error } = useStorage("avatars");

  const [imgSource, setImgSource] = useState<"local" | "database">("local");
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedDbFileName, setSelectedDbFileName] = useState<string | null>(
    null
  );

  const submitHandler: SubmitHandler<PlayerFormInput> = (data) => {
    // onSubmit(data);
    console.log("data", data);
  };

  const handleImgSource = (newSource: "local" | "database") => {
    newSource !== imgSource && setImgSource(newSource);
  };

  const handleSelectedFile = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedDbFileName !== e.target.value) {
      setSelectedDbFileName(e.target.value);
    }
  };

  const handleUploadedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setUploadedFile(null);
      return;
    }
    setUploadedFile(e.target.files[0]);
  };

  useEffect(() => {
    // if default image is provided set accurate image state
    if (defaultValues && defaultValues.image) {
      setImgSource("database");
      setSelectedDbFileName(defaultValues.image);
    }
  }, [defaultValues]);

  useEffect(() => {
    if (imgSource === "local" && uploadedFile) {
      const imgUrl = URL.createObjectURL(uploadedFile);
      setImgPreview(imgUrl);
      setValue("image", uploadedFile.name);
      return;
    }

    if (imgSource === "database" && files) {
      if (selectedDbFileName) {
        const imgUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${process.env.NEXT_PUBLIC_SUPABASE_AVATARS_BUCKET_PATH}/${selectedDbFileName}`;
        setImgPreview(imgUrl);
        setValue("image", selectedDbFileName);
      } else {
        setSelectedDbFileName(files[0].name);
        setValue("image", files[0].name);
      }
      return;
    }

    setValue("image", "");
    setImgPreview(null);
  }, [imgSource, uploadedFile, selectedDbFileName, files, setValue]);

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-wrap gap-2">
        <div className="relative flex items-center justify-center flex-shrink-0 h-40 border rounded-sm bg-dark-400 w-36 border-neutral-700">
          <div className="h-[90%] w-[90%] relative flex justify-center items-center">
            {imgPreview && (
              <Image
                src={imgPreview}
                alt="avatar preview"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between flex-1 h-40 p-4 border rounded-sm bg-dark-400 border-neutral-700">
          <div className="flex gap-4">
            <label
              className={`text-sm flex gap-2 select-none px-4 py-2 items-center rounded-sm cursor-pointer bg-dark-300 border ${
                imgSource === "local"
                  ? "border-marine-400 text-marine-300"
                  : "border-neutral-600"
              }`}
            >
              <input
                type="checkbox"
                value={"local"}
                checked={imgSource === "local"}
                onChange={() => handleImgSource("local")}
              />
              New avatar
            </label>
            <label
              className={`text-sm flex gap-4 select-none px-4 py-2 items-center rounded-sm cursor-pointer bg-dark-300 border ${
                imgSource === "database"
                  ? "border-marine-300 text-marine-300"
                  : "border-neutral-600"
              }`}
            >
              <input
                type="checkbox"
                value={"database"}
                checked={imgSource === "database"}
                onChange={() => handleImgSource("database")}
              />
              From database
            </label>
          </div>
          <div>
            <label className={`${imgSource !== "local" && "hidden"}`}>
              <input
                type="file"
                id="single"
                accept="image/*"
                onChange={handleUploadedFile}
                disabled={loading}
              />
            </label>

            <div className={`${imgSource !== "database" && "hidden"}`}>
              <SelectInput
                register={register}
                name="image"
                label="Image url"
                value={getValues("image")}
                error={errors.image}
                options={{ required: false, onChange: handleSelectedFile }}
              >
                {files?.map((file) => (
                  <option key={file.name} value={file.name}>
                    {file.name}
                  </option>
                ))}
              </SelectInput>
            </div>
          </div>
        </div>
      </div>

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

      <div className="flex items-end w-full gap-x-4">
        <DateInput
          control={control}
          name="birthDate"
          label="Birth date"
          value={getValues("birthDate")}
          error={errors.birthDate}
          rules={{ required: "Required" }}
        />

        <SelectInput
          register={register}
          name="countryCode"
          label="Country"
          value={getValues("countryCode")}
          error={errors.countryCode}
          options={{
            required: true,
            onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
              const code =
                e.currentTarget.value.toLowerCase() as keyof typeof countries;
              setValue("country", countries[code]);
            },
          }}
        >
          <option value={""} disabled />
          {Object.entries(countries)?.map(([code, name]) => (
            <option key={code} value={code.toUpperCase()}>
              {name}
            </option>
          ))}
        </SelectInput>
      </div>

      <div className="flex w-full mt-8 gap-x-4">
        <Link href="/admin/players" passHref>
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

export default PlayerForm;
