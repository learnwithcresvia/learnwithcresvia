import { supabase } from "../supabase";

export const getLeaderboard = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("name, department, year, xp, streak, last_active")
    .order("xp", { ascending: false })
    .order("streak", { ascending: false });

  if (error) {
    console.log(error);
    return [];
  }
  return data;
};
