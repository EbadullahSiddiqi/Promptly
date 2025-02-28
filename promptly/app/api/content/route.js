// app/api/content/route.js
import { createSupabaseClient } from "../../lib/supabase.js";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Get authentication information
    const authentication = getAuth(request);
    const userId = authentication.userId;

    console.log("Auth info:", { userId });

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized - No userId found" },
        { status: 401 }
      );
    }

    // Create Supabase client
    const supabase = createSupabaseClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Failed to create Supabase client" },
        { status: 500 }
      );
    }

    // Query the database
    const { data, error } = await supabase
      .from("content_pieces")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    // Handle database errors
    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return successful response
    return NextResponse.json(data || []);
  } catch (error) {
    // Catch any uncaught errors
    console.error("Unhandled error in content API:", error);
    return NextResponse.json(
      { error: "Server error: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
