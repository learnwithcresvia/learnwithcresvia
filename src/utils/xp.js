import { supabase } from "../supabaseClient";

/**
 * Add XP to the logged-in user
 */
export async function addXP(amount) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const currentXP = user.user_metadata?.xp || 0;
  const newXP = currentXP + amount;

  await supabase.auth.updateUser({
    data: { xp: newXP },
  });

  return newXP;
}
