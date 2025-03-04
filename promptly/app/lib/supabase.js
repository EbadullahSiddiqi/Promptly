// lib/supabase.js
import { createClient } from "@supabase/supabase-js";

export const createSupabaseClient = () => {
  const supabaseUrl = "https://ibffsuyqxmtxfzriuqfc.supabase.co";
  const supabaseKey = process.env.SUPABASE_KEY;

  return createClient(supabaseUrl, supabaseKey);
};
