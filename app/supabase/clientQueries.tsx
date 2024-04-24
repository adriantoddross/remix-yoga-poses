import { Session, SupabaseClient } from "@supabase/supabase-js";

export const getFavoritePoses = async (
  supabase: SupabaseClient,
  session: Session | null
) => {
  console.log(session);
  if (session === null) return { data: [], error: null };

  const { data, error } = await supabase
    .from("favorite_poses")
    .select()
    .eq("user_id", session?.user.id);

  return { data: data?.map((pose) => pose.pose_id), error };
};
