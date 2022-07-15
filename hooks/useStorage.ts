import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

type FileError = {
  message: string;
};

type File = {
  created_at: string;
  id: string;
  last_accessed_at: string;
  name: string;
  updated_at: string;
  metadata: any;
};

const useStorage = (id: string) => {
  const [data, setData] = useState<File[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FileError | null>(null);
  const [latestFile, setLatestFile] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);

      const image = e.target.files ? e.target.files[0] : null;

      if (image) {
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(`${image.name}`, image);

        if (uploadError) {
          throw uploadError;
        }

        const { data, error } = await supabase.storage.from("avatars").list();
        if (error) throw error;
        if (data) {
          const [x, ...avatars] = data;
          setData(avatars);
        }

        setLatestFile(image.name);
      } else {
        throw new Error("No image file found");
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data: list, error: listError } = await supabase.storage
          .from(id)
          .list();
        if (listError) throw listError;
        if (list) {
          const [x, ...avatars] = list;
          setData(avatars);
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  return { data, loading, error, handleUpload, latestFile };
};

export default useStorage;
