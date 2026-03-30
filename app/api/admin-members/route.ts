import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("membership_applications") // ✅ FIXED TABLE
      .select(`
        id,
        first_name,
        last_name,
        email,
        phone,
        registered_business_name,
        category,
        payment_status,
        created_at
      `)
      .order("created_at", { ascending: false }); // ✅ better sorting

    if (error) {
      console.error("ADMIN FETCH ERROR:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ members: data || [] });

  } catch (err: any) {
    console.error("SERVER ERROR:", err);

    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}