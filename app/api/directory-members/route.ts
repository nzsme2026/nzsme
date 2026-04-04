import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("membership_applications")
      .select(`
        id,
        created_at,
        first_name,
        last_name,
        phone,
        email,
        registered_business_name,
        nzbn,
        trading_name,
        website,
        business_email,
        business_phone,
        address,
        description,
        category,
        payment_status
      `)
      .eq("payment_status", "paid")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("DIRECTORY FETCH ERROR:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ members: data || [] });
  } catch (err: any) {
    console.error("DIRECTORY SERVER ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch directory data" },
      { status: 500 }
    );
  }
}