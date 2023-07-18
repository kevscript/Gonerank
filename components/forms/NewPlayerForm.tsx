import useStorage from "@/hooks/useNewStorage";
import Image from "next/image";
import { useEffect, useState } from "react";

const PlayerForm = () => {
  const { files } = useStorage("avatars");

  const [imgSource, setImgSource] = useState<"local" | "database">("local");
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedDbFileName, setSelectedDbFileName] = useState<string | null>(
    null
  );

  const handleImgSource = (newSource: "local" | "database") => {
    newSource !== imgSource && setImgSource(newSource);
  };

  const handleSelectedFile = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedDbFileName !== e.target.value) {
      setSelectedDbFileName(e.target.value);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setUploadedFile(null);
      return;
    }
    setUploadedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (imgSource === "local" && uploadedFile) {
      const imgUrl = URL.createObjectURL(uploadedFile);
      setImgPreview(imgUrl);
      return;
    }

    if (imgSource === "database" && files) {
      if (selectedDbFileName) {
        const imgUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${process.env.NEXT_PUBLIC_SUPABASE_AVATARS_BUCKET_PATH}/${selectedDbFileName}`;
        setImgPreview(imgUrl);
      } else {
        setSelectedDbFileName(files[0].name);
      }
      return;
    }

    setImgPreview(null);
  }, [imgSource, uploadedFile, selectedDbFileName, files]);

  return (
    <form>
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
        <div className="flex flex-col justify-between flex-1 h-40 p-8 border rounded-sm bg-dark-400 border-neutral-700">
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
                onChange={handleFileUpload}
                // onChange={handleUpload}
                // disabled={loading}
              />
            </label>

            <select
              className={`${imgSource !== "database" && "hidden"}`}
              onChange={handleSelectedFile}
            >
              {files?.map((file) => (
                <option key={file.name} value={file.name}>
                  {file.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlayerForm;
