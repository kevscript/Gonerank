import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../shared/Button";
import ColorInput from "../inputs/ColorInput";
import Input from "../inputs/Input";
import useStorage from "@/hooks/useNewStorage";
import SelectInput from "../inputs/SelectInput";
import { SUPABASE } from "@/utils/constants";

export type ClubFormProps = {
  onSubmit: (x: ClubFormInput) => unknown;
  defaultValues?: ClubFormInput;
};

export type ClubFormInput = {
  name: string;
  abbreviation: string;
  primary: string;
  secondary: string;
  logo: string;
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

  const { files, loading, handleUpload, error } = useStorage("logos");

  const [imgSource, setImgSource] = useState<"local" | "database">("local");
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedDbFileName, setSelectedDbFileName] = useState<string | null>(
    null
  );

  const submitHandler: SubmitHandler<ClubFormInput> = (data) => {
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

  const checkKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") e.preventDefault();
  };

  useEffect(() => {
    // if default image is provided set accurate image state
    if (defaultValues && defaultValues.logo) {
      setImgSource("database");
      setSelectedDbFileName(defaultValues.logo);
    }
  }, [defaultValues]);

  useEffect(() => {
    if (imgSource === "local" && uploadedFile) {
      const imgUrl = URL.createObjectURL(uploadedFile);
      setImgPreview(imgUrl);
      setValue("logo", uploadedFile.name);
      return;
    }

    if (imgSource === "database" && files) {
      if (selectedDbFileName) {
        const imgUrl = `${SUPABASE.FULL_LOGOS_BUCKET_PATH}/${selectedDbFileName}`;
        setImgPreview(imgUrl);
        setValue("logo", selectedDbFileName);
      } else {
        setSelectedDbFileName(files[0].name);
        setValue("logo", files[0].name);
      }
      return;
    }

    setValue("logo", "");
    setImgPreview(null);
  }, [imgSource, uploadedFile, selectedDbFileName, files, setValue]);

  return (
    <form
      className="w-full max-w-3xl"
      onSubmit={handleSubmit(submitHandler)}
      onKeyDown={(e) => checkKeyDown(e)}
    >
      <div className="flex gap-12 p-12 border rounded border-neutral-300 dark:border-neutral-600">
        <div className="flex items-center justify-center flex-shrink-0 border rounded w-36 h-36 border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800">
          <div className="relative flex items-center justify-center flex-shrink-0 w-32 h-32">
            {imgPreview && (
              <Image
                src={imgPreview}
                alt="logo preview"
                layout="fill"
                objectFit="contain"
                objectPosition="bottom"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-4">
            <label
              className={`border px-3 py-1.5 rounded-sm text-sm cursor-pointer ${
                imgSource === "local"
                  ? "text-marine-100 dark:text-marine-300 border-marine-900 dark:border-marine-400 dark:bg-marine-900/50 bg-marine-500"
                  : "hover:text-neutral-600 text-neutral-400 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800"
              }`}
            >
              <input
                type="checkbox"
                value={"local"}
                checked={imgSource === "local"}
                onChange={() => handleImgSource("local")}
                className="hidden"
              />
              New logo
            </label>
            <label
              className={`border px-3 py-1.5 rounded-sm text-sm cursor-pointer ${
                imgSource === "database"
                  ? "text-marine-100 dark:text-marine-300 border-marine-900 dark:border-marine-400 dark:bg-marine-900/50 bg-marine-500"
                  : "hover:text-neutral-600 text-neutral-400 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800"
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
              <span className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Upload a new club logo. Supported formats: JPEG, PNG and GIF.
              </span>
              <label
                className={`${
                  imgSource !== "local" && "hidden"
                } group border flex-1 mt-4 rounded border-neutral-300 bg-neutral-200 dark:border-neutral-600 dark:bg-black/50 flex justify-center items-center max-w-sm cursor-pointer`}
              >
                <input
                  type="file"
                  id="single"
                  accept="image/*"
                  onChange={handleUploadedFile}
                  disabled={loading}
                  className="sr-only"
                />
                <span className="text-sm group-hover:text-neutral-600 text-neutral-500 dark:text-neutral-300 dark:group-hover:text-neutral-400">
                  {uploadedFile
                    ? uploadedFile.name
                    : "Click to upload an image"}
                </span>
              </label>
            </>
          )}

          {imgSource === "database" && (
            <>
              <span className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Pick a logo already uploaded to the database.
              </span>
              <div
                className={`${imgSource !== "database" && "hidden"} mt-auto`}
              >
                <SelectInput
                  label="File name"
                  name="logo"
                  error={errors.logo}
                  register={register}
                  options={{ required: false, onChange: handleSelectedFile }}
                >
                  {files?.map((file) => (
                    <option
                      key={file.name}
                      value={file.name}
                      className="dark:bg-neutral-800 dark:text-neutral-300 text-neutral-600"
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
      <div className="flex mt-8 gap-x-4">
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

      <div className="flex w-full mt-16 gap-x-4">
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
