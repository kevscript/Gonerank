import { supabase } from "@/lib/supabase";

export const uploadAvatar = async (event: any) => {
  try {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    const image = event.target.files[0];
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(`${image.name}`, image);

    if (uploadError) {
      throw uploadError;
    }

    const { publicURL } = supabase.storage
      .from("avatars")
      .getPublicUrl(`${image.name}`);

    console.log(publicURL);

    return publicURL;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
