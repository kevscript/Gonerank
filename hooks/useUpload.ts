import { supabase } from "@/lib/supabase";
import React, { useState } from "react";

type UploadError = {
  message: string;
};

const useUpload = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<UploadError | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);

      const image = e.target.files ? e.target.files[0] : null;

      if (image) {
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(`${image.name}`, image);

        if (uploadError) throw uploadError;

        const { publicURL } = supabase.storage
          .from("avatars")
          .getPublicUrl(`${image.name}`);

        setUrl(publicURL);
      } else {
        throw new Error("No image file found");
      }
    } catch (err) {
      setError(err as UploadError);
    } finally {
      setLoading(false);
    }
  };

  return { url, loading, error, handleUpload };
};

export default useUpload;
