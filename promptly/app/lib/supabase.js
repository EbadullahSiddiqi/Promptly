import { createClient } from "@supabase/supabase-js";

export const createSupabaseClient = () => {
  const supabaseUrl = "https://ibffsuyqxmtxfzriuqfc.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliZmZzdXlxeG10eGZ6cml1cWZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NjEzMzksImV4cCI6MjA1NjMzNzMzOX0.27KF7xaPk8IXg7jhPoS2xRDfWbdYxNQYT3Ub6_R3m2g";

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, supabaseKey);
};
