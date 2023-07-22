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
import CountryInput from "../inputs/CountryInput";

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
    // console.log("data", data);
    onSubmit(data);
    if (imgSource === "local" && uploadedFile) {
      // console.log("uploading new image", uploadedFile.name);
      handleUpload(uploadedFile);
    }
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
    <div>
      <form onSubmit={handleSubmit(submitHandler)} className="max-w-4xl">
        <div className="flex gap-12 p-12 border rounded border-neutral-600">
          <div className="relative flex items-center justify-center flex-shrink-0 border rounded w-36 h-36 border-neutral-600 bg-neutral-800">
            {imgPreview && (
              <Image
                src={imgPreview}
                alt="avatar preview"
                layout="fill"
                objectFit="contain"
                objectPosition="bottom"
              />
            )}
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex gap-4">
              <label
                className={`border px-3 py-1.5 rounded-sm text-sm cursor-pointer ${
                  imgSource === "local"
                    ? "text-marine-300 border-marine-400 bg-marine-900/50"
                    : "text-neutral-300 border-neutral-600 bg-neutral-800"
                }`}
              >
                <input
                  type="checkbox"
                  value={"local"}
                  checked={imgSource === "local"}
                  onChange={() => handleImgSource("local")}
                  className="hidden"
                />
                New avatar
              </label>
              <label
                className={`border px-3 py-1.5 rounded-sm text-sm cursor-pointer ${
                  imgSource === "database"
                    ? "text-marine-300 border-marine-400 bg-marine-900/50"
                    : "text-neutral-300 border-neutral-600 bg-neutral-800"
                }`}
              >
                <input
                  type="checkbox"
                  value={"local"}
                  checked={imgSource === "local"}
                  onChange={() => handleImgSource("database")}
                  className="hidden"
                />
                From database
              </label>
            </div>
            {imgSource === "local" && (
              <>
                <span className="mt-2 text-sm text-neutral-400">
                  Upload a new player image. Supported formats: JPEG, PNG and
                  GIF.
                </span>
                <label
                  className={`${
                    imgSource !== "local" && "hidden"
                  } border flex-1 mt-4 rounded border-neutral-600 bg-black/50 flex justify-center items-center max-w-sm cursor-pointer`}
                >
                  <input
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={handleUploadedFile}
                    disabled={loading}
                    className="sr-only"
                  />
                  <span className="text-sm text-neutral-300">
                    {uploadedFile
                      ? uploadedFile.name
                      : "Click to upload an image"}
                  </span>
                </label>
              </>
            )}

            {imgSource === "database" && (
              <>
                <span className="mt-2 text-sm text-neutral-400">
                  Pick an avatar already uploaded to the database.
                </span>
                <div
                  className={`${imgSource !== "database" && "hidden"} mt-auto`}
                >
                  <SelectInput
                    label="File name"
                    name="image"
                    error={errors.image}
                    register={register}
                    options={{ required: false, onChange: handleSelectedFile }}
                  >
                    {files?.map((file) => (
                      <option
                        key={file.name}
                        value={file.name}
                        className="bg-neutral-800 text-neutral-300"
                      >
                        {file.name}
                      </option>
                    ))}
                  </SelectInput>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <Input
            label="First name"
            error={errors.firstName}
            name="firstName"
            register={register}
            options={{
              required: "First name is required.",
              minLength: { value: 2, message: "2 characters minimum" },
            }}
          />

          <Input
            label="Last name"
            error={errors.lastName}
            name="lastName"
            register={register}
            options={{
              required: "Last name is required.",
              minLength: { value: 2, message: "2 characters minimum" },
            }}
          />
        </div>

        <div className="flex flex-wrap w-full gap-4 mt-4">
          <DateInput
            control={control}
            name="birthDate"
            label="Birth date"
            error={errors.birthDate}
            rules={{ required: "Required" }}
            containerStyle="w-32"
          />

          <CountryInput
            name="countryCode"
            label="Country"
            country={watch("country")}
            countryCode={watch("countryCode")}
            error={errors.countryCode}
            register={register}
            options={{
              required: "Required",
              onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                if (e.currentTarget.value === "") {
                  setValue("country", "");
                  setValue("countryCode", "");
                  return;
                }

                const code =
                  e.currentTarget.value.toLowerCase() as keyof typeof countries;
                setValue("country", countries[code]);
              },
            }}
          >
            <option value={""} />
            {Object.entries(countries)?.map(([code, name]) => (
              <option key={code} value={code.toUpperCase()}>
                {name}
              </option>
            ))}
          </CountryInput>
        </div>

        <div className="flex w-full mt-16 gap-x-4">
          <Button
            type="submit"
            label={defaultValues ? "Editer" : "Creer"}
            data-testid="form-submit"
          />
          <Link href="/admin/players" passHref>
            <div>
              <Button label="Annuler" variety="secondary" />
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PlayerForm;
