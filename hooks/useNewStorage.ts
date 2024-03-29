import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

type FileError = {
  message: string;
};

type SupabaseFile = {
  created_at: string;
  id: string;
  last_accessed_at: string;
  name: string;
  updated_at: string;
  metadata: any;
};

const useStorage = (id: string) => {
  const [files, setFiles] = useState<SupabaseFile[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FileError | null>(null);

  const handleUpload = async (file: File) => {
    try {
      setLoading(true);

      if (file) {
        const { error: uploadError } = await supabase.storage
          .from(id)
          .upload(`${file.name}`, file);

        if (uploadError) {
          throw uploadError;
        }
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
          const [...validFiles] = list;
          setFiles(validFiles);
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  return { files, loading, error, handleUpload };
};

export default useStorage;
