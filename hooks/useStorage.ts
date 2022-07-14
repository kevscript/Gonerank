import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

type FileError = {
  message: string;
};

const useStorage = () => {
  const [avatars, setAvatars] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FileError | null>(null);

  useEffect(() => {
    const getAvatarsList = async () => {
      setLoading(true);
      try {
        const { data: avatarsList, error: listError } = await supabase.storage
          .from("avatars")
          .list();
        if (listError) throw listError;
        if (avatarsList) setAvatars(avatarsList);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getAvatarsList();
  }, []);

  return { avatars, loading, error };
};

export default useStorage;
